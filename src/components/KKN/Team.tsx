/* eslint-disable @next/next/no-img-element */
import { type FC } from "react";
import { FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa6";
import { type z } from "zod";

import { type keystaticSchema } from "~/src/lib/schema";

interface Props {
  team: z.infer<(typeof keystaticSchema)["kkn"]["teamCollection"]>[];
}

export const Team: FC<Props> = ({ team }) => {
  return (
    <div className="mx-auto max-w-7xl px-6 sm:mt-0 lg:px-8 ">
      <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
        <div className="max-w-3xl xl:col-span-2">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Heading
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">Subheading</p>
        </div>
        <ul
          role="list"
          className="mt-4 divide-y xl:divide-none divide-gray-200 grid grid-cols-1 gap-y-12 xl:grid-cols-2 gap-x-10"
        >
          {team.map((person) => (
            <li
              key={person.name}
              className="flex flex-col gap-10 pt-12 md:flex-row"
            >
              <img
                className="aspect-[4/5] w-48 md:w-36 xl:w-52 flex-none rounded-2xl object-cover shadow-lg"
                src={person.image}
                alt={person.name}
              />
              <div className="max-w-xl flex-auto">
                <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">
                  {person.name}
                </h3>
                <p className="text-base leading-7 text-gray-600">
                  {person.role}
                </p>
                <p className="mt-6 text-base leading-7 text-gray-600">
                  {person.bio}
                </p>
                <ul role="list" className="mt-6 flex gap-x-6">
                  {person.twitter && (
                    <li>
                      <a
                        href={`https://twitter.com/${person.twitter}`}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">Twitter</span>
                        <FaTwitter className="h-5 w-5" />
                      </a>
                    </li>
                  )}

                  {person.linkedin && (
                    <li>
                      <a
                        href={`https://linkedin.com/in/${person.linkedin}`}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">LinkedIn</span>
                        <FaLinkedinIn className="h-5 w-5" />
                      </a>
                    </li>
                  )}

                  {person.instagram && (
                    <li>
                      <a
                        href={`https://instagram.com/${person.instagram}`}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">Instagram</span>
                        <FaInstagram className="h-5 w-5" />
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
