import { ReactNode, HTMLAttributes } from 'react';

interface AnimatedCardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: 'lift' | 'glow' | 'border' | 'scale' | 'none';
  animation?: 'fade' | 'slide-up' | 'slide-left' | 'scale' | 'none';
  delay?: number;
  children: ReactNode;
}

export function AnimatedCard({
  hover = 'lift',
  animation = 'fade',
  delay = 0,
  children,
  className = '',
  ...props
}: AnimatedCardProps) {
  const hoverClasses = {
    lift: 'hover:shadow-2xl hover:-translate-y-2',
    glow: 'hover:shadow-2xl hover:shadow-primary/20',
    border: 'hover:border-primary hover:shadow-lg',
    scale: 'hover:scale-105',
    none: '',
  };

  const animationClasses = {
    fade: 'animate-fade-in',
    'slide-up': 'animate-slide-up',
    'slide-left': 'animate-slide-in-left',
    scale: 'animate-scale-in',
    none: '',
  };

  return (
    <div
      className={`
        bg-white dark:bg-gray-800
        rounded-lg shadow-lg
        border border-gray-100 dark:border-gray-700
        transition-all duration-300 ease-out
        ${hoverClasses[hover]}
        ${animationClasses[animation]}
        ${className}
      `}
      style={{ animationDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function CardHeader({ icon, title, subtitle, action }: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between p-6 border-b border-gray-100 dark:border-gray-700">
      <div className="flex items-center space-x-4 flex-1">
        {icon && (
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl">
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {action && <div className="ml-4">{action}</div>}
    </div>
  );
}

export function CardBody({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`px-6 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 rounded-b-lg ${className}`}>
      {children}
    </div>
  );
}

/**
 * Feature card with icon, title, description
 */
interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  link?: {
    href: string;
    label: string;
  };
  delay?: number;
}

export function FeatureCard({ icon, title, description, link, delay = 0 }: FeatureCardProps) {
  return (
    <AnimatedCard
      hover="lift"
      animation="slide-up"
      delay={delay}
      className="p-6 group cursor-pointer"
    >
      <div className="w-14 h-14 rounded-full bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        {description}
      </p>
      {link && (
        <a
          href={link.href}
          className="inline-flex items-center mt-4 text-primary font-semibold hover:underline group-hover:translate-x-2 transition-transform duration-300"
        >
          {link.label}
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      )}
    </AnimatedCard>
  );
}

/**
 * Stat card for displaying metrics
 */
interface StatCardProps {
  label: string;
  value: string | number;
  change?: {
    value: number;
    trend: 'up' | 'down';
  };
  icon?: ReactNode;
  delay?: number;
}

export function StatCard({ label, value, change, icon, delay = 0 }: StatCardProps) {
  return (
    <AnimatedCard
      hover="glow"
      animation="scale"
      delay={delay}
      className="p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
            {label}
          </p>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          {change && (
            <div className={`mt-2 flex items-center text-sm ${
              change.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              <svg
                className={`w-4 h-4 mr-1 ${change.trend === 'down' ? 'rotate-180' : ''}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {Math.abs(change.value)}%
            </div>
          )}
        </div>
        {icon && (
          <div className="text-4xl text-primary/20">
            {icon}
          </div>
        )}
      </div>
    </AnimatedCard>
  );
}
