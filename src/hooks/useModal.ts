import { useEffect } from 'react';

interface UseModalOptions {
  isOpen: boolean;
  onClose: () => void;
  /** Optional, for the gallery viewer's left/right arrow keys */
  onPrevious?: () => void;
  onNext?: () => void;
}

/**
 * Shared behaviour for the popups on this site: close on Escape, step through
 * images with the arrow keys, and stop the page underneath from scrolling.
 *
 * Pass handlers that are stable (useCallback) so the listener is not
 * detached and reattached on every render.
 */
export function useModal({ isOpen, onClose, onPrevious, onNext }: UseModalOptions) {
  // Keyboard shortcuts, only while the popup is actually open
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft') {
        onPrevious?.();
      } else if (event.key === 'ArrowRight') {
        onNext?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrevious, onNext]);

  // Lock the background scroll. Hiding the scrollbar makes the page a little
  // wider, so we add matching padding to keep the content from jumping sideways.
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = 'hidden';

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [isOpen]);
}
