import { Stack } from "@fluentui/react";
import React from "react";

const Layout = ({ children }) => {
  return (
    <Stack as="main" grow styles={{ root: { height: "100vh" } }}>
      {children}
    </Stack>
  );
};

export default Layout;
