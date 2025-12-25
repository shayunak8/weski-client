import dayjs from "dayjs";
import { GROUP_SIZE } from "../constants/app.constants";
import { ERROR_MESSAGES } from "../constants/errorMessages.constants";

export interface ValidationErrors {
  skiSite?: string;
  groupSize?: string;
  startDate?: string;
  endDate?: string;
  dates?: string;
}

export interface FormValues {
  skiSiteId: number;
  groupSize: number;
  startDate: Date | null;
  endDate: Date | null;
}

export const validateSearchForm = (values: FormValues): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!values.skiSiteId) {
    errors.skiSite = ERROR_MESSAGES.SELECT_DESTINATION;
  }

  if (
    !values.groupSize ||
    values.groupSize < GROUP_SIZE.MIN ||
    values.groupSize > GROUP_SIZE.MAX
  ) {
    errors.groupSize = ERROR_MESSAGES.GROUP_SIZE_INVALID;
  }

  if (!values.startDate) {
    errors.startDate = ERROR_MESSAGES.SELECT_START_DATE;
  }

  if (!values.endDate) {
    errors.endDate = ERROR_MESSAGES.SELECT_END_DATE;
  }

  if (
    values.startDate &&
    values.endDate &&
    dayjs(values.startDate).isAfter(dayjs(values.endDate))
  ) {
    errors.dates = ERROR_MESSAGES.END_DATE_BEFORE_START;
  }

  return errors;
};
