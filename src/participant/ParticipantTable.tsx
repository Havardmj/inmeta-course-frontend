import React, { FunctionComponent, useContext, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { Participant } from "../services/rest-service";
import { Checkbox, Typography } from "@mui/material";
import { CourseContext } from "../contextprovider/CourseProvider";
import BEMHelper from "../utils/bem";
import "./participantTable.less";

const ParticipantTable: FunctionComponent = () => {
  const cls = BEMHelper("participant-table");
  const { courses, currentCourseCheckedOn, setCheckedCourseForParticipant } =
    useContext(CourseContext);

  useEffect(() => {
    setCheckedCourseForParticipant(0);
  }, []);

  return (
    <div className={cls.className}>
      <div className={cls.element("header")}>
        <Typography variant={"h6"}>
          {courses && currentCourseCheckedOn != null
            ? `Deltakere for kurs - ${courses[currentCourseCheckedOn].courseName}`
            : "Kurs"}
        </Typography>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Deltaker fornavn</TableCell>
              <TableCell align="right">Deltaker etternavn</TableCell>
              <TableCell align="right">email adresse</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses && currentCourseCheckedOn != null ? (
              courses[currentCourseCheckedOn].participant.map(
                (participant: Participant, index: number) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <div>
                        <Checkbox />
                        <Checkbox />
                        {participant.firstName}
                      </div>
                    </TableCell>
                    <TableCell align="right">{participant.lastName}</TableCell>
                    <TableCell align="right">
                      {participant.emailAddress}
                    </TableCell>
                  </TableRow>
                )
              )
            ) : (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Ingen kurs valgt
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default ParticipantTable;
