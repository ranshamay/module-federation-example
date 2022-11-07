import React from "react";

const RemoteHeader = React.lazy(() => import("@core/Header"));

const mockedLogger = {
  info: console.info,
  warning: console.warn,
  error: console.error,
  debug: console.debug,
  flush: () => {
    console.log("=======================");
    console.info("---- LOGGER FLUSH ----");
    console.log("=======================");
  },
};

const user = {
  loading: false,
  signedIn: false,
  displayName: "",
  email: "",
  tenantDetails: {
    tenantId: null,
    displayName: null,
    defaultDomain: null,
  },
};
const App = () => (
  <div>
    <React.Suspense fallback="Loading Button Container">
      <RemoteHeader user={user} logger={mockedLogger} />
    </React.Suspense>
  </div>
);

export default App;
