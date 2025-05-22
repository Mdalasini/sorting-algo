import { sleep, swapBars } from "./helpers.js";
import { colors } from "./config.js";

/**
 * Partitions the array around a pivot element for quick sort
 * @param {NodeListOf<HTMLDivElement>} bars - Collection of bar elements
 * @param {number} low - Starting index of the partition
 * @param {number} high - Ending index of the partition
 * @returns {Promize<number>} Index of the pivot element after partitioning
 */
async function partition(bars, low, high) {
  let pivot = bars[high];
  bars[high].style.background = colors.red; // Highlight pivot
  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    bars[j].style.background = colors.yellow; // Highlight comparision
    await sleep(200);

    if (parseInt(bars[j].dataset.value) < parseInt(pivot.dataset.value)) {
      i++;
      await swapBars(bars[i], bars[j]);
    } 

    bars[j].style.background = colors.cyan; // reset color after comparision
  }

  await swapBars(bars[i + 1], bars[high]);

  bars[high].style.background = colors.cyan; // reset pivot color
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
    bars[pi].style.background = colors.green; // Mark pivot as sorted

    await _quickSort(bars, low, pi - 1);
    await _quickSort(bars, pi + 1, high);
  } else if (low >= 0 && high >= 0 && low < bars.length && high < bars.length) {
    bars[low].style.background = colors.green; // Single element is sorted
    bars[high].style.background = colors.green;
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