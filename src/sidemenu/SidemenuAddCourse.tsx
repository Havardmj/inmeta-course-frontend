import React, { FunctionComponent, useContext, useState } from "react";
import BEMHelper from "../utils/bem";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import "./sideMenuAddCourse.less";
import AddCourseModal from "../course/AddCourseModal";
import * as RestService from "../services/rest-service";
import { Course as CourseData } from "../services/rest-service";
import { CourseContext } from "../contextprovider/CourseProvider";

const SidemenuAddCourse: FunctionComponent = () => {
  const { setCourses } = useContext(CourseContext);
  const cls = BEMHelper("sidemenuAddCourse");
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
              <ListItemText>Nytt kurs</ListItemText>
            </MenuItem>
          </div>
        </MenuList>
      </Paper>
      <AddCourseModal
        open={modalOpen}
        handleClose={() => {
          setModalOpen(false);
          updateCourseContext();
        }}
      />
    </div>
  );
};
export default SidemenuAddCourse;
