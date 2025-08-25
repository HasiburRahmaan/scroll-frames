import { cn } from '@/utils/helpers/cn'
type Props = {
  children: React.ReactNode,
  className?: string,
}

const Heading2 = ({ children, className }: Props) => {
  return (
    <h2
      className={cn(`text-[#414042] dark:text-[#F4F4F4] lg:text-[30px] text-[24px] font-semibold mb-[30px] md:tracking-[1.5px] tracking-normal`, className)}
    >
      {children}
    </h2>
  )
}

export default Heading2
