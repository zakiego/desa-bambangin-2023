import { NextSeo } from "next-seo";
import { type FC, type ReactNode } from "react";

interface Props {
  title?: string;
  children: ReactNode;
  styles?: boolean;
  className?: string;
}

export const ContainerContent: FC<Props> = ({
  title,
  children,
  styles,
  className,
  ...props
}) => {
  return (
    <>
      <NextSeo title={title} />
      {styles ? (
        <div className={"px-6 lg:px-8 " + className} {...props}>
          {children}
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};
