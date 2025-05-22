import { colors } from "./config.js";
import { copyBarProperties, sleep } from "./helpers.js";

/**
 * Sorts an array of bar elements visually using the insertion sort algorithm
 * @param {NodeListOf<HTMLDivElement>} bars - Collection of div elements representing bars to sort
 * @returns {Promise<void>}
 */
async function insertionSort(bars) {
  for (let i = 1; i < bars.length; i++) {
    let key = bars[i].cloneNode(true);
    bars[i].style.background = colors.orange; // current key
    let j = i - 1;

    while (j >= 0 && parseInt(bars[j].dataset.value) > parseInt(key.dataset.value)) {
      bars[j].style.background = colors.yellow; // comparing
      bars[j + 1].style.background = colors.yellow; // shift
      await sleep(100);

      copyBarProperties(bars[j + 1], bars[j]);
      bars[j].style.background = colors.cyan; // reset 
      bars[j + 1].style.background = colors.cyan;
      j--;
    }

    copyBarProperties(bars[j + 1], key);
    bars[j + 1].style.background = colors.lightGreen; // placed
    await sleep(100);
  }

  // Final pass to mark all as sorted
  for (let bar of bars) {
    bar.style.background = colors.green;
    await sleep(30);
  }
}

export default insertionSort;