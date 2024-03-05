import { agentType, flightInterface } from "@/types";
import Agent from "@/generalComponents/Agents/Agent";
import {
  DrawerContent,
  DrawerTrigger,
  Drawer,
  DrawerClose,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface EditFlightAgentsProps {
  flight: flightInterface;
}

const EditFlightAgents = ({ flight }: EditFlightAgentsProps) => {
  const [selectedAgent, setSelectedAgent] = useState<agentType>();

  return (
    <Drawer>
      <DrawerTrigger className="text-md w-full font-semibold text-white flex justify-center items-center py-2.5 mt-4  gap-2   rounded-xl bg-blue">
        <div> Edit Crew</div>
        <img src="/pen.svg" alt="" className="w-3" />
      </DrawerTrigger>
      <DrawerContent className="">
        <div className=" flex flex-col gap-3 w-full max-h-[450px] overflow-auto ">
          <Agent
            agent={flight.crew.SPV}
            selectedAgent={selectedAgent}
            onClick={() => setSelectedAgent(flight.crew.SPV)}
          />

          <Agent
            agent={flight.crew.rampAgent}
            selectedAgent={selectedAgent}
            onClick={() => setSelectedAgent(flight.crew.rampAgent)}
          />
          {flight.crew.agents.map((agent) => {
            return (
              <Agent
                agent={agent}
                selectedAgent={selectedAgent}
                onClick={() => setSelectedAgent(agent)}
              />
            );
          })}
        </div>
        <DrawerClose
          disabled={!selectedAgent}
          className={cn("bg-blue w-full h-8", !selectedAgent && "bg-blue/80")}
        >
          ffd
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
};

export default EditFlightAgents;
