import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FrameAnimationWithTimeline: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  const frameCount = 113;
  const [loaded, setLoaded] = useState(false);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    // Preload all images
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = `/frames/${String(i).padStart(3, "0")}.png`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setImages(loadedImages);
          setLoaded(true);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  useEffect(() => {
    if (!loaded || !canvasRef.current || !wrapperRef.current) return;

    const context = canvasRef.current.getContext("2d");
    if (!context) return;

    const render = (index: number) => {
      const img = images[index];
      context.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
      context.drawImage(img, 0, 0, canvasRef.current!.width, canvasRef.current!.height);
    };

    const obj = { frame: 0 };

    gsap.to(obj, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: wrapperRef.current,
        scrub: true,
        pin: true,
        end: "+=3000",
      },
      onUpdate: () => render(obj.frame),
    });

    render(0);

    if (!textRef.current) return;
    const chars = textRef.current.querySelectorAll<HTMLElement>("span");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top .1%",
        end: "+=2500",
        scrub: true,
      },
    });

    tl.from(textRef.current, { scale: 3, opacity: 0, duration: 5 })
      .to(chars, { y: 50, opacity: 0, stagger: 0.25, duration: 5 }, "+=3");

  }, [loaded, images]);

  const headerText = "Product Showcasing!";

  if (!loaded) {
    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "2rem",
          fontWeight: "bold",
          color: "black",
          backgroundColor: "white",
        }}
      >
        Loading...
      </div>
    )
  }

  return (
    <div className="w-full flex justify-center py-[10vh] " ref={wrapperRef}>
      <div style={{ position: "relative" }} className="inline-block">
        {/* Canvas */}
        <canvas
          className="mx-auto md:w-[720px] md:h-[720px] w-full h-full"
          ref={canvasRef}
          width={720}
          height={720}
          style={{ display: loaded ? "block" : "none" }}
        />




        {/* Text overlay */}
        {loaded && (
          <div
            ref={textRef}
            style={{
              position: "absolute",
              top: "30%",
              width: "100%",
              textAlign: "center",
              fontSize: "4rem",
              fontWeight: "bold",
              color: "#fff",
              pointerEvents: "none",
              overflow: "hidden",
            }}
          >
            {headerText.split("").map((char, index) => (
              <span key={index} style={{ display: "inline-block" }}>
                {char}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FrameAnimationWithTimeline;
