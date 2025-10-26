import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export class CaseStudyAnimations {
  private animations: Array<gsap.core.Tween | gsap.core.Timeline | ScrollTrigger> = [];

  /**
   * Create image reveal animations with a mask effect using brand colors.
   * @param imageSelector - The CSS selector for the images to animate.
   */
  createImageReveal(imageSelector: string): void {
    const images = document.querySelectorAll(imageSelector);
    
    images.forEach(image => {
      const parent = image.parentElement;
      if (!parent) return;

      // Ensure parent has necessary styling
      parent.style.position = 'relative';
      parent.style.overflow = 'hidden';

      // Create mask overlay using brand colors
      const mask = document.createElement('div');
      mask.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, #00F5A0, #00D9E0, transparent);
        z-index: 1;
        transform: translateX(-100%);
      `;
      parent.appendChild(mask);

      // Create GSAP timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: image,
          start: "top 80%",
        }
      });

      tl.fromTo(image, 
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
      )
      .to(mask, {
        x: "100%",
        duration: 1.2,
        ease: "power2.inOut",
        onComplete: () => {
          // Clean up mask element after animation
          mask.remove();
        }
      }, "-=0.8");

      this.animations.push(tl);
    });
  }

  /**
   * Destroy all animations created by this instance.
   */
  destroy(): void {
    this.animations.forEach(animation => {
      if (animation instanceof ScrollTrigger) {
        animation.kill();
      } else if ('scrollTrigger' in animation && animation.scrollTrigger) {
        animation.scrollTrigger.kill();
        (animation as gsap.core.Timeline).kill();
      } else {
        (animation as gsap.core.Tween).kill();
      }
    });
    this.animations = [];
  }
}
