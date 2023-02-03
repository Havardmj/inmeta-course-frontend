import React, { useContext, useEffect } from "react";
import * as RestService from "../services/rest-service";
import Navbar from "../navbar/Navbar";
import BEMHelper from "../utils/bem";
import "./course.less";
import Grid from "@mui/material/Unstable_Grid2";
import SideMenu from "../sidemenu/SideMenu";
import CourseTable from "./CourseTable";
import { CourseContext } from "../contextprovider/CourseProvider";
import { Course as CourseData } from "../services/rest-service";
import ItemContainer from "./ItemContainer";
import CourseEdit from "./CourseEdit";
import SidemenuAddCourse from "../sidemenu/SidemenuAddCourse";

const Course: React.FunctionComponent = () => {
  const cls = BEMHelper("course");
  const { setCourses, selectedCourse } = useContext(CourseContext);

  useEffect(() => {
    const allCourses = RestService.getAllCourses();
    allCourses.then((response: CourseData[]) => {
      setCourses(response);
    });
  }, []);

  return (
    <div>
      <Navbar tittel="Kurs administrasjon" />
      <div className={cls.className}>
        <Grid container spacing={2}>
          <Grid xs={6} md={4}>
            <SideMenu />
            <SidemenuAddCourse />
          </Grid>
          <Grid xs={6} md={8}>
            <div className={cls.element("content-wrapper")}>
              <CourseTable />
              {selectedCourse && (
                <div className={cls.element("item-wrapper")}>
                  <ItemContainer>
                    <div className={cls.element("item-container")}>
                      <CourseEdit />
                    </div>
                  </ItemContainer>
                </div>
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default Course;
