import React, { FunctionComponent, useContext, useState } from "react";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import AddIcon from "@mui/icons-material/Add";
import ListItemText from "@mui/material/ListItemText";
import BEMHelper from "../utils/bem";
import "./sideMenuAddParticipant.less";
import AddParticipantToCourseModal from "../participant/AddParticipantToCourseModal";
import { CourseContext } from "../contextprovider/CourseProvider";
import * as RestService from "../services/rest-service";
import { Course as CourseData } from "../services/rest-service";

const SidemenuAddParticipant: FunctionComponent = () => {
  const { setCourses } = useContext(CourseContext);
  const cls = BEMHelper("sidemenuAddParticipant");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const updateCourseContext = () => {
    const allCourses = RestService.getAllCourses();
    allCourses.then((response: CourseData[]) => {
      setCourses(response);
    });
  };

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
      <AddParticipantToCourseModal
        open={modalOpen}
        handleClose={() => {
          setModalOpen(false);
          updateCourseContext();
        }}
      />
    </div>
  );
};
export default SidemenuAddParticipant;
