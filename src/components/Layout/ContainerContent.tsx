import { NextSeo } from "next-seo";
import { type FC, type ReactNode } from "react";

interface Props {
  title?: string;
  children: ReactNode;
  styles?: boolean;
  className?: string;
  meta?: {
    title?: string;
    description?: string;
    image?: string;
  };
}

export const ContainerContent: FC<Props> = ({
  title,
  children,
  styles,
  className,
  meta,
  ...props
}) => {
  const image = meta?.image
    ? [
        {
          url: meta?.image,
          width: 800,
          height: 600,
          alt: meta?.title,
        },
      ]
    : [];

  return (
    <>
      <NextSeo
        title={title}
        description={meta?.description}
        openGraph={{
          title: title ?? meta?.title,
          description: meta?.description,
          images: image,
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
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
