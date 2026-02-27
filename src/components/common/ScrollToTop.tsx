import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * Included once at the top level of the Router.
 * Listens to location changes and scrolls the window to the top automatically.
 */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll completely to the top-left of the window
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
