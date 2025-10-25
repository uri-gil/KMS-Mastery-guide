import React from 'react';

interface GeminiResponseProps {
  isLoading: boolean;
  response: string | null;
  error: string | null;
  thinking?: boolean;
}

const GeminiResponse: React.FC<GeminiResponseProps> = ({ isLoading, response, error, thinking = false }) => {
  if (isLoading) {
    return (
      <div className="mt-4 p-4 bg-slate-900/50 rounded-lg flex items-center justify-center border-2 border-dashed border-purple-400/50 min-h-[120px]">
        <div className="flex flex-col items-center text-purple-300">
          <svg className="animate-spin h-8 w-8 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="font-semibold">{thinking ? "Thinking deeply..." : "Generating response..."}</span>
           {thinking && <span className="text-sm text-slate-400 mt-1">This may take a moment for complex queries.</span>}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-4 p-4 bg-red-900/50 text-red-300 rounded-lg border-2 border-red-500/50">
        <strong className="font-bold">Error:</strong>
        <p className="mt-1 whitespace-pre-wrap">{error}</p>
      </div>
    );
  }

  if (response) {
    return (
      <div className="mt-4 p-4 bg-slate-800/60 text-slate-200 rounded-lg border-2 border-slate-600">
         <pre className="whitespace-pre-wrap bg-transparent p-0 font-sans text-slate-200">{response}</pre>
      </div>
    );
  }

  return null;
};

export default GeminiResponse;
