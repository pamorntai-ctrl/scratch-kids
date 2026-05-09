/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      colors: {
        scratch: {
          events: '#FFAB19',
          motion: '#4C97FF',
          control: '#FF8C1A',
          looks: '#9966FF',
          sensing: '#5CB1D6',
          sound: '#CF63CF',
          operators: '#59C059',
          variables: '#FF8C1A',
        },
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        floatDelay: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.3)' },
        },
        slideInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        xpPop: {
          '0%': { opacity: '1', transform: 'translateY(0) scale(1)' },
          '60%': { opacity: '1', transform: 'translateY(-40px) scale(1.3)' },
          '100%': { opacity: '0', transform: 'translateY(-70px) scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        spinSlow: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        float: 'float 3.5s ease-in-out infinite',
        floatDelay: 'floatDelay 4s ease-in-out 1.2s infinite',
        floatDelay2: 'floatDelay 4.5s ease-in-out 2.4s infinite',
        twinkle: 'twinkle 2.5s ease-in-out infinite',
        slideInUp: 'slideInUp 0.5s ease-out',
        xpPop: 'xpPop 1.4s ease-out forwards',
        shimmer: 'shimmer 2.5s linear infinite',
        spinSlow: 'spinSlow 10s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
