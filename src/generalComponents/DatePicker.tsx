import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../components/ui/carousel";
import { cn } from "../lib/utils";
import { Card, CardContent } from "../components/ui/card";
import dayjs, { Dayjs } from "dayjs";

interface DatePickerProps {
  selectedDate: Dayjs;
  setSelectedDate: (day: Dayjs) => void;
}

const DatePicker = ({ selectedDate, setSelectedDate }: DatePickerProps) => {
  const [date, setDate] = useState<Dayjs>(dayjs());

  const daysInWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedDate = event.target.value;

    let date;
    !selectedDate ? (date = dayjs()) : (date = dayjs(selectedDate));
    setDate(date);
  }

  const handleChangeDayInAMonth = (day: number) => {
    setSelectedDate(date.set("date", day));
  };

  const monthsInAYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className=" flex  flex-col justify-center items-center ">
      <div>
        <label
          htmlFor="dateMonth"
          className="flex justify-between items-center gap-3 mb-3"
        >
          <img src="/triangle-blue.svg" alt="" className="w-3 rotate-90" />
          <div className=" font-bold text-blue">
            {`${monthsInAYear[date.get("M")]}, ${date.get("year")}`}
          </div>
          <img src="/triangle-blue.svg" alt="" className="w-3 -rotate-90" />
        </label>

        <input
          type="month"
          id="dateMonth"
          name="dateMonth"
          className="  invisible absolute"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <Carousel
        opts={{ loop: true, skipSnaps: true, startIndex: date.date() - 1 }}
      >
        <CarouselContent>
          {Array.from({ length: date.daysInMonth() }).map((_, index) => (
            <CarouselItem key={index} className="basis-1/4 pl-4  ">
              <Card
                className={cn(
                  "bg-lightGray flex justify-center items-center flex-col rounded-2xl transition-all ",
                  index + 1 === selectedDate.get("date")
                    ? "bg-blue text-white"
                    : ""
                )}
                onClick={() => handleChangeDayInAMonth(index + 1)}
              >
                <CardContent className="flex justify-center items-center flex-col py-3">
                  <div className=" font-normal text-sm">
                    {daysInWeek[date.set("date", index + 1).day()]}
                  </div>
                  <div className="font-bold text-lg">{index + 1}</div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default DatePicker;
