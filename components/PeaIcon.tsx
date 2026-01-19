import React from 'react';
import { TraitColor, TraitShape } from '../types';

interface PeaIconProps {
  color: TraitColor;
  shape: TraitShape;
  size?: number;
  className?: string;
}

const PeaIcon: React.FC<PeaIconProps> = ({ color, shape, size = 48, className = '' }) => {
  const fillColor = color === TraitColor.Yellow ? '#FACC15' : '#4ADE80'; // yellow-400 : green-400
  const strokeColor = color === TraitColor.Yellow ? '#EAB308' : '#16A34A'; // yellow-600 : green-600
  
  // SVG Paths
  const roundPath = "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z";
  
  // A slightly irregular path to represent 'wrinkled'
  const wrinkledPath = "M12 2.5c-1.5 0-2.5.5-3.5.5s-2-.5-3-.5c-2.5 0-3.5 2-3.5 3.5 0 1-.5 2-.5 3s.5 2 .5 3c0 2.5 2 4 3.5 4 1 0 2-.5 3-.5s2 .5 3 .5c2 0 3.5-1.5 4-3.5 0-1 .5-2 .5-3s-.5-2-.5-3c0-2-2-3.5-3.5-3.5z";
  // Scaling wrinkled path to fit viewbox 0 0 24 24 roughly centered requires a bit of transform or a better path. 
  // Let's use a simpler approach for wrinkled: a wavy circle generator or a specific path.
  
  // Better wrinkled path (approximate)
  const wrinkledPathImproved = "M12,2.5c-1.4,0-2.5,0.8-3.4,0.5C7.5,2.7,6.8,1.5,5.7,2.1c-1.1,0.6-0.8,2-1.5,2.9C3.3,5.9,1.8,6.1,1.8,7.3 c0,1.2,1.3,1.9,1.3,3.2c0,1.2-1.1,2.1-0.9,3.3c0.2,1.2,1.7,1.5,2.3,2.5c0.6,1,0.1,2.4,1,3.2c0.9,0.8,2.1,0.2,3.3,0.4 c1.2,0.2,1.8,1.6,3.1,1.6c1.2,0,1.9-1.4,3.1-1.6c1.2-0.2,2.4,0.4,3.3-0.4c0.9-0.8,0.4-2.2,1-3.2c0.6-1,2.1-1.3,2.3-2.5 c0.2-1.2-0.9-2.1-0.9-3.3c0-1.2,1.3-1.9,1.3-3.2c0-1.2-1.5-1.4-2.4-2.3c-0.7-0.9-0.4-2.3-1.5-2.9C17.2,1.5,16.5,2.7,15.4,3 C14.5,3.3,13.4,2.5,12,2.5z";


  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block drop-shadow-md transition-all duration-300 ${className}`}
    >
      <path 
        d={shape === TraitShape.Round ? roundPath : wrinkledPathImproved} 
        fill={fillColor} 
        stroke={strokeColor} 
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Glossy shine reflection to make it look 3D */}
      <path
        d={shape === TraitShape.Round 
            ? "M7 7c0-1.5 1.5-3 3.5-3 1.5 0 2.5 1 2.5 1s-1.5-0.5-3 0.5C8.5 6.5 7 7 7 7z"
            : "M7 8c0-1.5 1-2.5 3-2.5 1.5 0 2 1 2 1s-1.5-0.5-3 0.5C8 7.5 7 8 7 8z"
        }
        fill="white"
        fillOpacity="0.4"
      />
    </svg>
  );
};

export default PeaIcon;
