import { useRef, useState, useCallback } from 'react';

/**
 * Returns a callback ref and a boolean that becomes true the first time the
 * element enters the viewport. Uses a callback ref (not useRef) so the observer
 * is set up at the exact moment the element mounts — even if that happens lazily
 * (e.g., inside a PrimeReact TabPanel that renders on first click).
 */
export function useRevealOnce(
  threshold = 0.12,
): [(el: HTMLDivElement | null) => void, boolean] {
  const [revealed, setRevealed] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const callbackRef = useCallback(
    (el: HTMLDivElement | null) => {
      // Clean up any previous observer (called with null on unmount)
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      if (!el || revealed) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
            observerRef.current = null;
          }
        },
        { threshold },
      );

      observer.observe(el);
      observerRef.current = observer;
    },
    // revealed in deps: once true, the callback immediately returns so the
    // observer is never re-created after the animation has already fired.
    [threshold, revealed],
  );

  return [callbackRef, revealed];
}
