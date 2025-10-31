# UX Enhancements Documentation

## Overview

This document describes the user experience enhancements implemented in the IronHex website, including loading states, animations, and toast notifications.

## 🎨 Features Implemented

### A. Loading States & Skeletons

**Location:** `client/src/components/Skeleton.tsx`

Skeleton screens provide visual placeholders while content is loading, improving perceived performance.

#### Available Components:

1. **Skeleton** - Base skeleton component
   ```tsx
   <Skeleton variant="text" width="60%" height={20} animation="pulse" />
   ```
   - Variants: `text`, `circular`, `rectangular`, `rounded`
   - Animations: `pulse`, `wave`, `none`

2. **CardSkeleton** - Loading state for card grids
   ```tsx
   <CardSkeleton count={3} />
   ```

3. **TableSkeleton** - Loading state for data tables
   ```tsx
   <TableSkeleton rows={5} columns={4} />
   ```

4. **FormSkeleton** - Loading state for forms
   ```tsx
   <FormSkeleton fields={4} />
   ```

5. **DashboardSkeleton** - Complete admin dashboard loading
   ```tsx
   <DashboardSkeleton />
   ```

6. **PageSkeleton** - Full page loading state
   ```tsx
   <PageSkeleton />
   ```

#### Usage Example:
```tsx
import { Suspense } from 'react';
import { CardSkeleton } from './components/Skeleton';

<Suspense fallback={<CardSkeleton count={3} />}>
  <LazyComponent />
</Suspense>
```

### B. Animations & Micro-interactions

**Locations:**
- `client/tailwind.config.js` - Animation definitions
- `client/src/components/AnimatedCard.tsx` - Animated cards
- `client/src/components/RippleButton.tsx` - Interactive buttons
- `client/src/utils/animations.tsx` - Animation utilities
- `client/src/style.css` - Custom animations

#### 1. Page Transitions

**ScrollProgress** - Visual progress indicator
```tsx
import { ScrollProgress } from './utils/animations';

<ScrollProgress />
```

**PageTransition** - Fade animation on route change
```tsx
import { PageTransition } from './utils/animations';

<PageTransition>
  <YourPage />
</PageTransition>
```

#### 2. Animated Cards

**AnimatedCard** - Cards with entrance animations
```tsx
import { AnimatedCard } from './components/AnimatedCard';

<AnimatedCard 
  hover="lift"           // lift, glow, border, scale, none
  animation="slide-up"   // fade, slide-up, slide-left, scale
  delay={100}           // Animation delay in ms
>
  <CardContent />
</AnimatedCard>
```

**FeatureCard** - Pre-styled feature cards
```tsx
<FeatureCard
  icon="🔒"
  title="Security"
  description="Enterprise-grade security"
  link={{ href: "/security", label: "Learn more" }}
  delay={0}
/>
```

**StatCard** - Animated metric cards
```tsx
<StatCard
  label="Total Users"
  value="1,234"
  change={{ value: 12, trend: 'up' }}
  icon="👥"
  delay={100}
/>
```

#### 3. Button Ripple Effects

**RippleButton** - Material Design ripple effect
```tsx
import { RippleButton } from './components/RippleButton';

<RippleButton
  variant="primary"     // primary, secondary, outline, ghost, danger
  size="lg"            // sm, md, lg
  loading={isLoading}  // Shows spinner
  ripple={true}        // Enable ripple effect
  onClick={handleClick}
>
  Click Me
</RippleButton>
```

#### 4. Scroll Animations

**Scroll Reveal** - Elements animate in on scroll
```tsx
import { useScrollReveal } from './utils/animations';

function MyComponent() {
  useScrollReveal(0.1); // threshold
  
  return (
    <div className="scroll-reveal">
      Content appears on scroll
    </div>
  );
}
```

**Smooth Scroll** - Navigate to elements smoothly
```tsx
import { smoothScrollTo } from './utils/animations';

<button onClick={() => smoothScrollTo('section-id', 80)}>
  Scroll to Section
</button>
```

#### 5. Available Animations

Defined in `tailwind.config.js`:

- **slide-in-right** - Slides in from right
- **slide-in-left** - Slides in from left
- **slide-up** - Slides up from bottom
- **fade-in** - Fades in
- **scale-in** - Scales up
- **shimmer** - Shimmer effect for skeletons
- **ripple** - Ripple effect for buttons
- **bounce** - Bounce animation

Usage:
```tsx
<div className="animate-slide-in-right">Content</div>
<div className="animate-fade-in">Content</div>
```

### C. Toast Notifications

**Locations:**
- `client/src/contexts/ToastContext.tsx` - Toast state management
- `client/src/components/Toast.tsx` - Toast UI components

#### Toast System Features:

✅ Multiple variants (success, error, warning, info)
✅ Auto-dismiss with configurable duration
✅ Manual dismiss option
✅ Action buttons (undo, view, etc.)
✅ Progress indicators for async operations
✅ Slide-in animation
✅ Dark mode support
✅ Stacking support

#### Basic Usage:

```tsx
import { useToast } from './contexts/ToastContext';

function MyComponent() {
  const toast = useToast();

  const handleSuccess = () => {
    toast.success(
      'Success!',
      'Your action was completed successfully.'
    );
  };

  const handleError = () => {
    toast.error(
      'Error occurred',
      'Please try again later.'
    );
  };

  const handleWarning = () => {
    toast.warning(
      'Warning',
      'This action cannot be undone.'
    );
  };

  const handleInfo = () => {
    toast.info(
      'Information',
      'Here is some useful information.'
    );
  };
}
```

