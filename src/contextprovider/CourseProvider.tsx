import React, {
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { Course } from "../services/rest-service";

interface Context {
  courses: Array<Course>;

  selectedCourse: Course;
  currentCourseCheckedOn: number;
  setCourses: (courses: Array<Course>) => void;
  setCheckedCourse: (courseIndex: number) => void;
}

export const CourseContext = React.createContext<Context>({} as Context);

const CourseProvider: FunctionComponent = (props: PropsWithChildren<{}>) => {
  const [currentlist, setCurrentlist] = useState<Array<Course>>([]);
  const [checkedOn, setCheckedOn] = useState<number | undefined>();
  const [currentSelectedCourse, setCurrentSelectedCourse] = useState<
    Course | undefined
  >();

  const setCourses = (courses: Array<Course>): void => {
    setCurrentlist(courses);
  };

  const setCheckedCourse = (courseIndex: number) => {
    setCheckedOn((prevState) => {
      setCurrentSelectedCourse(
        prevState === courseIndex ? undefined : currentlist[courseIndex]
      );
      return prevState === courseIndex ? undefined : courseIndex;
    });
  };

  const context: Context = {
    courses: currentlist,
    setCourses,
    currentCourseCheckedOn: checkedOn as number,
    setCheckedCourse,
    selectedCourse: currentSelectedCourse as Course,
  };

  return (
    <CourseContext.Provider value={context}>
      {props.children}
    </CourseContext.Provider>
  );
};
export default CourseProvider;
