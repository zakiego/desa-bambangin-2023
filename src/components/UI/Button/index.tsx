import type { VariantProps } from "class-variance-authority";
import { cva, cx } from "class-variance-authority";

const button = cva("", {
  variants: {
    intent: {
      primary:
        "flex items-center rounded-md mt-8 w-fit bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400",
    },
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export const Button: React.FC<ButtonProps> = ({
  className,
  intent,
  ...props
}) => <button className={button({ intent, className })} {...props} />;
