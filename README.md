# LearnSphere - AI-Powered Learning Platform

![LearnSphere Logo](https://i.imgur.com/57uVCPY.gif)

LearnSphere is an innovative AI-powered educational platform that transforms how students learn and practice. Using advanced AI models including GPT-OSS-120B and Gemini, LearnSphere provides personalized learning experiences through three core features: intelligent problem solving, adaptive learning paths, and progressive exam simulation.

## 🌟 Features

### 🧠 AI Solver
- **Multi-format Input**: Upload images, PDFs, or type problems directly
- **Multi-subject Support**: Math, Physics, Chemistry, and Biology
- **Step-by-step Solutions**: Detailed explanations with visual equations
- **Multiple AI Models**: Powered by GPT-OSS-120B (via Groq Cloud API) and Gemini AI

### 🗺️ Learning Road
- **Personalized Learning Paths**: AI-generated curriculum based on your goals
- **Progressive Difficulty**: Structured steps from beginner to advanced
- **Interactive Content**: Rich learning materials with examples and exercises
- **Built-in Quizzes**: Test your knowledge at each step

### 📝 Exam Simulator
- **Progressive Difficulty**: 7 levels from Foundation to Genius
- **Adaptive Testing**: AI analyzes your performance and adjusts difficulty
- **Performance Analytics**: Detailed insights and improvement suggestions
- **Real Exam Preparation**: Simulates actual exam conditions

## 🚀 Getting Started

### Prerequisites

Before running LearnSphere, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher)
- **pip** (Python package manager)
- **Ollama** (for local LLM support)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/vvdotcom/LearnSphere.git
   cd LearnSphere
   ```

2. **Navigate to backend directory**
   ```bash
   cd backend
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Install and setup Ollama**
   ```bash
   # Install Ollama (visit https://ollama.ai for installation instructions)
   # Pull the required model
   ollama pull gemma3n:e2b
   ```

5. **Configure API Keys**
   
   Edit `backend/token_config.yaml` and add your IBM Watson API key:
   ```yaml
   access_token: 0
   api_key: your_ibm_watson_api_key_here
   expiration_time: 1754896760
   ```

6. **Start the backend server**
   ```bash
   uvicorn app:app --reload
   ```
   
   The backend will be available at `http://127.0.0.1:8000`

### Frontend Setup

1. **Open a new terminal and navigate to the project root**
   ```bash
   cd LearnSphere  # if not already in the root directory
   ```

2. **Install Node.js dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory (copy from `.env.example`):
   ```env
   # Copy .env.example to .env and fill in your API keys
   cp .env.example .env
   
   # Then edit .env with your actual keys:
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   VITE_GROQ_API_KEY=your_groq_api_key_here
   VITE_BACKEND_URL=http://127.0.0.1:8000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open the application**
   
   Open your browser and navigate to the URL displayed in the terminal (typically `http://localhost:5173`)

## 🔐 API Keys Setup

LearnSphere requires API keys for AI functionality. All keys are stored securely in environment variables:

### Required API Keys:

