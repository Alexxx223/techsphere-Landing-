# GSAP Animation System for Case Studies

This comprehensive animation system provides smooth, engaging animations for case study pages using GSAP (GreenSock Animation Platform) and ScrollTrigger.

## Overview

The animation system consists of several specialized classes that work together to create a cohesive animation experience:

- **ScrollTriggerManager**: Handles scroll-based animations
- **InteractiveAnimations**: Manages hover, click, and interactive feedback
- **TimelineAnimations**: Creates coordinated animation sequences
- **CaseStudyAnimations**: Case study specific animations
- **CaseStudyAnimationManager**: Unified manager for all animation types

## Quick Start

### Using the Animation Wrapper Component

The easiest way to add animations to a case study page:

```tsx
import AnimatedCaseStudyWrapper from '@/components/case-study/AnimatedCaseStudyWrapper';

function CaseStudyPage() {
  return (
    <AnimatedCaseStudyWrapper>
      <div className="case-study-hero">
        <h1>Project Title</h1>
        <p>Project description</p>
      </div>
      
      <section className="case-study-section">
        <h2>Process</h2>
        <div className="process-timeline">
          <div className="timeline-line"></div>
          <div className="process-step">
            <div className="step-indicator">1</div>
            <h3>Research</h3>
            <p>Description</p>
          </div>
        </div>
      </section>
      
      <section className="metrics-section">
        <div className="metric-card" data-counter="150" data-unit="%">0</div>
        <div className="metric-card" data-counter="50" data-unit="k">0</div>
      </section>
    </AnimatedCaseStudyWrapper>
  );
}
```

### Using the Custom Hook

For more control over animations:

```tsx
import { useCaseStudyAnimations } from '@/hooks/useCaseStudyAnimations';

function CaseStudyPage() {
  const {
    initializeHeroAnimation,
    initializeScrollProgress,
    refresh
  } = useCaseStudyAnimations();

  useEffect(() => {
    // Initialize specific animations
    initializeHeroAnimation('.hero-section');
    initializeScrollProgress('.progress-bar');
  }, []);

  return (
    <div className="case-study-page">
      {/* Your content */}
    </div>
  );
}
```

## Animation Types

### 1. ScrollTrigger Animations

Animations triggered by scroll position:

- **Fade In**: Elements fade in as they enter viewport
- **Slide In**: Content slides in from various directions
- **Scale In**: Elements scale up with bounce effect
- **Stagger**: Multiple elements animate in sequence
- **Parallax**: Background elements move at different speeds

### 2. Interactive Animations

User interaction feedback:

- **Button Hover**: Scale and shadow effects
- **Card Hover**: Lift and highlight effects
- **Image Hover**: Scale and brightness effects
- **Click Feedback**: Ripple and scale effects
- **Loading States**: Spinner and pulse animations

### 3. Timeline Animations

Coordinated animation sequences:

- **Process Timeline**: Sequential step revelation
- **Metric Counters**: Animated number counting
- **Image Galleries**: Coordinated image transitions
- **Text Reveal**: Word-by-word text animation
- **Section Entrance**: Coordinated section animations

## CSS Classes for Animation Targets

Add these classes to your HTML elements to enable automatic animations:

### Basic Animation Classes
```css
.case-study-page          /* Main container */
.case-study-hero          /* Hero section */
.case-study-section       /* Content sections */
.content-section          /* Text content areas */
```

### Interactive Elements
```css
.btn, .button             /* Buttons */
.card, .metric-card       /* Cards */
.hover-image              /* Images with hover effects */
.nav-item                 /* Navigation items */
```

### Timeline Elements
```css
.process-timeline         /* Timeline container */
.timeline-line            /* Timeline line */
.process-step             /* Individual steps */
.step-indicator           /* Step markers */
.timeline-node            /* Timeline nodes */
```

### Metrics and Counters
```css
.metrics-section          /* Metrics container */
.metric-card              /* Individual metrics */
.results-card             /* Results cards */
```

### Data Attributes for Counters
```html
<div data-counter="150" data-unit="%" data-decimals="0">0</div>
<div data-progress="75">Progress Bar</div>
```

## Advanced Usage

### Manual Animation Control

```tsx
import { useAnimations } from '@/hooks/useAnimations';

function CustomComponent() {
  const {
    createFadeIn,
    createStaggerAnimation,
    createProcessTimeline
  } = useAnimations();

  useEffect(() => {
    // Create custom animations
    createFadeIn('.custom-element');
    createStaggerAnimation(['.item1', '.item2', '.item3'], 'scaleUp');
    createProcessTimeline('.my-timeline');
  }, []);
}
```

### Animation Configuration

Customize animation behavior:

```tsx
// Timeline animation with custom options
createProcessTimelineSequence('.timeline', {
  staggerDelay: 0.3,
  lineAnimationDuration: 3,
  stepAnimationDuration: 1
});

// Metric counters with custom timing
createMetricCounterSequence('.metrics', {
  duration: 2.5,
  staggerDelay: 0.4,
  easing: "power3.out"
});

// Image gallery with different transition
createImageGallerySequence('.gallery', {
  transitionType: 'flip',
  duration: 1,
  staggerDelay: 0.15
});
```

## Performance Considerations

The animation system includes several performance optimizations:

1. **Hardware Acceleration**: Uses `transform3d` for GPU acceleration
2. **Reduced Motion**: Respects `prefers-reduced-motion` setting
3. **Efficient Triggers**: Uses intersection observers for scroll detection
4. **Memory Management**: Proper cleanup of animations and event listeners
5. **Device Optimization**: Different animation settings for mobile/desktop

## Browser Support

- Modern browsers with GSAP support
- Graceful fallbacks for older browsers
- Mobile-optimized animations
- Touch-friendly interactions

## Troubleshooting

### Common Issues

1. **Animations not triggering**: Ensure elements have the correct CSS classes
2. **Performance issues**: Check for too many simultaneous animations
3. **Mobile problems**: Verify touch events are properly handled
4. **Memory leaks**: Ensure proper cleanup in useEffect

### Debug Mode

Enable GSAP markers for debugging:

```tsx
ScrollTrigger.create({
  trigger: '.element',
  markers: true, // Shows trigger points
  start: 'top 80%',
  end: 'bottom 20%'
});
```

## Examples

See the case study components for complete implementation examples:

- `CaseStudyHeader.tsx` - Hero animations
- `ProcessBreakdown.tsx` - Timeline animations  
- `ResultsMetrics.tsx` - Counter animations
- `AnimatedCaseStudyWrapper.tsx` - Complete page setup

## API Reference

### CaseStudyAnimationManager

Main animation manager class:

```tsx
const manager = new CaseStudyAnimationManager();

// Initialize all animations
manager.initializeAll('.case-study-page');

// Create specific animations
manager.createHeroAnimation('.hero');
manager.createNavigationAnimation('.nav');
manager.createScrollProgress('.progress');

// Cleanup
manager.destroy();
```

### Animation Hooks

- `useAnimations()` - General animation utilities
- `useCaseStudyAnimations()` - Case study specific animations

Both hooks provide methods for creating and controlling animations with automatic cleanup.