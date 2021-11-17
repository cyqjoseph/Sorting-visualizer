import React, { useState, useContext } from "react";
import Context, { ContextInterface } from "../../store/context";
interface SettingsProps {
  onSubmit(length: number, iteration: number): void;
  onRandomize(): void;
}
const Settings: React.FC<SettingsProps> = function (props): JSX.Element {
  const [elementsNum, setElementsNum] = useState<number>(5);
  const [iteration, setIteration] = useState<number>(1);
  const Ctx: ContextInterface = useContext(Context);

  const startHandler = function (): void {
    Ctx.startHandler();
  };

  const sliderHandler = function (
    e: React.SyntheticEvent<HTMLInputElement, KeyboardEvent>
  ): void {
    setElementsNum(+e.currentTarget.value);
    props.onSubmit(+e.currentTarget.value, iteration);
  };

  const iterationHandler = function (
    e: React.SyntheticEvent<HTMLInputElement, KeyboardEvent>
  ): void {
    setIteration(+e.currentTarget.value);
  };

  return (
    <section className="settings">
      <div className="settings__scroll">
        <div className="settings__scroll-elements">
          Number of Elements: {elementsNum}
          <input
            type="range"
            min="5"
            max="500"
            step="5"
            name="elements-num"
            id="slider"
            value={elementsNum}
            onInput={sliderHandler}
          />
          <label htmlFor="elements-num"></label>
        </div>
        <button onClick={startHandler}>Start</button>
        {/* <button onClick={props.onSubmit.bind(null, elementsNum, iteration)}>
          Start
        </button> */}
        <button onClick={props.onRandomize}>Randomize</button>
        <div className="settings__scroll-iterations">
          Time between each iteration: {iteration}s
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            name="elements-num"
            id="slider"
            value={iteration}
            onInput={iterationHandler}
          />
          <label htmlFor="elements-num"></label>
        </div>
      </div>
    </section>
  );
};

export default Settings;
