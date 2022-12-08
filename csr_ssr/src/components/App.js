import React from "react";
import { ThemeProvider } from "@fluentui/react";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";

const Header = React.lazy(async () => {
  let mod;
  try {
    mod = await import("@core/Header");
  } catch (err) {
    console.log(err);
    mod = await import("./OfflineRemote");
  }
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
  displayName: "test1123",
  email: "test@test.com",
  tenantDetails: {
    tenantId: null,
    displayName: null,
    defaultDomain: null,
  },
};
export default () => {
  return (
    <ThemeProvider>
      <I18nextProvider i18n={i18n}>
        <React.Suspense fallback={<h1>Loading....</h1>}>
          <Header user={user} logger={mockedLogger} />
        </React.Suspense>
      </I18nextProvider>
    </ThemeProvider>
  );
};
