import React, { useState } from 'react';
import { SectionId } from '../../constants';
import { runGeminiFlash } from '../../lib/gemini';
import SectionWrapper from '../SectionWrapper';
import InfoBox from '../InfoBox';
import NextButton from '../NextButton';
import GeminiResponse from '../GeminiResponse';

const CodeBlock: React.FC<{ code: string }> = ({ code }) => (
    <pre className="bg-slate-900 text-emerald-400 p-4 rounded-lg overflow-x-auto text-sm border-2 border-emerald-500/30 shadow-inner">
        <code>{code}</code>
    </pre>
);

interface CodeAnalysisBlockProps {
    title: string;
    code: string;
}

const CodeAnalysisBlock: React.FC<CodeAnalysisBlockProps> = ({ title, code }) => {
    const [explanation, setExplanation] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = async () => {
        if (isLoading) return;
        setIsLoading(true);
        setError(null);
        setExplanation(null);
        
        const prompt = `You are an expert AWS security engineer. Explain the following Python code snippet that uses AWS KMS. Break down what the code does step-by-step. Focus on the security implications and best practices. Explain it in a way that someone studying for the AWS Security Specialty exam would understand.

Here is the code:
\`\`\`python
${code}
\`\`\``;

        try {
            const result = await runGeminiFlash(prompt);
            setExplanation(result);
        } catch (e) {
            setError(e.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <InfoBox className="bg-gradient-to-br from-purple-500/20 to-violet-500/20 border-purple-400">
            <h3 className="text-2xl font-bold text-purple-300 mb-4">{title}</h3>
            <CodeBlock code={code} />
            <button
                onClick={handleAnalyze}
                disabled={isLoading}
                className="mt-4 flex items-center justify-center gap-2 bg-sky-600/70 hover:bg-sky-500/70 text-sky-200 px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                ✨ Simplify with Gemini
            </button>
            <GeminiResponse isLoading={isLoading} response={explanation} error={error} />
        </InfoBox>
    );
};

const DIRECT_ENCRYPTION_CODE = `import boto3
kms_client = boto3.client('kms')
KEY_ID = 'your-key-id'

def encrypt_small_data(plaintext):
    # KMS does the encryption inside the secure HSM
    response = kms_client.encrypt(
        KeyId=KEY_ID,
        Plaintext=plaintext.encode('utf-8')
    )
    return response['CiphertextBlob']

def decrypt_small_data(ciphertext):
    # The key ID is embedded in the ciphertext metadata
    response = kms_client.decrypt(
        CiphertextBlob=ciphertext
    )
    return response['Plaintext'].decode('utf-8')`;

const ENVELOPE_ENCRYPTION_CODE = `import boto3
kms_client = boto3.client('kms')
KEY_ID = 'your-key-id'

def encrypt_large_data(data):
    # 1. Get a unique data key from KMS
    response = kms_client.generate_data_key(
        KeyId=KEY_ID, KeySpec='AES_256'
    )
    plaintext_key = response['Plaintext']
    encrypted_key = response['CiphertextBlob']

    # 2. Encrypt data LOCALLY with the plaintext key
    # (Using a library like 'cryptography' is recommended)
    encrypted_data = your_local_encryption_function(data, plaintext_key)

    # 3. CRITICAL: Delete the plaintext key from memory!
    del plaintext_key
    
    return encrypted_data, encrypted_key`;

const CodeExamplesSection: React.FC<{ onNavigate: (id: SectionId) => void }> = ({ onNavigate }) => {
    return (
        <SectionWrapper>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">💻 Real Python Code Examples</h2>
            
            <InfoBox className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-400 mb-8">
                <p className="text-lg leading-relaxed">
                    Here are working Python examples using boto3. Click "Simplify with Gemini" to get a detailed, security-focused explanation of each snippet.
                </p>
            </InfoBox>

            <div className="space-y-8">
                <CodeAnalysisBlock title="🔒 Example 1: Direct Encryption (Small Data)" code={DIRECT_ENCRYPTION_CODE} />
                <CodeAnalysisBlock title="📦 Example 2: Envelope Encryption (Large Data)" code={ENVELOPE_ENCRYPTION_CODE} />
            </div>
            
            <NextButton currentSectionId="code-examples" onNavigate={onNavigate} />
        </SectionWrapper>
    );
};

export default CodeExamplesSection;