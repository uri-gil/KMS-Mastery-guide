export type SectionId = 'intro' | 'key-types' | 'encryption-paths' | 'api-flows' | 'cloudtrail' | 'code-examples' | 'exam-tips' | 'ai-sandbox';

interface Section {
  id: SectionId;
  title: string;
  icon: string;
}

export const SECTIONS: Section[] = [
  { id: 'intro', title: 'Start Here', icon: '📚' },
  { id: 'key-types', title: 'Key Types', icon: '🔑' },
  { id: 'encryption-paths', title: 'Encryption Paths', icon: '🔀' },
  { id: 'api-flows', title: 'API Flows', icon: '🔄' },
  { id: 'cloudtrail', title: 'CloudTrail Logging', icon: '📊' },
  { id: 'code-examples', title: 'Code Examples', icon: '💻' },
  { id: 'exam-tips', title: 'Exam Tips', icon: '🎯' },
  { id: 'ai-sandbox', title: 'AI Sandbox', icon: '🤖' },
];