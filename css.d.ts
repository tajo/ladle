// Ambient declarations so `tsc` accepts CSS imports that are handled by the
// bundler (Vite) at runtime. TypeScript 6 reports unresolved side-effect
// imports (TS2882), so a bare `import "./styles.css"` needs a module shim.
declare module "*.css";

declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
