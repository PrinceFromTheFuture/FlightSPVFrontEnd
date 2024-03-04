import { flightInterface } from "@/types";
import dayjs, { Dayjs } from "dayjs";
import EventWidget from "./EventWidget";

interface FlightTimeLineProps {
  flight: flightInterface;
}
const FlightTimeLine = ({ flight }: FlightTimeLineProps) => {
  const events = flight.keyMoments.planned;
  const timeFrame = events.departure.diff(events.shiftStarts, "minutes");
  const devider = timeFrame / 100;

  const getEventPosition = (event: Dayjs): number => {
    const diffFromBeggining = event.diff(events.shiftStarts, "minutes");
    const eventPercentage = diffFromBeggining / devider;
    return eventPercentage;
  };

  const now = dayjs();

  return (
    <div className=" flex w-full h-[60vh] justify-start mb-[10vh]">
      <div className="w-2 h-[70vh] bg-gray relative rounded-full overflow-hidden">
        <div
          className={`absolute w-full bg-blue`}
          style={{
            height: `${(getEventPosition(now) / 70) * 60}%`,
          }}
        >
          {" "}
        </div>
      </div>
      <div className=" relative w-full  ml-3">
        <EventWidget
          date={events.shiftStarts}
          eventName="Start Of Shift"
          position={getEventPosition(events.shiftStarts)}
        />
        <EventWidget
          date={events.countersOpening}
          eventName="Opening Counters"
          position={getEventPosition(events.countersOpening)}
        />
        <EventWidget
          date={events.countersClosing}
          eventName="Closing Counters"
          isSameLine={true}
          position={getEventPosition(events.countersClosing)}
        />
        <EventWidget
          date={events.bording}
          eventName="Bording"
          position={getEventPosition(events.bording)}
        />

        <EventWidget
          date={events.departure}
          eventName="Departure"
          position={getEventPosition(events.departure)}
        />
      </div>
    </div>
  );
};

export default FlightTimeLine;
