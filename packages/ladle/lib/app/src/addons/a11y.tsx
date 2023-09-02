import * as React from "react";
import { useHotkeys } from "react-hotkeys-hook";
import config from "../get-config";
import { watchers } from "../story-hmr";
import { A11y } from "../icons";
import { Modal, Code } from "../ui";
import type { AddonProps } from "../../../shared/types";

type ViolationT = {
  id: string;
  impact: string;
  description: string;
  help: string;
  helpUrl: string;
  nodes: { html: string }[];
};
type ViolationsT = ViolationT[];

const runAxe = async (
  setViolations: React.Dispatch<React.SetStateAction<ViolationsT>>,
  setReportFinished: React.Dispatch<React.SetStateAction<boolean>>,
  el: HTMLElement | null,
) => {
  const axe = await import("axe-core");
  try {
    const results = await axe.default.run(
      document.getElementsByTagName("main") as any,
    );
    setViolations(results.violations as ViolationsT);
    setReportFinished(true);
    if (el) el.setAttribute("aria-hidden", "true");
  } catch (e) {}
};

const Violation = ({ violation }: { violation: ViolationT }) => {
  const [more, setMore] = React.useState(false);
  return (
    <li>
      {violation.help} ({violation.nodes.length}).{" "}
      {!more ? (
        <a href="#" onClick={() => setMore(true)}>
          Show details
        </a>
      ) : (
        <>
          <ul>
            <li>ID: {violation.id}</li>
            <li>Impact: {violation.impact}</li>
            <li>Description: {violation.description}</li>
            <li>
              <a href={violation.helpUrl}>Documentation</a>
            </li>
          </ul>
          <p>Violating nodes:</p>
          <ul>
            {violation.nodes.map((node) => (
              <li key={node.html}>
                <Code>{node.html}</Code>
              </li>
            ))}
          </ul>
          <p>
            <a href="#" onClick={() => setMore(false)}>
              Hide details
            </a>
          </p>
        </>
      )}
    </li>
  );
};

const AxeReport = ({
  reportFinished,
  violations,
}: {
  reportFinished: boolean;
  violations: ViolationsT;
}) => {
  if (!reportFinished) return <p>Report is loading...</p>;
  if (violations.length === 0) {
    return (
      <p>
        There are no <a href="https://github.com/dequelabs/axe-core">axe</a>{" "}
        accessibility violations. Good job!
      </p>
    );
  }
  return (
    <>
      <h3>
        There are {violations.length}{" "}
        <a href="https://github.com/dequelabs/axe-core">axe</a> accessibility
        violations
      </h3>
      <ul>
        {violations.map((violation) => (
          <Violation key={violation.id} violation={violation} />
        ))}
      </ul>
    </>
  );
};

export const Button = ({ globalState }: AddonProps) => {
  const [showReport, setShowReport] = React.useState(false);
  const [reportFinished, setReportFinished] = React.useState(false);
  const [violations, setViolations] = React.useState<ViolationsT>([]);
  React.useEffect(() => {
    // re-run Axe on HMR updates, some timeout is needed to let the DOM settle
    watchers.push(() => {
      setTimeout(() => {
        const el = document.getElementById("ladle-root") as HTMLElement;
        // Addon Dialog aria hides the rest of page, we need to temporarily
        // make it visible for Axe function properly
        el.removeAttribute("aria-hidden");
        runAxe(setViolations, setReportFinished, el).catch(console.error);
      }, 50);
    });
  }, []);
  const text = "Show accessibility report.";
  const openReport = () => {
    runAxe(setViolations, setReportFinished, null).catch(console.error);
    // We give 100ms for axe to finish before displaying "Loading..."
    // inside of the dialog. Makes the UI transition to less jarring.
    setTimeout(() => setShowReport(!showReport), 100);
  };
  useHotkeys(
    config.hotkeys.a11y,
    () => (showReport ? setShowReport(false) : openReport()),
    {
      enabled: globalState.hotkeys && config.addons.a11y.enabled,
    },
  );
  return (
    <li>
      <button
        aria-label={text}
        data-testid="addon-a11y"
        title={text}
        onClick={openReport}
        className={showReport ? "a11y-active" : ""}
        type="button"
      >
        <A11y />
        <span className="ladle-addon-tooltip">{text}</span>
        <label>Accessibility report</label>
        {violations.length ? (
          <div className="ladle-badge">{violations.length}</div>
        ) : null}
        <Modal
          isOpen={showReport}
          close={() => setShowReport(false)}
          label="Dialog with the story accessibility report."
        >
          <AxeReport reportFinished={reportFinished} violations={violations} />
        </Modal>
      </button>
    </li>
  );
};
