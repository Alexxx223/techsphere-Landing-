export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  imageUrl: string;
  projectUrl?: string;
  technologies: string[];
  featured: boolean;
  client?: string;
  year: number;
  duration?: string;
  challenges?: string[];
  results?: string[];
  gallery?: string[];
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: '1',
    title: 'Unfiltered Podcast Brand Identity',
    description: 'Complete brand identity design for a modern podcast series, including logo design, color palette, and visual guidelines.',
    longDescription: 'Developed a comprehensive brand identity for the Unfiltered podcast series, focusing on authenticity and modern appeal. The project included logo design, color palette development, typography selection, and complete brand guidelines. The identity needed to work across digital platforms while maintaining strong recognition and professional appeal.',
    category: 'Branding',
    imageUrl: '/unfiltered.webp',
    projectUrl: '#',
    technologies: ['Adobe Illustrator', 'Photoshop', 'Brand Strategy', 'Typography'],
    featured: true,
    client: 'Unfiltered Media',
    year: 2024,
    duration: '6 weeks',
    challenges: [
      'Creating a distinctive identity in a crowded podcast market',
      'Ensuring scalability across various digital platforms',
      'Balancing professionalism with approachable authenticity'
    ],
    results: [
      '300% increase in brand recognition',
      'Consistent visual identity across all platforms',
      'Improved listener engagement and retention'
    ],
    gallery: ['/unfiltered.webp']
  },
  {
    id: '2',
    title: 'Cleagn Logo Design',
    description: 'Minimalist logo design for a cleaning service company, focusing on trust and professionalism.',
    longDescription: 'Designed a clean, minimalist logo for Cleagn cleaning services that communicates trust, reliability, and professionalism. The logo needed to work across various applications from business cards to vehicle wraps, maintaining clarity and impact at all sizes.',
    category: 'Logo Design',
    imageUrl: '/cleagn.webp',
    technologies: ['Adobe Illustrator', 'Typography', 'Brand Identity', 'Vector Design'],
    featured: false,
    client: 'Cleagn Services',
    year: 2024,
    duration: '3 weeks',
    challenges: [
      'Conveying cleanliness and professionalism in a simple mark',
      'Creating versatility for various application sizes',
      'Standing out in a competitive service industry'
    ],
    results: [
      'Strong brand recognition in local market',
      'Successful application across all touchpoints',
      'Increased customer trust and inquiries'
    ],
    gallery: ['/cleagn.webp']
  },
  {
    id: '3',
    title: 'Engine Oil Promotional Campaign',
    description: 'Eye-catching promotional banner design for automotive engine oil marketing campaign.',
    longDescription: 'Created a comprehensive promotional campaign for automotive engine oil, including banner designs, social media assets, and print materials. The campaign focused on highlighting product quality and performance benefits through compelling visual design and strategic messaging.',
    category: 'Marketing Design',
    imageUrl: '/oil banner.webp',
    technologies: ['Photoshop', 'Marketing Design', 'Print Design', 'Digital Marketing'],
    featured: false,
    client: 'AutoTech Solutions',
    year: 2023,
    duration: '4 weeks',
    challenges: [
      'Communicating technical benefits visually',
      'Creating impact in a competitive automotive market',
      'Maintaining brand consistency across multiple formats'
    ],
    results: [
      '45% increase in campaign engagement',
      'Successful multi-channel deployment',
      'Enhanced brand visibility in target market'
    ],
    gallery: ['/oil banner.webp', '/Engine Oil Advertisement(FINAL).png']
  },
  {
    id: '4',
    title: 'Spectrum Company Profile',
    description: 'Professional company profile design showcasing corporate identity and business capabilities.',
    longDescription: 'Developed a comprehensive company profile for Spectrum, highlighting their corporate identity, services, and business capabilities. The design needed to communicate professionalism while remaining engaging and accessible to potential clients and partners.',
    category: 'Corporate Design',
    imageUrl: '/Spectrum company profile Mock up final.webp',
    projectUrl: '#',
    technologies: ['InDesign', 'Corporate Identity', 'Layout Design', 'Print Design'],
    featured: true,
    client: 'Spectrum Corporation',
    year: 2024,
    duration: '5 weeks',
    challenges: [
      'Presenting complex business information clearly',
      'Maintaining visual interest throughout lengthy content',
      'Ensuring print and digital compatibility'
    ],
    results: [
      'Improved client presentation success rate',
      'Enhanced corporate image and credibility',
      'Streamlined business development process'
    ],
    gallery: ['/Spectrum company profile Mock up final.webp', '/Spectrum Tri Fold Brochure MockUp cover.webp']
  },
  {
    id: '5',
    title: 'Spectrum Tri-Fold Brochure',
    description: 'Elegant tri-fold brochure design for corporate marketing and client presentations.',
    longDescription: 'Designed an elegant tri-fold brochure for Spectrum Corporation, serving as a key marketing tool for client presentations and business development. The design balances comprehensive information with visual appeal and professional presentation.',
    category: 'Print Design',
    imageUrl: '/Spectrum Tri Fold Brochure MockUp cover.webp',
    technologies: ['InDesign', 'Print Design', 'Marketing', 'Layout Design'],
    featured: false,
    client: 'Spectrum Corporation',
    year: 2024,
    duration: '3 weeks',
    challenges: [
      'Organizing complex information in limited space',
      'Creating visual hierarchy for easy scanning',
      'Ensuring high-quality print reproduction'
    ],
    results: [
      'Effective sales and marketing tool',
      'Positive client feedback on design quality',
      'Increased lead generation from trade shows'
    ],
    gallery: ['/Spectrum Tri Fold Brochure MockUp cover.webp']
  },
  {

    id: '6',
    title: 'Engine Oil Advertisement',
    description: 'Professional advertisement design for automotive engine oil with compelling visual hierarchy.',
    longDescription: 'Created a professional advertisement design for automotive engine oil, focusing on compelling visual hierarchy and clear communication of product benefits. The design needed to stand out in automotive publications while maintaining brand consistency.',
    category: 'Advertisement',
    imageUrl: '/Engine Oil Advertisement(FINAL).png',
    technologies: ['Photoshop', 'Advertisement Design', 'Visual Communication', 'Print Design'],
    featured: false,
    client: 'AutoTech Solutions',
    year: 2023,
    duration: '2 weeks',
    challenges: [
      'Creating visual impact in cluttered advertising environment',
      'Communicating technical product benefits clearly',
      'Maintaining brand consistency with campaign materials'
    ],
    results: [
      'High engagement rates in target publications',
      'Increased brand awareness in automotive sector',
      'Successful integration with broader campaign'
    ],
    gallery: ['/Engine Oil Advertisement(FINAL).png']
  },
  {
    id: '7',
    title: 'Pepskay Brand Identity',
    description: 'Modern brand identity and logo design for a contemporary business venture.',
    longDescription: 'Developed a complete modern brand identity for Pepskay, a contemporary business venture. The project included logo design, color palette development, typography selection, and brand guidelines to establish a strong market presence.',
    category: 'Branding',
    imageUrl: '/pepskay.jpeg',
    technologies: ['Adobe Illustrator', 'Brand Strategy', 'Logo Design', 'Identity Systems'],
    featured: false,
    client: 'Pepskay Ventures',
    year: 2023,
    duration: '4 weeks',
    challenges: [
      'Creating a distinctive identity for a new market entrant',
      'Balancing modern appeal with timeless design principles',
      'Ensuring scalability across various applications'
    ],
    results: [
      'Strong brand recognition in target market',
      'Successful launch and market penetration',
      'Consistent brand application across all touchpoints'
    ],
    gallery: ['/pepskay.jpeg']
  },
  {
    id: '8',
    title: 'Genuine Brand Development',
    description: 'Comprehensive brand development including logo, color scheme, and brand guidelines.',
    longDescription: 'Executed comprehensive brand development for Genuine, including logo design, color scheme development, typography selection, and complete brand guidelines. The project focused on creating an authentic and trustworthy brand presence.',
    category: 'Branding',
    imageUrl: '/genuine.jpeg',
    projectUrl: '#',
    technologies: ['Brand Strategy', 'Adobe Creative Suite', 'Identity Design', 'Guidelines Development'],
    featured: true,
    client: 'Genuine Products',
    year: 2024,
    duration: '6 weeks',
    challenges: [
      'Communicating authenticity and trust through design',
      'Creating differentiation in a competitive market',
      'Developing comprehensive brand guidelines'
    ],
    results: [
      'Increased customer trust and loyalty',
      'Successful brand differentiation',
      'Consistent brand implementation across all channels'
    ],
    gallery: ['/genuine.jpeg', '/genuine2.jpeg']
  },
  {

    id: '9',
    title: 'Raiworx Company Profile',
    description: 'Corporate profile design highlighting company strengths and professional capabilities.',
    longDescription: 'Designed a comprehensive corporate profile for Raiworx, highlighting company strengths, professional capabilities, and market position. The design needed to communicate expertise while remaining accessible and engaging for various stakeholder audiences.',
    category: 'Corporate Design',
    imageUrl: '/raiworx company profile.webp',
    technologies: ['InDesign', 'Corporate Design', 'Layout Design', 'Information Architecture'],
    featured: false,
    client: 'Raiworx Industries',
    year: 2023,
    duration: '4 weeks',
    challenges: [
      'Presenting technical capabilities in an accessible way',
      'Creating visual interest in corporate content',
      'Balancing comprehensive information with readability'
    ],
    results: [
      'Enhanced corporate credibility and image',
      'Improved stakeholder communication',
      'Successful use in business development activities'
    ],
    gallery: ['/raiworx company profile.webp']
  }
];

export const categories = [
  { id: 'all', label: 'All Work' },
  { id: 'branding', label: 'Branding' },
  { id: 'logo-design', label: 'Logo Design' },
  { id: 'corporate-design', label: 'Corporate Design' },
  { id: 'print-design', label: 'Print Design' },
  { id: 'marketing-design', label: 'Marketing Design' },
  { id: 'advertisement', label: 'Advertisement' }
];

export const getProjectsByCategory = (categoryId: string): PortfolioProject[] => {
  if (categoryId === 'all') {
    return portfolioProjects;
  }
  
  return portfolioProjects.filter(project => 
    project.category.toLowerCase().replace(' ', '-') === categoryId
  );
};

export const getFeaturedProjects = (): PortfolioProject[] => {
  return portfolioProjects.filter(project => project.featured);
};

export const getProjectById = (id: string): PortfolioProject | undefined => {
  return portfolioProjects.find(project => project.id === id);
};