import { colors } from "./config.js";
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
    bars[i].style.background = colors.orange; // being placed

    for (let j = i + 1; j < n; j++) {
      bars[j].style.background = colors.yellow; // being compared
      await sleep(100);

      if (parseInt(bars[j].dataset.value) < parseInt(bars[minIdx].dataset.value)) {
        if (minIdx !== i) bars[minIdx].style.background = colors.cyan; // reset
        minIdx = j;
        bars[minIdx].style.background = colors.red; // new minimum
      } else {
        bars[j].style.background = colors.cyan; // reset
      }
    }

    await swapBars(bars[i], bars[minIdx]);

    bars[minIdx].style.background = colors.cyan; // reset minIdx if not i
    bars[i].style.background = colors.green;
    await sleep(50);
  }
  bars[n - 1].style.background = colors.green; // last element
}

export default selectionSort;