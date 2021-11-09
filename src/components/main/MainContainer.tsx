import { SortArray } from "../../models/SortArray";
import { SortBar } from "../../models/SortBar";
import { useState, useEffect } from "react";

import { BubbleSort } from "../../sorts";

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
      setTimeout(() => {
        setArray(BubbleSort(array));
        console.log(array);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
