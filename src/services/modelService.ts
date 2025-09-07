import { GoogleGenerativeAI } from '@google/generative-ai';
import { getLanguageNameByCode } from './languageService';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const backendUrl = 'http://127.0.0.1:8000/question/';
const backendUrlText = 'http://127.0.0.1:8000/question-text/';

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result).split(',')[1]);
    reader.onerror = (error) => reject(error);
  });
};

export const getGeminiResponseFile = async (file) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const prompt = "Extract all text from this image exactly as it appears. Do not add any commentary or explanation, only return the transcribed text.";

  try {
    const base64Data = await fileToBase64(file);
    const imagePart = {
      inlineData: {
        mimeType: file.type,
        data: base64Data,
      },
    };

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();
    return text;

  } catch (err) {
    console.error("Error in Gemini OCR Service:", err);
    throw new Error("Failed to extract text from the image.");
  }
};

export const getGeminiResponse = async (prompt:string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;

  } catch (err) {
    console.error("Error in Gemini OCR Service:", err);
    throw new Error("Failed to extract text from the image.");
  }
};

export const getOssResponse = async (prompt: string) => {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey) {
    console.error("VITE_GROQ_API_KEY is not set in environment variables.");
    throw new Error("Groq API key is missing.");
  }

  const apiUrl = "https://api.groq.com/openai/v1/chat/completions";

  const requestBody = {
    messages: [
      {
        role: "user",
        content: prompt
      }
    ],
    model: "openai/gpt-oss-120b",
    temperature: 1,
    max_completion_tokens: 65536,
    top_p: 1,
    stream: false,
    reasoning_effort: "medium",
    stop: null,
    tools: []
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });
    const data = await response.json();
    const fullContent = data.choices[0]?.message?.content || '';
    return fullContent;
  } catch (error) {
    console.error("Error calling Groq API:", error);
    throw error; // Re-throw the error to be handled by the calling function
  }
};


export const getBackendLLMText = async (prompt:string,language:string) => {

        const formData = new FormData();
        formData.append('prompt', prompt);
        formData.append('language', getLanguageNameByCode(language));

        // Make the POST request to the FastAPI endpoint
        const response = await fetch(backendUrlText, {
          method: 'POST',
          body: formData,
        });
        console.log(response)

        if (!response.ok) {
          console.log("Hello")
          const errorData = await response.json();
          throw new Error(errorData.detail || `HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.solution
}

export const getBackendLLMFile = async (files: File[],language:string) => {
    for (const file of files) {

        // Create a FormData object to send the file and prompt
        const formData = new FormData();
        formData.append('file', file);
        formData.append('language', getLanguageNameByCode(language));

        // Make the POST request to the FastAPI endpoint
        const response = await fetch(backendUrl, {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        return data.solution
    }

}

export const cleanAndParseJson = (rawResponseText: string): any => {
  try {
    // Find the start of the JSON content, which could be an array '[' or an object '{'
    const jsonStartIndex = rawResponseText.indexOf('[');
    const objectStartIndex = rawResponseText.indexOf('{');

    let startIndex = -1;

    if (jsonStartIndex > -1 && objectStartIndex > -1) {
      startIndex = Math.min(jsonStartIndex, objectStartIndex);
    } else if (jsonStartIndex > -1) {
      startIndex = jsonStartIndex;
    } else {
      startIndex = objectStartIndex;
    }

    if (startIndex === -1) {
      throw new Error("No JSON array or object found in the response string.");
    }
    
    // Extract the JSON string from the starting character to the end
    const jsonString = rawResponseText.substring(startIndex);
    console.log("Test 1")
    console.log(jsonString)
    // Parse the extracted string into a JSON object
    return jsonString;
  } catch (error) {
    console.error("Failed to parse JSON from response:", error);
    console.error("Original string that failed parsing:", rawResponseText);
    throw new Error("Invalid JSON format in the AI response.");
  }
};

