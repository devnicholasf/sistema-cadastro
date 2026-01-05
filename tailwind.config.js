/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/components/**/*.{js,vue,ts}",
    "./app/layouts/**/*.vue", 
    "./app/pages/**/*.vue",
    "./app/plugins/**/*.{js,ts}",
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      colors: {
        // Cores primárias (Alaranjado)
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',  // Cor principal alaranjada
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407'
        },
        
        // Cores secundárias (Tons de cinza escuro/preto)
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617'
        },
        
        // Sistema de cores semânticas
        background: {
          primary: '#020617',     // Preto profundo
          secondary: '#0f172a',   // Preto suave
          tertiary: '#1e293b',    // Cinza escuro
          light: '#f8fafc'        // Branco suave
        },
        
        surface: {
          primary: '#1e293b',     // Superfície principal
          secondary: '#334155',   // Superfície secundária
          tertiary: '#475569',    // Superfície terciária
          elevated: '#64748b'     // Superfície elevada
        },
        
        accent: {
          orange: '#f97316',      // Alaranjado principal
          'orange-light': '#fb923c',
          'orange-dark': '#ea580c',
          'orange-darker': '#c2410c'
        },
        
        text: {
          primary: '#f8fafc',     // Texto principal (branco)
          secondary: '#e2e8f0',   // Texto secundário
          muted: '#94a3b8',       // Texto esmaecido
          inverse: '#0f172a'      // Texto inverso (escuro)
        },
        
        border: {
          primary: '#334155',     // Borda principal
          secondary: '#475569',   // Borda secundária
          accent: '#f97316'       // Borda em destaque
        },
        
        // Estados de interação
        hover: {
          primary: '#fb923c',     // Hover alaranjado
          secondary: '#475569',   // Hover cinza
          background: '#1e293b'   // Hover de fundo
        },
        
        focus: {
          ring: '#f97316',        // Anel de foco alaranjado
          background: '#334155'   // Fundo de foco
        },
        
        // Estados de status
        success: {
          50: '#f0fdf4',
          500: '#10b981',
          600: '#059669',
          700: '#047857'
        },
        
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309'
        },
        
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c'
        },
        
        info: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8'
        }
      },
      
      // Gradientes personalizados
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%)',
        'accent-gradient': 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%)',
        'hero-gradient': 'linear-gradient(135deg, #020617 0%, #1e293b 25%, #f97316 100%)'
      },
      
      // Sombras personalizadas
      boxShadow: {
        'primary': '0 4px 6px -1px rgba(249, 115, 22, 0.1), 0 2px 4px -1px rgba(249, 115, 22, 0.06)',
        'secondary': '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.1)',
        'accent': '0 0 20px rgba(249, 115, 22, 0.3)',
        'glow': '0 0 30px rgba(249, 115, 22, 0.5)'
      },
      
      // Animações personalizadas
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate'
      },
      
      keyframes: {
        glow: {
          '0%': { 
            boxShadow: '0 0 5px rgba(249, 115, 22, 0.2), 0 0 10px rgba(249, 115, 22, 0.2), 0 0 15px rgba(249, 115, 22, 0.2)' 
          },
          '100%': { 
            boxShadow: '0 0 10px rgba(249, 115, 22, 0.4), 0 0 20px rgba(249, 115, 22, 0.4), 0 0 30px rgba(249, 115, 22, 0.4)' 
          }
        }
      }
    },
  },
  plugins: [],
}