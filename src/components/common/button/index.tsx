import { cn } from "@/utils/helpers/cn";
import { ButtonHTMLAttributes, ReactNode } from "react";

export type BaseButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  icon?: ReactNode;
  prependIcon?: ReactNode;
  appendIcon?: ReactNode;
  loading?: boolean;
};

const ButtonComponent = ({
  children,
  icon,
  prependIcon,
  appendIcon,
  loading = false,
  className,
  disabled,
  ...props
}: BaseButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <button
      className={cn(
        "focus:outline-hidden focus:ring-0 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-sm transition-colors font-medium  disabled:opacity-50 disabled:pointer-events-none",
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {/* icon-only */}
      {icon && !children && icon}

      {/* prepend icon + text */}
      {prependIcon && <span className="mr-1">{prependIcon}</span>}
      {children}
      {appendIcon && <span className="ml-1">{appendIcon}</span>}
    </button>
  );
};

export default ButtonComponent;
