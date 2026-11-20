"use client";

/**
 * Tiny coordination channel between the preloader and the hero.
 *
 * The preloader calls `releaseIntro()` the moment its exit transition starts;
 * the hero calls `onIntroRelease(cb)` to start its entrance in sync. If the hero
 * subscribes after the release already happened (Strict Mode remounts, fast
 * refresh, reduced motion), the callback fires immediately — the hero can never
 * be left waiting on an event that already passed.
 */

type Listener = () => void;

let released = false;
const listeners = new Set<Listener>();

export function releaseIntro() {
  if (released) return;
  released = true;
  listeners.forEach((fn) => fn());
  listeners.clear();
}

export function isIntroReleased() {
  return released;
}

export function onIntroRelease(fn: Listener): () => void {
  if (released) {
    fn();
    return () => {};
  }
  listeners.add(fn);
  return () => listeners.delete(fn);
}
