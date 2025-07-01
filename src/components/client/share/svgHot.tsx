"use client"

interface SvgHotProps {
    size?: number;
    className?: string;
}

export const SvgHot: React.FC<SvgHotProps> = ({ 
    size = 32, 
    className = "" 
}) => {
    return (
        <div className={`flex items-center ${className}`}>
            <svg 
                width={size} 
                height={size} 
                viewBox="0 0 32 32" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#FFD700", stopOpacity: 1 }} />
                        <stop offset="50%" style={{ stopColor: "#FFA500", stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: "#FF6B35", stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#4F46E5", stopOpacity: 0.1 }} />
                        <stop offset="100%" style={{ stopColor: "#7C3AED", stopOpacity: 0.2 }} />
                    </linearGradient>
                </defs>

                <circle cx="16" cy="16" r="15" fill="url(#circleGradient)" stroke="#4F46E5" strokeWidth="0.5" opacity="0.3" />

                <path d="M16 4 L19.5 11 L27 11.5 L21.5 17 L23 24 L16 20 L9 24 L10.5 17 L5 11.5 L12.5 11 Z"
                    fill="url(#starGradient)"
                    stroke="#FF6B35"
                    strokeWidth="0.5" />

                <circle cx="24" cy="8" r="1.5" fill="#FFD700" opacity="0.8" />
                <circle cx="8" cy="24" r="1" fill="#FFA500" opacity="0.6" />
                <circle cx="26" cy="24" r="1" fill="#FFD700" opacity="0.7" />
            </svg>
        </div>
    )
}