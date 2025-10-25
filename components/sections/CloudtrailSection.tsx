
import React from 'react';
import { SectionId } from '../../constants';
import SectionWrapper from '../SectionWrapper';
import InfoBox from '../InfoBox';
import NextButton from '../NextButton';

const CodeBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <pre className="bg-slate-900 text-emerald-400 p-4 rounded-lg overflow-x-auto text-sm border-2 border-emerald-500/30 shadow-inner h-full">
        <code>{children}</code>
    </pre>
);

const CodeComment: React.FC<{ children: React.ReactNode }> = ({ children }) => <span className="text-slate-400 italic">{children}</span>;

const CloudtrailSection: React.FC<{ onNavigate: (id: SectionId) => void }> = ({ onNavigate }) => {
    return (
        <SectionWrapper>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">📊 CloudTrail Logging: The Nuanced Truth</h2>
            
            <InfoBox className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border-blue-400 mb-8">
                <p className="text-lg leading-relaxed">
                    CloudTrail logging is one of the trickiest topics for the AWS Security Specialty exam! What gets logged depends on the key type and operation. Understanding these nuances is crucial for security auditing, compliance, and incident response.
                </p>
            </InfoBox>

            <InfoBox className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400 mb-8">
                <h3 className="text-3xl font-bold text-purple-300 mb-4 text-center">📋 The CloudTrail Logging Matrix</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-white text-left">
                        <thead className="bg-gradient-to-r from-purple-600 to-pink-600">
                            <tr>
                                <th className="p-4 font-semibold">Operation Type</th>
                                <th className="p-4 font-semibold">AWS Owned Keys</th>
                                <th className="p-4 font-semibold">AWS Managed Keys</th>
                                <th className="p-4 font-semibold">Customer Managed Keys</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-purple-400/30">
                            {[
                                { feature: "Key Creation", owned: "❌ Not logged", managed: "❌ Not logged", customer: "✅ Logged (`CreateKey`)" },
                                { feature: "Cryptographic Ops", owned: "❌ Not logged", managed: "✅ Logged (shows AWS Service)", customer: "✅ Logged (shows IAM Principal)" },
                                { feature: "Automatic Rotation", owned: "❌ Not logged", managed: "❌ Not logged", customer: "✅ Logged" },
                                { feature: "Key Policy Changes", owned: "n/a", managed: "n/a", customer: "✅ Logged (`PutKeyPolicy`)" },
                                { feature: "Enable/Disable Key", owned: "n/a", managed: "n/a", customer: "✅ Logged (`DisableKey`)" },
                            ].map(({ feature, owned, managed, customer }, index) => (
                                <tr key={feature} className={`transition-colors hover:bg-white/20 ${index % 2 === 0 ? 'bg-white/5' : 'bg-white/10'}`}>
                                    <td className="p-4 font-semibold">{feature}</td>
                                    <td className="p-4">{owned}</td>
                                    <td className="p-4">{managed}</td>
                                    <td className="p-4">{customer}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </InfoBox>

            <InfoBox className="bg-gradient-to-br from-green-500/20 to-teal-500/20 border-green-400 mb-8">
                <h3 className="text-2xl font-bold text-green-300 mb-4">🔐 Deep Dive: Who Made the Call?</h3>
                <p className="text-lg mb-4">The `userIdentity` field in the log is critical for audits. This is the main difference between using AWS Managed and Customer Managed keys.</p>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="text-xl font-bold text-yellow-300 mb-3">⚠️ AWS Managed Key Log</h4>
                        <CodeBlock>{`"userIdentity": {
  "type": "AWSService",
  "invokedBy": "s3.amazonaws.com"
}

// You know S3 did something,
// but not which user triggered it.`}</CodeBlock>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-green-300 mb-3">✅ Customer Managed Key Log</h4>
                        <CodeBlock>{`"userIdentity": {
  "type": "IAMUser",
  "userName": "Alice"
}

// You know exactly who did it.
// This is what auditors want to see!`}</CodeBlock>
                    </div>
                </div>
            </InfoBox>

            <InfoBox className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-400 mb-8">
                    <h3 className="text-3xl font-bold text-cyan-300 mb-4">🔍 Auditing with Encryption Context</h3>
                    <p className="text-lg leading-relaxed mb-4">
                        Encryption context is additional data you provide during encryption. It's not encrypted, but it's logged in CloudTrail, which is powerful for auditing and security.
                    </p>
                    <CodeBlock><CodeComment># Example context in a CloudTrail log:</CodeComment>{`
"requestParameters": {
    "encryptionContext": {
        "aws:s3:arn": "arn:aws:s3:::my-bucket/file.zip"
    }
}
// This log entry is now tied to a specific S3 object!
`}</CodeBlock>
            </InfoBox>

            <InfoBox className="bg-gradient-to-br from-red-500/20 to-rose-500/20 border-red-400">
                <h3 className="text-2xl font-bold text-red-300 mb-4">🚫 What's NEVER in CloudTrail</h3>
                <ul className="list-disc list-inside space-y-2 text-lg">
                    <li><strong className="text-red-300">Plaintext Data or Keys:</strong> CloudTrail NEVER logs your sensitive data or key material.</li>
                    <li><strong className="text-red-300">AWS Internal Operations:</strong> For AWS managed keys, internal management actions like rotation are not visible to you.</li>
                </ul>
            </InfoBox>
            
            <NextButton currentSectionId="cloudtrail" onNavigate={onNavigate} />
        </SectionWrapper>
    );
};

export default CloudtrailSection;
