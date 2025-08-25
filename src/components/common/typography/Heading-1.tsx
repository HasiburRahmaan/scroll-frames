import { cn } from '@/utils/helpers/cn'
type Props = {
  children: React.ReactNode,
  className?: string,
}

const Heading1 = ({ children, className }: Props) => {
  return (
    <h1
      className={cn(`text-[#4D4D4F] dark:text-[#F4F4F4] lg:text-[48px] lg:leading-[70px] text-[36px] leading-[48px] font-bold lg:mb-10 mb-[30px] font-poppins`, className)}
    >
      {children}
    </h1>
  )
}

export default Heading1
