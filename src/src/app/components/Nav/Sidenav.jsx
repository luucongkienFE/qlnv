import React from "react";
import { NavLink } from "react-router-dom";
import { Box, ButtonBase, Icon, styled } from "@mui/material";
import { Paragraph, Span } from "../Typography";
import NavExpansionPanel from "./NavExpansionPanel";
const ExtAndIntCommon = {
  display: "flex",
  overflow: "hidden",
  borderRadius: "4px",
  height: 44,
  whiteSpace: "pre",
  marginBottom: "8px",
  textDecoration: "none",
  justifyContent: "space-between",
  transition: "all 150ms ease-in",
  "&:hover": { background: "rgba(255, 255, 255, 0.08)" },
  "&.compactNavItem": {
    overflow: "hidden",
    justifyContent: "center !important",
  },
  "& .icon": {
    fontSize: "18px",
    // color: "red",
    verticalAlign: "middle",
  },
};
const ListLabel = styled(Paragraph)(({ sidenavtheme }) => ({
  fontSize: "12px",
  marginTop: "20px",
  marginLeft: "24px",
  marginBottom: "10px",
  textTransform: "uppercase",
  color: "#FFFFFFB3",
  display: sidenavtheme === "full" ? "" : "none",
}));
const InternalLink = styled(Box)(() => ({
  "& a": {
    ...ExtAndIntCommon,
    color: "#FFFFFF",
  },
  "& .navItemActive": {
    backgroundColor: "rgba(255, 255, 255, 0.16)",
  },
}));
const StyledText = styled(Span)(({ sidenavtheme }) => ({
  fontSize: "0.875rem",
  paddingLeft: "0.8rem",
  lineHeight: "1.5",
  display: sidenavtheme === "full" ? "" : "none",
}));

function Sidenav({ items, sidenavtheme }) {
  const renderLevels = (data) => {
    return data.map((item, index) => {
      if (item.type === "label")
        return (
          <ListLabel sidenavtheme={sidenavtheme} key={index}>
            {item.label}
          </ListLabel>
        );

      if (item.children) {
        return (
          <NavExpansionPanel sidenavtheme={sidenavtheme} item={item} key={index}>
            {renderLevels(item.children)}
          </NavExpansionPanel>
        );
      } else {
        return (
          <InternalLink key={index}>
            <NavLink to={item.path} className={"compactNavItem"}>
              <ButtonBase key={item.name} name="child" sx={{ width: "100%", paddingLeft: 2 }}>
                <Icon
                  className="icon"
                  sx={{ width: 36, margin: sidenavtheme === "full" ? "0 0 0 20px" : "0 auto" }}
                >
                  {item.icon}
                </Icon>

                <StyledText sidenavtheme={sidenavtheme}>{item.name}</StyledText>

                <Box mx="auto" />
              </ButtonBase>
            </NavLink>
          </InternalLink>
        );
      }
    });
  };
  return (
    <>
      <div className="navigation">{renderLevels(items)}</div>
    </>
  );
}

export default Sidenav;
