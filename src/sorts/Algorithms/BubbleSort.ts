import { SortBar } from "../../models/SortBar";
import { sleep } from "../Helpers";

export async function BubbleSort(sortArr: SortBar[]): Promise<SortBar[]> {
  let len: number = sortArr.length;
  //   let flag: boolean = false;
  for (let i = 0; i < len - 1; i++) {
    // flag = false;

    for (let j = 0; j < len - i - 1; j++) {
      if (sortArr[j].height > sortArr[j + 1].height) {
        // swap(sortArr[j], sortArr[j + 1]);
        // flag = true;
        await sleep(1000);
        let temp: SortBar = sortArr[j];
        sortArr[j] = sortArr[j + 1];
        sortArr[j + 1] = temp;
      }
    }
    sortArr[len - 1 - i].color = "#58ff58";

    // if (!flag) {
    //   break;
    // }
  }
  sortArr[0].color = "#58ff58";
  return sortArr;
}
