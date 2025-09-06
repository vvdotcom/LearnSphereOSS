import { getLanguageNameByCode } from "./languageService";
import { getGeminiResponseFile, getOssResponse } from "./modelService";

// Define the structure for the math problems
export interface MathStep {
  step: number;
  description: string;
  equation: string;
  explanation: string;
}

export interface MathProblem {
  id: string;
  question: string;
  solution: string;
  steps: MathStep[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
}

/**
 * A service class to interact with your FastAPI backend for solving math problems.
 */
export class SolverService {

  static analyzeProblems: any;

  /**
   * Creates the detailed prompt that instructs the AI on how to format its response.
   * This is sent to the backend along with the file.
   */
  private generatePrompt(problem:string,language:string): string {
    return `
You are an expert tutor in math, biology, physics, and chemistry. Analyze the uploaded document and:
1. Identify ALL problems.
2. For EACH problem, provide a detailed step-by-step solution. Explain to the user how to solve the problem correctly.
3. Format your entire response as a single, valid JSON array with this exact structure:
4. For "solution". Remember just state the correct answer only. If it is a mutiple choice. Then only select the correct choice (e.g., A. -5) 
[
  {
    "id": "placeholder_id",
    "question": "The exact math problem as written",
    "solution": "Final answer (e.g., x = 4, y = 2x + 3, etc.)",
    "difficulty": "Easy|Medium|Hard",
    "topic": "Subject area (e.g., Algebra, Calculus, Geometry)",
    "steps": [
      {
        "step": 1,
        "description": "Brief description of what we're doing",
        "equation": "Mathematical equation for this step",
        "explanation": "Detailed explanation of why we do this step"
      }
    ]
  }
]

UPLOADED PROBLEMS DOCUMENT:
${problem}


CRITICAL RULES:
- **Primary Language:** Your entire response MUST be in ${language}. This is a strict requirement.
- The output MUST be only a valid JSON array. Do not include any other text, explanations, or markdown formatting like \`\`\`json.
- If no problems are found, return an empty array [].`;
  }

  /**
   * Cleans the AI's text response to ensure it's valid JSON.
   * This removes potential markdown code blocks that the AI might add.
   */
private cleanJsonResponse(text: string): string {
    // Add a guard clause to handle null, undefined, or other non-string inputs.
    if (!text || typeof text !== 'string') {
        return text; // Or return '{}' or throw an error, depending on desired behavior.
    }

    // 1. Clean the string by removing markdown code fences.
    // The original try...catch is no longer necessary because we've validated the input.
    let cleaned = text.trim();

    if (cleaned.startsWith('```json')) {
        cleaned = cleaned.substring(7);
    } else if (cleaned.startsWith('```')) {
        cleaned = cleaned.substring(3);
    }
    if (cleaned.endsWith('```')) {
        cleaned = cleaned.slice(0, -3);
    }
    cleaned = cleaned.trim();

    // 2. Add a targeted fix for unescaped quotes followed by a letter (e.g., 27"F).
    // This is now more specific to avoid breaking valid JSON.
    const fixUnescapedQuotesRegex = /(\d)"([a-zA-Z])/g;
    cleaned = cleaned.replace(fixUnescapedQuotesRegex, '$1\\"$2');

    return cleaned;
}

  /**
   * Uploads files to the backend and returns the parsed math problems.
   * @param files An array of File objects to be processed.
   * @returns A promise that resolves to an array of MathProblem objects.
   */
  async analyzeProblems(files: File[],language:string): Promise<MathProblem[]> {
    const allProblems: MathProblem[] = [];

    for (const file of files) {
      try {
        const problem = await getGeminiResponseFile(file)
        const solutionText = await getOssResponse(this.generatePrompt(problem,language))
        // Clean and parse the JSON string returned from the backend
        console.log("Test 2")

        console.log(solutionText)
        const cleanedText = this.cleanJsonResponse(solutionText);
        try {
          const problems = JSON.parse(cleanedText) as MathProblem[];
          const validatedProblems = problems.map((problem, index) => ({
            ...problem,
            id: `${file.name}_${Date.now()}_${index}`, // Create a more robust unique ID
          }));
          allProblems.push(...validatedProblems);
        } catch (parseError) {
          console.error('Failed to parse backend response as JSON:', parseError);
          throw new Error('The server response was not in the expected format.');
        }

      } catch (error) {
        console.error(`Error processing file ${file.name}:`, error);
        // Add a descriptive error problem to the results list
        allProblems.push({
          id: `error_${file.name}_${Date.now()}`,
          question: `Failed to process file: ${file.name}`,
          solution: 'Error',
          difficulty: 'Hard',
          topic: 'Error',
          steps: [{
            step: 1,
            description: 'An error occurred',
            equation: 'N/A',
            explanation: error instanceof Error ? error.message : 'An unknown error occurred during processing.',
          }],
        });
      }
    }

    return allProblems;
  }

  async analyzeProblemsText(problem:string,language:string): Promise<MathProblem[]> {
    const allProblems: MathProblem[] = [];

      try {
        const solutionText = await getOssResponse(this.generatePrompt(problem,language))
        // Clean and parse the JSON string returned from the backend
        const cleanedText = this.cleanJsonResponse(solutionText);
        console.log(cleanedText)
        try {
          const problems = JSON.parse(cleanedText) as MathProblem[];
          const validatedProblems = problems.map((problem, index) => ({
            ...problem,
            id: `${Date.now()}_${index}`, // Create a more robust unique ID
          }));
          allProblems.push(...validatedProblems);
        } catch (parseError) {
          console.error('Failed to parse backend response as JSON:', parseError);
          throw new Error('The server response was not in the expected format.');
        }

      } catch (error) {
        // Add a descriptive error problem to the results list
        allProblems.push({
          id: `error`,
          question: `Failed`,
          solution: 'Error',
          difficulty: 'Hard',
          topic: 'Error',
          steps: [{
            step: 1,
            description: 'An error occurred',
            equation: 'N/A',
            explanation: error instanceof Error ? error.message : 'An unknown error occurred during processing.',
          }],
        });
      }
    

    return allProblems;
  }
}



// Export a singleton instance of the service for use throughout the app
export const solverService = new SolverService();