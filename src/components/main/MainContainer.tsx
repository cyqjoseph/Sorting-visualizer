import { Routes, Route } from "react-router-dom";
import BubbleSort from "../../sorts/Algorithms/BubbleSort";
import InsertionSort from "../../sorts/Algorithms/InsertionSort";

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
        <Routes>
          <Route
            path="/"
            element={<BubbleSort settings={props.settings} />}
          ></Route>
          <Route
            path="/bubble"
            element={<BubbleSort settings={props.settings} />}
          ></Route>
          <Route
            path="/Insertion"
            element={<InsertionSort settings={props.settings} />}
          ></Route>
        </Routes>
      </div>
    </section>
  );
};
export default MainContainer;
