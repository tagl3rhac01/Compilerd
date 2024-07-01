// frontend/src/app.js
import React, { useState } from 'react';
import axios from 'axios';
import CodeEditor from './frontend/src/components/CodeEditor';
import LanguageSelector from './frontend/src/components/LanguageSelector';
import ResultDisplay from './frontend/src/components/ResultDisplay';
require('dotenv').config();

// Access environment variables
const openaiApiKey = process.env.OPENAI_API_KEY;
const allowedRam = process.env.ALLOWED_RAM;

const App = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [result, setResult] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/execute', {
        language,
        code,
      });
      setResult(response.data.result);
    } catch (error) {
      setResult('Error executing code');
    }
  };

  return (
    <div>
      <h1>Code Judge</h1>
      <LanguageSelector language={language} setLanguage={setLanguage} />
      <CodeEditor code={code} setCode={setCode} />
      <button onClick={handleSubmit}>Run Code</button>
      <ResultDisplay result={result} />
    </div>
  );
};

export default App;
