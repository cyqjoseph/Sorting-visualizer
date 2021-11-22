import { SortBar } from "../../models/SortBar";
import { useEffect } from "react";
import { useActions } from "../../hooks/use-actions";
// import { BubbleSort } from "../../sorts";
import { useTypedSelector } from "../../hooks/use-typed-selector";
// import { store } from "../../state/store";
interface SettingsProps {
  settings: { length: number; iteration: number; randomize: boolean };
}

const MainContainer: React.FC<SettingsProps> = function (props): JSX.Element {
  const cells = useTypedSelector(({ sortArray: { data } }) => {
    return data;
  });
  const { randomize } = useActions();
  useEffect(() => {
    randomize(props.settings.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(cells);
  return (
    <section className="mainContainer">
      <div className="mainContainer__items">
        {cells.map((sortBar: SortBar) => sortBar.renderSortBar())}
      </div>
    </section>
  );
};
export default MainContainer;
