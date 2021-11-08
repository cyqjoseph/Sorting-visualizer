import { SortArray } from "../../models/SortArray";
import { SortBar } from "../../models/SortBar";

import { useState, useEffect } from "react";
const MainContainer = function (): JSX.Element {
  const [array, setArray] = useState<SortBar[]>([]);
  console.log(new SortArray(50).initializeSortArray());

  useEffect(() => {
    setArray(new SortArray(4).initializeSortArray());
  }, []);
  return (
    <section className="mainContainer">
      <div className="mainContainer__items">
        {array.map((sortBar: SortBar) => sortBar.renderSortBar())}
      </div>
    </section>
  );
};
export default MainContainer;
