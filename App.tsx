import React, { useState, useEffect } from 'react';
import { SECTIONS, SectionId } from './constants';
import ProgressBar from './components/ProgressBar';
import Header from './components/Header';
import Navigation from './components/Navigation';
import IntroSection from './components/sections/IntroSection';
import KeyTypesSection from './components/sections/KeyTypesSection';
import EncryptionPathsSection from './components/sections/EncryptionPathsSection';
import ApiFlowsSection from './components/sections/ApiFlowsSection';
import CloudtrailSection from './components/sections/CloudtrailSection';
import CodeExamplesSection from './components/sections/CodeExamplesSection';
import ExamTipsSection from './components/sections/ExamTipsSection';
import AiSandboxSection from './components/sections/AiSandboxSection';

const SectionComponentMap: Record<SectionId, React.FC<{ onNavigate: (id: SectionId) => void }>> = {
  intro: IntroSection,
  'key-types': KeyTypesSection,
  'encryption-paths': EncryptionPathsSection,
  'api-flows': ApiFlowsSection,
  cloudtrail: CloudtrailSection,
  'code-examples': CodeExamplesSection,
  'exam-tips': ExamTipsSection,
  'ai-sandbox': AiSandboxSection,
};

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('intro');

  const handleNavigate = (id: SectionId) => {
    setActiveSection(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = SECTIONS.findIndex(s => s.id === activeSection);
      if (e.key === 'ArrowRight' && currentIndex < SECTIONS.length - 1) {
        handleNavigate(SECTIONS[currentIndex + 1].id);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        handleNavigate(SECTIONS[currentIndex - 1].id);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeSection]);

  const currentSectionIndex = SECTIONS.findIndex(s => s.id === activeSection);
  const ActiveComponent = SectionComponentMap[activeSection];

  return (
    <>
      <ProgressBar currentSectionIndex={currentSectionIndex} totalSections={SECTIONS.length} />
      <div className="container mx-auto px-4 py-8 pt-16 max-w-7xl">
        <Header />
        <Navigation activeSection={activeSection} onNavigate={handleNavigate} />
        
        <main>
          <ActiveComponent key={activeSection} onNavigate={handleNavigate} />
        </main>
      </div>
    </>
  );
};

export default App;