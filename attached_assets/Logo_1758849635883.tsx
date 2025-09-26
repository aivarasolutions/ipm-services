import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

export default function Logo({ size = 'medium', showText = true }: LogoProps) {
  const sizeClasses = {
    small: 'h-8 w-8',
    medium: 'h-10 w-10',
    large: 'h-12 w-12'
  };

  const textSizeClasses = {
    small: 'text-lg',
    medium: 'text-xl',
    large: 'text-2xl'
  };

  return (
    <Link href="/" className="logo-container">
      <div className="flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="IPM International Property Management"
          width={size === 'small' ? 32 : size === 'medium' ? 40 : 48}
          height={size === 'small' ? 32 : size === 'medium' ? 40 : 48}
          className={`${sizeClasses[size]} object-contain`}
          priority
        />
        {showText && (
          <div className="logo-text">
            <span className={`font-bold text-gray-800 ${textSizeClasses[size]}`}>
              IPM
            </span>
            {size !== 'small' && (
              <span className="block text-xs text-gray-600 leading-tight">
                International Property Management
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}

