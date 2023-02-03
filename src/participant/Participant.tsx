import React, { FunctionComponent, useContext, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import Grid from "@mui/material/Unstable_Grid2";
import SideMenu from "../sidemenu/SideMenu";
import SidemenuAddCourse from "../sidemenu/SidemenuAddCourse";
import BEMHelper from "../utils/bem";
import { CourseContext } from "../contextprovider/CourseProvider";
import * as RestService from "../services/rest-service";
import { Course as CourseData } from "../services/rest-service";
import CourseList from "./CourseList";
import ParticipantTable from "./ParticipantTable";
import "./participant.less";

const Participant: FunctionComponent = () => {
  const cls = BEMHelper("participant");
  const { setCourses, selectedCourse } = useContext(CourseContext);

  useEffect(() => {
    const allCourses = RestService.getAllCourses();
    allCourses.then((response: CourseData[]) => {
      setCourses(response);
    });
  }, []);

  return (
    <div>
      <Navbar tittel="deltaker administrasjon" />
      <div className={cls.className}>
        <Grid container spacing={0}>
          <Grid xs={6} md={3}>
            <SideMenu />
            <SidemenuAddCourse />
          </Grid>
          <Grid xs={6} md={3}>
            <div>
              <CourseList />
            </div>
          </Grid>
          <Grid xs={6} md={5}>
            <div>
              <ParticipantTable />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default Participant;
