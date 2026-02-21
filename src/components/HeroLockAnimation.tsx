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
 * GSAP-pinned hero.
 * Uses `pin: true` so the section stays locked until all 46 frames are scrubbed.
 * Children are rendered as overlays inside the pinned element.
 */
const HeroLockAnimation = ({ onProgress, children }: HeroLockAnimationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const currentFrameRef = useRef(0);

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
    const section = sectionRef.current;
    if (!canvas || !section) return;

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

      gsap.to(obj, {
        frame: FRAME_COUNT - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.5,
          end: () => `+=${window.innerHeight * 3}`,
          onUpdate: (self) => {
            onProgress?.(self.progress);
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
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [onProgress, renderFrame]);

  return (
    <div ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full absolute inset-0" />
      {children}
    </div>
  );
};

export default HeroLockAnimation;
