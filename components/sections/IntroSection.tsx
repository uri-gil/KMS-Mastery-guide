
import React from 'react';
import { SectionId } from '../../constants';
import SectionWrapper from '../SectionWrapper';
import InfoBox from '../InfoBox';
import NextButton from '../NextButton';

interface SectionProps {
  onNavigate: (id: SectionId) => void;
}

const IntroSection: React.FC<SectionProps> = ({ onNavigate }) => {
  return (
    <SectionWrapper>
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">🎓 Welcome to Your KMS Learning Journey!</h2>

      <InfoBox className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-400 mb-8">
        <h3 className="text-2xl font-bold text-blue-300 mb-4">💙 Let's Build Your Understanding Together</h3>
        <p className="text-lg mb-4 leading-relaxed">
          Learning AWS KMS can feel overwhelming at first, and that's completely normal! Think of this guide as your friendly companion. We'll start with the basics and gradually build up to the complex stuff.
        </p>
        <p className="text-lg leading-relaxed">
          By the end, you'll understand not just the "what" of KMS, but the "why" and "how" - exactly what you need for the AWS Security Specialty exam and real-world security engineering.
        </p>
      </InfoBox>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <InfoBox className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400">
          <h3 className="text-2xl font-bold text-purple-300 mb-4">📖 What You'll Learn</h3>
          <ul className="space-y-3 text-lg">
            <li>✅ Three types of KMS keys and when to use each</li>
            <li>✅ Direct encryption vs. envelope encryption</li>
            <li>✅ Complete API call sequences with real examples</li>
            <li>✅ CloudTrail logging differences (the tricky parts!)</li>
            <li>✅ Python code you can actually use</li>
            <li>✅ Exam-specific tips and common traps</li>
          </ul>
        </InfoBox>
        <InfoBox className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-400">
          <h3 className="text-2xl font-bold text-green-300 mb-4">🗺️ Your Learning Path</h3>
          <div className="space-y-4 text-lg">
            {[
              "Start Here: Understand the problem KMS solves",
              "Key Types: Learn the three types of keys",
              "Encryption Paths: Direct vs. envelope encryption",
              "API Flows: See exactly what happens at each step",
              "CloudTrail: Understand the logging nuances",
              "Practice: Work through real code examples",
              "Exam Ready: Master the exam-specific patterns"
            ].map((item, index) => (
              <div key={item} className="flex items-start gap-3">
                <span className="text-2xl">{index + 1}️⃣</span>
                <div><strong className="text-green-300">{item.split(':')[0]}:</strong> {item.split(':')[1]}</div>
              </div>
            ))}
          </div>
        </InfoBox>
      </div>

      <InfoBox className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-400">
        <h3 className="text-2xl font-bold text-yellow-300 mb-4">💭 The Big Picture: Why Does KMS Exist?</h3>
        <p className="text-lg mb-4 leading-relaxed">
          Imagine storing sensitive customer data. You need to encrypt it, but where do you store the encryption keys? If you store them with the data, an attacker gets both. That's like putting your house key under the doormat!
        </p>
        <p className="text-lg mb-4 leading-relaxed">
          KMS manages your encryption keys in hardware security modules (HSMs). Your keys never leave these HSMs, so even if an attacker compromises your application, they can't decrypt your data without access to KMS.
        </p>
        <p className="text-lg font-semibold leading-relaxed">
          Think of KMS as a highly secure vault. You can ask the vault to encrypt or decrypt data, but you can never take the keys out. That's the genius of it!
        </p>
      </InfoBox>

      <NextButton currentSectionId="intro" onNavigate={onNavigate} />
    </SectionWrapper>
  );
};

export default IntroSection;
