import { sleep, swapBars } from "./helpers.js";

/**
 * Partitions the array around a pivot element for quick sort
 * @param {NodeListOf<HTMLDivElement>} bars - Collection of bar elements
 * @param {number} low - Starting index of the partition
 * @param {number} high - Ending index of the partition
 * @returns {Promize<number>} Index of the pivot element after partitioning
 */
async function partition(bars, low, high) {
  let pivot = bars[high];
  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {

    if (parseInt(bars[j].dataset.value) < parseInt(pivot.dataset.value)) {
      i++;
      swapBars(bars[i], bars[j]);
    } 
  }

  swapBars(bars[i + 1], bars[high]);

  return i + 1;
}

/**
 * Recursively performs quick sort on a subarray of bars
 * @param {NodeListOf<HTMLDivElement>} bars - Collection of bar elements
 * @param {number} low - Starting index of the subarray to sort
 * @param {number} high - Ending index of the subarray to sort
 * @returns {Promise<void>}
 */
async function _quickSort(bars, low, high) {
  if (low < high) {
    let pi = await partition(bars, low, high);

    await _quickSort(bars, low, pi - 1);
    await _quickSort(bars, pi + 1, high);
  }
}

/**
 * Entry point for visually sorting bars using the quick sort algorithm
 * @param {NodeListOf<HTMLDivElement>} bars - Collection of div elements representing bars to sort
 * @returns {Promise<void>}
 */
async function quickSort(bars) {
  await _quickSort(bars, 0, bars.length - 1);
}

export default quickSort;