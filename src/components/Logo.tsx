
import { TrendingUp, Zap } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo = ({ size = 'md', showText = true }: LogoProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div className="flex items-center space-x-3">
      <div className={`${sizeClasses[size]} bg-gradient-gold rounded-xl flex items-center justify-center relative overflow-hidden group`}>
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-20 group-hover:opacity-40 transition-opacity"></div>
        <TrendingUp className={`${size === 'sm' ? 'w-5 h-5' : size === 'md' ? 'w-7 h-7' : 'w-9 h-9'} text-trading-dark relative z-10`} />
        <Zap className={`${size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5'} text-trading-dark absolute top-1 right-1 relative z-10`} />
      </div>
      {showText && (
        <span className={`${textSizeClasses[size]} font-bold gradient-text`}>
          TradeAI Pro
        </span>
      )}
    </div>
  );
};
