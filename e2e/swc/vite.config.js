import react from "@vitejs/plugin-react-swc";

export default {
  plugins: [react()],
  server: {
    open: "none",
    host: "127.0.0.1",
  },
};
