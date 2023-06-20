import { format, parse } from "date-fns";
import { id } from "date-fns/locale";
import Image from "next/image";
import { type FC } from "react";
import { type z } from "zod";

import { type keystaticSchema } from "~/src/lib/schema";
import { formatDateKeystatic } from "~/src/utils/date";

interface Props {
  data: z.infer<(typeof keystaticSchema)["collections"]["beritaPagination"]>;
}

export const ListNews: FC<Props> = (props) => {
  return (
    <div className="bg-white py-10 sm:py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto  lg:max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Berita Terbaru
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Seputar kegiatan dan perkembangan dari Desa Bambangin
          </p>
          <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
            {props.data.map((post) => (
              <article
                key={post.entry.id}
                className="relative isolate flex flex-col gap-8 lg:flex-row"
              >
                <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                  <Image
                    src={post.entry.image}
                    alt={post.entry.title}
                    height={500}
                    width={500}
                    className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                </div>
                <div>
                  <div className="flex items-center gap-x-4 text-xs">
                    <time
                      dateTime={post.entry.datePublished}
                      className="text-gray-500"
                    >
                      {formatDateKeystatic(post.entry.datePublished)}
                    </time>
                  </div>
                  <div className="group relative max-w-xl">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <a href={`/berita/detail/${post.slug}`}>
                        <span className="absolute inset-0" />
                        {post.entry.title}
                      </a>
                    </h3>
                    <p className="mt-5 text-sm leading-7 text-gray-600">
                      {post.entry.summary}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
