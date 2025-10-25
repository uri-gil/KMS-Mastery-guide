
import React from 'react';
import { SectionId } from '../../constants';
import SectionWrapper from '../SectionWrapper';
import InfoBox from '../InfoBox';
import NextButton from '../NextButton';

interface SectionProps {
  onNavigate: (id: SectionId) => void;
}

const KeyTypesSection: React.FC<SectionProps> = ({ onNavigate }) => {
    return (
        <SectionWrapper>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">🔑 Understanding the Three Types of KMS Keys</h2>

            <InfoBox className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border-blue-400 mb-8">
                <p className="text-lg leading-relaxed">
                    AWS gives you three types of KMS keys, like three levels of control: "AWS handles everything," "partial visibility," and "you control everything." Choosing the right one depends on your needs for control, visibility, and compliance.
                </p>
            </InfoBox>

            <div className="space-y-8">
                <InfoBox className="bg-gradient-to-br from-red-500/20 to-rose-500/20 border-red-400">
                    <h3 className="text-3xl font-bold text-red-300 mb-4">🚫 AWS Owned Keys - Zero Visibility</h3>
                    <p className="text-lg mb-4 leading-relaxed">
                        AWS owns and manages these completely. You never see them, can't manage them, and have no audit trail. Convenient, but not for sensitive workloads.
                    </p>
                </InfoBox>

                <InfoBox className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border-yellow-400">
                    <h3 className="text-3xl font-bold text-yellow-300 mb-4">⚠️ AWS Managed Keys - Partial Visibility</h3>
                    <p className="text-lg mb-4 leading-relaxed">
                        These keys live in YOUR account but are managed by AWS. You can see them and their use in CloudTrail, but you cannot modify their policies or control their lifecycle.
                    </p>
                </InfoBox>

                <InfoBox className="bg-gradient-to-br from-green-500/20 to-teal-500/20 border-green-400">
                    <h3 className="text-3xl font-bold text-green-300 mb-4">✅ Customer Managed Keys (CMKs) - Full Control</h3>
                    <p className="text-lg mb-4 leading-relaxed">
                        YOU create and control these. You set policies, manage rotation, and EVERYTHING is logged. This is the gold standard for production systems with sensitive data or compliance requirements.
                    </p>
                </InfoBox>
            </div>

            <div className="mt-8 bg-slate-800/60 rounded-xl p-6 border-2 border-slate-600">
                <h3 className="text-3xl font-bold text-white mb-6 text-center">📊 Quick Comparison</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-white text-left">
                        <thead className="bg-gradient-to-r from-purple-600 to-pink-600">
                            <tr>
                                {["Feature", "AWS Owned", "AWS Managed", "Customer Managed"].map(header => (
                                    <th key={header} className="p-4 font-semibold">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-purple-400/30">
                            {[
                                { feature: "CloudTrail Logging", owned: "❌ None", managed: "✅ Crypto ops only", customer: "✅ Everything" },
                                { feature: "Key Policy Control", owned: "❌ None", managed: "❌ Read-only", customer: "✅ Full control" },
                                { feature: "Monthly Cost", owned: "$0", managed: "$0", customer: "$1" },
                                { feature: "Compliance Use", owned: "❌ No", managed: "⚠️ Limited", customer: "✅ Yes" },
                                { feature: "Cross-Account Access", owned: "❌ No", managed: "❌ No", customer: "✅ Yes" },
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
            </div>

            <NextButton currentSectionId="key-types" onNavigate={onNavigate} />
        </SectionWrapper>
    );
};

export default KeyTypesSection;
