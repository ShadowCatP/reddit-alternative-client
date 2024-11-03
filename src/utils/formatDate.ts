import { formatDistanceToNow } from "date-fns";

export const formatDate = (unixTime: number | undefined): string => {
  if (!unixTime || isNaN(unixTime)) {
    return "Unknown date";
  }
  const date = new Date(unixTime * 1000);
  return formatDistanceToNow(date, { addSuffix: true });
};
