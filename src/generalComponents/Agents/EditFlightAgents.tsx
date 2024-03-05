import { flightInterface } from "@/types";
import Agent from "@/generalComponents/Agents/Agent";
import {
  DrawerContent,
  DrawerTrigger,
  Drawer,
  DrawerClose,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useAppSelector } from "@/hooks/hooks";
import { allAgentsSelector } from "@/redux/slices/agentsSlice";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { editAgentsHook } from "@/hooks/editAgentsHook";

interface EditFlightAgentsProps {
  flight: flightInterface;
}

const EditFlightAgents = ({ flight }: EditFlightAgentsProps) => {
  const allAgents = useAppSelector(allAgentsSelector);

  const [isAgentSelectOpen, setIsAgentSelectOpen] = useState(false);

  const { flightAgents, handleNameChange, selectedAgent, setSelectedAgent } =
    editAgentsHook(flight.crew);

  let imgSrc;
  if (selectedAgent?.role === "Ramp Agent") {
    imgSrc = "/ramp.svg";
  } else if (selectedAgent?.role === "SPV") {
    imgSrc = "/spv.svg";
  } else {
    imgSrc = "/user-blue.svg";
  }

  return (
    <Drawer>
      <DrawerTrigger className="text-md w-full font-semibold text-white flex justify-center items-center py-2.5 mt-4  gap-2   rounded-xl bg-blue">
        <div> Edit Crew</div>
        <img src="/pen.svg" alt="" className="w-3" />
      </DrawerTrigger>
      <DrawerContent className="">
        {selectedAgent && (
          <div className="  w-full my-3  ">
            {" "}
            <div className="flex justify-between items-end mb-5">
              <div className="flex justify-start items-end gap-3">
                <img src={imgSrc} alt="" className="w-[24px]" />
                <div className="text-blue font-bold text-xl  ">
                  {selectedAgent.name}, {selectedAgent.role}
                </div>
              </div>

              {selectedAgent.role !== "SPV" &&
                selectedAgent.role !== "Ramp Agent" && (
                  <div className="bg-blue flex justify-center items-center p-2 rounded-lg">
                    <img src="/trash-can-xmark.svg" alt="" className="w-4" />
                  </div>
                )}
            </div>
            <div>
              <div className="  text-md font-semibold ml-2 mb-2">
                Select Agent
              </div>
              <Popover
                open={isAgentSelectOpen}
                onOpenChange={setIsAgentSelectOpen}
              >
                <PopoverTrigger asChild>
                  <div className="w-full rounded-lg p-2 bg-lightGray justify-center text-blue flex items-center  text-md font-semibold gap-2 ">
                    <div>{selectedAgent.name}</div>
                    <ChevronsUpDown className=" " color="#1F2A3F" />
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  className="w-full p-0"
                  side="bottom"
                  align="start"
                >
                  <div className="w-contentMaxWidth  flex justify-center items-center">
                    <Command className="w-contentMaxWidth   bg-white shadow-md  ">
                      <CommandInput placeholder="Search agent..." />
                      <CommandEmpty>No agent found.</CommandEmpty>
                      <CommandGroup className="max-h-[150px] overflow-scroll ">
                        {allAgents.map((agent) => (
                          <CommandItem
                            className={cn(
                              " text-md font-semibold p-2  rounded-lg  ",
                              selectedAgent.name === agent.name &&
                                "bg-blue text-white "
                            )}
                            key={agent.agentId}
                            value={agent.name}
                            onSelect={(newAgentName) => {
                              handleNameChange(newAgentName);
                              setIsAgentSelectOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedAgent.name === agent.name
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {agent.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}
        <div
          className={cn(
            " flex flex-col gap-3 w-full max-h-[220px] my-4 overflow-auto "
          )}
        >
          <Agent
            agent={flightAgents.SPV}
            selectedAgent={selectedAgent}
            onClick={() => setSelectedAgent(flightAgents.SPV)}
          />

          <Agent
            agent={flightAgents.rampAgent}
            selectedAgent={selectedAgent}
            onClick={() => setSelectedAgent(flightAgents.rampAgent)}
          />
          {flightAgents.agents.map((agent) => {
            return (
              <Agent
                key={agent.agentId}
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
