import { SortArray } from "../../models/SortArray";
import { SortBar } from "../../models/SortBar";
import { useState, useEffect, useCallback, useContext } from "react";
import Context, { ContextInterface } from "../../store/context";

import { BubbleSort } from "../../sorts";

interface SettingsProps {
  settings: { length: number; iteration: number; randomize: boolean };
}

const MainContainer = function (props: SettingsProps): JSX.Element {
  const [array, setArray] = useState<SortBar[]>([]);
  const Ctx: ContextInterface = useContext(Context);

  const randomize = useCallback(() => {
    setArray(new SortArray(props.settings.length).randomizeSortArray());
  }, [props]);

  useEffect(() => {
    randomize();
  }, [randomize]);

  useEffect(() => {
    if (Ctx.start) {
      const sorted = BubbleSort(array);
      setArray(sorted);
    }
    console.log(array);
  }, [Ctx.start, array]);
  console.log(array);
  // useEffect(() => {
  //   if (props.settings.randomize === false) {
  //     setArray(new SortArray(props.settings.length).initializeSortArray());
  //   } else {
  //     randomize();

  //     setArray(BubbleSort(array));
  //     console.log(array);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [props]);

  return (
    <section className="mainContainer">
      <div className="mainContainer__items">
        {array.map((sortBar: SortBar) => sortBar.renderSortBar())}
      </div>
    </section>
  );
};
export default MainContainer;
