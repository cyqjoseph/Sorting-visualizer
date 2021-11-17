import { SortArray } from "../../models/SortArray";
import { SortBar } from "../../models/SortBar";
import { useState, useEffect, useCallback, useContext } from "react";
import Context, { ContextInterface } from "../../store/context";

import { BubbleSort } from "../../sorts";

interface SettingsProps {
  settings: { length: number; iteration: number; randomize: boolean };
}

const MainContainer: React.FC<SettingsProps> = function (props): JSX.Element {
  const [array, setArray] = useState<SortBar[]>([]);
  // const [tempArray, setTempArray] = useState<SortBar[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const Ctx: ContextInterface = useContext(Context);

  const randomize = useCallback(() => {
    setArray(new SortArray(props.settings.length).randomizeSortArray());
  }, [props]);

  useEffect(() => {
    randomize();
  }, [randomize]);

  useEffect(() => {
    if (Ctx.start) {
      (async function () {
        setIsLoading(true);
        await BubbleSort(array, Ctx); //connect these two lines of logic
        setArray(array);
        setIsLoading(false);
      })();
      console.log("sorted", array);
    }
  }, [Ctx.start]);

  return (
    <section className="mainContainer">
      <div className="mainContainer__items">
        {!isLoading && array.map((sortBar: SortBar) => sortBar.renderSortBar())}
        {isLoading &&
          Ctx.arrayBeingSorted.map((sortBar: SortBar) =>
            sortBar.renderSortBar()
          )}
      </div>
    </section>
  );
};
export default MainContainer;
