import { gsap } from 'gsap';

export class InteractiveAnimations {
  private hoverAnimations: Map<Element, gsap.core.Timeline> = new Map();
  private clickAnimations: Map<Element, gsap.core.Timeline> = new Map();

  /**
   * Initialize all interactive animations for a container
   */
  initializeInteractiveAnimations(containerSelector: string = 'body'): void {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    // Initialize hover effects
    this.initializeHoverEffects(container);
    
    // Initialize click feedback
    this.initializeClickFeedback(container);
    
    // Initialize loading states
    this.initializeLoadingStates(container);
    
    // Initialize navigation transitions
    this.initializeNavigationTransitions(container);
  }

  /**
   * Initialize hover effects for interactive elements
   */
  private initializeHoverEffects(container: Element): void {
    // Button hover effects
    const buttons = container.querySelectorAll('button, .btn, .button');
    buttons.forEach(button => {
      this.createButtonHover(button as HTMLElement);
    });

    // Card hover effects
    const cards = container.querySelectorAll('.card, .metric-card, .process-card, .case-study-card');
    cards.forEach(card => {
      this.createCardHover(card as HTMLElement);
    });

    // Image hover effects
    const images = container.querySelectorAll('.hover-image, .gallery-image, img[data-hover="true"]');
    images.forEach(image => {
      this.createImageHover(image as HTMLElement);
    });

    // Link hover effects
    const links = container.querySelectorAll('a, .link');
    links.forEach(link => {
      this.createLinkHover(link as HTMLElement);
    });

    // Navigation item hover effects
    const navItems = container.querySelectorAll('.nav-item, .navigation-item');
    navItems.forEach(navItem => {
      this.createNavItemHover(navItem as HTMLElement);
    });
  }

  /**
   * Create button hover animation
   */
  createButtonHover(button: HTMLElement): void {
    const tl = gsap.timeline({ paused: true });
    
    tl.to(button, {
      scale: 1.05,
      y: -2,
      boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
      duration: 0.3,
      ease: "power2.out"
    });

    button.addEventListener('mouseenter', () => {
      tl.play();
    });

    button.addEventListener('mouseleave', () => {
      tl.reverse();
    });

    this.hoverAnimations.set(button, tl);
  }

  /**
   * Create card hover animation
   */
  createCardHover(card: HTMLElement): void {
    const tl = gsap.timeline({ paused: true });
    
    tl.to(card, {
      y: -8,
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
      duration: 0.4,
      ease: "power2.out"
    });

    // Animate card content
    const cardContent = card.querySelector('.card-content, .content');
    if (cardContent) {
      tl.to(cardContent, {
        y: -4,
        duration: 0.4,
        ease: "power2.out"
      }, 0);
    }

    card.addEventListener('mouseenter', () => {
      tl.play();
    });

    card.addEventListener('mouseleave', () => {
      tl.reverse();
    });

    this.hoverAnimations.set(card, tl);
  }

  /**
   * Create image hover animation
   */
  createImageHover(image: HTMLElement): void {
    const tl = gsap.timeline({ paused: true });
    
    tl.to(image, {
      scale: 1.1,
      filter: "brightness(1.1) contrast(1.1)",
      duration: 0.5,
      ease: "power2.out"
    });

    // Add overlay effect if container exists
    const overlay = image.querySelector('.overlay, .image-overlay');
    if (overlay) {
      tl.to(overlay, {
        opacity: 0.8,
        duration: 0.5,
        ease: "power2.out"
      }, 0);
    }

    image.addEventListener('mouseenter', () => {
      tl.play();
    });

    image.addEventListener('mouseleave', () => {
      tl.reverse();
    });

    this.hoverAnimations.set(image, tl);
  }

  /**
   * Create link hover animation
   */
  createLinkHover(link: HTMLElement): void {
    const tl = gsap.timeline({ paused: true });
    
    // Create underline effect
    const underline = document.createElement('div');
    underline.style.cssText = `
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: currentColor;
      transition: width 0.3s ease;
    `;
    
    if (link.style.position !== 'absolute' && link.style.position !== 'relative') {
      link.style.position = 'relative';
    }
    link.appendChild(underline);

    tl.to(underline, {
      width: "100%",
      duration: 0.3,
      ease: "power2.out"
    })
    .to(link, {
      color: "#3b82f6", // Blue color
      duration: 0.3,
      ease: "power2.out"
    }, 0);

    link.addEventListener('mouseenter', () => {
      tl.play();
    });

    link.addEventListener('mouseleave', () => {
      tl.reverse();
    });

    this.hoverAnimations.set(link, tl);
  }

  /**
   * Create navigation item hover animation
   */
  createNavItemHover(navItem: HTMLElement): void {
    const tl = gsap.timeline({ paused: true });
    
    tl.to(navItem, {
      y: -3,
      backgroundColor: "rgba(255,255,255,0.1)",
      duration: 0.3,
      ease: "power2.out"
    });

    navItem.addEventListener('mouseenter', () => {
      tl.play();
    });

    navItem.addEventListener('mouseleave', () => {
      tl.reverse();
    });

    this.hoverAnimations.set(navItem, tl);
  }

