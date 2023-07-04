import { ArrowRightIcon } from "@heroicons/react/24/outline";
import {
  DocumentRenderer,
  type DocumentRendererProps,
} from "@keystatic/core/renderer";
import Link from "next/link";
import { type FC } from "react";

interface Props {
  title: string;
  content: DocumentRendererProps["document"];
}

export const Profile: FC<Props> = ({ title, content }) => {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700 ">
        <div className="prose">
          <p className="text-base font-semibold leading-7 text-indigo-600">
            Selayang Pandang
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h1>
          <div className="line-clamp-[8] ">
            <DocumentRenderer document={content} />
          </div>
        </div>
        <Link
          href={"/profil-desa"}
          className="flex items-center rounded-md mt-8 w-fit bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
        >
          Baca Selengkapnya
          <ArrowRightIcon className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </div>
  );
};
