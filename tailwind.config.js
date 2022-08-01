module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true, // .container 自动居中
      padding: {
        DEFAULT: '1rem',
        // sm: '2rem',
        // lg: '4rem',
        xl: '0',
        // '2xl': '6rem',
      },
    },
    extend: {
      spacing: {
        128: '32rem',
        144: '36rem',
        '320px': '320px',
        '360px': '360px',
        '400px': '400px',
        '440px': '440px',
        '480px': '480px',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '1400px',
            color: '#6c686f',
            strong: {
              fontWeight: '700',
              color: '#444',
            },
            p: {
              marginTop: 0,
              marginBottom: '1.25rem',
              hyphens: 'auto',
              wordWrap: 'break-word',
            },
            h1: {
              fontSize: '24px',
              fontWeight: '600',
            },
            h2: {
              fontSize: '22px',
              margin: '1rem 0',
              color: '#445566',
              fontWeight: '600',
            },
            h3: {
              fontSize: '20px',
              margin: '0.5rem 0',
              color: '#445566',
            },
            h4: {
              fontSize: '18px',
              color: '#445566',
            },
            a: {
            },
            figure: {
              margin: '1rem 0',
            },
            img: {
              margin: '1.25rem auto',
            },
            figcaption: {
              textAlign: 'center',
              fontSize: '0.875rem',
              color: '#1c1c1c',
            },
            // ...
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
