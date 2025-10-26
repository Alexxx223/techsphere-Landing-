/**
 * Sample Case Study Data
 * Comprehensive case study data for portfolio projects with detailed breakdowns
 */

import { CaseStudy, ProcessStep, ProjectMetric, Technology, ProjectImage, ClientTestimonial, ChallengesSolutions } from '../types/caseStudy';

// Sample case studies based on existing portfolio projects
export const caseStudies: CaseStudy[] = [
  {
    id: '1',
    title: 'Unfiltered Podcast Brand Identity',
    subtitle: 'Creating an authentic voice in the crowded podcast landscape',
    category: 'Branding',
    date: '2024-03-15',
    duration: '6 weeks',
    client: 'Unfiltered Media',
    heroImage: '/unfiltered.webp',
    
    overview: {
      challenge: 'The podcast industry is oversaturated with generic branding that fails to communicate authenticity. Unfiltered needed a brand identity that would cut through the noise and establish genuine connection with their audience.',
      solution: 'We developed a bold, minimalist brand identity that embraces imperfection and authenticity. The design system uses raw typography, honest imagery, and a color palette that feels both professional and approachable.',
      result: 'The new brand identity resulted in 300% increase in brand recognition, improved listener engagement, and successful differentiation in the competitive podcast market.',
      objectives: [
        'Create distinctive visual identity in crowded market',
        'Communicate authenticity and trustworthiness',
        'Ensure scalability across digital platforms',
        'Build strong emotional connection with audience'
      ]
    },  
  
    process: [
      {
        id: 'research',
        title: 'Market Research & Discovery',
        description: 'Conducted comprehensive analysis of the podcast landscape, competitor research, and audience interviews to understand positioning opportunities.',
        duration: '1 week',
        images: ['/unfiltered.webp'],
        details: [
          'Analyzed 50+ podcast brands in similar categories',
          'Conducted 15 audience interviews',
          'Identified key differentiation opportunities',
          'Developed brand positioning strategy'
        ],
        order: 1,
        icon: ''
      },
      {
        id: 'concept',
        title: 'Concept Development',
        description: 'Developed multiple brand concepts exploring different approaches to authenticity, from raw and edgy to clean and honest.',
        duration: '2 weeks',
        images: ['/unfiltered.webp'],
        details: [
          'Created 5 distinct brand concepts',
          'Explored typography and color directions',
          'Developed mood boards and style tiles',
          'Presented concepts to stakeholders'
        ],
        order: 2,
        icon: ''
      },
      {
        id: 'design',
        title: 'Brand Identity Design',
        description: 'Refined the chosen concept into a complete brand identity system including logo, typography, colors, and visual guidelines.',
        duration: '2 weeks',
        images: ['/unfiltered.webp'],
        details: [
          'Designed primary and secondary logos',
          'Developed comprehensive color palette',
          'Selected and customized typography',
          'Created icon system and visual elements'
        ],
        order: 3,
        icon: ''
      },
      {
        id: 'guidelines',
        title: 'Brand Guidelines & Implementation',
        description: 'Created comprehensive brand guidelines and implemented the identity across all touchpoints and platforms.',
        duration: '1 week',
        images: ['/unfiltered.webp'],
        details: [
          'Developed 40-page brand guidelines document',
          'Created templates for social media and marketing',
          'Designed podcast artwork and promotional materials',
          'Provided implementation support and training'
        ],
        order: 4,
        icon: ''
      }
    ],
    
    challengesSolutions: {
      challenge: {
        title: 'Standing Out in a Saturated Market',
        description: 'The podcast industry has exploded with over 2 million active podcasts, making it incredibly difficult for new shows to gain visibility and establish a memorable brand presence.',
        image: '/unfiltered.webp',
        painPoints: [
          'Generic branding that looks like every other podcast',
          'Difficulty communicating authenticity through visual design',
          'Need for scalability across multiple digital platforms',
          'Limited budget for extensive brand development'
        ]
      },
      solution: {
        title: 'Authentic Brand Identity System',
        description: 'We created a distinctive brand identity that embraces imperfection and authenticity, using bold typography and honest visual language to create genuine connection.',
        image: '/unfiltered.webp',
        approach: [
          'Embraced "unfiltered" concept through raw, honest design',
          'Used bold typography to create strong visual hierarchy',
          'Developed flexible system for various platform requirements',
          'Created cost-effective templates for ongoing content creation'
        ],
        keyFeatures: [
          'Distinctive wordmark with custom typography',
          'Flexible color system for different content types',
          'Scalable icon system for social media',
          'Comprehensive brand guidelines for consistency'
        ]
      }
    },    
 
   technologies: [
      { name: 'Adobe Illustrator', category: 'design', description: 'Vector logo and icon design' },
      { name: 'Adobe Photoshop', category: 'design', description: 'Image editing and mockups' },
      { name: 'Adobe InDesign', category: 'design', description: 'Brand guidelines layout' },
      { name: 'Figma', category: 'design', description: 'Digital asset creation and collaboration' }
    ],
    
    metrics: [
      {
        label: 'Brand Recognition Increase',
        value: 300,
        unit: '%',
        description: 'Increase in brand recognition within target audience',
        animationType: 'counter',
        previousValue: 0,
        improvement: '300% improvement'
      },
      {
        label: 'Listener Engagement',
        value: 85,
        unit: '%',
        description: 'Improvement in listener engagement metrics',
        animationType: 'progress',
        previousValue: 45,
        improvement: '40% increase'
      },
      {
        label: 'Social Media Followers',
        value: 12500,
        description: 'New followers gained within 3 months of rebrand',
        animationType: 'counter',
        previousValue: 2800,
        improvement: '346% growth'
      },
      {
        label: 'Download Rate',
        value: 95,
        unit: '%',
        description: 'Increase in podcast download rate',
        animationType: 'progress',
        previousValue: 60,
        improvement: '35% improvement'
      }
    ],
    
    testimonial: {
      quote: "The new brand identity perfectly captures what we're about - being real, honest, and unfiltered. Our audience immediately connected with the new look, and we've seen incredible growth since the rebrand.",
      author: 'Sarah Johnson',
      position: 'Host & Producer',
      company: 'Unfiltered Media',
      rating: 5
    },
    
    gallery: [
      { url: '/unfiltered.webp', alt: 'Unfiltered podcast brand identity', type: 'hero' },
      { url: '/unfiltered.webp', alt: 'Logo variations', type: 'process' },
      { url: '/unfiltered.webp', alt: 'Brand guidelines', type: 'result' },
      { url: '/unfiltered.webp', alt: 'Social media templates', type: 'gallery' }
    ],
    
    nextProject: '4',
    previousProject: '8',
    
    seoTitle: 'Unfiltered Podcast Brand Identity Case Study | Portfolio',
    seoDescription: 'Discover how we created an authentic brand identity for Unfiltered podcast that increased recognition by 300% and improved listener engagement.',
    ogImage: '/unfiltered.webp',
    tags: ['branding', 'podcast', 'identity design', 'typography', 'authentic branding'],
    
    animationConfig: {
      enableParallax: true,
      enableScrollTrigger: true,
      reducedMotion: false
    }
  },  
 
 {
    id: '4',
    title: 'Spectrum Corporate Identity',
    subtitle: 'Transforming corporate communication through strategic design',
    category: 'Corporate Design',
    date: '2024-02-10',
    duration: '5 weeks',
    client: 'Spectrum Corporation',
    heroImage: '/Spectrum company profile Mock up final.webp',
    
    overview: {
      challenge: 'Spectrum Corporation needed to modernize their corporate identity and create professional materials that would enhance their credibility with enterprise clients and partners.',
      solution: 'We developed a comprehensive corporate identity system including company profile, brochures, and digital assets that communicate professionalism while remaining engaging and accessible.',
      result: 'The new corporate materials improved client presentation success rate by 65% and enhanced overall corporate image, leading to increased business development opportunities.',
      objectives: [
        'Modernize outdated corporate identity',
        'Improve client presentation materials',
        'Create consistent brand experience',
        'Enhance credibility with enterprise clients'
      ]
    },
    
    process: [
      {
        id: 'audit',
        title: 'Corporate Brand Audit',
        description: 'Comprehensive review of existing corporate materials, competitor analysis, and stakeholder interviews to identify improvement opportunities.',
        duration: '1 week',
        images: ['/Spectrum company profile Mock up final.webp'],
        details: [
          'Audited all existing corporate materials',
          'Analyzed competitor positioning and design',
          'Interviewed key stakeholders and clients',
          'Identified brand perception gaps'
        ],
        order: 1,
        icon: ''
      },
      {
        id: 'strategy',
        title: 'Brand Strategy Development',
        description: 'Developed comprehensive brand strategy focusing on corporate positioning, messaging hierarchy, and visual direction.',
        duration: '1 week',
        images: ['/Spectrum company profile Mock up final.webp'],
        details: [
          'Defined brand positioning and messaging',
          'Created corporate communication strategy',
          'Developed visual identity direction',
          'Established brand voice and tone guidelines'
        ],
        order: 2,
        icon: ''
      },
      {
        id: 'design-system',
        title: 'Corporate Design System',
        description: 'Created comprehensive design system including typography, colors, layouts, and visual elements for all corporate communications.',
        duration: '2 weeks',
        images: ['/Spectrum company profile Mock up final.webp'],
        details: [
          'Designed corporate color palette and typography',
          'Created layout templates and grid systems',
          'Developed icon library and visual elements',
          'Established photography and imagery guidelines'
        ],
        order: 3,
        icon: ''
      },
      {
        id: 'implementation',
        title: 'Material Creation & Implementation',
        description: 'Applied the design system to create company profile, brochures, presentations, and digital assets.',
        duration: '1 week',
        images: ['/Spectrum company profile Mock up final.webp', '/Spectrum Tri Fold Brochure MockUp cover.webp'],
        details: [
          'Designed comprehensive company profile',
          'Created tri-fold brochure and marketing materials',
          'Developed presentation templates',
          'Produced digital assets and social media templates'
        ],
        order: 4,
        icon: ''
      }
    ],    

    challengesSolutions: {
      challenge: {
        title: 'Outdated Corporate Image',
        description: 'Spectrum\'s existing corporate materials were outdated and failed to communicate their expertise and professionalism to enterprise clients.',
        image: '/Spectrum company profile Mock up final.webp',
        painPoints: [
          'Inconsistent branding across materials',
          'Poor visual hierarchy and information organization',
          'Lack of professional presentation materials',
          'Difficulty communicating complex services clearly'
        ]
      },
      solution: {
        title: 'Comprehensive Corporate Identity System',
        description: 'We created a modern, professional corporate identity system that effectively communicates Spectrum\'s expertise and builds trust with enterprise clients.',
        image: '/Spectrum company profile Mock up final.webp',
        approach: [
          'Developed consistent visual identity across all materials',
          'Created clear information hierarchy and organization',
          'Designed professional presentation templates',
          'Simplified complex service explanations through design'
        ],
        keyFeatures: [
          'Professional company profile with clear service breakdown',
          'Elegant tri-fold brochure for client meetings',
          'Comprehensive presentation template system',
          'Consistent brand application guidelines'
        ]
      }
    },
    
    technologies: [
      { name: 'Adobe InDesign', category: 'design', description: 'Layout design and print production' },
      { name: 'Adobe Illustrator', category: 'design', description: 'Logo and icon design' },
      { name: 'Adobe Photoshop', category: 'design', description: 'Image editing and mockups' },
      { name: 'Adobe Acrobat', category: 'tools', description: 'PDF optimization and interactive features' }
    ],
    
    metrics: [
      {
        label: 'Presentation Success Rate',
        value: 65,
        unit: '%',
        description: 'Improvement in client presentation success rate',
        animationType: 'progress',
        previousValue: 40,
        improvement: '25% increase'
      },
      {
        label: 'Lead Generation',
        value: 180,
        unit: '%',
        description: 'Increase in qualified leads from marketing materials',
        animationType: 'counter',
        previousValue: 0,
        improvement: '180% improvement'
      },
      {
        label: 'Client Satisfaction',
        value: 92,
        unit: '%',
        description: 'Client satisfaction with new corporate materials',
        animationType: 'progress',
        previousValue: 68,
        improvement: '24% increase'
      },
      {
        label: 'Brand Consistency Score',
        value: 95,
        unit: '%',
        description: 'Consistency across all corporate touchpoints',
        animationType: 'progress',
        previousValue: 45,
        improvement: '50% improvement'
      }
    ],
    
    testimonial: {
      quote: "The new corporate materials have completely transformed how we present ourselves to clients. We've seen a significant improvement in our success rate and overall professional image.",
      author: 'Michael Chen',
      position: 'CEO',
      company: 'Spectrum Corporation',
      rating: 5
    },
    
    gallery: [
      { url: '/Spectrum company profile Mock up final.webp', alt: 'Spectrum company profile design', type: 'hero' },
      { url: '/Spectrum Tri Fold Brochure MockUp cover.webp', alt: 'Tri-fold brochure design', type: 'process' },
      { url: '/Spectrum company profile Mock up final.webp', alt: 'Corporate identity system', type: 'result' }
    ],
    
    nextProject: '8',
    previousProject: '1',
    
    seoTitle: 'Spectrum Corporate Identity Case Study | Professional Design Portfolio',
    seoDescription: 'Learn how we transformed Spectrum Corporation\'s corporate identity, improving presentation success rate by 65% through strategic design.',
    ogImage: '/Spectrum company profile Mock up final.webp',
    tags: ['corporate design', 'brand identity', 'business materials', 'professional design'],
    
    animationConfig: {
      enableParallax: true,
      enableScrollTrigger: true,
      reducedMotion: false
    }
  },  
  
{
    id: '8',
    title: 'Genuine Brand Development',
    subtitle: 'Building trust through authentic brand storytelling',
    category: 'Branding',
    date: '2024-01-20',
    duration: '6 weeks',
    client: 'Genuine Products',
    heroImage: '/genuine.jpeg',
    
    overview: {
      challenge: 'Genuine Products needed to establish a trustworthy brand presence in a market filled with questionable claims and inauthentic messaging.',
      solution: 'We developed a comprehensive brand identity that emphasizes transparency, quality, and genuine customer care through honest design and authentic storytelling.',
      result: 'The brand development resulted in increased customer trust, successful market differentiation, and consistent brand implementation across all channels.',
      objectives: [
        'Establish trustworthy brand presence',
        'Differentiate from competitors through authenticity',
        'Create emotional connection with customers',
        'Build comprehensive brand system for growth'
      ]
    },
    
    process: [
      {
        id: 'discovery',
        title: 'Brand Discovery & Values Definition',
        description: 'Deep dive into company values, customer needs, and market positioning to establish authentic brand foundation.',
        duration: '1.5 weeks',
        images: ['/genuine.jpeg'],
        details: [
          'Conducted stakeholder workshops and interviews',
          'Analyzed customer feedback and market research',
          'Defined core brand values and personality',
          'Established brand positioning strategy'
        ],
        order: 1,
        icon: ''
      },
      {
        id: 'identity',
        title: 'Visual Identity Creation',
        description: 'Developed visual identity system that communicates trust, quality, and authenticity through thoughtful design choices.',
        duration: '2 weeks',
        images: ['/genuine.jpeg', '/genuine2.jpeg'],
        details: [
          'Designed logo with emphasis on trust and reliability',
          'Created color palette that conveys quality and warmth',
          'Selected typography that feels approachable yet professional',
          'Developed supporting visual elements and patterns'
        ],
        order: 2,
        icon: ''
      },
      {
        id: 'messaging',
        title: 'Brand Messaging & Voice',
        description: 'Crafted brand messaging strategy and voice guidelines that emphasize honesty, transparency, and customer care.',
        duration: '1 week',
        images: ['/genuine.jpeg'],
        details: [
          'Developed brand voice and tone guidelines',
          'Created key messaging pillars and taglines',
          'Established communication principles',
          'Wrote brand story and value propositions'
        ],
        order: 3,
        icon: ''
      },
      {
        id: 'system',
        title: 'Brand System & Guidelines',
        description: 'Created comprehensive brand system with detailed guidelines for consistent implementation across all touchpoints.',
        duration: '1.5 weeks',
        images: ['/genuine2.jpeg'],
        details: [
          'Developed comprehensive brand guidelines document',
          'Created templates for marketing and communications',
          'Designed packaging and product presentation guidelines',
          'Established digital brand implementation standards'
        ],
        order: 4,
        icon: ''
      }
    ],  
  
    challengesSolutions: {
      challenge: {
        title: 'Building Trust in a Skeptical Market',
        description: 'The market was saturated with products making exaggerated claims, making consumers skeptical of new brands and their promises.',
        image: '/genuine.jpeg',
        painPoints: [
          'Consumer skepticism due to market oversaturation',
          'Difficulty differentiating from competitors',
          'Need to communicate quality without appearing boastful',
          'Challenge of building trust with new customers'
        ]
      },
      solution: {
        title: 'Authentic Brand Foundation',
        description: 'We built a brand foundation based on genuine values, transparent communication, and consistent quality delivery.',
        image: '/genuine2.jpeg',
        approach: [
          'Emphasized transparency in all communications',
          'Used honest, straightforward design language',
          'Focused on customer testimonials and real results',
          'Created consistent quality standards across all touchpoints'
        ],
        keyFeatures: [
          'Trust-focused logo and visual identity',
          'Transparent communication guidelines',
          'Customer-centric messaging strategy',
          'Quality-first brand implementation standards'
        ]
      }
    },
    
    technologies: [
      { name: 'Adobe Creative Suite', category: 'design', description: 'Complete brand identity design' },
      { name: 'Figma', category: 'design', description: 'Digital asset creation and collaboration' },
      { name: 'Adobe InDesign', category: 'design', description: 'Brand guidelines and documentation' },
      { name: 'Sketch', category: 'design', description: 'Digital design and prototyping' }
    ],
    
    metrics: [
      {
        label: 'Customer Trust Score',
        value: 88,
        unit: '%',
        description: 'Customer trust and satisfaction rating',
        animationType: 'progress',
        previousValue: 52,
        improvement: '36% increase'
      },
      {
        label: 'Brand Recognition',
        value: 240,
        unit: '%',
        description: 'Increase in brand recognition and recall',
        animationType: 'counter',
        previousValue: 0,
        improvement: '240% improvement'
      },
      {
        label: 'Customer Retention',
        value: 78,
        unit: '%',
        description: 'Customer retention rate improvement',
        animationType: 'progress',
        previousValue: 45,
        improvement: '33% increase'
      },
      {
        label: 'Net Promoter Score',
        value: 72,
        description: 'Customer recommendation likelihood score',
        animationType: 'counter',
        previousValue: 28,
        improvement: '44 point increase'
      }
    ],
    
    testimonial: {
      quote: "The brand development process helped us clearly define who we are and how to communicate our values. Our customers now truly understand what makes us different.",
      author: 'Lisa Rodriguez',
      position: 'Marketing Director',
      company: 'Genuine Products',
      rating: 5
    },
    
    gallery: [
      { url: '/genuine.jpeg', alt: 'Genuine brand identity', type: 'hero' },
      { url: '/genuine2.jpeg', alt: 'Brand applications', type: 'process' },
      { url: '/genuine.jpeg', alt: 'Brand guidelines', type: 'result' }
    ],
    
    nextProject: '2',
    previousProject: '4',
    
    seoTitle: 'Genuine Brand Development Case Study | Authentic Brand Design',
    seoDescription: 'Discover how we built trust and authenticity for Genuine Products through comprehensive brand development and strategic design.',
    ogImage: '/genuine.jpeg',
    tags: ['brand development', 'authentic branding', 'trust building', 'brand strategy'],
    
    animationConfig: {
      enableParallax: true,
      enableScrollTrigger: true,
      reducedMotion: false
    }
  },  
 
 {
    id: '2',
    title: 'Cleagn Logo Design',
    subtitle: 'Minimalist design that communicates trust and professionalism',
    category: 'Logo Design',
    date: '2024-04-05',
    duration: '3 weeks',
    client: 'Cleagn Services',
    heroImage: '/cleagn.webp',
    
    overview: {
      challenge: 'Cleagn needed a professional logo that would communicate trust, reliability, and cleanliness while standing out in the competitive cleaning services market.',
      solution: 'We created a clean, minimalist logo design that uses thoughtful typography and subtle visual elements to convey professionalism and attention to detail.',
      result: 'The new logo established strong brand recognition in the local market and increased customer trust, leading to more inquiries and business growth.',
      objectives: [
        'Create memorable and professional logo',
        'Communicate cleanliness and reliability',
        'Ensure versatility across applications',
        'Stand out in competitive service market'
      ]
    },
    
    process: [
      {
        id: 'research',
        title: 'Market Research & Competitor Analysis',
        description: 'Analyzed the cleaning services market to identify design opportunities and avoid common visual clichés.',
        duration: '3 days',
        images: ['/cleagn.webp'],
        details: [
          'Researched 30+ cleaning service logos',
          'Identified common design patterns and clichés',
          'Analyzed successful brands in adjacent industries',
          'Defined differentiation opportunities'
        ],
        order: 1,
        icon: ''
      },
      {
        id: 'concepts',
        title: 'Concept Development',
        description: 'Developed multiple logo concepts exploring different approaches to communicating cleanliness and professionalism.',
        duration: '1 week',
        images: ['/cleagn.webp'],
        details: [
          'Created 8 distinct logo concepts',
          'Explored typography-based and symbol-based approaches',
          'Tested different color palettes and styles',
          'Refined top 3 concepts for presentation'
        ],
        order: 2,
        icon: ''
      },
      {
        id: 'refinement',
        title: 'Design Refinement',
        description: 'Refined the selected concept, perfecting typography, proportions, and visual balance.',
        duration: '1 week',
        images: ['/cleagn.webp'],
        details: [
          'Fine-tuned typography and letter spacing',
          'Optimized proportions and visual balance',
          'Created color and monochrome versions',
          'Tested scalability and legibility'
        ],
        order: 3,
        icon: ''
      },
      {
        id: 'delivery',
        title: 'Final Delivery & Applications',
        description: 'Delivered final logo files and created initial brand applications to demonstrate versatility.',
        duration: '3 days',
        images: ['/cleagn.webp'],
        details: [
          'Prepared logo files in all required formats',
          'Created basic brand guidelines',
          'Designed business card and letterhead mockups',
          'Provided usage guidelines and recommendations'
        ],
        order: 4,
        icon: ''
      }
    ],
    
    challengesSolutions: {
      challenge: {
        title: 'Avoiding Generic Cleaning Service Clichés',
        description: 'Most cleaning service logos use predictable imagery like bubbles, brooms, or houses, making it difficult to create something distinctive.',
        image: '/cleagn.webp',
        painPoints: [
          'Oversaturated market with similar visual approaches',
          'Need to communicate cleanliness without clichés',
          'Balancing professionalism with approachability',
          'Ensuring logo works across various applications'
        ]
      },
      solution: {
        title: 'Typography-Focused Minimalist Approach',
        description: 'We focused on clean, sophisticated typography with subtle design elements that communicate professionalism and attention to detail.',
        image: '/cleagn.webp',
        approach: [
          'Used custom typography as the primary design element',
          'Incorporated subtle visual cues for cleanliness',
          'Chose colors that convey trust and reliability',
          'Ensured maximum versatility and scalability'
        ],
        keyFeatures: [
          'Clean, modern typography treatment',
          'Subtle visual elements that enhance meaning',
          'Professional color palette',
          'Highly scalable and versatile design'
        ]
      }
    },
    
    technologies: [
      { name: 'Adobe Illustrator', category: 'design', description: 'Vector logo design and creation' },
      { name: 'Adobe Photoshop', category: 'design', description: 'Mockups and presentations' },
      { name: 'Figma', category: 'design', description: 'Digital presentations and collaboration' }
    ],
    
    metrics: [
      {
        label: 'Brand Recognition',
        value: 85,
        unit: '%',
        description: 'Local market brand recognition within 6 months',
        animationType: 'progress',
        previousValue: 15,
        improvement: '70% increase'
      },
      {
        label: 'Customer Inquiries',
        value: 120,
        unit: '%',
        description: 'Increase in customer inquiries after rebrand',
        animationType: 'counter',
        previousValue: 0,
        improvement: '120% improvement'
      },
      {
        label: 'Professional Perception',
        value: 92,
        unit: '%',
        description: 'Customers rating business as professional',
        animationType: 'progress',
        previousValue: 68,
        improvement: '24% increase'
      },
      {
        label: 'Logo Versatility Score',
        value: 98,
        unit: '%',
        description: 'Successful application across different media',
        animationType: 'progress',
        previousValue: 0,
        improvement: '98% success rate'
      }
    ],
    
    testimonial: {
      quote: "The new logo perfectly represents our commitment to quality and professionalism. Our customers immediately noticed the difference, and we've seen a real impact on our business.",
      author: 'David Thompson',
      position: 'Owner',
      company: 'Cleagn Services',
      rating: 5
    },
    
    gallery: [
      { url: '/cleagn.webp', alt: 'Cleagn logo design', type: 'hero' },
      { url: '/cleagn.webp', alt: 'Logo variations and applications', type: 'process' },
      { url: '/cleagn.webp', alt: 'Business card mockup', type: 'result' }
    ],
    
    nextProject: '3',
    previousProject: '8',
    
    seoTitle: 'Cleagn Logo Design Case Study | Minimalist Professional Logo',
    seoDescription: 'See how we created a distinctive, professional logo for Cleagn Services that increased brand recognition by 85% in the local market.',
    ogImage: '/cleagn.webp',
    tags: ['logo design', 'minimalist design', 'professional branding', 'service industry'],
    
    animationConfig: {
      enableParallax: true,
      enableScrollTrigger: true,
      reducedMotion: false
    }
  },  
 
 {
    id: '3',
    title: 'Engine Oil Marketing Campaign',
    subtitle: 'Driving engagement through compelling automotive marketing',
    category: 'Marketing Design',
    date: '2023-11-15',
    duration: '4 weeks',
    client: 'AutoTech Solutions',
    heroImage: '/oil banner.webp',
    
    overview: {
      challenge: 'AutoTech Solutions needed to create a compelling marketing campaign for their premium engine oil that would communicate technical benefits while appealing to both professional mechanics and car enthusiasts.',
      solution: 'We developed a comprehensive marketing campaign with bold visuals, clear technical communication, and strong call-to-action elements that work across digital and print media.',
      result: 'The campaign achieved 45% increase in engagement, successful multi-channel deployment, and enhanced brand visibility in the competitive automotive market.',
      objectives: [
        'Communicate technical product benefits clearly',
        'Appeal to both professionals and enthusiasts',
        'Create impact in competitive automotive market',
        'Ensure consistency across multiple formats'
      ]
    },
    
    process: [
      {
        id: 'strategy',
        title: 'Campaign Strategy & Planning',
        description: 'Developed comprehensive marketing strategy focusing on target audience needs and competitive positioning.',
        duration: '1 week',
        images: ['/oil banner.webp'],
        details: [
          'Analyzed target audience segments and needs',
          'Researched competitor marketing approaches',
          'Defined key messaging and value propositions',
          'Planned multi-channel campaign deployment'
        ],
        order: 1,
        icon: ''
      },
      {
        id: 'creative',
        title: 'Creative Concept Development',
        description: 'Created compelling creative concepts that balance technical information with visual impact and emotional appeal.',
        duration: '1.5 weeks',
        images: ['/oil banner.webp', '/Engine Oil Advertisement(FINAL).png'],
        details: [
          'Developed multiple creative directions',
          'Created visual hierarchy for technical information',
          'Designed compelling imagery and graphics',
          'Established consistent visual language'
        ],
        order: 2,
        icon: ''
      },
      {
        id: 'production',
        title: 'Asset Production & Optimization',
        description: 'Produced all campaign assets optimized for different channels and formats while maintaining visual consistency.',
        duration: '1 week',
        images: ['/Engine Oil Advertisement(FINAL).png'],
        details: [
          'Created banner ads for digital platforms',
          'Designed print advertisements for trade publications',
          'Produced social media assets and templates',
          'Optimized all assets for their respective channels'
        ],
        order: 3,
        icon: ''
      },
      {
        id: 'launch',
        title: 'Campaign Launch & Monitoring',
        description: 'Coordinated campaign launch across all channels and monitored performance for optimization opportunities.',
        duration: '0.5 weeks',
        images: ['/oil banner.webp'],
        details: [
          'Coordinated multi-channel campaign launch',
          'Monitored initial performance metrics',
          'Made real-time optimizations based on data',
          'Provided performance reporting and insights'
        ],
        order: 4,
        icon: ''
      }
    ],
    
    challengesSolutions: {
      challenge: {
        title: 'Communicating Technical Benefits Visually',
        description: 'Engine oil marketing requires communicating complex technical benefits in a way that\'s both accessible and compelling to different audience segments.',
        image: '/oil banner.webp',
        painPoints: [
          'Complex technical information difficult to visualize',
          'Need to appeal to both professionals and consumers',
          'Competitive market with similar product claims',
          'Multiple format requirements for different channels'
        ]
      },
      solution: {
        title: 'Visual Storytelling with Technical Clarity',
        description: 'We created a visual system that uses compelling imagery and clear information hierarchy to make technical benefits accessible and memorable.',
        image: '/Engine Oil Advertisement(FINAL).png',
        approach: [
          'Used powerful automotive imagery to create emotional connection',
          'Developed clear visual hierarchy for technical information',
          'Created consistent messaging across all formats',
          'Balanced technical details with compelling visuals'
        ],
        keyFeatures: [
          'Bold, automotive-focused visual design',
          'Clear technical benefit communication',
          'Consistent multi-channel campaign assets',
          'Strong call-to-action elements'
        ]
      }
    },
    
    technologies: [
      { name: 'Adobe Photoshop', category: 'design', description: 'Image editing and banner creation' },
      { name: 'Adobe Illustrator', category: 'design', description: 'Vector graphics and logos' },
      { name: 'Adobe InDesign', category: 'design', description: 'Print advertisement layout' },
      { name: 'Figma', category: 'design', description: 'Digital asset creation and collaboration' }
    ],
    
    metrics: [
      {
        label: 'Campaign Engagement',
        value: 45,
        unit: '%',
        description: 'Increase in overall campaign engagement',
        animationType: 'progress',
        previousValue: 0,
        improvement: '45% improvement'
      },
      {
        label: 'Brand Awareness',
        value: 78,
        unit: '%',
        description: 'Increase in brand awareness in automotive sector',
        animationType: 'progress',
        previousValue: 42,
        improvement: '36% increase'
      },
      {
        label: 'Lead Generation',
        value: 156,
        unit: '%',
        description: 'Increase in qualified leads from campaign',
        animationType: 'counter',
        previousValue: 0,
        improvement: '156% improvement'
      },
      {
        label: 'Multi-Channel Reach',
        value: 250000,
        description: 'Total impressions across all campaign channels',
        animationType: 'counter',
        previousValue: 85000,
        improvement: '194% increase'
      }
    ],
    
    testimonial: {
      quote: "The marketing campaign exceeded our expectations. The visual design perfectly communicated our product benefits, and we saw immediate results across all channels.",
      author: 'Robert Martinez',
      position: 'Marketing Manager',
      company: 'AutoTech Solutions',
      rating: 5
    },
    
    gallery: [
      { url: '/oil banner.webp', alt: 'Engine oil marketing banner', type: 'hero' },
      { url: '/Engine Oil Advertisement(FINAL).png', alt: 'Print advertisement design', type: 'process' },
      { url: '/oil banner.webp', alt: 'Campaign assets overview', type: 'result' }
    ],
    
    nextProject: '1',
    previousProject: '2',
    
    seoTitle: 'Engine Oil Marketing Campaign Case Study | Automotive Marketing Design',
    seoDescription: 'Learn how we created a successful automotive marketing campaign that increased engagement by 45% and enhanced brand visibility.',
    ogImage: '/oil banner.webp',
    tags: ['marketing design', 'automotive marketing', 'campaign design', 'technical communication'],
    
    animationConfig: {
      enableParallax: true,
      enableScrollTrigger: true,
      reducedMotion: false
    }
  }
];

// Utility functions for case study data
export const getCaseStudyById = (id: string): CaseStudy | undefined => {
  return caseStudies.find(study => study.id === id);
};

export const getCaseStudiesByCategory = (category: string): CaseStudy[] => {
  if (category === 'all') {
    return caseStudies;
  }
  return caseStudies.filter(study => 
    study.category.toLowerCase().replace(' ', '-') === category.toLowerCase()
  );
};

export const getRelatedCaseStudies = (currentId: string, limit: number = 3): CaseStudy[] => {
  const current = getCaseStudyById(currentId);
  if (!current) return [];
  
  return caseStudies
    .filter(study => study.id !== currentId && study.category === current.category)
    .slice(0, limit);
};

export const getAllCaseStudyTags = (): string[] => {
  const allTags = caseStudies.flatMap(study => study.tags);
  return [...new Set(allTags)].sort();
};

export const getCaseStudiesByTag = (tag: string): CaseStudy[] => {
  return caseStudies.filter(study => 
    study.tags.some(studyTag => studyTag.toLowerCase() === tag.toLowerCase())
  );
};