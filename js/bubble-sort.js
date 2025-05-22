import { sleep, swapBars } from "./helpers.js";

/**
 * Sorts an array of bar elements visually using the bubble sort algorithm
 * @param {NodeListOf<HTMLDivElement>} bars - Collection of div elements representing bars to sort
 * @returns {Promise<void>}
 */
async function bubbleSort(bars) {
  var i, j;
  var swapped;
  for (i = 0; i < bars.length - 1; i++) {
    for (j = 0; j < bars.length - i - 1; j++) {
      if (parseInt(bars[j].dataset.value) > parseInt(bars[j + 1].dataset.value)) {
        swapBars(bars[j], bars[j + 1]);
        swapped = true;
        await sleep(400); // has to be > than timeout in swap bars
      }
    }
    bars[bars.length - i - 1].style.background = 'oklch(62.7% 0.194 149.214)';
    if (swapped === false) break;
  }
  bars[0].style.background = 'oklch(62.7% 0.194 149.214)';
}

export default bubbleSort;