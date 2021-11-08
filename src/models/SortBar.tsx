export class SortBar {
  readonly id: number;
  readonly height: number;
  readonly lengthArr: number;
  constructor(id: number, height: number, lengthArr: number) {
    this.id = id;
    this.height = height;
    this.lengthArr = lengthArr;
  }

  public renderSortBar(): JSX.Element {
    return (
      <div
        className="mainContainer__items-element"
        key={this.id}
        style={{
          height: `${(this.height / this.lengthArr) * 100}%`,
          width: `${100 / this.lengthArr}%`,
          overflow: "hidden",
        }}
      ></div>
    );
  }
}
