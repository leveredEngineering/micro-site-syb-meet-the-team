// vite.config.js
import { defineConfig } from "file:///Users/tylerredshaw/Development/levered-demo/node_modules/vite/dist/node/index.js";
import react from "file:///Users/tylerredshaw/Development/levered-demo/node_modules/@vitejs/plugin-react/dist/index.mjs";
import yextSSG from "file:///Users/tylerredshaw/Development/levered-demo/node_modules/@yext/pages/dist/vite-plugin/plugin.js";
import * as path from "path";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      src: path.resolve("src/")
    }
  },
  plugins: [react(), yextSSG()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-router-dom", "react-dom"],
          yext: [
            "@yext/custom-field-debugger",
            "@yext/pages",
            "@yext/schema-wrapper",
            "@yext/types",
            "@yext/sites-react-components"
          ],
          yextSearch: ["@yext/search-headless-react", "@yext/search-ui-react"]
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvdHlsZXJyZWRzaGF3L0RldmVsb3BtZW50L2xldmVyZWQtZGVtb1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3R5bGVycmVkc2hhdy9EZXZlbG9wbWVudC9sZXZlcmVkLWRlbW8vdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3R5bGVycmVkc2hhdy9EZXZlbG9wbWVudC9sZXZlcmVkLWRlbW8vdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHlleHRTU0cgZnJvbSBcIkB5ZXh0L3BhZ2VzL3ZpdGUtcGx1Z2luXCI7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgc3JjOiBwYXRoLnJlc29sdmUoXCJzcmMvXCIpLFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtyZWFjdCgpLCB5ZXh0U1NHKCldLFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3M6IHtcbiAgICAgICAgICByZWFjdDogW1wicmVhY3RcIiwgXCJyZWFjdC1yb3V0ZXItZG9tXCIsIFwicmVhY3QtZG9tXCJdLFxuICAgICAgICAgIHlleHQ6IFtcbiAgICAgICAgICAgIFwiQHlleHQvY3VzdG9tLWZpZWxkLWRlYnVnZ2VyXCIsXG4gICAgICAgICAgICBcIkB5ZXh0L3BhZ2VzXCIsXG4gICAgICAgICAgICBcIkB5ZXh0L3NjaGVtYS13cmFwcGVyXCIsXG4gICAgICAgICAgICBcIkB5ZXh0L3R5cGVzXCIsXG4gICAgICAgICAgICBcIkB5ZXh0L3NpdGVzLXJlYWN0LWNvbXBvbmVudHNcIixcbiAgICAgICAgICBdLFxuICAgICAgICAgIHlleHRTZWFyY2g6IFtcIkB5ZXh0L3NlYXJjaC1oZWFkbGVzcy1yZWFjdFwiLCBcIkB5ZXh0L3NlYXJjaC11aS1yZWFjdFwiXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzVCxTQUFTLG9CQUFvQjtBQUNuVixPQUFPLFdBQVc7QUFDbEIsT0FBTyxhQUFhO0FBQ3BCLFlBQVksVUFBVTtBQUV0QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFVLGFBQVEsTUFBTTtBQUFBLElBQzFCO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7QUFBQSxFQUM1QixPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixjQUFjO0FBQUEsVUFDWixPQUFPLENBQUMsU0FBUyxvQkFBb0IsV0FBVztBQUFBLFVBQ2hELE1BQU07QUFBQSxZQUNKO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxVQUNBLFlBQVksQ0FBQywrQkFBK0IsdUJBQXVCO0FBQUEsUUFDckU7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
