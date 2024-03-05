/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#141ED2',
        white: '#FFFFFF',
        background: '#F4F7FF',
        A1: {
          10: '#6631FF',
          20: '#F3F6FA',
          30: '#FF2C2C',
          40: '#02C550',
          50: '#FFBA0A',
          60: '#FF523A',
          70: '#0433C1',
          80: '#00000073',
          90: '#001BFF',
        },
        btn: {
          10: '#FF5B65',
        },
        txt: {
          10: '#7D7D7D',
          20: '#4D4D4D',
          30: '#1E2153',
          40: '#3D3D3D',
          50: '#171717',
        },
        icon: {
          10: '#1E2153',
          20: '#00C7BD',
          40: '#141ED2',
          50: '#B6B6B6',
          60: '#FC1D53',
          70: '#C6C6C6',
          80: '#8A8A8A',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
