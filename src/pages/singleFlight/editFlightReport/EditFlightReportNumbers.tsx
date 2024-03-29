import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { oneFlight, updateFlightNumbers } from "@/redux/slices/flightsSlice";
import { useState } from "react";
import { useParams } from "react-router-dom";

interface EditFlightReportNumbersProps {
  type: "totalPassangers" | "totalStrollers" | "totalSuitcases";
}

const EditFlightReportNumbers = ({ type }: EditFlightReportNumbersProps) => {
  const dispatch = useAppDispatch();

  const { flightID } = useParams();
  console.log(flightID);
  if (flightID == undefined || "") {
    return <div>A problem occured</div>;
  }

  const flight = useAppSelector((state) => oneFlight(state, flightID));

  if (flight) {
    const [value, setValue] = useState(flight[type]);
    return (
      <Dialog>
        <DialogTrigger className="bg-lightGray rounded-lg w-full flex justify-between items-center p-2.5  ">
          <img
            src={
              type === "totalPassangers"
                ? "/user-blue.svg"
                : type === "totalStrollers"
                ? "/baby-carriage.svg"
                : "/suitcase.svg"
            }
            className="w-4"
          />
          <div className="   text-md font-bold text-blue">{flight[type]}</div>
          <img src="/triangle.svg" alt="" className="w-2.5" />
        </DialogTrigger>
        <DialogContent className="">
          <div className=" text-blue font-bold text-2xl  ">
            {type === "totalPassangers"
              ? "Total Flight Passengers"
              : type === "totalStrollers"
              ? "Total Flight Strollers"
              : "Total Flight Suitcases"}
          </div>
          <input
            type="number"
            max={200}
            min={0}
            value={value}
            onChange={(event) => setValue(Number(event.target.value))}
            className="text-lg font-semibold  outline-none border-2 border-blue text-center text-blue rounded-lg p-2"
          />
          <DialogClose
            className=" items-end "
            onClick={() =>
              dispatch(
                updateFlightNumbers({ flightId: flight.flightId, type, value })
              )
            }
          >
            <div className="py-2 bg-blue rounded-lg font-semibold px-4 text-white">
              Save
            </div>
          </DialogClose>
        </DialogContent>
      </Dialog>
    );
  } else {
    return <div>erorr</div>;
  }
};

export default EditFlightReportNumbers;
