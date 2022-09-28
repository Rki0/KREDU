module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  // calc를 사용할 수 있게 만들어준다.
  mode: "jit",
  theme: {
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
      },
      animation: {
        typingCursor1: "typingCursor1 750ms linear 0ms 1",
        typingCursor2: "typingCursor2 1s ease-in-out 450ms infinite",
      },
    },
  },
};