import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 46;
const FRAME_PATH = "/frames/ezgif-frame-";
const pad = (n: number) => String(n).padStart(3, "0");

const SCROLL_HEIGHT = "250vh";

const HeroLockAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      renderFrame(currentFrameRef.current);
    };

    const renderFrame = (index: number) => {
      if (!images[index] || !ctx) return;
      const img = images[index];
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Cover-fit the image
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
    };

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `${FRAME_PATH}${pad(i)}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setCanvasSize();
          setupScrollTrigger();
        }
      };
      images[i - 1] = img;
    }
    imagesRef.current = images;

    const setupScrollTrigger = () => {
      const obj = { frame: 0 };

      gsap.to(obj, {
        frame: FRAME_COUNT - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
        onUpdate: () => {
          const frameIndex = Math.round(obj.frame);
          if (frameIndex !== currentFrameRef.current) {
            currentFrameRef.current = frameIndex;
            renderFrame(frameIndex);
          }
        },
      });
    };

    window.addEventListener("resize", setCanvasSize);
    return () => {
      window.removeEventListener("resize", setCanvasSize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="hidden md:block relative"
      style={{ height: SCROLL_HEIGHT }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export { SCROLL_HEIGHT };
export default HeroLockAnimation;
