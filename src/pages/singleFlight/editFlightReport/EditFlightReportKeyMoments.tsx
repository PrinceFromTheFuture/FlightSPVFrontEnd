import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  oneFlight,
  updateFlightKeyMomentsActual,
} from "@/redux/slices/flightsSlice";
import { flightReportKeyMoments } from "@/types";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

interface EditFlightReportKeyMomentsProps {
  type: flightReportKeyMoments;
  label: string;
  imgSrc: string;
}

const EditFlightReportKeyMoments = ({
  type,
  imgSrc,
  label,
}: EditFlightReportKeyMomentsProps) => {
  const dispatch = useAppDispatch();

  const { flightID } = useParams();
  if (flightID == undefined || "") {
    return <div>A problem occured</div>;
  }

  const flight = useAppSelector((state) => oneFlight(state, flightID));

  if (flight) {
    return (
      <div className="w-full">
        <div className="  text-md font-semibold ml-2 mb-2">{label}</div>
        <div className=" w-full flex justify-between items-center relative gap-2 ">
          <input
            type="datetime-local"
            className="  "
            id={type}
            name={type}
            value={dayjs(flight.keyMoments.actual[type]).format(
              "YYYY-MM-DDTHH:MM"
            )}
            onChange={(event) =>
              dispatch(
                updateFlightKeyMomentsActual({
                  value: event.target.value,
                  type,
                  flightId: flight.flightId,
                })
              )
            }
          />{" "}
          <div className=" w-full h-7 bg-lightGray rounded-lg flex justify-center gap-2.5 items-center    text-md font-bold text-blue">
            {" "}
            <img src={imgSrc} alt="" className="w-3" />
            <div>
              {dayjs(flight.keyMoments.actual[type]).format("DD MMM HH:mm")}
            </div>
          </div>
          <label
            htmlFor={type}
            className="bg-blue w-7 h-7 rounded-lg flex justify-center items-center"
          >
            <img src="/calendar-days.svg" alt="fdfdsf" className="w-[50%]" />
          </label>
        </div>
      </div>
    );
  } else {
    return <div>erorr</div>;
  }
};

export default EditFlightReportKeyMoments;
