import React, { FunctionComponent } from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import BEMHelper from "../utils/bem";
import "./navbar.less";

interface Props {
  tittel: string;
}

function MenuIcon() {
  return null;
}
// default
const Navbar: FunctionComponent<Props> = ({ tittel }: Props) => {
  const cls = BEMHelper("navbar");

  return (
    <div className={cls.className}>
      <AppBar position="static" color={"primary"} enableColorOnDark={true}>
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="primary"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="white" component="div">
            {tittel}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Navbar;
