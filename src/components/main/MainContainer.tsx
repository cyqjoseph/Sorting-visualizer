import RenderSortBars from "./RenderSortBars";
import BubbleSort from "../../sorts/Algorithms/BubbleSortBars";
interface MainContainerProps {
  settings: {
    length: number;
    iteration: number;
    randomize: boolean;
    loading: boolean;
  };
}

const MainContainer: React.FC<MainContainerProps> = function (
  props
): JSX.Element {
  return (
    <section className="mainContainer">
      <div className="mainContainer__items">
        <BubbleSort settings={props.settings} />
        {/* <RenderSortBars settings={props.settings} /> */}
      </div>
    </section>
  );
};
export default MainContainer;
