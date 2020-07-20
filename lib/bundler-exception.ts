//@ts-ignore
import ThrowableDiagnostic from "@parcel/diagnostic";
//@ts-ignore
import { prettyDiagnostic } from "@parcel/utils";
//@ts-ignore
import { INTERNAL_ORIGINAL_CONSOLE } from "@parcel/logger";

async function logUncaughtError(e: any) {
  if (e instanceof ThrowableDiagnostic) {
    for (let diagnostic of e.diagnostics) {
      let out = await prettyDiagnostic(diagnostic);
      INTERNAL_ORIGINAL_CONSOLE.error(out.message);
      INTERNAL_ORIGINAL_CONSOLE.error(out.codeframe || out.stack);
      for (let h of out.hints) {
        INTERNAL_ORIGINAL_CONSOLE.error(h);
      }
    }
  } else {
    INTERNAL_ORIGINAL_CONSOLE.error(e);
  }

  // A hack to definitely ensure we logged the uncaught exception
  await new Promise((resolve) => setTimeout(resolve, 100));
}

process.on("unhandledRejection", async (reason) => {
  await logUncaughtError(reason);
  process.exit();
});
