
import React from 'react';

interface InfoBoxProps {
  children: React.ReactNode;
  className?: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({ children, className = '' }) => (
  <div className={`border-2 rounded-xl p-6 transition-transform duration-300 ease-out hover:scale-[1.02] ${className}`}>
    {children}
  </div>
);

export default InfoBox;
