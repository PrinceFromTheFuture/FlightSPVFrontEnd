import { allFlights, oneFlight } from "@/redux/slices/flightsSlice";
import { useAppSelector } from "../hooks/hooks";
import dayjs from "dayjs";
import DatePicker from "../generalComponents/DatePicker";

import FlightWidget from "@/generalComponents/FlightWidget/FlightWidget.tsx";
import { useState } from "react";
function Home() {
  const flights = useAppSelector(allFlights);
  const flightSingke = useAppSelector((state) => oneFlight(state, "tcp123"));
  const flightSingke1 = useAppSelector((state) => oneFlight(state, "tcp1231"));
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
