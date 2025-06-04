
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
					DEFAULT: '#00FFE0',
					50: '#E6FFFC',
					100: '#CCFFF8',
					200: '#99FFF1',
					300: '#66FFEA',
					400: '#33FFE3',
					500: '#00FFE0',
					600: '#00CCB3',
					700: '#009986',
					800: '#006659',
					900: '#00332D',
					foreground: '#0A192F'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				accent: {
					DEFAULT: '#9B5DE5',
					50: '#F3EDFF',
					100: '#E7DBFF',
					200: '#D4C2FF',
					300: '#C1A9FF',
					400: '#AE90FF',
					500: '#9B5DE5',
					600: '#7B47CC',
					700: '#5C31B3',
					800: '#3D1B99',
					900: '#1E0580',
					foreground: '#FFFFFF'
				},
				navy: {
					DEFAULT: '#0A192F',
					50: '#E6EAEF',
					100: '#CDD5DF',
					200: '#9BABBF',
					300: '#69819F',
					400: '#37577F',
					500: '#0A192F',
					600: '#081425',
					700: '#060F1C',
					800: '#040A12',
					900: '#020509'
				},
				neon: {
					cyan: '#00FFE0',
					purple: '#9B5DE5',
					pink: '#FF006E',
					blue: '#3B82F6'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				}
			},
			fontFamily: {
				sans: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'Consolas', 'monospace'],
				display: ['Sora', 'Inter', 'system-ui', 'sans-serif']
			},
			fontSize: {
				'xs': ['0.75rem', { lineHeight: '1rem' }],
				'sm': ['0.875rem', { lineHeight: '1.25rem' }],
				'base': ['1rem', { lineHeight: '1.5rem' }],
				'lg': ['1.125rem', { lineHeight: '1.75rem' }],
				'xl': ['1.25rem', { lineHeight: '1.75rem' }],
				'2xl': ['1.5rem', { lineHeight: '2rem' }],
				'3xl': ['1.875rem', { lineHeight: '2.25rem' }],
				'4xl': ['2.25rem', { lineHeight: '2.5rem' }],
				'5xl': ['3rem', { lineHeight: '1' }],
				'6xl': ['3.75rem', { lineHeight: '1' }],
				'7xl': ['4.5rem', { lineHeight: '1' }],
				'8xl': ['6rem', { lineHeight: '1' }],
				'9xl': ['8rem', { lineHeight: '1' }],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'gradient-primary': 'linear-gradient(135deg, #00FFE0 0%, #9B5DE5 100%)',
				'gradient-dark': 'linear-gradient(135deg, #0A192F 0%, #1A365D 100%)',
				'gradient-glow': 'radial-gradient(circle at center, rgba(0, 255, 224, 0.3) 0%, transparent 70%)',
				'mesh-gradient': 'linear-gradient(45deg, #00FFE0 0%, #9B5DE5 25%, #FF006E 50%, #3B82F6 75%, #00FFE0 100%)'
			},
			boxShadow: {
				'glow': '0 0 20px rgba(0, 255, 224, 0.3)',
				'glow-lg': '0 0 40px rgba(0, 255, 224, 0.4)',
				'glow-purple': '0 0 20px rgba(155, 93, 229, 0.3)',
				'glass': '0 8px 32px rgba(31, 38, 135, 0.37)',
				'neomorph': '20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
				'neomorph-dark': '20px 20px 60px #0d1421, -20px -20px 60px #162238'
			},
			backdropBlur: {
				'xs': '2px',
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'fade-up': 'fade-up 0.6s ease-out',
				'scale-in': 'scale-in 0.4s ease-out',
				'slide-up': 'slide-up 0.5s ease-out',
				'slide-down': 'slide-down 0.5s ease-out',
				'slide-left': 'slide-left 0.5s ease-out',
				'slide-right': 'slide-right 0.5s ease-out',
				'glow': 'glow 2s ease-in-out infinite alternate',
				'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
				'float': 'float 4s ease-in-out infinite',
				'bounce-slow': 'bounce 2s infinite',
				'spin-slow': 'spin 3s linear infinite',
				'pulse-slow': 'pulse 3s ease-in-out infinite',
				'gradient': 'gradient 8s ease infinite',
				'shimmer': 'shimmer 2s linear infinite',
				'typewriter': 'typewriter 3s steps(40) infinite'
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
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-up': {
					'0%': { opacity: '0', transform: 'translateY(30px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					'0%': { opacity: '0', transform: 'scale(0.9)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				'slide-up': {
					'0%': { opacity: '0', transform: 'translateY(100%)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-down': {
					'0%': { opacity: '0', transform: 'translateY(-100%)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-left': {
					'0%': { opacity: '0', transform: 'translateX(100%)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'slide-right': {
					'0%': { opacity: '0', transform: 'translateX(-100%)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'glow': {
					'0%': { boxShadow: '0 0 20px rgba(0, 255, 224, 0.3)' },
					'100%': { boxShadow: '0 0 40px rgba(0, 255, 224, 0.6)' }
				},
				'glow-pulse': {
					'0%, 100%': { boxShadow: '0 0 20px rgba(0, 255, 224, 0.3)' },
					'50%': { boxShadow: '0 0 60px rgba(0, 255, 224, 0.8)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' }
				},
				'gradient': {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' }
				},
				'shimmer': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'typewriter': {
					'0%': { width: '0%' },
					'50%': { width: '100%' },
					'100%': { width: '0%' }
				}
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
				'128': '32rem'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
