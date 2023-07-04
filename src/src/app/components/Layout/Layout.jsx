import React, { useState } from "react";

import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import LayoutSidenav from "./LayoutSidenav";
import LayoutTopbar from "./LayoutTopbar";
import MatxSuspense from "../MatxSuspense";
const LayoutRoot = styled(Box)(() => ({
  display: "flex",
}));
import Footer from "../Footer/Footer";
const LayoutContainer = styled(Box)(({ sidenavtheme }) => ({
  height: "100vh",
  display: "flex",
  flexGrow: "1",
  flexDirection: "column",
  verticalAlign: "top",
  marginLeft: sidenavtheme === "full" ? 260 : 80,
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s ease",
}));
const ContentBox = styled(Box)(() => ({
  height: "100%",
  display: "flex",
  overflowY: "auto",
  overflowX: "hidden",
  flexDirection: "column",
  justifyContent: "space-between",
}));
function Layout(props) {
  const [sidenavtheme, setsideNavTheme] = useState("full");
  const handleChangeSideNavTheme = () => {
    setsideNavTheme(
      "full" === sidenavtheme ? "compact" : "full"
      // ...sidenavtheme,
      // width: sidenavtheme.width === 80 ? 260 : 80,
      // sizeImage: sidenavtheme.sizeImage === "160px" ? "240px" : "160px",
      // displayText: sidenavtheme.displayText === "none" ? "" : "none",
    );
  };
  return (
    <>
      <LayoutRoot>
        <LayoutSidenav sidenavtheme={sidenavtheme} />
        <LayoutContainer sidenavtheme={sidenavtheme}>
          <LayoutTopbar handleChangeSideNavTheme={handleChangeSideNavTheme} />
          <ContentBox>
            <Box flexGrow={1} position="relative">
              <MatxSuspense>
                <Outlet />
              </MatxSuspense>
            </Box>
            <Footer />
          </ContentBox>
        </LayoutContainer>
      </LayoutRoot>
    </>
  );
}

export default Layout;
