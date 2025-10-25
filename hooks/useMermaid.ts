
import { useEffect } from 'react';

declare global {
    interface Window {
        mermaid: any;
    }
}

export const useMermaid = (dependencies: any[] = []) => {
    useEffect(() => {
        if (window.mermaid) {
            window.mermaid.initialize({ 
                startOnLoad: false,
                theme: 'dark',
                themeVariables: {
                    primaryColor: '#8b5cf6',
                    primaryTextColor: '#fff',
                    primaryBorderColor: '#a855f7',
                    lineColor: '#ec4899',
                    secondaryColor: '#10b981',
                    tertiaryColor: '#3b82f6',
                    background: '#1e293b',
                    mainBkg: '#1e293b',
                    secondBkg: '#334155',
                    textColor: '#f1f5f9',
                    fontSize: '16px'
                }
            });
            // Using mermaid.run() is better for dynamic content
            // It finds all elements with class="mermaid" and renders them.
            window.mermaid.run();
        }
    }, dependencies);
};
