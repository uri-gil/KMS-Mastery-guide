import React from 'react';
import SectionWrapper from '../SectionWrapper';
import InfoBox from '../InfoBox';

const ExamTip: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-black/40 rounded-lg p-6 border-l-4 border-yellow-400">
        <p className="text-yellow-300 font-bold text-xl mb-3">{title}</p>
        <div className="text-white space-y-2">{children}</div>
    </div>
);

const ExamTipsSection: React.FC = () => {
    return (
        <SectionWrapper>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">🎯 AWS Security Specialty Exam Tips</h2>

            <InfoBox className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-400 mb-8 animate-pulse-glow">
                <h3 className="text-3xl font-bold text-green-300 mb-4">🎉 You Made It!</h3>
                <p className="text-xl leading-relaxed">
                    Congratulations on making it through the material! Now let's prepare you for those tricky exam questions. Review these common patterns.
                </p>
            </InfoBox>

            <div className="space-y-6">
                <ExamTip title='Pattern 1: "We need detailed audit trails of who accessed data"'>
                    <p><strong className="text-red-300">❌ Wrong:</strong> AWS Managed Keys</p>
                    <p><strong className="text-green-300">✅ Correct:</strong> Customer Managed Keys (CMKs)</p>
                    <p><strong>Why:</strong> CMKs show the actual IAM principal in CloudTrail, not just the service name.</p>
                </ExamTip>

                <ExamTip title='Pattern 2: "Application needs to encrypt a 10GB file"'>
                    <p><strong className="text-red-300">❌ Wrong:</strong> Use `kms:Encrypt` API</p>
                    <p><strong className="text-green-300">✅ Correct:</strong> Use envelope encryption with `kms:GenerateDataKey`</p>
                    <p><strong>Why:</strong> `kms:Encrypt` has a 4KB limit. Anything larger requires envelope encryption.</p>
                </ExamTip>

                <ExamTip title='Pattern 3: "Cross-account access to KMS encrypted data"'>
                    <p><strong className="text-red-300">❌ Wrong:</strong> Just add IAM permissions</p>
                    <p><strong className="text-green-300">✅ Correct:</strong> Update the KMS key policy AND add IAM permissions</p>
                    <p><strong>Why:</strong> KMS requires BOTH the key policy (resource-based) and IAM policy (identity-based) to grant access.</p>
                </ExamTip>
            </div>
            
            <InfoBox className="mt-8 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-400">
                <h3 className="text-3xl font-bold text-green-300 mb-4">💪 You're Ready!</h3>
                <p className="text-xl leading-relaxed">
                    You've covered all the major KMS concepts for the exam. Remember the key differences and patterns. Good luck!
                </p>
            </InfoBox>
        </SectionWrapper>
    );
};

export default ExamTipsSection;