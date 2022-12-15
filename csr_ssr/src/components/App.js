import React from "react";
import { ThemeProvider, initializeIcons, Stack, mergeStyleSets, Icon, Text } from "@fluentui/react";
import * as ReactIcons from '@fluentui/react-icons-mdl2';

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
const styles = mergeStyleSets({
  container: {
    flex: "1 1 auto",
  },
  children: {
    height: "calc(100vh - 92px)",
    paddingBottom: '15vh',
  },
  underConstructionFont: {
    fontSize: 100
  }
})
initializeIcons()
export default () => {
  return (
    <ThemeProvider>
      <I18nextProvider i18n={i18n}>
        <React.Suspense fallback={<h1>Loading....</h1>}>
          <Header user={user} logger={mockedLogger} />
        </React.Suspense>
        <Stack horizontalAlign="center" className={styles.container}><Stack className={styles.children} verticalAlign="center"><Stack tokens={{ childrenGap: 15 }} horizontalAlign="center"><Stack.Item><Text variant="xxLarge">Under Construction</Text></Stack.Item><Stack.Item><Icon className={styles.underConstructionFont} ><ReactIcons.BuildDefinitionIcon /></Icon></Stack.Item></Stack></Stack></Stack>
      </I18nextProvider>
    </ThemeProvider>
  );
};






