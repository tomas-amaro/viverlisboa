export const theme = {
  colors: {
    primary: {
      blue: "#48B9CA", // Azul PS
      teal: "#23757E", // Azul Teal
      red: "#FF394C", // Vermelho Vivo
      carmin: "#7D3C4B", // Carmin
      white: "#FFFFFF",
      black: "#000000",
    },
    text: {
      primary: "#1a1a1a",
      secondary: "#4a4a4a",
      light: "#7a7a7a",
      white: "#ffffff",
    },
    background: {
      primary: "#ffffff",
      secondary: "#f8f9fa",
      dark: "#1a1a1a",
    },
    gray: {
      100: "#f7f7f7",
      200: "#e1e1e1",
      300: "#cfcfcf",
      400: "#b1b1b1",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
  },
  fonts: {
    primary:
      '"Gotham", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    secondary:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    black: 900,
  },
  fontSizes: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem", // 48px
    "6xl": "3.75rem", // 60px
    "7xl": "4.5rem", // 72px
  },
  spacing: {
    0: "0",
    1: "0.25rem", // 4px
    2: "0.5rem", // 8px
    3: "0.75rem", // 12px
    4: "1rem", // 16px
    5: "1.25rem", // 20px
    6: "1.5rem", // 24px
    8: "2rem", // 32px
    10: "2.5rem", // 40px
    12: "3rem", // 48px
    16: "4rem", // 64px
    20: "5rem", // 80px
    24: "6rem", // 96px
    32: "8rem", // 128px
    40: "10rem", // 160px
    48: "12rem", // 192px
    56: "14rem", // 224px
    64: "16rem", // 256px
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
  borderRadius: {
    none: "0",
    sm: "0.125rem",
    base: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    full: "9999px",
  },
  transitions: {
    fast: "150ms ease",
    base: "200ms ease",
    slow: "300ms ease",
  },
};

export type Theme = typeof theme;
