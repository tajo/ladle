import type { Story } from "@ladle/react";
import "./styles.css";

export const Iframed: Story = () => <h1>Iframed</h1>;
Iframed.meta = {
  iframed: true,
};

export const NoIframe: Story = () => <h1>No Iframe</h1>;

export const SetCustom: Story = () => <h1>Width set</h1>;
SetCustom.meta = {
  width: 555,
};

export const SetSmall: Story = () => <h1>Width set</h1>;
SetSmall.meta = {
  width: "small",
};
