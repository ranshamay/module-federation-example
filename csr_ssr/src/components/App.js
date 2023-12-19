import React, { StrictMode, useState } from "react";
import { ThemeProvider, getWindow } from "@fluentui/react";
import { I18nextProvider } from "react-i18next";
import { mockedLogger } from "../mocks/logger";
import Layout from "./Layout";
import Content from "./Content";
import LoginModal from "./LoginModal";

const Header = React.lazy(() => import("@layout/Header"));

const App = ({ i18nInstance, locale }) => {
  const window = getWindow();
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentRegion, handleRegionChange] = useState(
    (window && localStorage.getItem("region")) || "US"
  );

  const [currentLocale, handleLocaleChange] = useState(locale);
  const handleOpenSignInModal = () => {
    setModalOpen(true);
  };

  const userProps = {
    loading: false,
    signedIn: false,
    favoritesCount: 0,
    openSignInModal: handleOpenSignInModal,
  };

  const handlePersistentLocaleChange = (locale) => {
    !isSSR && localStorage.setItem("locale", locale);
    handleLocaleChange(locale);
  };

  const handlePersistentRegionChange = (region) => {
    window && localStorage.setItem("region", region);
    handleRegionChange(region);
  };

  const handleNavigation = (...args) => {
    console.log("NAVIGATION HANDLER", args);
  };

  const handleSearch = (...args) => {
    console.log("HANDLE SEARCH INVOKED:", args);
  };

  return (
    <StrictMode>
      <ThemeProvider>
        <I18nextProvider i18n={i18nInstance}>
          <Layout>
            <Header
              logger={mockedLogger}
              locale={currentLocale}
              onLocaleChange={(locale) => {
                handlePersistentLocaleChange(locale);
                window.location = `/${locale}`;
              }}
              onRegionChange={async (regionCode) => {
                handlePersistentRegionChange(regionCode);
              }}
              navigate={handleNavigation}
              userProps={userProps}
              searchProps={{ onSearch: handleSearch, filters: [] }}
            />
            <Content />
          </Layout>

          <LoginModal
            onDismiss={() => setModalOpen(false)}
            isOpen={isModalOpen}
          />
        </I18nextProvider>
      </ThemeProvider>
    </StrictMode>
  );
};

export default App;
