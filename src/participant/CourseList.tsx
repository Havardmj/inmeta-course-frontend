import React, { FunctionComponent, useContext } from "react";
import {
  Avatar,
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  Typography,
} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import { CourseContext } from "../contextprovider/CourseProvider";
import { Course } from "../services/rest-service";
import BEMHelper from "../utils/bem";
import "./courseList.less";

const CourseList: FunctionComponent = () => {
  const cls = BEMHelper("course-list");
  const { courses, setCheckedCourseForParticipant } = useContext(CourseContext);

  return (
    <div className={cls.className}>
      <div className={cls.element("header")}>
        <Typography variant={"h6"}>Kurs</Typography>
      </div>
      <div className={cls.element("list-container")}>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {courses &&
            courses.map((course: Course, index: number) => {
              return (
                <div className={cls.className} key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemButton
                      onClick={() => {
                        setCheckedCourseForParticipant(index);
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          alt="Course"
                          src="/static/images/avatar/1.jpg"
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={course.courseName}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {course.instructor}
                            </Typography>
                            {course.courseBegin} - {course.courseEnd} / rom:{" "}
                            {course.room}
                          </React.Fragment>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                </div>
              );
            })}
        </List>
      </div>
    </div>
  );
};
export default CourseList;
