
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
      <div className={`${sizeClasses[size]} bg-gradient-to-r from-trading-gold to-yellow-400 rounded-xl flex items-center justify-center relative overflow-hidden group shadow-lg`}>
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-20 group-hover:opacity-40 transition-opacity"></div>
        <div className="relative z-10 flex items-center justify-center">
          <TrendingUp className={`${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-6 h-6' : 'w-8 h-8'} text-trading-dark`} />
          <Zap className={`${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'} text-trading-dark absolute -top-1 -right-1`} />
        </div>
      </div>
      {showText && (
        <span className={`${textSizeClasses[size]} font-bold gradient-text`}>
          TradeX
        </span>
      )}
    </div>
  );
};