  /**
   * Initialize click feedback animations
   */
  private initializeClickFeedback(container: Element): void {
    const clickableElements = container.querySelectorAll('button, .btn, .clickable, a, .card');
    
    clickableElements.forEach(element => {
      this.createClickFeedback(element as HTMLElement);
    });
  }

  /**
   * Create click feedback animation
   */
  createClickFeedback(element: HTMLElement): void {
    element.addEventListener('click', (e) => {
      // Create ripple effect
      const ripple = document.createElement('div');
      const rect = element.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255,255,255,0.3);
        border-radius: 50%;
        pointer-events: none;
        transform: scale(0);
        z-index: 1000;
      `;
      
      if (element.style.position !== 'absolute' && element.style.position !== 'relative') {
        element.style.position = 'relative';
      }
      element.style.overflow = 'hidden';
      element.appendChild(ripple);

      // Animate ripple
      const tl = gsap.timeline();
      tl.to(ripple, {
        scale: 1,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          ripple.remove();
        }
      });

      // Scale feedback
      gsap.to(element, {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      });
    });
  }

  /**
   * Initialize loading state animations
   */
  private initializeLoadingStates(container: Element): void {
    const loadingElements = container.querySelectorAll('.loading, [data-loading="true"]');
    
    loadingElements.forEach(element => {
      this.createLoadingAnimation(element as HTMLElement);
    });
  }

  /**
   * Create loading animation
   */
  createLoadingAnimation(element: HTMLElement): void {
    // Create loading spinner
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.style.cssText = `
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top: 2px solid #3b82f6;
      border-radius: 50%;
      margin: 0 auto;
    `;
    
    element.appendChild(spinner);

    // Animate spinner
    gsap.to(spinner, {
      rotation: 360,
      duration: 1,
      ease: "none",
      repeat: -1
    });

    // Pulse effect for the container
    gsap.to(element, {
      opacity: 0.7,
      duration: 1,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });
  }

  /**
   * Initialize navigation transition animations
   */
  private initializeNavigationTransitions(container: Element): void {
    const navLinks = container.querySelectorAll('.nav-link, .navigation-link');
    
    navLinks.forEach(link => {
      this.createNavigationTransition(link as HTMLElement);
    });
  }

  /**
   * Create smooth navigation transition
   */
  createNavigationTransition(navLink: HTMLElement): void {
    navLink.addEventListener('click', (e) => {
      const href = navLink.getAttribute('href');
      
      // Only animate internal links
      if (href && href.startsWith('/') && !href.startsWith('//')) {
        e.preventDefault();
        
        // Page transition animation
        const tl = gsap.timeline();
        
        tl.to('body', {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            // Navigate to new page
            window.location.href = href;
          }
        });
      }
    });
  }

  /**
   * Create page entrance animation
   */
  createPageEntrance(): void {
    const tl = gsap.timeline();
    
    // Fade in body
    tl.fromTo('body', 
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" }
    );

    // Animate main content
    const mainContent = document.querySelector('main, .main-content');
    if (mainContent) {
      tl.fromTo(mainContent,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      );
    }
  }

  /**
   * Create modal/dialog animations
   */
  createModalAnimation(modal: HTMLElement, isOpening: boolean = true): gsap.core.Timeline {
    const tl = gsap.timeline();
    
    if (isOpening) {
      // Opening animation
      gsap.set(modal, { display: 'flex' });
      
      tl.fromTo(modal, 
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      )
      .fromTo(modal.querySelector('.modal-content, .dialog-content'), 
        { scale: 0.8, y: 50 },
        { scale: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" },
        "-=0.2"
      );
    } else {
      // Closing animation
      tl.to(modal.querySelector('.modal-content, .dialog-content'), 
        { scale: 0.8, y: 50, duration: 0.3, ease: "power2.in" }
      )
      .to(modal, 
        { opacity: 0, duration: 0.2, ease: "power2.in" },
        "-=0.1"
      )
      .set(modal, { display: 'none' });
    }
    
    return tl;
  }

  /**
   * Create tooltip animation
   */
  createTooltipAnimation(tooltip: HTMLElement, isShowing: boolean = true): gsap.core.Timeline {
    const tl = gsap.timeline();
    
    if (isShowing) {
      tl.fromTo(tooltip,
        { opacity: 0, scale: 0.8, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" }
      );
    } else {
      tl.to(tooltip,
        { opacity: 0, scale: 0.8, y: 10, duration: 0.2, ease: "power2.in" }
      );
    }
    
    return tl;
  }

  /**
   * Destroy all interactive animations
   */
  destroy(): void {
    this.hoverAnimations.forEach(animation => animation.kill());
    this.clickAnimations.forEach(animation => animation.kill());
    this.hoverAnimations.clear();
    this.clickAnimations.clear();
  }
}