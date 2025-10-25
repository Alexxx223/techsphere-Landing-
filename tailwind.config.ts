
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Techsphere custom colors
				teal: {
					DEFAULT: '#01a99c',
					dark: '#064e53'
				},
				cyan: '#52c1c9',
				richblack: '#010B13',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-right': {
					'0%': { opacity: '0', transform: 'translateX(20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'fade-in-left': {
					'0%': { opacity: '0', transform: 'translateX(-20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-subtle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(100%)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'text-reveal': {
					'0%': { width: '0' },
					'100%': { width: '100%' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.7s ease-out',
				'fade-in-right': 'fade-in-right 0.7s ease-out',
				'fade-in-left': 'fade-in-left 0.7s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
				'slide-up': 'slide-up 0.8s ease-out',
				'text-reveal': 'text-reveal 1.5s ease-out forwards'
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				display: ['SF Pro Display', 'Inter', 'system-ui', 'sans-serif'],
				'madeinhaus': ['SF Pro Display', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
				'madeinhaus-text': ['Inter', 'SF Pro Text', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
			},
			fontSize: {
				// Madeinhaus-inspired display sizes
				'display-xl': ['clamp(4rem, 8vw, 8rem)', { lineHeight: '0.9', letterSpacing: '-0.02em', fontWeight: '700' }],
				'display-lg': ['clamp(3rem, 6vw, 6rem)', { lineHeight: '0.9', letterSpacing: '-0.02em', fontWeight: '700' }],
				'display-md': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '0.95', letterSpacing: '-0.01em', fontWeight: '600' }],
				'display-sm': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1', letterSpacing: '-0.01em', fontWeight: '600' }],
				
				// Madeinhaus-inspired heading sizes
				'heading-xl': ['clamp(2.5rem, 4vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '600' }],
				'heading-lg': ['clamp(2rem, 3vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.005em', fontWeight: '600' }],
				'heading-md': ['clamp(1.5rem, 2.5vw, 2rem)', { lineHeight: '1.3', letterSpacing: '0', fontWeight: '500' }],
				'heading-sm': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '500' }],
				
				// Body text sizes
				'body-xl': ['1.25rem', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],
				'body-lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],
				'body-md': ['1rem', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],
				'body-sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '400' }],
				
				// Caption and small text
				'caption': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.025em', fontWeight: '400' }],
				'overline': ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.1em', fontWeight: '500', textTransform: 'uppercase' }]
			},
			fontWeight: {
				'thin': '100',
				'extralight': '200',
				'light': '300',
				'normal': '400',
				'medium': '500',
				'semibold': '600',
				'bold': '700',
				'extrabold': '800',
				'black': '900'
			},
			letterSpacing: {
				'tightest': '-0.025em',
				'tighter': '-0.02em',
				'tight': '-0.01em',
				'normal': '0',
				'wide': '0.025em',
				'wider': '0.05em',
				'widest': '0.1em'
			},
			lineHeight: {
				'none': '1',
				'tight': '1.1',
				'snug': '1.2',
				'normal': '1.3',
				'relaxed': '1.4',
				'loose': '1.5',
				'extra-loose': '1.6'
			},
			screens: {
				'xs': '475px',
				'sm': '640px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px',
				'2xl': '1536px',
				'3xl': '1920px'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
