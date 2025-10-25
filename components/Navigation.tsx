
import React from 'react';
import { SECTIONS, SectionId } from '../constants';

interface NavigationProps {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, onNavigate }) => (
  <nav className="mb-12 bg-slate-900/80 backdrop-blur-xl rounded-2xl p-4 md:p-6 sticky top-12 z-40 animate-slide-in-up shadow-2xl border-2 border-purple-500/30">
    <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
      {SECTIONS.map(({ id, title, icon }) => (
        <button
          key={id}
          onClick={() => onNavigate(id)}
          className={`px-4 py-2 md:px-5 md:py-3 rounded-xl font-semibold text-white relative overflow-hidden transition-all duration-300 ease-out transform focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-900 ${
            activeSection === id
              ? 'bg-[linear-gradient(135deg,#8b5cf6_0%,#ec4899_100%)] shadow-[0_4px_20px_rgba(139,92,246,0.5)] scale-105'
              : 'bg-white/10 hover:bg-white/20 hover:scale-105'
          }`}
        >
          {icon} {title}
        </button>
      ))}
    </div>
  </nav>
);

export default Navigation;
