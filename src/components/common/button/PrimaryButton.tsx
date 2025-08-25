import { cn } from "@/utils/helpers/cn";
import ButtonComponent, { BaseButtonProps } from ".";

type Props = BaseButtonProps & {
  className?: string;
  variant?: "dark" | "light" | "outlined";
}
const PrimaryButton = ({ className, variant, ...props }: Props) => {

  const baseStyle = "lg:px-6 px-5 lg:py-4 py-3 rounded-full font-semibold active:scale-95";

  const btnType: Record<NonNullable<Props["variant"]>, string> = {
    dark: `${baseStyle} bg-[#414042] dark:bg-[#D9D9D9] text-[#F4F4F4] dark:text-[#414042] `,
    light: `${baseStyle} border-2 border-[#414042] dark:border-[#FFFFFF]`,
    outlined: `${baseStyle} bg-transparent border-2 border-[#414042] dark:border-[#F4F4F4]`
  }

  return (
    <ButtonComponent
      className={cn(
        "", btnType[variant || "dark" as keyof typeof btnType],
        className
      )}
      {...props}
    />
  );
};

export default PrimaryButton;