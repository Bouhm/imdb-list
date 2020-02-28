import React from "react";
import ReactDOM from "react-dom";
import { ClassImdbApp } from "./classes/App";
import { HooksApp } from "./hooks/App";
import "./index.css";

const implementation = process.env.REACT_APP_IMPL ? process.env.REACT_APP_IMPL.trim() : "hooks";
ReactDOM.render(implementation === "hooks" ? <HooksApp /> : <ClassImdbApp />, document.getElementById("root"));