import { colors } from "./config.js";

/**
 * Returns a promise that resolves after a specified time delay
 * @param {number} ms - Time in milliseconds to wait before resolving
 * @returns {Promise<void>} A promise that resolves after the specified time
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Swaps the visual properties (height and title) of two bar DOM elements.
 * @param {HTMLElement} bar1
 * @param {HTMLElement} bar2 
 * @returns {Promise<void>}
 */
export async function swapBars(bar1, bar2) {
  if (!bar1 || !bar2) {
    console.error("Cannot swap undefined bars.");
    return;
  }

  // highlight bars being swapped
  bar1.style.background = colors.lightGreen;
  bar2.style.background = colors.lightGreen;

  // 1. Store properties of bar1
  const tempHeight = bar1.style.height;
  const tempTitle = bar1.title;
  const tempValue = bar1.dataset.value;

  // 2. Set bar1's properties to bar2's properties
  bar1.style.height = bar2.style.height;
  bar1.title = bar2.title;
  bar1.dataset.value = bar2.dataset.value;

  // 3. Set bar2's propertie to bar1's properties
  bar2.style.height = tempHeight;
  bar2.title = tempTitle;
  bar2.dataset.value = tempValue;

  // remove highlight
  await sleep(300);
  bar1.style.background = colors.cyan;
  bar2.style.background = colors.cyan;
}

/**
 * Copies the height, title and value from one bar element to another
 * @param {HTMLDivElement} bar1 - The target bar element to be updated
 * @param {HTMLDivElement} bar2 - The source bar element to copy from
 * @returns {void}
 */
export function copyBarProperties(bar1, bar2) {
  if (!bar1 || !bar2) {
    console.error("Cannot replace undefined bars.");
    return;
  }

  bar1.style.height = bar2.style.height;
  bar1.title = bar2.title;
  bar1.dataset.value = bar2.dataset.value;
}