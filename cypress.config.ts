import { defineConfig } from "cypress";

export default defineConfig({
  viewportWidth: 1024,
  viewportHeight: 1280,

  e2e: {
    supportFile: false,
    baseUrl: "http://localhost:3000",
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
