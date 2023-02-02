import axios from "axios";
import { UpdateCourse } from "../types/course";

const api = axios.create({
  baseURL: "/course/api",
  withCredentials: true,
  headers: {
    Pragma: "no-cache",
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
  },
});

const COURSE = "/course";

export interface Course {
  id: string;
  courseName: string;
  instructor: string;
  room: string;
  courseBegin: string;
  courseEnd: string;
  participant: Array<Participant>;
}

export interface Participant {
  firstName: string;
  lastName: string;
  emailAddress: string;
}

export const getAllCourses = async (): Promise<Array<Course>> => {
  const response = await api.get(COURSE + "/get-all-courses", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const updateCourseInformasjon = async (
  updateCourse: UpdateCourse,
  id: string
): Promise<void> => {
  const response = await api.put(COURSE + `/edit-course/${id}`, updateCourse, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
