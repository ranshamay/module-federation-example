import React, { lazy } from "react";
import { Helmet } from "react-helmet";

const Header = lazy(() => import("@core/Header"));
export default () => (
  <div>
    <Helmet>
      <title>SSR MF Example</title>
    </Helmet>
    <React.Suspense fallback={<h1>Loading....</h1>}>
      <Header />
    </React.Suspense>
  </div>
);