#### Toast with Action Button:

```tsx
toast.success(
  'Message sent',
  "We'll get back to you soon.",
  {
    label: 'View',
    onClick: () => console.log('Action clicked')
  }
);
```

#### Advanced: Async Toast with Progress:

```tsx
import { useAsyncToast } from './components/Toast';

function MyComponent() {
  const { showAsyncToast } = useAsyncToast();

  const handleAsyncAction = async () => {
    await showAsyncToast(
      fetchData(), // Your promise
      {
        loading: 'Loading data...',
        success: 'Data loaded successfully!',
        error: 'Failed to load data'
      }
    );
  };
}
```

#### Custom Toast Options:

```tsx
const toastId = toast.showToast({
  type: 'info',
  message: 'Custom toast',
  description: 'With custom options',
  duration: 10000,        // 10 seconds
  dismissible: true,      // Can be dismissed
  progress: 50,           // Progress percentage
  action: {
    label: 'Undo',
    onClick: () => handleUndo()
  }
});

// Update toast
toast.updateToast(toastId, {
  message: 'Updated message',
  progress: 100
});

// Dismiss toast
toast.dismissToast(toastId);
```

## 🎯 Implementation Examples

### Example 1: Enhanced Contact Form

**File:** `client/src/components/ContactForm.tsx`

Features implemented:
- ✅ RippleButton with loading state
- ✅ Toast notifications for all states
- ✅ Field-level validation with error animations
- ✅ Character counter
- ✅ Rate limiting warnings
- ✅ Success/error feedback

```tsx
// Submission with toast
try {
  await submitForm(data);
  toast.success('Message sent!', "We'll respond soon.", {
    label: 'View',
    onClick: () => navigate('/messages')
  });
} catch (error) {
  toast.error('Failed to send', error.message);
}
```

### Example 2: Animated Service Cards

```tsx
import { FeatureCard } from './components/AnimatedCard';

<div className="grid md:grid-cols-3 gap-6">
  <FeatureCard
    icon="🔒"
    title="Cybersecurity"
    description="Protect your digital assets"
    link={{ href: "/cybersecurity", label: "Learn more" }}
    delay={0}
  />
  <FeatureCard
    icon="⚙️"
    title="IoT Security"
    description="Secure connected devices"
    link={{ href: "/iot", label: "Learn more" }}
    delay={100}
  />
  <FeatureCard
    icon="💻"
    title="Software Dev"
    description="Custom solutions"
    link={{ href: "/software", label: "Learn more" }}
    delay={200}
  />
</div>
```

### Example 3: Dashboard with Loading States

```tsx
import { Suspense } from 'react';
import { DashboardSkeleton } from './components/Skeleton';
import { StatCard } from './components/AnimatedCard';

<Suspense fallback={<DashboardSkeleton />}>
  <div className="grid md:grid-cols-4 gap-6">
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
  </div>
</Suspense>
```

## 🎨 Utility Classes

Custom CSS classes available in `style.css`:

### Scroll Effects
- `.scroll-reveal` - Element animates in on scroll
- `.parallax` - Parallax scroll effect

### Visual Effects
- `.glass` - Glass morphism effect
- `.text-gradient` - Gradient text
- `.hover-lift` - Lift on hover
- `.card-glow` - Glow effect on hover
- `.focus-ring` - Accessible focus ring

### Scrollbar
Custom styled scrollbar with dark mode support

## 🚀 Performance Considerations

1. **Lazy Loading**: All animations use CSS transforms for better performance
2. **GPU Acceleration**: Animations use `transform` and `opacity` properties
3. **Intersection Observer**: Scroll reveal uses efficient Intersection Observer API
4. **Debouncing**: Scroll events are optimized
5. **Conditional Animations**: Respect `prefers-reduced-motion` user preference

## ♿ Accessibility

- All interactive elements have focus states
- Toast notifications use proper ARIA roles
- Animations respect `prefers-reduced-motion`
- Keyboard navigation supported
- Screen reader friendly

## 🎬 Animation Best Practices

1. **Keep animations short**: 200-400ms for most transitions
2. **Use appropriate easing**: `ease-out` for entrances, `ease-in` for exits
3. **Don't overdo it**: Not every element needs animation
4. **Provide feedback**: Use animations to confirm user actions
5. **Test performance**: Monitor frame rates on lower-end devices

## 📱 Responsive Behavior

All animations and components are fully responsive:
- Touch-friendly on mobile
- Reduced motion on smaller screens
- Optimized for various viewport sizes

## 🔧 Customization

### Adjust Animation Duration

In `tailwind.config.js`:
```javascript
animation: {
  'fade-in': 'fade-in 0.5s ease-out', // Change duration
}
```

### Custom Toast Duration

```tsx
toast.success('Message', 'Description', { duration: 10000 });
```

### Skeleton Animation Speed

```tsx
<Skeleton animation="wave" /> // Faster than pulse
```

## 📚 Related Files

- `client/src/components/Skeleton.tsx` - Loading skeletons
- `client/src/components/AnimatedCard.tsx` - Animated cards
- `client/src/components/RippleButton.tsx` - Interactive buttons
- `client/src/components/Toast.tsx` - Toast notifications
- `client/src/contexts/ToastContext.tsx` - Toast state
- `client/src/utils/animations.tsx` - Animation utilities
- `client/tailwind.config.js` - Animation definitions
- `client/src/style.css` - Custom CSS animations
- `client/src/App.tsx` - Toast provider and scroll progress
- `client/src/components/ContactForm.tsx` - Implementation example
