import { useEffect, useState } from "react";

export const useViewportHeight = () => {
    const [viewportHeight, setViewportHeight] = useState(() => {
        // Handle SSR
        if (typeof window === 'undefined') return 0;
        return window.innerHeight;
    });
    
    useEffect(() => {
        if (typeof window === 'undefined') return;
        
        const updateHeight = () => {
            // Sử dụng setTimeout để đảm bảo browser đã render xong
            setTimeout(() => {
                const height = window.visualViewport?.height || window.innerHeight;
                setViewportHeight(height);
            }, 100);
        };
        
        // Set initial height
        updateHeight();
        
        window.addEventListener('resize', updateHeight);
        window.addEventListener('orientationchange', updateHeight);
        
        // Handle iOS Safari và Chrome mobile
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', updateHeight);
            window.visualViewport.addEventListener('scroll', updateHeight);
        }
        
        // Handle keyboard show/hide trên mobile
        const handleFocusIn = () => setTimeout(updateHeight, 300);
        const handleFocusOut = () => setTimeout(updateHeight, 300);
        
        window.addEventListener('focusin', handleFocusIn);
        window.addEventListener('focusout', handleFocusOut);
        
        return () => {
            window.removeEventListener('resize', updateHeight);
            window.removeEventListener('orientationchange', updateHeight);
            window.removeEventListener('focusin', handleFocusIn);
            window.removeEventListener('focusout', handleFocusOut);
            
            if (window.visualViewport) {
                window.visualViewport.removeEventListener('resize', updateHeight);
                window.visualViewport.removeEventListener('scroll', updateHeight);
            }
        };
    }, []);
    
    return viewportHeight;
};