import { copyBarProperties } from "./helpers.js";

/**
 * Sorts an array of bar elements visually using the insertion sort algorithm
 * @param {NodeListOf<HTMLDivElement>} bars - Collection of div elements representing bars to sort
 * @returns {Promise<void>}
 */
async function insertionSort(bars) {
  for (let i = 1; i < bars.length; i++) {
    let key = bars[i].cloneNode(true);
    let j = i - 1;

    while (j >= 0 && parseInt(bars[j].dataset.value) > parseInt(key.dataset.value)) {
      copyBarProperties(bars[j + 1], bars[j]);
      j--;
    }
    copyBarProperties(bars[j + 1], key);
  }
}

export default insertionSort;