import React, { useEffect, useState } from "react";
import { useActions } from "../../hooks/use-actions";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import { Button } from "react-bootstrap";
import { VscDebugStart } from "react-icons/vsc";
import { FaRandom } from "react-icons/fa";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import RangeSlider from "react-bootstrap-range-slider";
interface SettingsProps {
  onSubmit(
    length: number,
    iteration: number,
    randomize: boolean,
    loading: boolean
  ): void;
}
const Settings: React.FC<SettingsProps> = function (props): JSX.Element {
  const loading = useTypedSelector(({ sortArray: { loading } }) => {
    return loading;
  });

  const [startDisabled, setStartDisabled] = useState<boolean>(false);
  const [randomizeDisabled, setRandomizeDisabled] = useState<boolean>(true);
  const { startArraySorting, completeArraySorting } = useActions();
  const [elementsNum, setElementsNum] = useState<number>(50);
  const [iteration, setIteration] = useState<number>(0.004);
  const sliderHandler = function (
    e: React.SyntheticEvent<HTMLInputElement, KeyboardEvent>
  ): void {
    setElementsNum(+e.currentTarget.value);
    props.onSubmit(+e.currentTarget.value, iteration, true, false);
    setStartDisabled(false);
    setRandomizeDisabled(true);
  };

  const iterationHandler = function (
    e: React.SyntheticEvent<HTMLInputElement, KeyboardEvent>
  ): void {
    setIteration(+e.currentTarget.value);
  };

  const randomizeHandler = function () {
    props.onSubmit(elementsNum, iteration, true, false);
    completeArraySorting();
    setRandomizeDisabled(true);
    setStartDisabled(false);
  };

  const startHandler = function () {
    props.onSubmit(elementsNum, iteration, false, true);
    startArraySorting();
    setStartDisabled(true);
    setRandomizeDisabled(true);
  };
  useEffect(() => {
    setRandomizeDisabled(true);
  }, []);

  useEffect(() => {
    if (loading) {
      setRandomizeDisabled(true);
    } else {
      setRandomizeDisabled(false);
    }
  }, [loading]);

  return (
    <section className="settings">
      <div className="settings__scroll">
        <div className="settings__scroll-elements">
          <span className="textSpan">Number of Elements</span>
          <RangeSlider
            min={5}
            max={500}
            step={5}
            id="slider"
            value={elementsNum}
            onInput={sliderHandler}
            disabled={loading}
          />
        </div>
        <Button
          variant="success"
          onClick={startHandler}
          disabled={startDisabled}
          size="lg"
          className="button"
        >
          <VscDebugStart />
        </Button>
        <Button
          variant="warning"
          onClick={randomizeHandler}
          disabled={randomizeDisabled}
          size="lg"
          className="button"
        >
          <FaRandom />
        </Button>
        <div className="settings__scroll-iterations">
          <span className="textSpan">Time between Iterations</span>
          <RangeSlider
            min={0.004}
            max={1}
            step={0.001}
            id="slider"
            value={iteration}
            onInput={iterationHandler}
            disabled={loading}
          />
        </div>
      </div>
    </section>
  );
};

export default Settings;
