declare const __filename_root: string;
declare const __dirname_root: string;
declare const __filename_myPlugin: string;
declare const __dirname_myPlugin: string;

export const World = () => {
  return (
    <div>
      <h1>Hello World</h1>

      <dl>
        <dt>filename root</dt>
        <dd data-test="filename_root">{__filename_root}</dd>

        <dt>dirname root</dt>
        <dd data-test="dirname_root">{__dirname_root}</dd>

        <dt>filename myPlugin</dt>
        <dd data-test="filename_myPlugin">{__filename_myPlugin}</dd>

        <dt>dirname myPlugin</dt>
        <dd data-test="dirname_myPlugin">{__dirname_myPlugin}</dd>
      </dl>
    </div>
  );
};
