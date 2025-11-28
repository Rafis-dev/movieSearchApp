import { useEffect } from 'react';

export const useLockBodyScroll = active => {
  useEffect(() => {
    if (!active) {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '';
      return;
    }

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '';
    };
  }, [active]);
};
