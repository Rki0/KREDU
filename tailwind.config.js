module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  // calc를 사용할 수 있게 만들어준다.
  mode: "jit",
  theme: {
    screens: {
      "2sm": "425px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      keyframes: {
        typingCursor1: {
          from: {
            borderRight: "2px solid white",
          },
          to: { borderRight: "2px solid black" },
        },
        typingCursor2: {
          from: {
            borderRight: "2px solid white",
          },
          to: { borderRight: "2px solid black" },
        },
        spinner: {
          from: {
            width: "50px",
            height: "50px",
            opacity: 1,
          },
          to: {
            width: "100px",
            height: "100px",
            opacity: 0,
          },
        },
      },
      animation: {
        typingCursor1: "typingCursor1 750ms linear 0ms 1",
        typingCursor2: "typingCursor2 1s ease-in-out 450ms infinite",
        spinner1: "spinner 1.5s linear 0ms infinite",
        spinner2: "spinner 1.5s linear 500ms infinite",
      },
    },
  },
};
