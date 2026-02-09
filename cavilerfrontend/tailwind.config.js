// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      fontSize: {
        'xxs': ['0.625rem', { lineHeight: '0.75rem' }],
        '7xl': ['4rem', { lineHeight: '1' }],
        '8xl': ['5rem', { lineHeight: '1' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 25px rgba(0, 0, 0, 0.12)',
        'large': '0 8px 40px rgba(0, 0, 0, 0.16)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      colors: {
        // Primary Colors from Screenshot
        'primary-green': '#00C853',      // Bright green for badges
        'primary-olive': '#556B2F',      // Dark olive for navbar
        'primary-dark': '#1B5E20',       // Dark green
        'primary-khaki': '#C3B091',      // Khaki/beige

        // Course Card Colors
        'card-olive': '#4B5320',         // Dark olive card
        'card-khaki': '#9CAF88',         // Light khaki card
        'card-red': '#B71C1C',           // Red/maroon card
        'card-orange': '#D84315',        // Orange/brown card

        // Defense Theme Colors
        'defense-olive': '#556B2F',
        'defense-olive-light': '#6B8E23',
        'defense-navy': '#1a237e',
        'defense-navy-light': '#283593',
        'defense-khaki': '#C3B091',
        'defense-khaki-light': '#D4C5A9',
        'defense-gold': '#FFD700',
        'defense-gold-dark': '#B8860B',
        'defense-army': '#4B5320',
        'defense-red': '#8B0000',

        // Cavalier Theme Colors
        'cavalier-bg': '#1B2613', // Deep Army Green / Almost Black
        'cavalier-header-bg': '#4B5F33', // Army Olive (for cards/headers)
        'cavalier-brand': '#FFD700', // Gold (for highlights)
        'cavalier-text-light': '#EDF2F7', // Off-white
        'cavalier-card-dark': '#263219', // Darker Card
        'cavalier-card-light': '#5D7245', // Lighter Card
        'cavalier-card-red': '#8B2424', // Deep Red
        'cavalier-card-orange': '#D2691E', // Chocolate/Orange
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-balance': {
          'text-wrap': 'balance',
        },
        '.scroll-smooth': {
          'scroll-behavior': 'smooth',
        },
        '.container-fluid': {
          width: '100%',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      });
    },
  ],
}