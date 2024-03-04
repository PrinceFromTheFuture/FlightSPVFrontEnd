import { flightInterface } from "@/types";
interface FlightDetailsWidgetProps {
  flight: flightInterface;
}

const FlightDetailsWidget = ({ flight }: FlightDetailsWidgetProps) => {
  return (
    <div className=" flex justify-between items-center w-contentMaxWidth max-w-screen-md py-4 px-5 bg-blue text-white rounded-2xl ">
      {" "}
      <div>
        <div className=" flex justify-center  items-end mb-2.5">
          <img src="/store.svg" className="w-4" alt="" />
          <div className=" ml-1  font-medium text-sm">Counters</div>
        </div>
        <div className="   text-xl font-bold">{flight.counters}</div>
      </div>
      <div>
        <div className=" flex justify-center  items-end mb-2.5">
          <img src="/door-open.svg" className="w-4" alt="" />
          <div className="  ml-1  font-medium text-sm">Gate</div>
        </div>
        <div className="  text-xl    font-bold">{flight.gate}</div>
      </div>
      <div>
        <div className=" flex justify-center  items-end mb-2.5">
          <img src="/user.svg" className="w-3" alt="" />
          <div className=" ml-1  font-medium text-sm">Role</div>
        </div>
        <div className="   text-xl  font-bold">{flight.personalRole}</div>
      </div>
    </div>
  );
};

export default FlightDetailsWidget;
