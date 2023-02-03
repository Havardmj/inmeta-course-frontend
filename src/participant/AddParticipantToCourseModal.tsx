import React, {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  Modal,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import { costumModalstyle } from "../course/AddCourseModal";
import { Course, Participant } from "../services/rest-service";
import BEMHelper from "../utils/bem";
import "./addParticipantToCourseModal.less";
import * as RestService from "../services/rest-service";
import { CourseContext } from "../contextprovider/CourseProvider";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";

interface Props {
  open: boolean;
  handleClose: (close: boolean) => void;
}

const AddParticipantToCourseModal: FunctionComponent<Props> = ({
  open,
  handleClose,
}: Props) => {
  const cls = BEMHelper("addParticipant-modal");
  const { courses, currentCourseCheckedOn, setCheckedCourseForParticipant } =
    useContext(CourseContext);
  const [choosenCourse, setChoosenCourse] = useState<Course | undefined>(
    undefined
  );
  const [addParticipant, setAddParticipant] = useState<Participant>({
    firstName: "",
    lastName: "",
    emailAddress: "",
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={costumModalstyle}>
          <div className={cls.element("wrapper")}>
            <div>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="valg av kurs">Kurs</InputLabel>
                <Select
                  labelId="multiple-checkbox"
                  id="multiple-checkbox"
                  multiple
                  value={courses}
                  onChange={(event) => {
                    const cindex =
                      event.target.value[event.target.value.length - 1];
                    setChoosenCourse(courses[parseInt(cindex.toString(), 10)]);
                  }}
                  input={<OutlinedInput label="Kurs" />}
                >
                  {courses.map((course: Course, index: number) => (
                    <MenuItem key={index} value={index}>
                      <Checkbox checked={course.id === choosenCourse?.id} />
                      <ListItemText primary={course.courseName} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className={cls.element("input-fields")}>
              <div className={cls.element("row", "next")}>
                <TextField
                  id="filled-read-only-input"
                  label={"Fornavn"}
                  value={addParticipant?.firstName}
                  onChange={(event) => {
                    setAddParticipant({
                      ...addParticipant,
                      firstName: event.target.value,
                    });
                  }}
                  variant="standard"
                />
                <TextField
                  id="filled-read-only-input"
                  label={"Etternavn"}
                  value={addParticipant.lastName}
                  onChange={(event) => {
                    setAddParticipant({
                      ...addParticipant,
                      lastName: event.target.value,
                    });
                  }}
                  variant="standard"
                />
              </div>
              <div className={cls.element("row", "next")}>
                <TextField
                  id="filled-read-only-input"
                  label={"email adresse"}
                  value={addParticipant.emailAddress}
                  onChange={(event) => {
                    setAddParticipant({
                      ...addParticipant,
                      emailAddress: event.target.value,
                    });
                  }}
                  variant="standard"
                />
              </div>

              <div className={cls.element("submit-course")}>
                <Button
                  variant="contained"
                  onClick={() => {
                    if (
                      addParticipant?.firstName &&
                      addParticipant.lastName &&
                      addParticipant.emailAddress &&
                      choosenCourse
                    ) {
                      const response = RestService.addParticipantToCourse(
                        choosenCourse.id,
                        addParticipant
                      );
                      response.then((res) => {
                        if (res.status >= 200 || res.status <= 300) {
                          handleClose(false);
                          setAddParticipant({
                            firstName: "",
                            lastName: "",
                            emailAddress: "",
                          });
                        }
                      });
                    }
                  }}
                >
                  Legg til kurs
                </Button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default AddParticipantToCourseModal;
