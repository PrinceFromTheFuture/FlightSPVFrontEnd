import { Dayjs } from "dayjs";

const formatDayjsToHTMLInputValue = (date: Dayjs) => {
  return date.format("YYYY-MM-DDTHH:mm");
};

export default formatDayjsToHTMLInputValue;
