import dayjs from "dayjs";
import { DATE_FORMAT } from "../constants/app.constants";

export const formatDate = (date: Date | null): string => {
  if (!date) return "";
  return dayjs(date).format(DATE_FORMAT);
};
