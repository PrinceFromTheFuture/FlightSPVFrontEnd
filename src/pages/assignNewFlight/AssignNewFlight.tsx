import { useAppSelector } from "@/hooks/hooks";

import { tlvFlightInterface } from "../../types.ts";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import TLVflightComponent from "./TLVflightComponent.tsx";

const AssignNewFlight = () => {
  const tlvFlights = useAppSelector((state) => state.flights.tlvFlights);

  let tlvFlightsWithDayLabel: (tlvFlightInterface | string)[] = [
    tlvFlights[0].dateString,
  ];

  for (let i = 0; i < tlvFlights.length; i++) {
    // Add the current flight
    tlvFlightsWithDayLabel.push(tlvFlights[i]);

    // Check if there's a next flight and if its date is different
    if (
      tlvFlights[i + 1] &&
      !dayjs(tlvFlights[i].dateString).isSame(
        dayjs(tlvFlights[i + 1].dateString),
        "date"
      )
    ) {
      // Add a label for the next flight's date
      tlvFlightsWithDayLabel.push(tlvFlights[i + 1].dateString);
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
      return <TLVflightComponent TLVFlight={flightOrLabel} />;
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
