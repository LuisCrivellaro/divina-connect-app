import { useRef, useEffect } from "react";

export function useDragScroll() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let pressed = false;
    let startX = 0;
    let scrollStart = 0;
    let lastX = 0;
    let vel = 0;
    let raf = 0;
    let dragged = false;

    function down(e: MouseEvent) {
      pressed = true;
      dragged = false;
      startX = e.clientX;
      lastX = e.clientX;
      scrollStart = el.scrollLeft;
      vel = 0;
      cancelAnimationFrame(raf);
      el.style.cursor = "grabbing";
    }

    function move(e: MouseEvent) {
      if (!pressed) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) dragged = true;
      vel = e.clientX - lastX;
      lastX = e.clientX;
      el.scrollLeft = scrollStart - dx;
    }

    function up() {
      if (!pressed) return;
      pressed = false;
      el.style.cursor = "grab";

      let v = vel;
      const glide = () => {
        if (Math.abs(v) < 0.5) return;
        el.scrollLeft -= v;
        v *= 0.92;
        raf = requestAnimationFrame(glide);
      };
      raf = requestAnimationFrame(glide);
    }

    // Prevents clicks on child elements from firing after a drag
    function preventClick(e: MouseEvent) {
      if (dragged) {
        e.preventDefault();
        e.stopPropagation();
        dragged = false;
      }
    }

    el.addEventListener("mousedown", down);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    el.addEventListener("click", preventClick, true);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousedown", down);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      el.removeEventListener("click", preventClick, true);
    };
  }, []);

  return ref;
}
