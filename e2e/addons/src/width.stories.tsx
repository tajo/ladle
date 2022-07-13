import "./styles.css";

export const Iframed = () => <h1>Iframed</h1>;
Iframed.meta = {
  iframed: true,
};

export const NoIframe = () => <h1>No Iframe</h1>;

export const SetCustom = () => <h1>Width set</h1>;
SetCustom.meta = {
  width: 555,
};

export const SetSmall = () => <h1>Width set</h1>;
SetSmall.meta = {
  width: "small",
};
