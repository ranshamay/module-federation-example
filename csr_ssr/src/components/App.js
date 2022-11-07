import React, { lazy } from "react";
import { Helmet } from "react-helmet";

const Header = lazy(() => import("@core/Header"));

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

export default () => (
  <div>
    <Helmet>
      <title>SSR MF Example</title>
    </Helmet>
    <React.Suspense fallback={<h1>Loading....</h1>}>
      <Header user={user} logger={mockedLogger} />
    </React.Suspense>
  </div>
);
