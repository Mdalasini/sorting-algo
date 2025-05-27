export class State {
  /** @constant {string} The idle state */
  static IDLE = "idle";
  /** @constant {string} The sorting state */
  static SORTING = "sorting";

  static #state = this.IDLE;
  static #listeners = new Set();

  /**
   * Gets the current state
   * @returns {string} The current state (either State.IDLE or State.SORTING)
   */
  static getState() {
    return this.#state;
  }

  /**
   * Sets a new state and notifies all subscribers
   * @param {string} newState - The new state to set (must be State.IDLE or State.SORTING)
   * @throws {Error} If an invalid state is provided
   * @fires State#stateChanged
   */
  static setState(newState) {
    if (newState !== State.IDLE && newState !== State.SORTING) {
      throw new Error(`Invalid state: ${newState}`);
    }
    if (State.#state !== newState) {
      this.#state = newState;
      for (const callback of State.#listeners) {
        callback(newState);
      }
    }
  }

  /**
   * Subscribes to state changes
   * @param {function(string): void} callback - Function to call when state changes
   * @returns {function(): void} Unsubscribe function
   */
  static subscribe(callback) {
    State.#listeners.add(callback);
    return () => State.#listeners.delete(callback);
  }
}