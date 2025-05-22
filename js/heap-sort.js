import { colors } from "./config.js";
import { sleep, swapBars } from "./helpers.js";

/**
 * Maintains the heap property for a subtree rooted at index i
 * @param {NodeListOf<HTMLDivElement>} bars - Collection of bar elements
 * @param {number} n - Size of the heap
 * @param {number} i - Index of the root element of the subtree
 * @returns {Promise<void>}
 */
async function heapify(bars, n, i) {
  let largest = i;
  let l = 2 * i + 1;
  let r = 2 * i + 2;

  bars[i].style.background = colors.orange; // current root
  if (l < n) bars[l].style.background = colors.yellow; //left child
  if (r < n) bars[r].style.background = colors.yellow; // right child

  if (l < n && parseInt(bars[l].dataset.value) > parseInt(bars[largest].dataset.value)) {
    largest = l;
  }

  if (r < n && parseInt(bars[r].dataset.value) > parseInt(bars[largest].dataset.value)) {
    largest = r;
  }

  if (largest !== i) {
    bars[largest].style.background = colors.red; // will be swapped
    await sleep(100);
    await swapBars(bars[i], bars[largest]);

    bars[i].style.background = colors.cyan; // reset
    bars[largest].style.background = colors.cyan;

    await heapify(bars, n, largest);
  } else {
    bars[i].style.background = colors.cyan;
    if (l < n) bars[l].style.background = colors.cyan;
    if (r < n) bars[r].style.background = colors.cyan;
  }
}

/**
 * Sorts an array of bar elements visually using the heap sort algorithm
 * @param {NodeListOf<HTMLDivElement>} bars - Collection of div elements representing bars to sort
 * @returns {Promise<void>}
 */
async function heapSort(bars) {
  let n = bars.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) await heapify(bars, n, i);

  for (let i = n - 1; i > 0; i--) {
    bars[0].style.background = colors.red; // max being swapped to sorted
    bars[i].style.background = colors.green;
    await sleep(100);
    await swapBars(bars[0], bars[i]);

    bars[i].style.background = colors.green; // sorted
    await heapify(bars, i, 0);
  }
  bars[0].style.background = colors.green; // final element
}

export default heapSort;