import React, {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useState,
} from "react";
import { Button, Modal, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { addCourse, Course } from "../services/rest-service";
import BEMHelper from "../utils/bem";
import "./addCourseModal.less";
import * as RestService from "../services/rest-service";

interface Props {
  open: boolean;
  handleClose: Dispatch<SetStateAction<boolean>>;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddCourseModal: FunctionComponent<Props> = ({
  open,
  handleClose,
}: Props) => {
  const cls = BEMHelper("add-course-modal");
  const [addCourse, setAddCourse] = useState<Partial<Course>>({
    courseName: "",
    instructor: "",
    courseBegin: "",
    courseEnd: "",
  });

  return (
    <div className={cls.className}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <div className={cls.element("row")}>
              <TextField
                id="standard-read-only-input"
                label={"Kursnavn"}
                value={addCourse.courseName}
                onChange={(event) => {
                  setAddCourse({
                    ...addCourse,
                    courseName: event.target.value,
                  });
                }}
                variant="standard"
              />
              <TextField
                id="filled-read-only-input"
                label={"Kurs veileder"}
                value={addCourse.instructor}
                onChange={(event) => {
                  console.log("test ", event.target.value);
                  setAddCourse({
                    ...addCourse,
                    instructor: event.target.value,
                  });
                }}
                variant="standard"
              />
            </div>
            <div className={cls.element("row", "next")}>
              <TextField
                id="filled-read-only-input"
                label={"Kurs start"}
                value={addCourse.courseBegin}
                onChange={(event) => {
                  setAddCourse({
                    ...addCourse,
                    courseBegin: event.target.value,
                  });
                }}
                variant="standard"
              />
              <TextField
                id="filled-read-only-input"
                label={"Kurs slutt"}
                value={addCourse.courseEnd}
                onChange={(event) => {
                  setAddCourse({ ...addCourse, courseEnd: event.target.value });
                }}
                variant="standard"
              />
            </div>
            <div className={cls.element("row", "next")}>
              <TextField
                id="filled-read-only-input"
                label={"sted"}
                value={addCourse.room}
                onChange={(event) => {
                  setAddCourse({ ...addCourse, room: event.target.value });
                }}
                variant="standard"
              />
            </div>
            <div className={cls.element("submit-course")}>
              <Button
                variant="contained"
                onClick={() => {
                  if (
                    (addCourse.courseName &&
                      addCourse.instructor &&
                      addCourse.courseBegin,
                    addCourse.courseEnd,
                    addCourse.room)
                  ) {
                    RestService.addCourse(addCourse);
                  }
                }}
              >
                Legg til kurs
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default AddCourseModal;
