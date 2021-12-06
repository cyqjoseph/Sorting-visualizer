export class SortBar {
  readonly id: number;
  readonly height: number;
  readonly lengthArr: number;
  private _color: string;
  constructor(id: number, height: number, lengthArr: number, color: string) {
    this.id = id;
    this.height = height;
    this.lengthArr = lengthArr;
    this._color = color;
  }

  set color(color: string) {
    this._color = color;
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
          background: `${
            this._color
              ? `linear-gradient(180deg, ${this._color} 55%, #b4baff 100%)`
              : "linear-gradient(180deg, #e66465 5%, #b4baff 100%)"
          }`,
        }}
      ></div>
    );
  }
}
