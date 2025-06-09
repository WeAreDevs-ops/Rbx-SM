export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#fbbf24',
        'text-light': '#e0e0e0',
        'text-muted': '#ccc',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        lg: '12px',
      },
    },
  },
  plugins: [],
}
