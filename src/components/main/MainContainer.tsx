import { SortArray } from "../../models/SortArray";
import { SortBar } from "../../models/SortBar";

import { useState, useEffect } from "react";

interface SettingsProps {
  settings: { length: number; iteration: number; randomize: boolean };
}

const MainContainer = function (props: SettingsProps): JSX.Element {
  const [array, setArray] = useState<SortBar[]>([]);
  useEffect(() => {
    if (props.settings.randomize === false) {
      setArray(new SortArray(props.settings.length).initializeSortArray());
    } else {
      setArray(new SortArray(props.settings.length).randomizeSortArray());
    }
  }, [props]);

  return (
    <section className="mainContainer">
      <div className="mainContainer__items">
        {array.map((sortBar: SortBar) => sortBar.renderSortBar())}
      </div>
    </section>
  );
};
export default MainContainer;
