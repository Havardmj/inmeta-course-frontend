import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { Button, TextField, Typography } from "@mui/material";
import { CourseContext } from "../contextprovider/CourseProvider";
import { Course as CourseData, Course } from "../services/rest-service";
import BEMHelper from "../utils/bem";
import "./courseEdit.less";
import * as RestService from "../services/rest-service";

const CourseEdit: FunctionComponent = () => {
  const { selectedCourse, setCourses } = useContext(CourseContext);
  const [course, setCourse] = useState<Course>(selectedCourse);
  const [canEdit, setCanEdit] = useState<boolean>(true);
  const cls = BEMHelper("course-edit");

  const updateCourseContext = () => {
    const allCourses = RestService.getAllCourses();
    allCourses.then((response: CourseData[]) => {
      setCourses(response);
    });
  };

  useEffect(() => {
    if (course !== selectedCourse) {
      setCourse(selectedCourse);
    }
  }, [selectedCourse]);

  return (
    <div className={cls.className}>
      <div className={cls.element("info")}>
        <div className={cls.element("row")}>
          <TextField
            id="standard-read-only-input"
            label={"Kursnavn"}
            value={course.courseName}
            InputProps={{
              readOnly: canEdit,
            }}
            onChange={(event) => {
              setCourse({ ...course, courseName: event.target.value });
            }}
            variant="standard"
          />
          <TextField
            id="filled-read-only-input"
            label={"Kurs veileder"}
            value={course.instructor}
            InputProps={{
              readOnly: canEdit,
            }}
            onChange={(event) => {
              setCourse({ ...course, instructor: event.target.value });
            }}
            variant="standard"
          />
        </div>
        <div className={cls.element("row", "next")}>
          <TextField
            id="filled-read-only-input"
            label={"Kurs start"}
            value={course.courseBegin}
            InputProps={{
              readOnly: canEdit,
            }}
            onChange={(event) => {
              setCourse({ ...course, courseBegin: event.target.value });
            }}
            variant="standard"
          />
          <TextField
            id="filled-read-only-input"
            label={"Kurs slutt"}
            value={course.courseEnd}
            InputProps={{
              readOnly: canEdit,
            }}
            onChange={(event) => {
              setCourse({ ...course, courseEnd: event.target.value });
            }}
            variant="standard"
          />
        </div>
        <div className={cls.element("row", "next")}>
          <TextField
            id="filled-read-only-input"
            label={"sted"}
            value={course.room}
            InputProps={{
              readOnly: canEdit,
            }}
            onChange={(event) => {
              setCourse({ ...course, room: event.target.value });
            }}
            variant="standard"
          />
          <div className={cls.element("deltakere")}>
            <Typography>
              Antall deltakere: {course.participant.length}
            </Typography>
          </div>
        </div>
      </div>
      <div className={cls.element("oppdatere")}>
        <Button
          variant="outlined"
          onClick={() => {
            setCanEdit((prevState) => !prevState);
          }}
        >
          {canEdit ? "Oppdatere kurs info" : "avbryt"}
        </Button>
        {!canEdit && (
          <Button
            variant="contained"
            onClick={() => {
              const response = RestService.updateCourseInformasjon(
                {
                  courseName: course.courseName,
                  instructor: course.instructor,
                  courseBegin: course.courseBegin,
                  courseEnd: course.courseEnd,
                  room: course.room,
                },
                selectedCourse.id
              );
              response.then((res) => {
                if (res.status >= 200 || res.status <= 300) {
                  setCanEdit(true);
                  updateCourseContext();
                }
              });
            }}
          >
            Oppdatere informasjon
          </Button>
        )}
      </div>
    </div>
  );
};
export default CourseEdit;
