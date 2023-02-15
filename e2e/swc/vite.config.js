import react from "@vitejs/plugin-react-swc";

export default {
  plugins: [react()],
  server: {
    open: "none",
  },
};
