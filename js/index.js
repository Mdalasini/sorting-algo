import bubbleSort from "./bubble-sort.js";
import heapSort from "./heap-sort.js";
import insertionSort from "./insertion-sort.js";
import mergeSort from "./merge-sort.js";
import quickSort from "./quick-sort.js";
import selectionSort from "./selection-sort.js";

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
    bar.style.background = 'oklch(68.5% 0.169 237.323)';

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
      await bubbleSort(bars);
      break;
  
    case 'merge':
      await mergeSort(bars);
      break;
  
    case 'quick':
      await quickSort(bars);
      break;

    case 'insertion':
      await insertionSort(bars);
      break;

    case 'selection':
      await selectionSort(bars);
      break;
      
    case 'heap':
      await heapSort(bars);
      break;
    default:
      showMessage(`'Start' clicked for ${selected}. Sorting logic not implemented yet!`, 'info');
      break;
  }
});

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  renderChart(); // Load empty dataset, prompt user
  if (dataset.length === 0) {
    showMessage('Welcome! Click "Randomize Data" to begin.', 'info', 4000);
  }
})