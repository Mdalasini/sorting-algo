import { sleep, swapBars } from "./helpers.js";

/**
 * Sorts an array of bar elements visually using the selection sort algorithm
 * @param {NodeListOf<HTMLDivElement>} bars - Collection of div elements representing bars to sort
 * @returns {Promise<void>}
 */
async function selectionSort(bars) {
  let n = bars.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    for (let j = i + 1; j < n; j++) {
      if (parseInt(bars[j].dataset.value) < parseInt(bars[minIdx].dataset.value)) {
        minIdx = j;
      }
    }

    await swapBars(bars[i], bars[minIdx]);
  }
}

export default selectionSort;