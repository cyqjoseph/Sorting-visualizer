import React from "react";
import { SortArray } from "./models/SortArray";
import "bootstrap/dist/css/bootstrap.min.css";

function App(): JSX.Element {
  console.log(new SortArray(30).initializeSortArray());
  return <div></div>;
}

export default App;
