import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectMetric } from '@/types/caseStudy';
import { useResponsive, useReducedMotion } from '@/hooks/useResponsive';
import { getDeviceAnimationConfig, shouldEnableAnimation, createOptimizedTimeline } from '@/utils/deviceAnimationConfig';
import ShareableHighlight from '@/components/social/ShareableHighlight';
import { getCaseStudyById } from '@/data/caseStudies';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface ResultsMetricsProps {
  metrics: ProjectMetric[];
  caseStudyId?: string;
}

const ResultsMetrics = ({ metrics, caseStudyId }: ResultsMetricsProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const metricsRef = useRef<(HTMLDivElement | null)[]>([]);
  const chartRef = useRef<HTMLDivElement>(null);
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({});
  const [isVisible, setIsVisible] = useState(false);
  
  // Responsive hooks
  const { isMobile } = useResponsive();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;

    if (!section || !title) return;

    // Animate section title
    gsap.fromTo(title,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animate metrics cards
    metricsRef.current.forEach((metricEl, index) => {
      if (!metricEl) return;

      gsap.fromTo(metricEl,
        { 
          opacity: 0, 
          y: 50,
          scale: 0.9,
          rotationY: 10
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: metricEl,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            onEnter: () => {
              if (!isVisible) {
                setIsVisible(true);
                animateCounters();
              }
            }
          }
        }
      );
    });

    // Animate chart if present
    if (chartRef.current) {
      gsap.fromTo(chartRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: chartRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // Add subtle parallax effect
    gsap.to(section, {
      yPercent: -8,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section || 
            trigger.trigger === title || 
            metricsRef.current.includes(trigger.trigger as HTMLDivElement) ||
            trigger.trigger === chartRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  const animateCounters = () => {
    const deviceConfig = getDeviceAnimationConfig();
    
    // Skip counter animations if reduced motion is preferred
    if (prefersReducedMotion || !shouldEnableAnimation('complex', deviceConfig)) {
      // Set final values immediately
      const finalValues: { [key: string]: number } = {};
      metrics.forEach((metric) => {
        const targetValue = typeof metric.value === 'number' ? metric.value : parseInt(metric.value.toString());
        finalValues[metric.label] = targetValue;
      });
      setAnimatedValues(finalValues);
      return;
    }
    
    metrics.forEach((metric) => {
      if (metric.animationType === 'counter') {
        const targetValue = typeof metric.value === 'number' ? metric.value : parseInt(metric.value.toString());
        const startValue = metric.previousValue || 0;
        
        // Shorter duration on mobile devices
        const duration = isMobile ? deviceConfig.duration * 1.5 : deviceConfig.duration * 2.5;
        
        gsap.fromTo(
          { value: startValue },
          {
            value: targetValue,
            duration: duration,
            ease: deviceConfig.ease,
            onUpdate: function() {
              setAnimatedValues(prev => ({
                ...prev,
                [metric.label]: Math.round(this.targets()[0].value)
              }));
            }
          }
        );
      } else if (metric.animationType === 'progress') {
        const targetValue = typeof metric.value === 'number' ? metric.value : parseInt(metric.value.toString());
        
        // Shorter duration on mobile devices
        const duration = isMobile ? deviceConfig.duration * 2 : deviceConfig.duration * 3;
        
        gsap.fromTo(
          { value: 0 },
          {
            value: targetValue,
            duration: duration,
            ease: deviceConfig.ease,
            onUpdate: function() {
              setAnimatedValues(prev => ({
                ...prev,
                [metric.label]: Math.round(this.targets()[0].value)
              }));
            }
          }
        );
      }
    });
  };

  const getMetricIcon = (animationType: string) => {
    const icons = {
      counter: '📊',
      progress: '📈',
      fade: '✨'
    };
    return icons[animationType as keyof typeof icons] || '📊';
  };

  const getMetricColor = (index: number) => {
    const colors = [
      'from-[#01a99c] to-[#52c1c9]',
      'from-[#52c1c9] to-[#01a99c]',
      'from-[#064e53] to-[#01a99c]',
      'from-[#01a99c] to-[#52c1c9]',
      'from-[#52c1c9] to-[#064e53]',
      'from-[#01a99c] to-[#52c1c9]'
    ];
    return colors[index % colors.length];
  };

  const formatValue = (metric: ProjectMetric) => {
    const animatedValue = animatedValues[metric.label];
    const displayValue = animatedValue !== undefined ? animatedValue : metric.value;
    
    if (metric.unit) {
      return `${displayValue}${metric.unit}`;
    }
    
    // Format large numbers with commas
    if (typeof displayValue === 'number' && displayValue >= 1000) {
      return displayValue.toLocaleString();
    }
    
    return displayValue.toString();
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 bg-gradient-to-b from-gray-900 to-black"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          >
            Results & Impact
          </h2>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {metrics.map((metric, index) => (
              <div
                key={metric.label}
                ref={el => metricsRef.current[index] = el}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group"
              >
                {/* Metric Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${getMetricColor(index)} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl">{getMetricIcon(metric.animationType)}</span>
                  </div>
                  {metric.improvement && (
                    <div className="text-right">
                      <span className="text-green-400 text-sm font-medium bg-green-400/10 px-2 py-1 rounded-full">
                        {metric.improvement}
                      </span>
                    </div>
                  )}
                </div>

                {/* Metric Value */}
                <div className="mb-4">
                  <div className={`text-4xl font-bold bg-gradient-to-r ${getMetricColor(index)} bg-clip-text text-transparent mb-2`}>
                    {formatValue(metric)}
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {metric.label}
                  </h3>
                </div>

                {/* Progress Bar for progress type metrics */}
                {metric.animationType === 'progress' && (
                  <div className="mb-4">
                    <div className="w-full bg-gray-700/50 rounded-full h-2">
                      <div 
                        className={`h-2 bg-gradient-to-r ${getMetricColor(index)} rounded-full transition-all duration-1000 ease-out`}
                        style={{ 
                          width: `${Math.min((animatedValues[metric.label] || 0), 100)}%` 
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Before/After Comparison */}
                {metric.previousValue !== undefined && (
                  <div className="mb-4 p-3 bg-gray-700/30 rounded-lg">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Previous:</span>
                      <span className="text-gray-300">{metric.previousValue}{metric.unit || ''}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mt-1">
                      <span className="text-gray-400">Current:</span>
                      <span className="text-white font-medium">{metric.value}{metric.unit || ''}</span>
                    </div>
                  </div>
                )}

                {/* Metric Description */}
                <p className="text-gray-300 text-sm leading-relaxed">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>

          {/* Data Visualization Chart */}
          <div 
            ref={chartRef}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              Performance Overview
            </h3>
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Chart Visualization */}
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Key Metrics Comparison</h4>
                  {metrics.slice(0, 4).map((metric, index) => {
                    const value = typeof metric.value === 'number' ? metric.value : parseInt(metric.value.toString());
                    const maxValue = Math.max(...metrics.map(m => typeof m.value === 'number' ? m.value : parseInt(m.value.toString())));
                    const percentage = (value / maxValue) * 100;
                    
                    return (
                      <div key={metric.label} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300 text-sm">{metric.label}</span>
                          <span className="text-white font-medium">{formatValue(metric)}</span>
                        </div>
                        <div className="w-full bg-gray-700/50 rounded-full h-3">
                          <div 
                            className={`h-3 bg-gradient-to-r ${getMetricColor(index)} rounded-full transition-all duration-2000 ease-out`}
                            style={{ 
                              width: isVisible ? `${percentage}%` : '0%',
                              transitionDelay: `${index * 200}ms`
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Success Indicators */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white mb-4">Success Indicators</h4>
                  <div className="space-y-4">
                    {metrics.map((metric, index) => (
                      <div 
                        key={metric.label}
                        className="flex items-center space-x-4 p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-all duration-300"
                      >
                        <div className={`w-8 h-8 bg-gradient-to-r ${getMetricColor(index)} rounded-full flex items-center justify-center flex-shrink-0`}>
                          <span className="text-white text-sm">✓</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-medium">{metric.label}</div>
                          <div className="text-gray-400 text-sm">{metric.description}</div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold bg-gradient-to-r ${getMetricColor(index)} bg-clip-text text-transparent`}>
                            {formatValue(metric)}
                          </div>
                          {metric.improvement && (
                            <div className="text-green-400 text-xs">
                              {metric.improvement}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Impact Summary */}
          <div className="bg-gradient-to-r from-[#01a99c]/10 to-[#52c1c9]/10 backdrop-blur-sm rounded-2xl p-8 border border-[#01a99c]/20">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#01a99c]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Project Impact Summary
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
                The project delivered exceptional results across all key performance indicators, 
                demonstrating significant improvements in user engagement, business metrics, and 
                overall project success. These outcomes validate the strategic approach and 
                technical implementation decisions made throughout the development process.
              </p>
              
              {/* Key Achievements */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#01a99c] mb-2">
                    {metrics.length}
                  </div>
                  <div className="text-gray-300">Key Metrics Improved</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#52c1c9] mb-2">
                    {metrics.filter(m => m.improvement).length}
                  </div>
                  <div className="text-gray-300">Measurable Improvements</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#01a99c] mb-2">
                    100%
                  </div>
                  <div className="text-gray-300">Objectives Achieved</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Shareable Highlights */}
          {caseStudyId && (
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">
                Share These Results
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {metrics.slice(0, 3).map((metric, index) => {
                  const caseStudy = getCaseStudyById(caseStudyId);
                  if (!caseStudy) return null;
                  
                  return (
                    <ShareableHighlight
                      key={metric.label}
                      caseStudy={caseStudy}
                      type="metric"
                      content={{
                        text: metric.description,
                        metric: {
                          label: metric.label,
                          value: metric.value,
                          unit: metric.unit
                        }
                      }}
                      className="transform hover:scale-105 transition-transform duration-300"
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ResultsMetrics;