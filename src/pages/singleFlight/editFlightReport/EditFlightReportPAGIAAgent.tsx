import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { oneFlight, updateFlightPagiaAgent } from "@/redux/slices/flightsSlice";
import { useState } from "react";
import { useParams } from "react-router-dom";

const EditFlightReportPAGIAAgent = () => {
  const dispatch = useAppDispatch();

  const { flightID } = useParams();
  if (flightID == undefined || "") {
    return <div>A problem occured</div>;
  }

  const flight = useAppSelector((state) => oneFlight(state, flightID));

  if (flight) {
    const [value, setValue] = useState(flight.PAGIAAgent.name);
    return (
      <Dialog>
        <DialogTrigger className=" w-full ">
          <div className="  text-md font-semibold ml-2 mb-2 text-left">
            Pagia Agent
          </div>
          <div className="bg-lightGray rounded-lg w-full flex justify-between items-center p-2.5 ">
            <img src="/user-blue.svg" className="w-4" />
            <div className="   text-md font-bold text-blue">
              {flight.PAGIAAgent.name}
            </div>
            <img src="/triangle.svg" alt="" className="w-2.5" />
          </div>
        </DialogTrigger>
        <DialogContent className="">
          <div className=" text-blue font-bold text-2xl  ">Pagia Agent</div>
          <input
            type="text"
            max={200}
            min={0}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className="text-lg font-semibold  outline-none border-2 border-blue text-center text-blue rounded-lg p-2"
          />
          <DialogClose
            className=" items-end "
            onClick={() =>
              dispatch(
                updateFlightPagiaAgent({ flightId: flight.flightId, value })
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

export default EditFlightReportPAGIAAgent;
