import { useEffect, useRef, useState } from 'react';

export function useDragging(el: HTMLElement | null) {
  const [dragging, setDragging] = useState(false);
  const mouseDown = useRef(false);

  useEffect(() => {
    const mouseDownHandler = () => {
      mouseDown.current = true;
    };
    const mouseUpHandler = () => {
      mouseDown.current = false;
      setTimeout(() => setDragging(false), 0);
    };
    const mouseMoveHandler = () => {
      if (mouseDown.current) {
        setDragging(true);
      }
    };

    el?.addEventListener('mousedown', mouseDownHandler);
    el?.addEventListener('mouseup', mouseUpHandler);
    el?.addEventListener('mousemove', mouseMoveHandler);

    return () => {
      el?.removeEventListener('mousedown', mouseDownHandler);
      el?.removeEventListener('mouseup', mouseUpHandler);
      el?.removeEventListener('mousemove', mouseMoveHandler);
    };
  }, [el]);

  return dragging;
}
