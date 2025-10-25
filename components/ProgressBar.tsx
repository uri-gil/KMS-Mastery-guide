
import React from 'react';

interface ProgressBarProps {
  currentSectionIndex: number;
  totalSections: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentSectionIndex, totalSections }) => {
  const progress = ((currentSectionIndex + 1) / totalSections) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md shadow-lg">
      <div 
        className="h-1 bg-[linear-gradient(90deg,#8b5cf6_0%,#ec4899_50%,#f97316_100%)] bg-[size:200%_100%] transition-all duration-500 ease-out animate-[gradient-shift_3s_ease_infinite]"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
