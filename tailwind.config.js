/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-cyan': '#00d9ff',
        'neon-pink': '#ff006e',
        'neon-purple': '#b537f2',
        'neon-blue': '#0099ff',
        'dark-950': '#0a0e27',
        'dark-900': '#0f1629',
        'dark-850': '#131c3e',
        'dark-800': '#1a2847',
      },
      animation: {
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in': 'slideIn 0.3s cubic-bezier(0.23, 1, 0.320, 1) forwards',
        'fade-scale': 'fadeInScale 0.5s ease-out',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'bounce-typing': 'bounceTyping 1.6s infinite cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        slideUp: {
          'to': { transform: 'translateY(0)', opacity: '1' },
          'from': { transform: 'translateY(20px)', opacity: '0' }
        },
        slideIn: {
          'from': { opacity: '0', transform: 'translateY(12px)' },
          'to': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeInScale: {
          'from': { opacity: '0', transform: 'scale(0.95)' },
          'to': { opacity: '1', transform: 'scale(1)' }
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        bounceTyping: {
          '0%, 60%, 100%': { transform: 'translateY(0)', opacity: '0.6' },
          '30%': { transform: 'translateY(-12px)', opacity: '1' }
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0, 217, 255, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 217, 255, 0.6)' }
        }
      },
      backgroundSize: {
        'gradient-200': '200% 200%',
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0, 217, 255, 0.5)',
        'neon-pink': '0 0 20px rgba(255, 0, 110, 0.5)',
      }
    },
  },
  plugins: [],
}

