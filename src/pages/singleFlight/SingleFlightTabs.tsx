import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Agent from "@/generalComponents/Agents/Agent";

import EditFlightAgents from "@/generalComponents/Agents/EditFlightAgents";

import EditFlightReport from "./editFlightReport/EditFlightReport";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@/hooks/hooks";
import { oneFlight } from "@/redux/slices/flightsSlice";

const SingleFlightTabs = () => {
  const { flightID } = useParams();
  console.log(flightID);
  if (flightID == undefined || "") {
    return <div>A problem occured</div>;
  }

  const flight = useAppSelector((state) => oneFlight(state, flightID));
  if (flight) {
    return (
      <Tabs defaultValue="FlightCrew" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-fit text-sm font-semibold    rounded-xl ">
          <TabsTrigger value="FlightCrew">Flight Crew</TabsTrigger>

          <TabsTrigger value="FlightReport">Flight Report</TabsTrigger>
        </TabsList>
        <TabsContent value="FlightCrew">
          <div className=" flex flex-col gap-3">
            {" "}
            <Agent agent={flight.crew.SPV} roleInFlight="SPV" />
            <Agent agent={flight.crew.rampAgent} roleInFlight="rampAgent" />
            {flight.crew.agents.map((agent) => {
              return <Agent agent={agent} roleInFlight="Agent" />;
            })}
          </div>
          <EditFlightAgents />
        </TabsContent>
        <TabsContent value="FlightReport">
          <EditFlightReport />
        </TabsContent>
      </Tabs>
    );
  } else {
    return <div>erorr</div>;
  }
};

export default SingleFlightTabs;
