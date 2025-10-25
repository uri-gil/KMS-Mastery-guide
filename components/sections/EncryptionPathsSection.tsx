
import React from 'react';
import { SectionId } from '../../constants';
import { useMermaid } from '../../hooks/useMermaid';
import SectionWrapper from '../SectionWrapper';
import InfoBox from '../InfoBox';
import NextButton from '../NextButton';

interface SectionProps {
  onNavigate: (id: SectionId) => void;
}

const EncryptionPathsSection: React.FC<SectionProps> = ({ onNavigate }) => {
  useMermaid([]);

  return (
    <SectionWrapper>
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">🔀 Two Ways to Encrypt: Direct vs. Envelope</h2>
      
      <InfoBox className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-400 mb-8">
        <p className="text-lg leading-relaxed">
          There are two patterns for encrypting data, and the choice depends entirely on the size of your data.
        </p>
      </InfoBox>

      <div className="space-y-8">
        <InfoBox className="bg-gradient-to-br from-purple-500/20 to-violet-500/20 border-purple-400">
          <h3 className="text-2xl md:text-4xl font-bold text-purple-300 mb-4">🔒 Direct Encryption (For Small Data ≤ 4KB)</h3>
          <p className="text-lg mb-4 leading-relaxed">
            You send small data (like a password) to KMS. KMS encrypts it inside the HSM and returns the encrypted version. Simple and secure, but limited to 4KB.
          </p>
          <div className="mermaid bg-slate-900/50 p-4 rounded-lg">
            {`
graph LR
    A[Data ≤ 4KB] --> B[kms:Encrypt API]
    B --> C{KMS HSM}
    C --> D[Encrypted Data]
    D --> E[Store Safely]
`}
          </div>
        </InfoBox>
        
        <InfoBox className="bg-gradient-to-br from-green-500/20 to-teal-500/20 border-green-400">
          <h3 className="text-2xl md:text-4xl font-bold text-green-300 mb-4">📦 Envelope Encryption (For Large Data > 4KB)</h3>
          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-2 border-yellow-400 rounded-xl p-5 mb-6 animate-pulse-glow">
            <p className="text-yellow-300 font-bold text-xl md:text-2xl mb-3">🎯 THIS IS YOUR EXAM QUESTION!</p>
            <p className="text-lg leading-relaxed">
              <strong>Envelope encryption:</strong> encrypting plaintext data with a data key (DEK), then encrypting that data key with a KMS key (KEK).
            </p>
          </div>
          <p className="text-lg mb-4 leading-relaxed">
            KMS generates a unique data key. You use this key to encrypt large data locally in your app, then delete the plaintext key. You store the encrypted data and the KMS-encrypted data key together.
          </p>
          <div className="mermaid bg-slate-900/50 p-4 rounded-lg">
            {`
graph TB
    subgraph Encryption
        A[Large Data] --> B[1. kms:GenerateDataKey]
        B --> C{2. KMS Returns<br/>Plaintext DEK<br/>Encrypted DEK}
        C --> D[3. Encrypt Data<br/>LOCALLY]
        D --> E[4. DELETE<br/>Plaintext DEK]
        E --> F[5. Store Encrypted Data<br/>+ Encrypted DEK]
    end
    subgraph Decryption
        G[Retrieve Data & Key] --> H[1. kms:Decrypt<br/>(Encrypted DEK)]
        H --> I{2. KMS Returns<br/>Plaintext DEK}
        I --> J[3. Decrypt Data<br/>LOCALLY]
        J --> K[4. DELETE<br/>Plaintext DEK]
    end
`}
          </div>
        </InfoBox>
      </div>
      
      <NextButton currentSectionId="encryption-paths" onNavigate={onNavigate} />
    </SectionWrapper>
  );
};

export default EncryptionPathsSection;
