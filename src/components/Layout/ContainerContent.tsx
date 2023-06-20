import { type FC, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const ContainerContent: FC<Props> = ({ children, ...props }) => {
  return (
    <div className="px-6 lg:px-8" {...props}>
      {children}
    </div>
  );
};
