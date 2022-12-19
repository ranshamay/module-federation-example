import React, { useState } from "react";
import { ThemeProvider, initializeIcons, Stack, mergeStyleSets, Icon, Text, Modal, IconButton } from "@fluentui/react";
import * as ReactIcons from '@fluentui/react-icons-mdl2';
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import RestClient from "@core/RestClient"
import i18nInit from './i18n'

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


const isSSR = typeof window === 'undefined';

const getAccessToken = async (tokenType) => {
  let resp;
  try {
    console.log('fetching token')
    return 'accessToken';
  } catch (err) {
    mockedLogger.error(
      JSON.stringify({
        err,
      })
    );
  }
  return null;
};

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



const user = {
  loading: false,
  signedIn: false,
  displayName: "test1123",
  email: "test@test.com",
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

//init 
!isSSR && i18nInit();
initializeIcons()
RestClient.init(mockedLogger, getAccessToken);


//render
export default () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenSignInModal = (args) => {
    setModalOpen(true)
  };


  return (
    <ThemeProvider>
      <I18nextProvider i18n={i18n}>
        <React.Suspense fallback={<h1>Loading....</h1>}>
          <Header user={user} logger={mockedLogger} openSignInModal={handleOpenSignInModal} />
        </React.Suspense>
        <Modal
          isOpen={isModalOpen}
          onDismiss={() => setModalOpen(false)}
          isBlocking={false}
        >
          <div>
            <h2 >
              Login modal
            </h2>
            <IconButton
              onClick={() => setModalOpen(false)}
            />
          </div>
          <div>
            <p>
              this is a login modal
            </p>
          </div>
        </Modal>
        <Stack horizontalAlign="center" className={styles.container}><Stack className={styles.children} verticalAlign="center"><Stack tokens={{ childrenGap: 15 }} horizontalAlign="center"><Stack.Item><Text variant="xxLarge">Under Construction</Text></Stack.Item><Stack.Item><Icon className={styles.underConstructionFont} ><ReactIcons.BuildDefinitionIcon /></Icon></Stack.Item></Stack></Stack></Stack>
      </I18nextProvider>
    </ThemeProvider>
  );
};






