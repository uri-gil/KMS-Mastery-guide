
import React from 'react';

const Header: React.FC = () => (
  <header className="text-center mb-12 animate-fade-in">
    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-float">
      🔐 AWS KMS Mastery Guide
    </h1>
    <p className="text-xl md:text-2xl gradient-text mb-6 font-semibold">
      Your Complete Journey from Concepts to Certification
    </p>
    <div className="inline-block bg-gradient-to-r from-green-500/20 to-blue-500/20 border-2 border-green-400 rounded-xl px-6 py-4 animate-pulse-glow">
      <p className="text-green-300 font-semibold text-base md:text-lg">
        💚 Don't worry - we'll build your understanding step by step!
      </p>
      <p className="text-green-200 text-sm mt-2">
        Take your time, revisit sections as needed, and celebrate each small victory
      </p>
    </div>
  </header>
);

export default Header;
