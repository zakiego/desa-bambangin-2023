import { format, parse } from "date-fns";
import { id } from "date-fns/locale";

export const formatDateKeystatic = (date: string) => {
  return format(parse(date, "yyyy-MM-dd", new Date()), "eeee, d MMMM yyyy", {
    locale: id,
  });
};
