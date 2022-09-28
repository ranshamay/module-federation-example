import React from "react";

const RemoteHeader = React.lazy(() => import("@core/Header"));

const App = () => (
  <div>
    <React.Suspense fallback="Loading Button Container">
      <RemoteHeader />
    </React.Suspense>
  </div>
);

export default App;
