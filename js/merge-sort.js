import { copyBarProperties, sleep } from "./helpers.js";

/**
 * Merges two sorted subarrays of bars into a single sorted section
 * @param {NodeListOf<HTMLDivElement>} bars - Collection of div elements representing bars
 * @param {number} left - The starting index of the left subarray
 * @param {number} mid - The ending index of the left subarray (mid+1 starts the right subarray)
 * @param {number} right - The ending index of the right subarray
 * @async Modifies the bars in place
 */
async function merge(bars, left, mid, right) {
  const n1 = mid - left + 1;
  const n2 = right - mid;

  // Create temp arrays
  const L = new Array(n1);
  const R = new Array(n2);

  // Copy data to temp arrays L[] and R[]
  for (let i = 0; i < n1; i++) {
    bars[left + i].style.background = 'oklch(90.5% 0.182 98.111)';
    await sleep(200);
    L[i] = bars[left + i].cloneNode(true);
  }
  for (let i = 0; i < n2; i++) {
    bars[mid + 1 + i].style.background = 'oklch(76.9% 0.188 70.08)';
    await sleep(200);
    R[i] = bars[mid + 1 + i].cloneNode(true);
  }

  let i = 0, j = 0;
  let k = left;

  // Merge the temp arrays back into arr[left..right]
  while(i < n1 && j < n2) {
    await sleep(200);
    if (parseInt(L[i].dataset.value) <= parseInt(R[j].dataset.value)) {
      if ((n1 + n2) === bars.length) bars[k].style.background = 'oklch(62.7% 0.194 149.214)';
      else bars[k].style.background = 'oklch(76.5% 0.177 163.223)';

      copyBarProperties(bars[k], L[i]);
      i++;
    } else {
      if ((n1 + n2) === bars.length) bars[k].style.background = 'oklch(62.7% 0.194 149.214)';
      else bars[k].style.background = 'oklch(76.5% 0.177 163.223)';

      copyBarProperties(bars[k], R[j]);
      j++;
    }
    k++;
  }

  // Copy the remaining elements of L[], if there are any
  while (i < n1) {
    await sleep(200);
    if ((n1 + n2) === bars.length) bars[k].style.background = 'oklch(62.7% 0.194 149.214)';
    else bars[k].style.background = 'oklch(76.5% 0.177 163.223)';

    copyBarProperties(bars[k], L[i]);
    i++;
    k++;
  }

  // Copy the remaining elements of R[], if there are any
  while (j < n2) {
    await sleep(200);
    if ((n1 + n2) === bars.length) bars[k].style.background = 'oklch(62.7% 0.194 149.214)';
    else bars[k].style.background = 'oklch(76.5% 0.177 163.223)';

    copyBarProperties(bars[k], R[j]);
    j++;
    k++;
  }
}

/**
 * Recursively performs merge sort on a subarray of bars
 * @param {NodeListOf<HTMLDivElement>} bars - Collection of div elements representing bars
 * @param {number} left - Starting index of the subarray to sort
 * @param {number} right - Ending index of the subarray to sort
 * @async
 */
async function _mergeSort(bars, left, right) { // actual implementation of merge sort
  if (left >= right) return;

  const mid = Math.floor(left + (right - left) / 2);
  await _mergeSort(bars, left, mid);
  await _mergeSort(bars, mid + 1, right);
  await merge(bars, left, mid, right);
}

/**
 * Entry point for visually sorting bars using the using the merge sort algorithm
 * @param {NodeListOf<HTMLDivElement>} bars - Collection of div elements representing bars to sort
 * @async
 */
async function mergeSort(bars) { // entry function
  await _mergeSort(bars, 0, bars.length - 1);
}

export default mergeSort;
