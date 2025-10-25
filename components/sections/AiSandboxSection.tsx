import React, { useState } from 'react';
import { runGeminiWithThinking } from '../../lib/gemini';
import SectionWrapper from '../SectionWrapper';
import InfoBox from '../InfoBox';
import GeminiResponse from '../GeminiResponse';

const AiSandboxSection: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (!prompt.trim() || isLoading) return;
        setIsLoading(true);
        setError(null);
        setResponse(null);
        try {
            const result = await runGeminiWithThinking(prompt);
            setResponse(result);
        } catch (e) {
            setError(e.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <SectionWrapper>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">🤖 AI Sandbox: Thinking Mode</h2>
            <InfoBox className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-400 mb-8">
                <h3 className="text-2xl font-bold text-blue-300 mb-4">Challenge Gemini with Complex Scenarios</h3>
                <p className="text-lg leading-relaxed">
                    Have a complex security architecture question about KMS? Need to design a multi-account key sharing strategy? Describe your problem here.
                </p>
                 <p className="text-lg leading-relaxed mt-2">
                    Using <strong className="text-white">gemini-2.5-pro</strong> with its maximum thinking budget, the AI will perform deep analysis to give you a comprehensive, well-reasoned solution.
                </p>
            </InfoBox>

            <div className="bg-slate-800/60 rounded-xl p-6 border-2 border-slate-600">
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., 'Design a secure, cross-account strategy for sharing encrypted S3 data with a third-party auditor. The auditor should have read-only access for a limited time. Detail the required KMS key policies, IAM policies, and the process for granting and revoking access.'"
                    className="w-full h-48 p-4 bg-slate-900/70 border-2 border-purple-400/50 rounded-lg text-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                    disabled={isLoading}
                />
                <button
                    onClick={handleSubmit}
                    disabled={isLoading || !prompt.trim()}
                    className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl text-xl font-bold transition-all transform hover:scale-105 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 animate-pulse-glow focus:outline-none focus:ring-4 focus:ring-purple-400"
                >
                    {isLoading ? 'Analyzing...' : 'Analyze with Thinking Mode'}
                </button>
            </div>

            <GeminiResponse isLoading={isLoading} response={response} error={error} thinking={true} />

        </SectionWrapper>
    );
};

export default AiSandboxSection;
