import { useAppSelector } from "@/hooks/hooks";

import dayjs from "dayjs";
import { Link } from "react-router-dom";
import TLVflightComponent from "./TLVflightComponent.tsx";

const AssignNewFlight = () => {
  const tlvFlights = useAppSelector((state) => state.flights.tlvFlights);
  let allTLVFlights: any = [];

  for (let i = 0; i < tlvFlights.length; i++) {
    if (
      i > 0 &&
      dayjs(tlvFlights[i].dateString).isSame(
        tlvFlights[i - 1].dateString,
        "day"
      ) === true
    ) {
      allTLVFlights.push(<TLVflightComponent TLVFlight={tlvFlights[i]} />);
    } else {
      allTLVFlights.push(
        <div className=" text-gray text-2xl font-semibold mt-4">
          {dayjs(tlvFlights[i].dateString).format("ddd, DD.MM")}{" "}
        </div>
      );
    }
  }
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
        {allTLVFlights}
      </div>
    </div>
  );
};

export default AssignNewFlight;
