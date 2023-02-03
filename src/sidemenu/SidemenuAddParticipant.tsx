import React, { FunctionComponent, useState } from "react";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import AddIcon from "@mui/icons-material/Add";
import ListItemText from "@mui/material/ListItemText";
import BEMHelper from "../utils/bem";
import "./sideMenuAddParticipant.less";

const SidemenuAddParticipant: FunctionComponent = () => {
  const cls = BEMHelper("sidemenuAddParticipant");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <div className={cls.className}>
      <Paper sx={{ width: 320, maxWidth: "100%" }}>
        <MenuList>
          <div className={cls.element("menulist")}>
            <MenuItem
              onClick={() => {
                setModalOpen(true);
              }}
            >
              <ListItemIcon>
                <AddIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Ny Deltaker</ListItemText>
            </MenuItem>
          </div>
        </MenuList>
      </Paper>
    </div>
  );
};
export default SidemenuAddParticipant;
