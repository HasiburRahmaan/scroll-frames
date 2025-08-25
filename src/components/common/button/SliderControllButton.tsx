import { cn } from '@/utils/helpers/cn'
import React, { ReactNode } from 'react'
import "./iconStyle.scss"

type Props = {
  children?: ReactNode;
  className?: string;
  areaLabel?: string;
  arrowHasWhiteBorder?: boolean
  [key: string]: any
}

const SliderControllButton = ({
  children,
  className,
  areaLabel = "slider control button",
  arrowHasWhiteBorder = false,
  ...props
}: Props) => {
  return (
    <button
      type="button"
      aria-label={areaLabel}
      className={cn(
        // base styles
        `lg:w-[50px] lg:h-[50px] w-10 h-10 rounded-full border border-[#FF4306] flex justify-center items-center slider_arrow_btn active:scale-95`,

        // conditional disabled styles
        arrowHasWhiteBorder
          ? `white_arrow`
          : ``,
        // arrowHasWhiteBorder
        //   ? `disabled:border-white dark:disabled:border-white white_arrow`
        //   : `disabled:border-[#414042] dark:disabled:border-[#D9D9D9]`,

        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default SliderControllButton
