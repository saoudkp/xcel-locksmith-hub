import { useEffect, useRef, useCallback, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 46;
const FRAME_PATH = "/frames/ezgif-frame-";
const pad = (n: number) => String(n).padStart(3, "0");

interface HeroLockAnimationProps {
  onProgress?: (p: number) => void;
  children?: ReactNode;
}

/**
 * Scroll-locked hero using GSAP pin + pinType:"transform".
 * Uses refs for callbacks to keep the effect stable (runs once) and avoid
 * the removeChild error caused by effect re-runs tearing down GSAP mid-pin.
 */
const HeroLockAnimation = ({ onProgress, children }: HeroLockAnimationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentFrameRef = useRef(0);
  // Store callback in ref so the effect never re-runs
  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;

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
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images: HTMLImageElement[] = [];
    let loadedCount = 0;
    let tween: gsap.core.Tween | null = null;

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      renderFrame(ctx, canvas, images, currentFrameRef.current);
    };

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `${FRAME_PATH}${pad(i)}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setCanvasSize();
          setupAnimation();
        }
      };
      images[i - 1] = img;
    }

    const setupAnimation = () => {
      const obj = { frame: 0 };

      tween = gsap.to(obj, {
        frame: FRAME_COUNT - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${window.innerHeight * 2.5}`,
          pin: true,
          pinType: "transform",
          scrub: 1.2,
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
      // Kill only our specific instance, not all ScrollTriggers
      if (tween) {
        const st = tween.scrollTrigger;
        if (st) st.kill();
        tween.kill();
      }
    };
    // Runs once — onProgress is accessed via ref, renderFrame is stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} className="relative h-[85vh] w-full overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full absolute inset-0" />
      {children}
    </div>
  );
};
export default HeroLockAnimation;