1. **Groq Cloud API Key** (for GPT-OSS-120B)
   - Sign up at [Groq Cloud](https://console.groq.com/)
   - Generate an API key
   - Add to `.env` as `VITE_GROQ_API_KEY`

2. **Google Gemini API Key** (for content generation)
   - Get your key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Add to `.env` as `VITE_GEMINI_API_KEY`

3. **IBM Watson API Key** (for backend processing)
   - Configure in `backend/token_config.yaml`
   - See backend setup instructions above

### Environment Variables:
```env
# Required for frontend
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_GROQ_API_KEY=your_groq_api_key_here
VITE_BACKEND_URL=http://127.0.0.1:8000

# Optional
VITE_DEBUG_MODE=false
```

**⚠️ Security Note**: Never commit your `.env` file to version control. The `.env.example` file is provided as a template.

## 🤖 GPT-OSS Model Integration

LearnSphere leverages the **GPT-OSS-120B** model through **Groq Cloud API** for advanced problem-solving capabilities. Here's how we implemented it:

### Model Configuration

The GPT-OSS model is integrated in `src/services/modelService.ts` using Groq Cloud API:

```typescript
export const getOssResponse = async (prompt: string) => {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY; // Groq Cloud API Key from .env
  if (!apiKey) {
    throw new Error("Groq API key is missing.");
  }
  
  const apiUrl = "https://api.groq.com/openai/v1/chat/completions";

  const requestBody = {
    messages: [{ role: "user", content: prompt }],
    model: "openai/gpt-oss-120b",
    temperature: 1,
    max_completion_tokens: 65536,
    top_p: 1,
    stream: false,
    reasoning_effort: "medium",
    stop: null,
    tools: []
  };
  // ... rest of implementation
};
```

### Usage Examples

#### 1. Problem Solving
The GPT-OSS model analyzes uploaded problems and generates step-by-step solutions:

```typescript
// In SolverService.ts
const solutionText = await getOssResponse(this.generatePrompt(problem, language))
```

#### 2. Learning Path Generation
Creates personalized learning curricula:

```typescript
// In learningRoadService.ts
const text = await getOssResponse(prompt);
```

#### 3. Exam Simulator Generation
Creates progressive difficulty exams with adaptive testing:

```typescript
// In examSimulatorService.ts
const text = await getOssResponse(prompt)
```

### Testing the GPT-OSS Integration

**Prerequisites**: Ensure your `.env` file contains valid API keys before testing.

1. **Upload a Math Problem**
   - Navigate to the Solver section
   - Upload an image with a math problem or type one directly
   - Select your preferred language
   - Click "Solve with AI"

2. **Generate a Learning Path**
   - Go to Learning Road section
   - Enter a topic like "Calculus" or "Organic Chemistry"
   - The GPT-OSS model will create a structured learning path

3. **Create Progressive Exams**
   - Navigate to Exam Simulator section
   - Enter exam description or upload reference materials
   - Configure number of exams (1-7 progressive levels)
   - GPT-OSS generates adaptive difficulty exams

3. **Sample Test Data**
   
   Try these sample problems to test the integration:
   
   **Math Problem:**
   ```
   Solve for x: 2x + 5 = 15
   Find the derivative of f(x) = x² + 3x - 2
   ```
   
   **Physics Problem:**
   ```
   A ball is thrown upward with an initial velocity of 20 m/s. 
   How high will it go? (g = 9.8 m/s²)
   ```
   
   **Exam Creation:**
   ```
   Topic: "Advanced Calculus"
   Description: "Create progressive exams covering derivatives, integrals, and applications"
   Number of Exams: 5 (Foundation → Expert levels)
   ```

### Model Performance

- **API Provider**: Groq Cloud API for high-performance inference
- **Response Time**: ~2-5 seconds for complex problems
- **Accuracy**: High accuracy for mathematical and scientific problems
- **Language Support**: Supports multiple languages (English, Spanish, Chinese, French, Vietnamese)
- **Context Length**: Up to 65,536 tokens for complex problem analysis

## 🏗️ Architecture

### Frontend (React + TypeScript)
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React Context API
- **Database**: Dexie (IndexedDB wrapper) for local storage
- **Build Tool**: Vite

### Backend (Python FastAPI)
- **Framework**: FastAPI
- **Document Processing**: Docling for PDF/document analysis
- **AI Integration**: IBM Watson, Gemini AI, GPT-OSS
- **File Handling**: Multipart form data processing

### AI Models Used
1. **GPT-OSS-120B** (via Groq Cloud API) - Primary problem solving, learning paths, and exam generation
2. **Gemini 2.0 Flash** (Google) - Content generation and analysis


## 📱 Multi-language Support

LearnSphere supports 5 languages:
- 🇺🇸 English
- 🇪🇸 Spanish (Español)
- 🇨🇳 Chinese (中文)
- 🇫🇷 French (Français)
- 🇻🇳 Vietnamese (Tiếng Việt)

## 🔧 Development

### Project Structure
```
LearnSphere/
├── src/
│   ├── components/          # React components
│   ├── contexts/           # React contexts
│   ├── services/           # API and business logic
│   └── utils/              # Utility functions
├── backend/
│   ├── app.py             # FastAPI main application
│   ├── watson.py          # Watson AI integration
│   └── requirements.txt   # Python dependencies
└── public/                # Static assets
```

### Key Services
- **SolverService**: Handles problem analysis and solution generation
- **LearningRoadService**: Creates personalized learning paths
- **ExamSimulatorService**: Generates progressive difficulty exams
- **DatabaseService**: Manages local data storage

## 🧪 Testing

### Manual Testing
1. **Solver Testing**: Upload various problem types (math, physics, chemistry)
2. **Learning Path Testing**: Generate paths for different subjects
3. **Exam Simulator Testing**: Create and take progressive exams

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **GPT-OSS-120B**: Advanced open-source language model via Groq Cloud API
- **Google Gemini**: Multimodal AI capabilities
- **Groq**: High-performance AI inference

## 📞 Support

**API Key Issues**: If you encounter API key errors, verify your `.env` file contains valid keys and restart the development server.

For support, email support@learnsphere.com or join our Discord community.

---

**LearnSphere** - Transforming education through AI-powered personalized learning experiences.