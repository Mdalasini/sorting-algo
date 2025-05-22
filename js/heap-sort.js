import { swapBars } from "./helpers.js";

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

  if (l < n && parseInt(bars[l].dataset.value) > parseInt(bars[largest].dataset.value)) {
    largest = l;
  }

  if (r < n && parseInt(bars[r].dataset.value) > parseInt(bars[largest].dataset.value)) {
    largest = r;
  }

  if (largest !== i) {
    swapBars(bars[i], bars[largest]);

    heapify(bars, n, largest);
  }
}

/**
 * Sorts an array of bar elements visually using the heap sort algorithm
 * @param {NodeListOf<HTMLDivElement>} bars - Collection of div elements representing bars to sort
 * @returns {Promise<void>}
 */
async function heapSort(bars) {
  let n = bars.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(bars, n, i);

  for (let i = n - 1; i > 0; i--) {
    swapBars(bars[0], bars[i]);

    heapify(bars, i, 0);
  }
}

export default heapSort;