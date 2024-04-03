import { allFlights } from "@/redux/slices/flightsSlice";
import { useAppSelector } from "../hooks/hooks";
import dayjs from "dayjs";
import DatePicker from "../generalComponents/DatePicker";

import FlightWidget from "@/generalComponents/FlightWidget/FlightWidget.tsx";
import { useState } from "react";
import { Link } from "react-router-dom";
function Home() {
  const flights = useAppSelector(allFlights);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const flightsInSelectedDate = flights.map((flight) => {
    return flight.keyMoments.planned.shiftStarts.isSame(
      selectedDate.toDate(),
      "date"
    ) ? (
      <FlightWidget flight={flight} key={flight.flightId}></FlightWidget>
    ) : undefined;
  });
  const flightsInSelectedDateFiltered = flightsInSelectedDate.filter(
    (flight) => flight !== undefined
  );

  console.log(flightsInSelectedDateFiltered);

  return (
    <div className="   w-full  ">
      <Link
        to="/newFlight"
        className="fixed bottom-5 right-5 h-8 w-8 bg-blue rounded-2xl flex justify-center items-center z-50 shadow-xl"
      >
        <img src="./plane-departure-white.svg" className="w-5" alt="" />
      </Link>
      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <div className="mt-5 flex flex-col items-center justify-center gap-4 w-full">
        {flightsInSelectedDateFiltered.length === 0 ? (
          <div className="font-semibold text-xl">No Flights Found</div>
        ) : (
          flightsInSelectedDateFiltered
        )}
      </div>
    </div>
  );
}

export default Home;
