import { Dayjs } from "dayjs";

const formatDayjsToHTMLInputValue = (date: Dayjs) => {
  return date.format("YYYY-MM-DDTHH:MM");
};

export default formatDayjsToHTMLInputValue;
