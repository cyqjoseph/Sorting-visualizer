import { SortBar } from "../../models/SortBar";
import { useEffect, useState } from "react";
import { useActions } from "../../hooks/use-actions";
// import { BubbleSort } from "../../sorts";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { useStore } from "react-redux";
import { SortType } from "../../enums";

interface SettingsProps {
  settings: { length: number; iteration: number; randomize: boolean };
}

const MainContainer: React.FC<SettingsProps> = function (props): JSX.Element {
  const store = useStore();
  const { sortArray } = store.getState();
  const data = useTypedSelector(({ sortArray: { data } }) => {
    return data;
  });
  const loading = useTypedSelector(({ sortArray: { loading } }) => {
    return loading;
  });
  const { randomize, pendingArraySorting, completeArraySorting } = useActions();
  const [cells, setCells] = useState<SortBar[]>([]);
  useEffect(() => {
    randomize(props.settings.length);
    setCells(sortArray.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!data) {
      setCells(sortArray.data);
      console.log(data);
    }
    if (loading) {
      // Dispatch action here?
      pendingArraySorting(SortType.BUBBLE, sortArray.data);
      console.log(sortArray.data);
      completeArraySorting();
    }
    setCells(sortArray.data);
  }, [sortArray.data, loading]);
  return (
    <section className="mainContainer">
      <div className="mainContainer__items">
        {cells.map((sortBar: SortBar) => sortBar.renderSortBar())}
      </div>
    </section>
  );
};
export default MainContainer;
