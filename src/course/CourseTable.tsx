import React, { FunctionComponent, useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Course } from "../services/rest-service";
import { CourseContext } from "../contextprovider/CourseProvider";
import { Checkbox } from "@mui/material";

const CourseTable: FunctionComponent<{}> = () => {
  const { courses, currentCourseCheckedOn, setCheckedCourse } =
    useContext(CourseContext);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Kurs navn</TableCell>
              <TableCell align="right">Instruktør</TableCell>
              <TableCell align="right">Rom</TableCell>
              <TableCell align="right">Kurs start</TableCell>
              <TableCell align="right">Kurs slutt</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses ? (
              courses.map((course: Course, index: number) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <div>
                      <Checkbox
                        checked={currentCourseCheckedOn === index}
                        onChange={() => setCheckedCourse(index)}
                      />
                      {course.courseName}
                    </div>
                  </TableCell>
                  <TableCell align="right">{course.instructor}</TableCell>
                  <TableCell align="right">{course.room}</TableCell>
                  <TableCell align="right">{course.courseBegin}</TableCell>
                  <TableCell align="right">{course.courseEnd}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Ingen kurs registrert
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default CourseTable;
