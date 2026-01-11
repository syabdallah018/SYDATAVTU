
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  // Mapping sizes to specific heights
  const iconHeights = {
    sm: 'h-10',
    md: 'h-32',
    lg: 'h-48'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-3xl',
    lg: 'text-5xl'
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-2 ${className}`}>
      <div className="relative group">
        <img 
          src="logo.png" 
          alt="SY DATA Icon" 
          className={`${iconHeights[size]} w-auto object-contain transition-transform duration-500 group-hover:scale-110`}
          loading="eager"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent && !parent.querySelector('.icon-fallback')) {
              const icon = document.createElement('div');
              icon.className = 'icon-fallback w-12 h-12 bg-gradient-to-br from-blue-600 to-green-500 rounded-xl rotate-12 mb-2 shadow-lg';
              parent.prepend(icon);
            }
          }}
        />
      </div>
      
      <h1 className={`${textSizes[size]} font-black tracking-tighter flex items-center`}>
        <span className="text-[#2d4da3]">SY</span>
        <span className="ml-2 bg-gradient-to-r from-[#2d4da3] to-[#7dbb42] bg-clip-text text-transparent">DATA</span>
      </h1>
      
      {size === 'lg' && (
        <p className="text-slate-500 text-sm font-medium tracking-wide -mt-2">
          Affordable, always connected.
        </p>
      )}
    </div>
  );
};

export default Logo;
