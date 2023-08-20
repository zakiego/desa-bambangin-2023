/* eslint-disable @next/next/no-img-element */

import { type FC } from "react";
import { Balancer } from "react-wrap-balancer";

import { ContainerContent } from "~/src/components/Layout";
import { Navbar } from "~/src/components/UI";
import { trpcSSR, type TRPCTypeOutput } from "~/src/server/api/root";

export const getStaticProps = async () => {
  const awards = await trpcSSR.keystatic.kkn.awards();

  return {
    props: {
      awards,
    },
  };
};

type Props = {
  awards: TRPCTypeOutput["keystatic"]["kkn"]["awards"];
};

const Page: FC<Props> = ({ awards }) => {
  return (
    <ContainerContent title="Award KKN Sosiologi Kelompok 9 | Desa Bambangin">
      <div>
        <Navbar />

        <div className="relative">
          <div className="mx-auto max-w-7xl">
            <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
              <svg
                className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-white lg:block"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <polygon points="0,0 90,0 50,100 0,100" />
              </svg>

              <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    <Balancer>{awards.hero.heading}</Balancer>
                  </h1>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                    <Balancer>{awards.hero.subheading}</Balancer>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <img
              className="aspect-[3/2] object-cover lg:aspect-auto lg:h-full lg:w-full"
              src="/images/hero-award-1.jpeg"
              alt="Award Image"
            />
          </div>
        </div>
      </div>

      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {awards.award.heading}
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              <Balancer>{awards.award.subheading}</Balancer>
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
          >
            {awards.awards.map((person, id) => (
              <li key={`award-${id}`}>
                <div className="relative">
                  <img
                    className="mx-auto h-36 w-34 rounded-full absolute left-0 right-0 -top-4"
                    src="/images/award.png"
                    alt="Badge"
                  />
                  <img
                    className="mx-auto h-24 w-24 rounded-full object-cover"
                    src={person.people.image}
                    alt={person.people.name}
                  />
                </div>
                <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
                  {person.people.shortName}
                </h3>
                <p className="text-sm leading-6 text-gray-600">
                  {person.title}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ContainerContent>
  );
};

export default Page;
