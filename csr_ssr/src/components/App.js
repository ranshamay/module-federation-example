import React from "react";
import { Helmet } from "react-helmet";
import { initializeIcons, ThemeProvider } from "@fluentui/react";

const Header = React.lazy(() => {
  const mod = import("@core/Header").catch(console.error);
  return mod;
});
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
initializeIcons();
export default () => (
  <div>
    <Helmet>
      <title>SSR MF Example</title>
    </Helmet>
    <ThemeProvider>
      <React.Suspense fallback={<h1>Loading....</h1>}>
        <Header user={user} logger={mockedLogger} />
      </React.Suspense>
    </ThemeProvider>
  </div>
);
