import { cn } from "@/utils/helpers/cn";
import { forwardRef } from "react";
type Props = {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

const Content = forwardRef<HTMLElement, Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref as any}
        className={cn(
          `text-[#4D4D4F] font-normal dark:text-[#D9D9D9]  text-sm leading-[1.7]`,
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

export default Content;
