import { useEffect, useLayoutEffect, useRef, useCallback, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Frames 1–19 and 31–46 (skip 20–30 for snappier animation)
const FRAME_NUMBERS = [
  ...Array.from({ length: 19 }, (_, i) => i + 1),   // 1–19
  ...Array.from({ length: 16 }, (_, i) => i + 31),   // 31–46
];
const FRAME_COUNT = FRAME_NUMBERS.length; // 35
const FRAME_PATH = "/frames/ezgif-frame-";
const pad = (n: number) => String(n).padStart(3, "0");

interface HeroLockAnimationProps {
  onProgress?: (p: number) => void;
  children?: ReactNode;
}

/**
 * Scroll-locked hero using CSS sticky (no GSAP pin = zero vibration).
 * GSAP ScrollTrigger only drives frame progress, never touches DOM layout.
 */
const HeroLockAnimation = ({ onProgress, children }: HeroLockAnimationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const currentFrameRef = useRef(0);
  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const renderFrame = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, images: HTMLImageElement[], index: number) => {
    if (!images[index]) return;
    const img = images[index];
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
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      renderFrame(ctx, canvas, images, currentFrameRef.current);
    };

    // Load only the frames we need
    FRAME_NUMBERS.forEach((frameNum, idx) => {
      const img = new Image();
      img.src = `${FRAME_PATH}${pad(frameNum)}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setCanvasSize();
          setupAnimation();
        }
      };
      images[idx] = img;
    });

    const setupAnimation = () => {
      const obj = { frame: 0 };

      tweenRef.current = gsap.to(obj, {
        frame: FRAME_COUNT - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          onUpdate: (self) => {
            onProgressRef.current?.(self.progress);
          },
        },
        onUpdate: () => {
          const frameIndex = Math.round(obj.frame);
          if (frameIndex !== currentFrameRef.current) {
            currentFrameRef.current = frameIndex;
            renderFrame(ctx, canvas, images, frameIndex);
          }
        },
      });
    };

    window.addEventListener("resize", setCanvasSize);
    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Synchronous cleanup BEFORE React commits DOM deletions
  useLayoutEffect(() => {
    return () => {
      const tween = tweenRef.current;
      if (tween) {
        const st = tween.scrollTrigger;
        if (st) st.kill();
        tween.kill();
        tweenRef.current = null;
      }
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative" style={{ height: "250vh" }}>
      <div className="sticky top-0 h-[85vh] w-full overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full absolute inset-0" />
        {children}
      </div>
    </div>
  );
};
export default HeroLockAnimation;
