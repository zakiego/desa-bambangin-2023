/* eslint-disable @next/next/no-img-element */
import {
  DocumentRenderer,
  type DocumentRendererProps,
} from "@keystatic/core/renderer";
import Image from "next/image";
import { type FC } from "react";

import { ContainerContent } from "~/src/components/Layout/ContainerContent";
import { BreadCrumb, type BreadCrumbProps } from "~/src/components/UI";
import { formatDateKeystatic } from "~/src/utils/date";

interface Props {
  meta: {
    title: string;
  };
  breadcrumb: BreadCrumbProps["breadcrumb"];
  article: {
    title: string;
    image: string;
    date?: string;
    content: DocumentRendererProps["document"];
    author?: {
      name: string;
      image: string;
    };
  };
}

export const SimpleLayout: FC<Props> = ({
  meta,
  breadcrumb,
  article: { title, image, date, content, author },
}) => {
  return (
    <ContainerContent className="bg-white py-24" title={meta.title} styles>
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <BreadCrumb breadcrumb={breadcrumb} />

        <div className="pt-4 pb-4">
          <Image
            src={image}
            alt={title}
            width={1200}
            height={630}
            className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[2/1]"
          />
        </div>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {title}
        </h1>

        <div className="flex flex-col md:flex-row md:items-center gap-y-3 md:gap-x-3 md:gap-y-0 pt-5">
          {author && (
            <>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    src={author.image}
                    alt={author.name}
                    className="rounded-full h-8 w-8 object-cover"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-md font-medium text-gray-600">
                    {author.name}
                  </p>
                </div>
              </div>
              <svg
                viewBox="0 0 2 2"
                className="-ml-0.5 h-0.5 w-0.5 flex-none fill-black hidden md:block"
              >
                <circle cx={1} cy={1} r={1} />
              </svg>
            </>
          )}

          {date && (
            <p className="items-center text-gray-600">
              {formatDateKeystatic(date)}
            </p>
          )}
        </div>

        <hr className=" my-3" />

        <div className="prose">
          <DocumentRenderer
            document={content}
            renderers={{
              block: {
                image(props) {
                  return <img {...props} className="rounded-xl" />;
                },
              },
            }}
          />
        </div>
      </div>
    </ContainerContent>
  );
};
