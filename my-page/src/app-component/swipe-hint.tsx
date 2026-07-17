import { useState, useEffect, useCallback, ReactNode } from 'react';
import { useIsMobile } from '../utils/useIsMobile';
import './swipe-hint.css';

type ScrollRef = (el: HTMLElement | null) => void;

interface SwipeHintProps {
  children: (scrollRef: ScrollRef) => ReactNode;
  label?: string;
  scrollSelector?: string;
}

const SwipeHint = ({ children, label, scrollSelector }: SwipeHintProps) => {
  const isMobile = useIsMobile();

  const [scrollEl, setScrollEl] = useState<HTMLElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Store the outer element; resolve the real scroll target lazily in the effect
  // so a descendant selector still works once children have mounted.
  const setRef = useCallback<ScrollRef>((el) => setScrollEl(el), []);

  useEffect(() => {
    if (!scrollEl) return;
    const target = scrollSelector
      ? scrollEl.querySelector<HTMLElement>(scrollSelector)
      : scrollEl;
    if (!target) return;

    const update = () => {
      setCanScrollLeft(target.scrollLeft > 1);
      setCanScrollRight(target.scrollLeft + target.clientWidth < target.scrollWidth - 1);
    };

    update();
    target.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    // Catches content-driven width changes (e.g. async table data loading in).
    const observer = new ResizeObserver(update);
    observer.observe(target);

    return () => {
      target.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      observer.disconnect();
    };
  }, [scrollEl, scrollSelector]);

  const scroll = (direction: -1 | 1) => {
    const target = scrollSelector
      ? scrollEl?.querySelector<HTMLElement>(scrollSelector)
      : scrollEl;
    target?.scrollBy({ left: direction * 140, behavior: 'smooth' });
  };

  return (
    <>
      {isMobile && (
        <div className="swipe-hint" aria-hidden="true">
          <button
            type="button"
            className="swipe-hint__arrow"
            onClick={() => scroll(-1)}
            disabled={!canScrollLeft}
            tabIndex={-1}
          >
            <i className="pi pi-chevron-left" />
          </button>
          {label && <span className="swipe-hint__label">{label}</span>}
          <button
            type="button"
            className="swipe-hint__arrow"
            onClick={() => scroll(1)}
            disabled={!canScrollRight}
            tabIndex={-1}
          >
            <i className="pi pi-chevron-right" />
          </button>
        </div>
      )}
      {children(setRef)}
    </>
  );
};

export default SwipeHint;
