import React from "react";

// const RemoteButtonContainer = React.lazy(() => import("app2/ButtonContainer"));
// const RemoteButton = React.lazy(() => import("app3/Button"));
const RemoteHeader = React.lazy(() => import("@core/Header"));

const App = () => (
  <div>
    <h1>Nested</h1>
    <h2>App 1</h2>
    <p>app 1 body1</p>
    <React.Suspense fallback="Loading Button Container">
      {/* <RemoteButtonContainer /> */}
      {/* <RemoteButton /> */}
      <RemoteHeader endpointUrl="https://agoras-pr-dm-capp--2022082818.nicedesert-1f4330ea.centralus.azurecontainerapps.io" />
    </React.Suspense>
  </div>
);

export default App;
