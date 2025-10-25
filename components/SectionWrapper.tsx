
import React from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children }) => (
  <section className="mb-12 animate-fade-in">
    <div className="bg-[linear-gradient(135deg,rgba(30,41,59,0.8)_0%,rgba(51,65,85,0.8)_100%)] backdrop-blur-2xl border-2 border-purple-500/30 rounded-2xl p-6 md:p-8 transition-all duration-400 hover:border-purple-500/60 hover:shadow-[0_20px_60px_rgba(139,92,246,0.4)] hover:-translate-y-1">
      {children}
    </div>
  </section>
);

export default SectionWrapper;
