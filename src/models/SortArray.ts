import { SortBar } from "./SortBar";
export class SortArray {
  private sortArray: SortBar[];
  protected lengthArr: number;
  constructor(lengthArr: number) {
    this.lengthArr = lengthArr;
    this.sortArray = [];
  }
  // Fisher-Yates Shuffling
  private shuffleArray(sortArray: SortBar[]): SortBar[] {
    let temp: SortBar, i: number;
    // While there are elements to shuffle
    while (this.lengthArr) {
      //Pick a remaining element
      i = Math.floor(Math.random() * this.lengthArr--);
      // And swap it with current element
      temp = sortArray[this.lengthArr];
      // Place element at the back, shuffling in place
      sortArray[this.lengthArr] = sortArray[i];
      sortArray[i] = temp;
    }
    return sortArray;
  }

  public initializeSortBar(i: number): SortBar {
    return new SortBar(i, i, this.lengthArr, "");
  }

  public initializeSortArray(): SortBar[] {
    for (let i = 1; i <= this.lengthArr; i++) {
      this.sortArray.push(this.initializeSortBar(i));
    }
    return this.sortArray;
  }

  public randomizeSortArray(): SortBar[] {
    this.shuffleArray(this.initializeSortArray());
    return this.sortArray;
  }
}
