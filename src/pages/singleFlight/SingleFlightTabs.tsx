import { flightInterface } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Agent from "@/generalComponents/Agent";

interface SingleFlightTabsProps {
  flight: flightInterface;
}

const SingleFlightTabs = ({ flight }: SingleFlightTabsProps) => {
  return (
    <Tabs defaultValue="FlightCrew" className="w-full">
      <TabsList className="grid w-full grid-cols-2 h-fit text-sm font-semibold    rounded-xl ">
        <TabsTrigger value="FlightCrew">Flight Crew</TabsTrigger>

        <TabsTrigger value="FlightReport">Flight Report</TabsTrigger>
      </TabsList>
      <TabsContent value="FlightCrew">
        <div className=" flex flex-col gap-3">
          {" "}
          <Agent agent={flight.crew.SPV} />
          <Agent agent={flight.crew.rampAgent} />
          {flight.crew.agents.map((agent) => {
            return <Agent agent={agent} />;
          })}
        </div>
      </TabsContent>
      <TabsContent value="FlightReport">Flight Report</TabsContent>
    </Tabs>
  );
};

export default SingleFlightTabs;
