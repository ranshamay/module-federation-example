import React, { useState } from "react";
import {
  ThemeProvider,
  Stack,
  mergeStyleSets,
  Icon,
  Text,
  Modal,
  IconButton,
} from "@fluentui/react";
import * as ReactIcons from "@fluentui/react-icons-mdl2";
import { I18nextProvider } from "react-i18next";

export const mockedLogger = {
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

export const isSSR = typeof window === "undefined";

const Header = React.lazy(async () => {
  let mod;
  try {
    mod = await import("@layout/Header");
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
    paddingBottom: "15vh",
  },
  underConstructionFont: {
    fontSize: 100,
  },
});

//render
const App = ({ i18nInstance, locale }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentRegion, handleRegionChange] = useState(!isSSR && localStorage.getItem('region') || '');
  const [currentLocale, handleLocaleChange] = useState(locale);
  const handleOpenSignInModal = () => {
    setModalOpen(true);
  };

  const handlePersistentLocaleChange = (locale) => {
    !isSSR && localStorage.setItem("locale", locale);
    handleLocaleChange(locale)
  }

  const handlePersistentRegionChange = (region) => {
    !isSSR && localStorage.setItem("region", region);
    handleRegionChange(region)
  }

  return (
    <ThemeProvider>
      <I18nextProvider i18n={i18nInstance}>
        <React.Suspense fallback={<h1>Loading....</h1>}>
          <Header
            user={user}
            logger={mockedLogger}
            openSignInModal={handleOpenSignInModal}
            locale={currentLocale}
            onLocaleChange={(locale) => {
              handlePersistentLocaleChange(locale)
              window.location = `/${locale}`;
            }}
            region={{ code: currentRegion, disable: false }}
            onRegionChange={async (regionCode) => {
              handlePersistentRegionChange(regionCode)
            }}
          />
        </React.Suspense>
        <Modal
          isOpen={isModalOpen}
          onDismiss={() => setModalOpen(false)}
          isBlocking={false}
        >
          <div>
            <h2>Login modal</h2>
            <IconButton onClick={() => setModalOpen(false)} />
          </div>
          <div>
            <p>this is a login modal</p>
          </div>
        </Modal>
        <Stack horizontalAlign="center" className={styles.container}>
          <Stack className={styles.children} verticalAlign="center">
            <Stack tokens={{ childrenGap: 15 }} horizontalAlign="center">
              <Stack.Item>
                <Text variant="xxLarge">Under Construction</Text>
              </Stack.Item>
              <Stack.Item>
                <Icon className={styles.underConstructionFont}>
                  <ReactIcons.BuildDefinitionIcon />
                </Icon>
              </Stack.Item>
            </Stack>
          </Stack>
        </Stack>
      </I18nextProvider>
    </ThemeProvider>
  );
};

export default App;
