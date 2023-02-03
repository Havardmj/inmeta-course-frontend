import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Course from "./course/Course";
import CourseProvider from "./contextprovider/CourseProvider";
import Participant from "./participant/Participant";

function App() {
  return (
    <CourseProvider>
      <BrowserRouter basename={"/"}>
        <Switch>
          <Route path="/kurs">
            <Course />
          </Route>
          <Route path="/deltaker">
            <Participant />
          </Route>
        </Switch>
      </BrowserRouter>
    </CourseProvider>
  );
}

export default App;
