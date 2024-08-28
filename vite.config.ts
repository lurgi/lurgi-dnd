import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: "src/index.ts", // 라이브러리 진입점
      name: "lurgi-dnd",
      formats: ["es", "cjs", "umd"],
      fileName: (format) => `lurgi-dnd-library.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "@emotion/react", "@emotion/styled"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@emotion/react": "emotionReact",
          "@emotion/styled": "emotionStyled",
        },
      },
    },
  },
});
