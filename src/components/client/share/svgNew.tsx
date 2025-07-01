import React from 'react';

interface NewCourseIconProps {
  size?: number;
  className?: string;
}

const SvgNew: React.FC<NewCourseIconProps> = ({ 
  size = 32, 
  className = "" 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="badgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:"#10B981", stopOpacity:1}} />
          <stop offset="50%" style={{stopColor:"#059669", stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:"#047857", stopOpacity:1}} />
        </linearGradient>
        <linearGradient id="sparkleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:"#FBBF24", stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:"#F59E0B", stopOpacity:1}} />
        </linearGradient>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:"#ECFDF5", stopOpacity:0.3}} />
          <stop offset="100%" style={{stopColor:"#D1FAE5", stopOpacity:0.5}} />
        </linearGradient>
      </defs>
      
      {/* Background circle */}
      <circle 
        cx="16" 
        cy="16" 
        r="15" 
        fill="url(#bgGradient)" 
        stroke="#10B981" 
        strokeWidth="0.5" 
        opacity="0.4"
      />
      
      {/* Main badge */}
      <rect 
        x="6" 
        y="10" 
        width="20" 
        height="12" 
        rx="6" 
        ry="6" 
        fill="url(#badgeGradient)" 
        stroke="#047857" 
        strokeWidth="0.5"
      />
      
      {/* NEW text */}
      <text 
        x="16" 
        y="17.5" 
        fontFamily="Arial, sans-serif" 
        fontSize="7" 
        fontWeight="bold" 
        textAnchor="middle" 
        fill="white"
      >
        NEW
      </text>
      
      {/* Sparkle effects */}
      <g fill="url(#sparkleGradient)">
        {/* Top left sparkle */}
        <path 
          d="M8 6 L9 8 L11 7 L9 9 L8 11 L7 9 L5 7 L7 8 Z" 
          opacity="0.8"
        />
        
        {/* Top right sparkle */}
        <path 
          d="M24 8 L25 9 L26 8 L25 10 L24 11 L23 10 L22 8 L23 9 Z" 
          opacity="0.7"
        />
        
        {/* Bottom right sparkle */}
        <path 
          d="M25 22 L26 23 L27 22 L26 24 L25 25 L24 24 L23 22 L24 23 Z" 
          opacity="0.6"
        />
        
        {/* Small dots */}
        <circle cx="7" cy="24" r="1" opacity="0.5"/>
        <circle cx="28" cy="14" r="0.8" opacity="0.6"/>
        <circle cx="4" cy="16" r="0.6" opacity="0.4"/>
      </g>
    </svg>
  );
};

export default SvgNew;