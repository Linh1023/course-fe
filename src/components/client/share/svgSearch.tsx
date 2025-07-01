"use client"

interface SvgSearchProps {
    size?: number;
    className?: string;
}

export const SvgSearch: React.FC<SvgSearchProps> = ({ 
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
                    <linearGradient id="searchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#3B82F6", stopOpacity: 1 }} />
                        <stop offset="50%" style={{ stopColor: "#1D4ED8", stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: "#1E40AF", stopOpacity: 1 }} />
                    </linearGradient>
                    <linearGradient id="bgSearchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#DBEAFE", stopOpacity: 0.3 }} />
                        <stop offset="100%" style={{ stopColor: "#BFDBFE", stopOpacity: 0.5 }} />
                    </linearGradient>
                    <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#F8FAFC", stopOpacity: 0.8 }} />
                        <stop offset="100%" style={{ stopColor: "#E2E8F0", stopOpacity: 0.6 }} />
                    </linearGradient>
                </defs>

                {/* Background circle */}
                <circle cx="16" cy="16" r="15" fill="url(#bgSearchGradient)" stroke="#3B82F6" strokeWidth="0.5" opacity="0.4" />

                {/* Search glass/lens */}
                <circle 
                    cx="14" 
                    cy="14" 
                    r="7" 
                    fill="none" 
                    stroke="url(#searchGradient)" 
                    strokeWidth="2.5"
                />

                {/* Glass reflection */}
                <circle 
                    cx="14" 
                    cy="14" 
                    r="7" 
                    fill="url(#glassGradient)" 
                    opacity="0.3"
                />

                {/* Search handle */}
                <line 
                    x1="19.5" 
                    y1="19.5" 
                    x2="25" 
                    y2="25" 
                    stroke="url(#searchGradient)" 
                    strokeWidth="2.5" 
                    strokeLinecap="round"
                />

                {/* Inner reflection highlight */}
                <ellipse 
                    cx="12" 
                    cy="12" 
                    rx="2.5" 
                    ry="3" 
                    fill="#FFFFFF" 
                    opacity="0.6"
                />

                {/* Search sparkles */}
                <g fill="#3B82F6" opacity="0.6">
                    <circle cx="6" cy="8" r="0.8" />
                    <circle cx="26" cy="10" r="1" />
                    <circle cx="8" cy="26" r="0.6" />
                    <circle cx="25" cy="6" r="0.7" />
                </g>
            </svg>
        </div>
    )
}