import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { type FC } from "react";

interface Props {
  breadcrumb: Array<{
    title: string;
    href: string;
  }>;
}

export const BreadCrumb: FC<Props> = (props) => {
  return (
    <div>
      <nav className="sm:hidden" aria-label="Back">
        <a
          href={props.breadcrumb[props.breadcrumb.length - 2].href}
          className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          <ChevronLeftIcon
            className="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />
          Back
        </a>
      </nav>
      <nav className="hidden sm:flex" aria-label="Breadcrumb">
        <ol role="list" className="flex items-center space-x-2">
          {props.breadcrumb.map((item, index) => {
            if (index === 0) {
              return (
                <li key={item.title}>
                  <div className="flex">
                    <Link
                      href={item.href}
                      className="text-sm font-medium text-gray-500 hover:text-gray-700"
                    >
                      {item.title}
                    </Link>
                  </div>
                </li>
              );
            }

            return (
              <li key={item.title}>
                <div className="flex items-center">
                  <ChevronRightIcon
                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  <Link
                    href={item.href}
                    className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                    {...(index === props.breadcrumb.length - 1 && {
                      "aria-current": "page",
                    })}
                  >
                    {item.title}
                  </Link>
                </div>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};
