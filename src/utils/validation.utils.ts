import dayjs from "dayjs";

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
    errors.skiSite = "Please select a destination";
  }

  if (!values.groupSize || values.groupSize < 1 || values.groupSize > 10) {
    errors.groupSize = "Group size must be between 1 and 10";
  }

  if (!values.startDate) {
    errors.startDate = "Please select a start date";
  }

  if (!values.endDate) {
    errors.endDate = "Please select an end date";
  }

  if (
    values.startDate &&
    values.endDate &&
    dayjs(values.startDate).isAfter(dayjs(values.endDate))
  ) {
    errors.dates = "End date must be after start date";
  }

  return errors;
};
