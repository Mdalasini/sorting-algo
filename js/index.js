import bubbleSort from "./bubble-sort.js";
import { colors } from "./config.js";
import heapSort from "./heap-sort.js";
import insertionSort from "./insertion-sort.js";
import mergeSort from "./merge-sort.js";
import quickSort from "./quick-sort.js";
import selectionSort from "./selection-sort.js";
import { State } from "./stateManager.js";

const algorithmSelect = document.getElementById('algorithmSelect');
const randomizeButton = document.getElementById('randomizeButton');
const startButton = document.getElementById('startButton');
const chartContainer = document.getElementById('chartContainer');
const messageBox = document.getElementById('messageBox');

// Chart config
const NUM_BARS = 25;
const MIN_VALUE = 10;
const MAX_VALUE = 100;
let dataset = [];

// Message Box logic
let messageTimeout;
/**
 * @param {string} message Text to show
 * @param {'info' | 'error' | 'success'} [type=info] - The type of message
 * @param {number} [duration=3000] - Time in milliseconds the message is visible
 */
function showMessage(message, type = 'info', duration = 3000) {
  clearTimeout(messageTimeout);
  messageBox.textContent = message;

  messageBox.classList.remove('bg-slate-700', 'bg-red-500', 'bg-green-500');
  switch (type) {
    case 'error':
      messageBox.classList.add('bg-red-500');
      break;
    
    case 'success':
      messageBox.classList.add('bg-green-500');
      break;
  
    default:
      messageBox.classList.add('bg-slate-500');
      break;
  }

  messageBox.classList.remove('opacity-0', 'translate-y-5', 'pointer-events-none');
  messageBox.classList.add('opacity-100', 'translate-y-0');

  messageTimeout = setTimeout(() => {
    messageBox.classList.remove('opacity-100', 'translate-y-0');
    messageBox.classList.add('opacity-0', 'translate-y-5', 'pointer-events-none');
  }, duration);
}

// Dataset Generation
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.ceil(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 
 * @param {number} size - Number of elements in the array
 * @param {number} min - Minimun value of an element
 * @param {number} max - Maximum value of an element
 * @returns {number[]} - Array of random numbers
 */
function generateRandomDataset(size, min, max) {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(getRandomInt(min, max));
  }
  return arr;
}

// Chart Rendering
/**
 * Renders the current databaset as bars in the chart container
 */
function renderChart() {
  chartContainer.innerHTML = '';

  if (dataset.length === 0) {
    const placeholder = document.createElement('p');
    placeholder.textContent = 'Click "Randomize Data" to generate a new dataset.';
    placeholder.classList.add('text-gray-500', 'self-center');
    chartContainer.appendChild(placeholder);
  }

  dataset.forEach((value, _) => {
    const bar = document.createElement('div');

    // Calculate height as a percentage of MAX_VALUE relative to container height
    const barHeightPercentage = (value / MAX_VALUE) * 100;
    bar.style.height = `${barHeightPercentage}%`;
    bar.style.background = colors.cyan;

    bar.classList.add(
      'flex-grow',
      'rounded-t-sm',
      'transition-all',
      'duration-300',
      'ease-in-out'
    );

    bar.title = `Value: ${value}`;
    bar.dataset.value = value;

    chartContainer.appendChild(bar);
  });
}

function generateAndRenderDataset() {
  dataset = generateRandomDataset(NUM_BARS, MIN_VALUE, MAX_VALUE);
  renderChart();
  showMessage('New dataset generated!', 'success', 1500);
}

// Sorting function wrapper
/**
 * @callback SortFunction
 * @param {Array} bars - Array of bar elements to sort
 * @returns {Promise<void>} - A promise that resolves when sorting is complete
 */

/**
 * Wraps a sorting function to automatically set and reset the sorting state.
 * @param {SortFunction} fn - The sorting function to wrap
 * @returns {SortFunction} - A new function with state management
 */
function withState(fn) {
  return async (bars) => {
    State.setState(State.SORTING);
    await fn(bars);
    State.setState(State.IDLE);
  };
}

// Wrapping sort functions
const sortFunctions = {
  bubble: withState(bubbleSort),
  merge: withState(mergeSort),
  quick: withState(quickSort),
  insertion: withState(insertionSort),
  selection: withState(selectionSort),
  heap: withState(heapSort),
}

// Event Listeners
randomizeButton.addEventListener('click', generateAndRenderDataset);

startButton.addEventListener('click', async () => {
  const selected = algorithmSelect.value;
  if (dataset.length === 0) {
    showMessage('Please generate a dataset first!', 'error');
    return;
  }

  const chartContainer = document.getElementById('chartContainer');
  const bars = chartContainer.querySelectorAll("div");

  switch (selected) {
    case 'bubble':
    case 'merge':
    case 'quick':
    case 'insertion':
    case 'selection':
    case 'heap':
      showMessage(`${selected} sort is running...`, 'info');
      await sortFunctions[selected](bars);
    default:
      showMessage(`'Start' clicked for ${selected}. Sorting logic not implemented yet!`, 'info');
      break;
  }
});

function disableControls() {
  algorithmSelect.disabled = true;
  randomizeButton.disabled = true;
  startButton.disabled = true;
}

function enableControls() {
  algorithmSelect.disabled = false;
  randomizeButton.disabled = false;
  startButton.disabled = false;
}

const unsubscribe = State.subscribe((newState) => {
  if (newState === State.SORTING) disableControls();
  else if (newState === State.IDLE) enableControls();
})

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  renderChart(); // Load empty dataset, prompt user
  if (dataset.length === 0) {
    showMessage('Welcome! Click "Randomize Data" to begin.', 'info', 4000);
  }
})