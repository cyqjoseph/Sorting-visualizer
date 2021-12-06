import { Routes, Route } from "react-router-dom";
import BubbleSort from "../../sorts/Algorithms/BubbleSort";
import InsertionSort from "../../sorts/Algorithms/InsertionSort";
import SelectionSort from "../../sorts/Algorithms/SelectionSort";
import BogoSort from "../../sorts/Algorithms/BogoSort";
import QuickSort from "../../sorts/Algorithms/QuickSort";
import MergeSort from "../../sorts/Algorithms/MergeSort";
import RadixSort from "../../sorts/Algorithms/RadixSort";
import ShellSort from "../../sorts/Algorithms/ShellSort";
import HeapSort from "../../sorts/Algorithms/HeapSort";
import GnomeSort from "../../sorts/Algorithms/GnomeSort";
import OddEvenSort from "../../sorts/Algorithms/OddEvenSort";
import TimSort from "../../sorts/Algorithms/TimSort";
import PancakeSort from "../../sorts/Algorithms/PancakeSort";

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
            path="/insertion"
            element={<InsertionSort settings={props.settings} />}
          ></Route>
          <Route
            path="/selection"
            element={<SelectionSort settings={props.settings} />}
          ></Route>
          <Route
            path="/bogo"
            element={<BogoSort settings={props.settings} />}
          ></Route>
          <Route
            path="/quick"
            element={<QuickSort settings={props.settings} />}
          ></Route>
          <Route
            path="/merge"
            element={<MergeSort settings={props.settings} />}
          ></Route>
          <Route
            path="/radix"
            element={<RadixSort settings={props.settings} />}
          ></Route>
          <Route
            path="/shell"
            element={<ShellSort settings={props.settings} />}
          ></Route>
          <Route
            path="/heap"
            element={<HeapSort settings={props.settings} />}
          ></Route>
          <Route
            path="/gnome"
            element={<GnomeSort settings={props.settings} />}
          ></Route>
          <Route
            path="/odd-even"
            element={<OddEvenSort settings={props.settings} />}
          ></Route>
          <Route
            path="/tim"
            element={<TimSort settings={props.settings} />}
          ></Route>
          <Route
            path="/pancake"
            element={<PancakeSort settings={props.settings} />}
          ></Route>
        </Routes>
      </div>
    </section>
  );
};
export default MainContainer;
