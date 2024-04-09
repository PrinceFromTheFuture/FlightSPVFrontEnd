import { useAppDispatch } from "@/hooks/hooks";
import { getAirPortByCityName } from "@/lib/utils";
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

  const handleTLVFlightClicked = async () => {
    const response = await axios.post<flightInterface>(
      "http://localhost:3000/flights/saveNewFlightFromTLVFlight",
      TLVFlight
    );
    const newFlight = response.data;
    dsipatch(createNewFlightFromTLVFlight(newFlight));
    navigate(`/singleFlight/${newFlight.flightId}`);
  };

  return (
    <div
      onClick={() => {
        handleTLVFlightClicked();
      }}
      className="bg-lightGray w-full rounded-xl p-3 flex items-center justify-between transition-all hover:bg-gray cursor-pointer"
    >
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
        {getAirPortByCityName(TLVFlight.city)}
      </div>
    </div>
  );
};

export default TLVflightComponent;
