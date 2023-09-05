import react from "@vitejs/plugin-react";

export default {
  plugins: [react()],
  server: {
    open: "none",
    host: "127.0.0.1",
  },
};
