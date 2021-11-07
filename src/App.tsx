import React from "react";
import { SortArray } from "./models/SortArray";
function App(): JSX.Element {
  console.log(new SortArray(30).initializeSortArray());
  return (
    <div>
      <header>Hello world</header>
    </div>
  );
}

export default App;
