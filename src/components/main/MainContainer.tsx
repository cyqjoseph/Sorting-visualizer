import RenderSortBars from "./RenderSortBars";

interface MainContainerProps {
  settings: { length: number; iteration: number; randomize: boolean };
}

const MainContainer: React.FC<MainContainerProps> = function (
  props
): JSX.Element {
  return (
    <section className="mainContainer">
      <div className="mainContainer__items">
        <RenderSortBars settings={props.settings} />
      </div>
    </section>
  );
};
export default MainContainer;
