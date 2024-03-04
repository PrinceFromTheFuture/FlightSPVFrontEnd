import { cn } from "@/lib/utils";
import dayjs, { Dayjs } from "dayjs";

interface EventWidgetProps {
  position: number;
  eventName: string;
  date: Dayjs;
  isSameLine?: boolean;
}

const EventWidget = ({
  position,
  eventName,
  date,
  isSameLine,
}: EventWidgetProps) => {
  const now = dayjs();
  const isEventPassed = date.isBefore(now);
  return (
    <div className=" absolute" style={{ top: `${position - 2}%` }}>
      <div className={cn(" relative", isSameLine && "flex items-end gap-2 ")}>
        <div
          className={cn(
            " absolute w-3 h-3 rounded-full bg-white ",
            isEventPassed
              ? "border-blue border-[4px] "
              : "  border-gray border-[2px] "
          )}
          style={{ top: "2px", left: "-27.5px" }}
        ></div>
        <div className="text-lg font-semibold  ">
          {" "}
          {eventName}
          {isSameLine && ","}
        </div>
        <div className=" text-gray text-sm font-medium  ">
          {date.format("DD MMM HH:MM")}
        </div>
      </div>
    </div>
  );
};

export default EventWidget;
