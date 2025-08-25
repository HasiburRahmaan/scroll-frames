'use client'
import { useRef, useState, useLayoutEffect } from "react";
import ButtonComponent from "../button";
import { cn } from "@/utils/helpers/cn";

export interface ExpandableContentProps {
  /** Collapsed height in pixels. Defaults to ~4 text lines (96 px). */
  collapsedHeight?: number;
  moreLabel?: string;
  lessLabel?: string;
  duration?: number;
  children: React.ReactNode;
  className?: string;
  buttonClassName?: string;
}

const DEFAULT_COLLAPSED_HEIGHT = 96; // ≈ 4 lines at 24 px line-height
const DEFAULT_DURATION = 500;


export default function ExpandableContent({
  collapsedHeight = DEFAULT_COLLAPSED_HEIGHT,
  moreLabel = `More +`,
  lessLabel = "Less –",
  duration = DEFAULT_DURATION,
  children,
  className,
  buttonClassName,
}: ExpandableContentProps) {
  const [open, setOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure full height on mount & whenever content changes.
  useLayoutEffect(() => {
    if (containerRef.current) {
      setMaxHeight(containerRef.current.scrollHeight);
    }
  }, [children]);

  return (
    <div className={cn("flex flex-col", className)}>
      <span
        ref={containerRef}
        style={{
          maxHeight: open ? maxHeight : collapsedHeight,
          transition: `max-height ${duration}ms ease-in-out`,
        }}
        className={cn("overflow-hidden")}
        aria-hidden={!open}
      >
        {children}
      </span>

      {maxHeight && maxHeight > collapsedHeight && (
        <div className='mt-4'>
          <ButtonComponent
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            className={cn(
              "p-0 transition-all duration-500 ease-in-out event-btn flex items-center gap-2 text-sm outline-hidden",
              buttonClassName
            )}
          >
            {open ? lessLabel : moreLabel}
          </ButtonComponent>
        </div>
      )}
    </div>
  );
}
