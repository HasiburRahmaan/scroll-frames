import ContentContainer from '@/components/layout/container/contentContainer'
import React, { useEffect } from 'react'
import { cn } from '@/utils/helpers/cn';

type Props = {
  containerClassname?: string;
  children?: React.ReactNode;
  message?: string;
  messageClassname?: string;
}

const NoDataFound = ({ containerClassname, children, message, messageClassname }: Props) => {
  const [isMounted, setIsMounted] = React.useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <ContentContainer className={cn("flex justify-center", containerClassname)}>
      {children ??
        <h2
          className={cn("text-center font-medium text-[#41404299] md:text-[24px] text-[16px] dark:text-[#F4F4F4] md:py-[150px] py-[75px] max-w-[770px]", messageClassname)}
        >
          {message ?? "No Data Found"}
        </h2>
      }
    </ContentContainer>
  )
}

export default NoDataFound