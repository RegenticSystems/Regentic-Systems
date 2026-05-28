import type { Config }  from "tailwindcss";
import { fontFamily }   from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["var(--font-sans)", ...fontFamily.sans] },
      colors: {
        primary:   "#0d6efd",
        secondary: "#6c757d",
        success:   "#198754",
        danger:    "#dc3545",
      },
    },
  },
  plugins: [],
} satisfies Config;
