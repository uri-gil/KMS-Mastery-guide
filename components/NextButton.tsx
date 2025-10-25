
import React from 'react';
import { SECTIONS, SectionId } from '../constants';

interface NextButtonProps {
    currentSectionId: SectionId;
    onNavigate: (id: SectionId) => void;
}

const NextButton: React.FC<NextButtonProps> = ({ currentSectionId, onNavigate }) => {
    const currentIndex = SECTIONS.findIndex(s => s.id === currentSectionId);
    const nextSection = SECTIONS[currentIndex + 1];

    if (!nextSection) return null;

    return (
        <div className="mt-8 text-center">
            <button 
                onClick={() => onNavigate(nextSection.id)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 md:px-10 md:py-5 rounded-xl text-lg md:text-xl font-bold transition-all transform hover:scale-110 shadow-2xl animate-pulse-glow focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-800"
            >
                Next: {nextSection.title} →
            </button>
        </div>
    );
};

export default NextButton;
