/**
 * Demo page showcasing all UX enhancements
 * Use this page to test and demonstrate the features
 */

import { useState } from 'react';
import { useToast } from '../contexts/ToastContext';
import { useAsyncToast } from '../components/Toast';
import { RippleButton } from '../components/RippleButton';
import { AnimatedCard, FeatureCard, StatCard, CardHeader, CardBody, CardFooter } from '../components/AnimatedCard';
import { Skeleton, CardSkeleton, TableSkeleton, FormSkeleton } from '../components/Skeleton';
import { useScrollReveal, smoothScrollTo } from '../utils/animations';

export default function UXDemo() {
  const toast = useToast();
  const { showAsyncToast } = useAsyncToast();
  const [showSkeletons, setShowSkeletons] = useState(false);
  const [loading, setLoading] = useState(false);

  useScrollReveal();

  const mockAsyncOperation = () => {
    return new Promise((resolve) => setTimeout(resolve, 3000));
  };

  const handleAsyncDemo = async () => {
    await showAsyncToast(mockAsyncOperation(), {
      loading: 'Processing your request...',
      success: 'Operation completed successfully!',
      error: 'Operation failed',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4 animate-slide-up">
            UX Enhancements Demo
          </h1>
          <p className="text-xl opacity-90 animate-fade-in">
            Explore loading states, animations, and toast notifications
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* Toast Notifications */}
        <section id="toasts" className="scroll-reveal">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            🎉 Toast Notifications
          </h2>
          <AnimatedCard className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <RippleButton
                variant="primary"
                onClick={() => toast.success('Success!', 'Your action was completed.')}
              >
                Success
              </RippleButton>
              <RippleButton
                variant="danger"
                onClick={() => toast.error('Error!', 'Something went wrong.')}
              >
                Error
              </RippleButton>
              <RippleButton
                variant="secondary"
                onClick={() => toast.warning('Warning!', 'Please be careful.')}
              >
                Warning
              </RippleButton>
              <RippleButton
                variant="outline"
                onClick={() => toast.info('Info', 'Here is some information.')}
              >
                Info
              </RippleButton>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                With Action Button
              </h3>
              <RippleButton
                onClick={() => toast.success('Message sent!', 'Check your inbox.', {
                  label: 'View',
                  onClick: () => console.log('View clicked')
                })}
              >
                Success with Action
              </RippleButton>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                Async Operation with Progress
              </h3>
              <RippleButton onClick={handleAsyncDemo}>
                Show Async Toast
              </RippleButton>
            </div>
          </AnimatedCard>
        </section>

        {/* Buttons */}
        <section id="buttons" className="scroll-reveal">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            🎯 Interactive Buttons
          </h2>
          <AnimatedCard className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Variants</h3>
                <div className="flex flex-wrap gap-3">
                  <RippleButton variant="primary">Primary</RippleButton>
                  <RippleButton variant="secondary">Secondary</RippleButton>
                  <RippleButton variant="outline">Outline</RippleButton>
                  <RippleButton variant="ghost">Ghost</RippleButton>
                  <RippleButton variant="danger">Danger</RippleButton>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Sizes</h3>
                <div className="flex items-center flex-wrap gap-3">
                  <RippleButton size="sm">Small</RippleButton>
                  <RippleButton size="md">Medium</RippleButton>
                  <RippleButton size="lg">Large</RippleButton>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">States</h3>
                <div className="flex flex-wrap gap-3">
                  <RippleButton loading={loading} onClick={() => {
                    setLoading(true);
                    setTimeout(() => setLoading(false), 2000);
                  }}>
                    {loading ? 'Loading...' : 'Click to Load'}
                  </RippleButton>
                  <RippleButton disabled>Disabled</RippleButton>
                  <RippleButton ripple={false}>No Ripple</RippleButton>
                </div>
              </div>
            </div>
          </AnimatedCard>
        </section>

        {/* Cards */}
        <section id="cards" className="scroll-reveal">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            🃏 Animated Cards
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon="🔒"
              title="Security First"
              description="Enterprise-grade security with advanced threat protection."
              link={{ href: "#", label: "Learn more" }}
              delay={0}
            />
            <FeatureCard
              icon="⚡"
              title="Lightning Fast"
              description="Optimized performance for the best user experience."
              link={{ href: "#", label: "Learn more" }}
              delay={100}
            />
            <FeatureCard
              icon="🎨"
              title="Beautiful Design"
              description="Modern UI with smooth animations and transitions."
              link={{ href: "#", label: "Learn more" }}
              delay={200}
            />
          </div>

          <div className="grid md:grid-cols-4 gap-6 mt-8">
            <StatCard
              label="Total Users"
              value="1,234"
              change={{ value: 12, trend: 'up' }}
              icon="👥"
              delay={0}
            />
            <StatCard
              label="Revenue"
              value="$45.2K"
              change={{ value: 8, trend: 'up' }}
              icon="💰"
              delay={100}
            />
            <StatCard
              label="Projects"
              value="156"
              change={{ value: 3, trend: 'down' }}
              icon="📁"
              delay={200}
            />
            <StatCard
              label="Success Rate"
              value="98.5%"
              icon="✅"
              delay={300}
            />
          </div>
        </section>

        {/* Loading States */}
        <section id="skeletons" className="scroll-reveal">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            ⏳ Loading States
          </h2>
          <AnimatedCard className="p-6">
            <div className="mb-4">
              <RippleButton onClick={() => setShowSkeletons(!showSkeletons)}>
                {showSkeletons ? 'Hide' : 'Show'} Skeletons
              </RippleButton>
            </div>

            {showSkeletons && (
              <div className="space-y-8">
                <div>
                  <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Card Skeleton</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <CardSkeleton count={2} />
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Table Skeleton</h3>
                  <TableSkeleton rows={5} columns={4} />
                </div>

                <div>
                  <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Form Skeleton</h3>
                  <FormSkeleton fields={4} />
                </div>

                <div>
                  <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Basic Skeletons</h3>
                  <div className="space-y-3">
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="80%" />
                    <Skeleton variant="rectangular" height={200} />
                    <div className="flex items-center space-x-4">
                      <Skeleton variant="circular" width={60} height={60} />
                      <div className="flex-1 space-y-2">
                        <Skeleton variant="text" width="40%" />
                        <Skeleton variant="text" width="60%" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </AnimatedCard>
        </section>

        {/* Scroll to Top Button */}
        <div className="fixed bottom-8 right-8">
          <RippleButton
            variant="primary"
            size="lg"
            onClick={() => smoothScrollTo('toasts', 80)}
            className="rounded-full w-14 h-14 !p-0"
          >
            ↑
          </RippleButton>
        </div>
      </div>
    </div>
  );
}
