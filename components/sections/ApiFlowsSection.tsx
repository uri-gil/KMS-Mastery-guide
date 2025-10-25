
import React, { useState } from 'react';
import { SectionId } from '../../constants';
import { useMermaid } from '../../hooks/useMermaid';
import SectionWrapper from '../SectionWrapper';
import InfoBox from '../InfoBox';
import NextButton from '../NextButton';

type ApiFlowId = 'direct-encrypt' | 'direct-decrypt' | 'envelope-encrypt' | 'envelope-decrypt';

const API_FLOWS = [
    { id: 'direct-encrypt', title: 'Direct Encrypt' },
    { id: 'direct-decrypt', title: 'Direct Decrypt' },
    { id: 'envelope-encrypt', title: 'Envelope Encrypt' },
    { id: 'envelope-decrypt', title: 'Envelope Decrypt' },
];

const ApiFlowsSection: React.FC<{ onNavigate: (id: SectionId) => void }> = ({ onNavigate }) => {
    const [activeFlow, setActiveFlow] = useState<ApiFlowId>('direct-encrypt');
    useMermaid([activeFlow]);

    const flowContent = {
        'direct-encrypt': {
            title: '🔒 Direct Encryption Flow (kms:Encrypt)',
            diagram: `
sequenceDiagram
    participant App as Your Application
    participant API as KMS API
    participant HSM
    App->>API: 1. kms:Encrypt(KeyId, Plaintext)
    API->>HSM: 2. Encrypt with KMS Key
    HSM-->>API: 3. Return CiphertextBlob
    API-->>App: 4. Return CiphertextBlob
`
        },
        'direct-decrypt': {
            title: '🔓 Direct Decryption Flow (kms:Decrypt)',
            diagram: `
sequenceDiagram
    participant App as Your Application
    participant API as KMS API
    participant HSM
    App->>API: 1. kms:Decrypt(CiphertextBlob)
    API->>HSM: 2. Decrypt with KMS Key
    HSM-->>API: 3. Return Plaintext
    API-->>App: 4. Return Plaintext
`
        },
        'envelope-encrypt': {
            title: '📦 Envelope Encryption Flow (kms:GenerateDataKey)',
            diagram: `
sequenceDiagram
    participant App as Your Application
    participant API as KMS API
    participant HSM
    App->>API: 1. kms:GenerateDataKey
    API->>HSM: 2. Generate & Encrypt DEK
    HSM-->>API: 3. Return Plaintext & Encrypted DEK
    API-->>App: 4. Return both DEKs
    Note right of App: 5. Encrypt data locally with Plaintext DEK
    Note right of App: 6. DELETE Plaintext DEK!
`
        },
        'envelope-decrypt': {
            title: '📬 Envelope Decryption Flow (kms:Decrypt)',
            diagram: `
sequenceDiagram
    participant App as Your Application
    participant API as KMS API
    participant HSM
    App->>API: 1. kms:Decrypt(Encrypted DEK)
    API->>HSM: 2. Decrypt DEK with KMS Key
    HSM-->>API: 3. Return Plaintext DEK
    API-->>App: 4. Return Plaintext DEK
    Note right of App: 5. Decrypt data locally
    Note right of App: 6. DELETE Plaintext DEK!
`
        }
    };

    return (
        <SectionWrapper>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">🔄 Complete API Call Sequences</h2>
            <InfoBox className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-400 mb-8">
                <p className="text-lg leading-relaxed">
                    This shows exactly what happens at each step, from API call to result.
                </p>
            </InfoBox>

            <div className="bg-slate-900/80 rounded-xl p-3 mb-8 flex flex-wrap gap-2 justify-center border-2 border-purple-500/30">
                {API_FLOWS.map(({ id, title }) => (
                    <button
                        key={id}
                        onClick={() => setActiveFlow(id as ApiFlowId)}
                        className={`px-4 py-2 rounded-lg font-semibold text-white transition-all duration-300 ${
                            activeFlow === id ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg' : 'bg-white/10 hover:bg-white/20'
                        }`}
                    >
                        {title}
                    </button>
                ))}
            </div>

            <div className="api-flow-content transition-opacity duration-500">
                <h3 className="text-2xl md:text-4xl font-bold text-white mb-6">{flowContent[activeFlow].title}</h3>
                <div className="mermaid bg-slate-900/50 p-4 rounded-lg">
                    {flowContent[activeFlow].diagram}
                </div>
            </div>
            
            <NextButton currentSectionId="api-flows" onNavigate={onNavigate} />
        </SectionWrapper>
    );
};

export default ApiFlowsSection;
