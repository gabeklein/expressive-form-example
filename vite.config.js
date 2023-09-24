import react from '@vitejs/plugin-react';

/** @type {import('vite').UserConfig} */
export default {
  plugins: [
    react({
      babel: {
        presets: [
          ["@expressive/babel-preset-react", {
            externals: "import"
          }]
        ]
      }
    })
  ]
}

/**
 * @returns {import('vite').Plugin)}
 */
function myPlugin(){
  return {
    name: "expressive-css-module",
    enforce: "pre",
    
  }
}