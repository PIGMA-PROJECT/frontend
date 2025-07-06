
import React from 'react';
import { BookOpen } from 'lucide-react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  withText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', withText = true }) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return {
          container: 'h-6 w-6',
          icon: 'h-3 w-3',
          text: 'text-lg',
        };
      case 'large':
        return {
          container: 'h-12 w-12',
          icon: 'h-7 w-7',
          text: 'text-3xl',
        };
      default:
        return {
          container: 'h-8 w-8',
          icon: 'h-5 w-5',
          text: 'text-2xl',
        };
    }
  };

  const sizeClasses = getSizeClasses();

  return (
    <div className="flex items-center">
      <div className={`${sizeClasses.container} bg-primary rounded-md flex items-center justify-center text-white mr-2`}>
        <BookOpen className={sizeClasses.icon} />
      </div>
      {withText && (
        <div className={`${sizeClasses.text} font-bold text-navy`}>
          ISI<span className="text-primary">Memo</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
