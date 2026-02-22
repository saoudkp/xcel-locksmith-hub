import { useEffect, useLayoutEffect, useRef, useCallback, useState, type ReactNode } from "react";

const FRAME_NUMBERS = [
  ...Array.from({ length: 19 }, (_, i) => i + 1),   // 1–19
  ...Array.from({ length: 16 }, (_, i) => i + 31),   // 31–46
];
const FRAME_COUNT = FRAME_NUMBERS.length; // 35
const FRAME_PATH = "/frames/ezgif-frame-";
const pad = (n: number) => String(n).padStart(3, "0");
const SCROLL_HEIGHT = 2000; // px of scroll room for the animation

interface HeroLockAnimationProps {
  onProgress?: (p: number) => void;
  children?: ReactNode;
}

/**
 * Scroll-locked hero using manual position:fixed (no GSAP pin).
 * A spacer div reserves scroll room. While scrolling through it,
 * the hero is fixed on screen and frames scrub via rAF.
 * Zero vibration, zero React DOM conflicts.
 */
const HeroLockAnimation = ({ onProgress, children }: HeroLockAnimationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const currentFrameRef = useRef(0);
  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const rafRef = useRef<number>(0);

  const renderFrame = useCallback((index: number) => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!ctx || !canvas || !img) return;

    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);

    const imgRatio = img.width / img.height;
    const canvasRatio = rect.width / rect.height;
    let drawW: number, drawH: number, dx: number, dy: number;

    if (imgRatio > canvasRatio) {
      drawH = rect.height;
      drawW = drawH * imgRatio;
      dx = (rect.width - drawW) / 2;
      dy = 0;
    } else {
      drawW = rect.width;
      drawH = drawW / imgRatio;
      dx = 0;
      dy = (rect.height - drawH) / 2;
    }

    ctx.drawImage(img, dx, dy, drawW, drawH);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const spacer = spacerRef.current;
    const hero = heroRef.current;
    if (!canvas || !spacer || !hero) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    let loadedCount = 0;

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * 0.85 * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      renderFrame(currentFrameRef.current);
    };

    // Load frames
    FRAME_NUMBERS.forEach((frameNum, idx) => {
      const img = new Image();
      img.src = `${FRAME_PATH}${pad(frameNum)}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setCanvasSize();
          renderFrame(0);
        }
      };
      imagesRef.current[idx] = img;
    });

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const spacerRect = spacer.getBoundingClientRect();
        const spacerTop = -spacerRect.top;
        const scrollRange = spacer.offsetHeight - window.innerHeight * 0.85;

        if (spacerTop < 0) {
          // Above the section — static at top
          hero.style.position = "absolute";
          hero.style.top = "0px";
          hero.style.bottom = "";
          onProgressRef.current?.(0);
          if (currentFrameRef.current !== 0) {
            currentFrameRef.current = 0;
            renderFrame(0);
          }
          return;
        }

        if (spacerTop >= scrollRange) {
          // Past the section — static at bottom
          hero.style.position = "absolute";
          hero.style.top = "";
          hero.style.bottom = "0px";
          onProgressRef.current?.(1);
          if (currentFrameRef.current !== FRAME_COUNT - 1) {
            currentFrameRef.current = FRAME_COUNT - 1;
            renderFrame(FRAME_COUNT - 1);
          }
          return;
        }

        // In the section — fixed on screen
        hero.style.position = "fixed";
        hero.style.top = "0px";
        hero.style.bottom = "";

        const progress = spacerTop / scrollRange;
        onProgressRef.current?.(progress);

        const frameIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(progress * (FRAME_COUNT - 1))));
        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          renderFrame(frameIndex);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", setCanvasSize);
    onScroll(); // initial position

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={spacerRef}
      className="relative"
      style={{ height: `calc(85vh + ${SCROLL_HEIGHT}px)` }}
    >
      <div
        ref={heroRef}
        className="left-0 w-full overflow-hidden z-10"
        style={{ position: "absolute", top: 0, height: "85vh" }}
      >
        <canvas ref={canvasRef} className="w-full h-full absolute inset-0" />
        {children}
      </div>
    </div>
  );
};
export default HeroLockAnimation;
