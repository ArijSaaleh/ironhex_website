/**
 * Skeleton component for loading states
 * Provides animated placeholders while content is loading
 */

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export function Skeleton({
  className = '',
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
}: SkeletonProps) {
  const baseClasses = 'bg-gray-300 dark:bg-gray-700';
  
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-lg',
  };
  
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700',
    none: '',
  };
  
  const style = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1em' : '100%'),
  };
  
  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
    />
  );
}

/**
 * Card skeleton for loading card-based content
 */
export function CardSkeleton({ count = 1 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-4 mb-4">
            <Skeleton variant="circular" width={56} height={56} />
            <div className="flex-1 space-y-2">
              <Skeleton variant="text" width="60%" height={20} />
              <Skeleton variant="text" width="40%" height={16} />
            </div>
          </div>
          <div className="space-y-3">
            <Skeleton variant="text" width="100%" height={16} />
            <Skeleton variant="text" width="90%" height={16} />
            <Skeleton variant="text" width="80%" height={16} />
          </div>
        </div>
      ))}
    </>
  );
}

/**
 * Table skeleton for loading tabular data
 */
export function TableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="grid gap-4 p-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} variant="text" height={16} />
          ))}
        </div>
      </div>
      {/* Rows */}
      <div className="bg-white dark:bg-gray-900">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="grid gap-4 p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
          >
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton key={colIndex} variant="text" height={16} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Form skeleton for loading forms
 */
export function FormSkeleton({ fields = 4 }: { fields?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton variant="text" width="30%" height={16} />
          <Skeleton variant="rounded" height={48} />
        </div>
      ))}
      <Skeleton variant="rounded" width={120} height={44} />
    </div>
  );
}

/**
 * Dashboard skeleton for loading admin dashboards
 */
export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-100 dark:border-gray-700">
            <Skeleton variant="text" width="50%" height={16} className="mb-4" />
            <Skeleton variant="text" width="70%" height={32} className="mb-2" />
            <Skeleton variant="text" width="40%" height={14} />
          </div>
        ))}
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-100 dark:border-gray-700">
            <Skeleton variant="text" width="40%" height={24} className="mb-4" />
            <Skeleton variant="rounded" height={300} />
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-100 dark:border-gray-700">
            <Skeleton variant="text" width="50%" height={24} className="mb-4" />
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <Skeleton variant="circular" width={40} height={40} />
                  <div className="flex-1 space-y-2">
                    <Skeleton variant="text" width="70%" height={14} />
                    <Skeleton variant="text" width="50%" height={12} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Page skeleton for loading full pages
 */
export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* Hero section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
          <Skeleton variant="text" width="60%" height={40} className="mx-auto" />
          <Skeleton variant="text" width="80%" height={20} className="mx-auto" />
          <Skeleton variant="text" width="70%" height={20} className="mx-auto" />
        </div>
      </div>
      
      {/* Content sections */}
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-6">
            <Skeleton variant="text" width="40%" height={32} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CardSkeleton count={2} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
