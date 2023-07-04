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
    date: string;
    content: DocumentRendererProps["document"];
  };
}

export const SimpleLayout: FC<Props> = ({
  meta,
  breadcrumb,
  article: { title, image, date, content },
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

        <p className="pt-3 text-gray-600">{formatDateKeystatic(date)}</p>

        <hr className=" my-3" />

        <div className="prose">
          <DocumentRenderer document={content} />
        </div>
      </div>
    </ContainerContent>
  );
};
