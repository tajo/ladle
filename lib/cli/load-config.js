import path from "path";

const loadConfig = async () => {
  try {
    const config = await import(
      path.join(process.cwd(), "./.ladle/config.mjs")
    );
    console.log(config.default);
  } catch (e) {
    console.log(e);
    console.log("No config");
  }
};

export default loadConfig;
