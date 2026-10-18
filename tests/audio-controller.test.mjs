import test from "node:test";
import assert from "node:assert/strict";

// Mock browser environment for AudioController unit testing
class MockAudioElement {
  constructor() {
    this.src = "";
    this.loop = false;
    this.preload = "auto";
    this.volume = 1;
    this.currentTime = 0;
    this._listeners = {};
    this.paused = true;
  }

  addEventListener(event, fn) {
    if (!this._listeners[event]) this._listeners[event] = [];
    this._listeners[event].push(fn);
  }

  dispatchEvent(event) {
    const handlers = this._listeners[event] || [];
    for (const h of handlers) h();
  }

  play() {
    this.paused = false;
    this.dispatchEvent("play");
    return Promise.resolve();
  }

  pause() {
    this.paused = true;
    this.dispatchEvent("pause");
  }
}

const mockStorage = {};
globalThis.window = {};
globalThis.localStorage = {
  getItem: (key) => mockStorage[key] ?? null,
  setItem: (key, val) => {
    mockStorage[key] = String(val);
  },
  removeItem: (key) => {
    delete mockStorage[key];
  },
};
globalThis.Audio = MockAudioElement;

test("Phase 1 - AudioController defaults strictly to OFF on fresh visit", async () => {
  // Clear storage
  for (const k in mockStorage) delete mockStorage[k];

  // Dynamic import of the controller module
  const { sharedAudioController, SOUND_STORAGE_KEY } = await import("../lib/audio-controller.ts");

  // On fresh visit, storage has no opt-in
  assert.equal(localStorage.getItem(SOUND_STORAGE_KEY), null);
  assert.equal(sharedAudioController.getState().isPlaying, false);

  // Initialize: must NOT start audio without explicit user action
  sharedAudioController.init();
  assert.equal(sharedAudioController.getState().isPlaying, false);
});

test("Phase 1 - AudioController toggles on explicit user action and persists to localStorage", async () => {
  const { sharedAudioController, SOUND_STORAGE_KEY } = await import("../lib/audio-controller.ts");

  let latestPlayingState = null;
  const unsubscribe = sharedAudioController.subscribe((state) => {
    latestPlayingState = state.isPlaying;
  });

  // User taps/presses toggle
  sharedAudioController.toggle();
  assert.equal(sharedAudioController.getState().isPlaying, true);
  assert.equal(latestPlayingState, true);
  assert.equal(localStorage.getItem(SOUND_STORAGE_KEY), "true");

  // User taps again -> stops
  sharedAudioController.toggle();
  assert.equal(sharedAudioController.getState().isPlaying, false);
  assert.equal(latestPlayingState, false);
  assert.equal(localStorage.getItem(SOUND_STORAGE_KEY), "false");

  unsubscribe();
});

test("AudioController - duckForSpeech pauses ambient music and unduckAfterSpeech restores it", async () => {
  const { sharedAudioController, SOUND_STORAGE_KEY } = await import("../lib/audio-controller.ts");

  // Ensure ambient is playing
  sharedAudioController.play();
  assert.equal(sharedAudioController.getState().isPlaying, true);

  // When speech starts, duck pauses music
  sharedAudioController.duckForSpeech(true);
  assert.equal(sharedAudioController.getState().isPlaying, false);

  // When speech ends, unduck restores music
  sharedAudioController.unduckAfterSpeech();
  assert.equal(sharedAudioController.getState().isPlaying, true);

  // Clean up
  sharedAudioController.pause();
});

