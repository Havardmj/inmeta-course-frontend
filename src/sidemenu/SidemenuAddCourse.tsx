import React, { FunctionComponent, useState } from "react";
import BEMHelper from "../utils/bem";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import "./sideMenuAddCourse.less";
import AddCourseModal from "../course/AddCourseModal";

const SidemenuAddCourse: FunctionComponent = () => {
  const cls = BEMHelper("sidemenuAddCourse");
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
              <ListItemText>Nytt kurs</ListItemText>
            </MenuItem>
          </div>
        </MenuList>
      </Paper>
      <AddCourseModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
      />
    </div>
  );
};
export default SidemenuAddCourse;
