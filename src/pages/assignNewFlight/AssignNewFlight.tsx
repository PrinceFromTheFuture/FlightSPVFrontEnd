import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getAirPortByCityName } from "@/lib/utils";
import {
  allTLVFlights,
  createNewFlightFromTLVFlight,
} from "@/redux/slices/flightsSlice";
import { tlvAvalableFlight } from "@/types";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const AssignNewFlight = () => {
  const dsipatch = useAppDispatch();
  const tlvFlights = useAppSelector(allTLVFlights);

  let tlvFlightsWithDayLabel: (tlvAvalableFlight | string)[] = [
    tlvFlights[0].date,
  ];

  for (let i = 0; i < tlvFlights.length; i++) {
    if (
      i > 0 &&
      dayjs(tlvFlights[i].date).isSame(dayjs(tlvFlights[i - 1].date), "date")
    ) {
      tlvFlightsWithDayLabel.push(tlvFlights[i]);
    } else {
      tlvFlightsWithDayLabel.push(tlvFlights[i]);
      tlvFlightsWithDayLabel.push(tlvFlights[i + 1].date);
    }
  }

  const tlvFlightUI = tlvFlightsWithDayLabel.map((flightOrLabel) => {
    if (typeof flightOrLabel === "string") {
      return (
        <div className=" text-gray text-xl mt-2 font-semibold ml-2">
          {dayjs(flightOrLabel).format("ddd, D.MM")}
        </div>
      );
    } else {
      return (
        <Link
          to={`/singleFlight/${flightOrLabel.id}`}
          onClick={() => {
            dsipatch(
              createNewFlightFromTLVFlight({ tlvFlight: flightOrLabel })
            );
          }}
          className="bg-lightGray w-full rounded-xl p-3 flex items-center justify-between transition-all hover:bg-gray cursor-pointer"
        >
          <img src="./plane-departure-blue.svg " className="w-5" alt="" />
          <div>
            <div className=" text-gray font-semibold text-sm">Flight No.</div>
            <div className="text-blue font-bold text-xl">
              {flightOrLabel.Flight}
            </div>
          </div>
          <div>
            <div className=" text-gray font-semibold text-sm">Departure</div>
            <div className="text-blue font-bold text-xl">
              {dayjs(flightOrLabel.date).format("HH:mm")}
            </div>
          </div>
          <div className="text-blue font-bold text-xl">
            {getAirPortByCityName(flightOrLabel.City)}
          </div>
        </Link>
      );
    }
  });
  return (
    <div>
      <div className=" flex justify-between items-center w-contentMaxWidth">
        <Link
          to={"/"}
          className=" bg-lightGray  rounded-xl w-7 h-7 flex justify-center items-center"
        >
          <img src="/arrow.svg" alt="432  " className="rotate-180 w-4 " />
        </Link>
      </div>
      <div className="flex justify-start items-start flex-col gap-3">
        {tlvFlightUI}
      </div>
    </div>
  );
};

export default AssignNewFlight;
