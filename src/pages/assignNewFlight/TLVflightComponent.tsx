import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import getAirPortByCityName from "@/lib/getAirPortByCityName";
import { getAllAirPortsSelector } from "@/redux/slices/airportsSlice";
import { createNewFlightFromTLVFlight } from "@/redux/slices/flightsSlice";
import { flightInterface, tlvFlightInterface } from "@/types";
import axios from "axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

interface TLVflightComponentProps {
  TLVFlight: tlvFlightInterface;
}
const TLVflightComponent = ({ TLVFlight }: TLVflightComponentProps) => {
  const dsipatch = useAppDispatch();

  const navigate = useNavigate();

  const allAirports = useAppSelector(getAllAirPortsSelector);

  const handleTLVFlightClicked = async () => {
    const response = await axios.post<flightInterface>(
      `${
        import.meta.env.VITE_SERVER_BASE_ROUTE
      }/flights/saveNewFlightFromTLVFlight`,
      TLVFlight
    );
    const newFlight = response.data;
    dsipatch(createNewFlightFromTLVFlight(newFlight));
    navigate(`/singleFlight/${newFlight.flightId}`);
  };

  return (
    <Dialog>
      <DialogTrigger className="bg-lightGray w-full rounded-xl p-3 flex items-center justify-between transition-all hover:bg-gray cursor-pointer">
        <img src="./plane-departure-blue.svg " className="w-5" alt="" />
        <div>
          <div className=" text-gray font-semibold text-sm">Flight No.</div>
          <div className="text-blue font-bold text-xl">
            {TLVFlight.flightNumber}
          </div>
        </div>
        <div>
          <div className=" text-gray font-semibold text-sm">Departure</div>
          <div className="text-blue font-bold text-xl">
            {dayjs(TLVFlight.dateString).format("HH:mm")}
          </div>
        </div>
        <div className="text-blue font-bold text-xl">
          {allAirports.find((airport) => airport.name === TLVFlight.city)
            ?.code || "???"}
        </div>
      </DialogTrigger>
      <DialogContent>
        <div className=" font-bold text-3xl my-5  flex flex-col justify-center items-center w-full   ">
          <div className=" text-gray font-semibold text-lg">Flight no.</div>
          <div>{TLVFlight.flightNumber}</div>
        </div>
        <div className=" w-full flex justify-center items-center flex-col">
          <img src="/origin-to-destenation.svg" alt="" className="w-[80%]" />
          <div className=" flex justify-between items-center w-full mb-3 mt-2.5">
            <div className="">
              <div className=" text-2xl font-bold text-blue">TLV</div>
              <div className=" text-gray text-sm font-semibold ">Tel Aviv</div>
            </div>
            <div>
              <div className=" text-2xl font-bold text-blue">
                {allAirports.find((airport) => airport.name === TLVFlight.city)
                  ?.code || "???"}
              </div>
              <div className=" text-gray text-sm font-semibold ">
                {TLVFlight.city}
              </div>
            </div>
          </div>
          <div className="w-full text-xl font-bold p-2 text-center bg-lightGray">
            {dayjs(TLVFlight.dateString).format("DD/MM HH:mm")}
          </div>
        </div>
        <div
          className="bg-blue rounded-lg cursor-pointer text-white flex justify-center items-center font-semibold p-3"
          onClick={() => {
            handleTLVFlightClicked();
          }}
        >
          {" "}
          Create Flight
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TLVflightComponent;
