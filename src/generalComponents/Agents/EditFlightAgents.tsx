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
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { oneFlight } from "@/redux/slices/flightsSlice";
import { useParams } from "react-router-dom";
import { editAgentsHook } from "@/hooks/editAgentsHook";

const EditFlightAgents = () => {
  const { flightID } = useParams();
  console.log(flightID);
  if (flightID == undefined || "") {
    return <div>A problem occured</div>;
  }

  const flight = useAppSelector((state) => oneFlight(state, flightID));
  if (flight) {
    const allAgents = useAppSelector(allAgentsSelector);

    const {
      modifyFlightAgents,
      setSelectedAgent,
      selectedAgent,
      flightAgents,
    } = editAgentsHook(flight.crew);

    const [isAgentSelectOpen, setIsAgentSelectOpen] = useState(false);

    let imgSrc;
    if (selectedAgent.agent.role === "Ramp Agent") {
      imgSrc = "/ramp.svg";
    } else if (selectedAgent.agent.role === "SPV") {
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
                    {selectedAgent.agent.name}, {selectedAgent.agent.role}
                  </div>
                </div>

                {selectedAgent.agent.role !== "SPV" &&
                  selectedAgent.agent.role !== "Ramp Agent" && (
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
                      <div>{selectedAgent.agent.name}</div>
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
                        <CommandGroup className="max-h-[150px] overflow-y-scroll ">
                          {allAgents.map((agent) => (
                            <CommandItem
                              onSelect={() =>
                                modifyFlightAgents.handleAgentChange(
                                  agent.agentId
                                )
                              }
                              className={cn(
                                " text-md font-semibold p-2  rounded-lg  ",
                                selectedAgent.agent.name === agent.name &&
                                  "bg-blue text-white "
                              )}
                              key={agent.agentId}
                              value={agent.name}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedAgent.agent.name === agent.name
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
              <div className="mt-4">
                <div className="  text-md font-semibold ml-2 mb-2">
                  Agent Notes
                </div>
                <textarea
                  className="w-full p-2 border-2 border-lightGray outline-none rounded-lg h-[60px] "
                  value={selectedAgent.notes || ""}
                  onChange={(e) =>
                    modifyFlightAgents.handleAgentNotesChange(e.target.value)
                  }
                ></textarea>
              </div>
            </div>
          )}
          <div
            className={cn(
              " flex flex-col gap-3 w-full max-h-[150px] my-4 overflow-auto "
            )}
          >
            <Agent
              agent={flightAgents.SPV}
              roleInFlight="SPV"
              selectedAgent={selectedAgent}
              onClick={() => setSelectedAgent(flightAgents.SPV)}
            />

            <Agent
              agent={flightAgents.rampAgent}
              roleInFlight="rampAgent"
              selectedAgent={selectedAgent}
              onClick={() => setSelectedAgent(flightAgents.rampAgent)}
            />
            {flightAgents.agents.map((agent) => {
              return (
                <Agent
                  key={agent.agent.agentId}
                  roleInFlight="Agent"
                  agent={agent}
                  selectedAgent={selectedAgent}
                  onClick={() => setSelectedAgent(agent)}
                />
              );
            })}
            <div
              className="bg-blue w-full py-2.5 rounded-xl flex items-center justify-center font-semibold text-sm text-white gap-2"
              onClick={() => modifyFlightAgents.handleAddAgent()}
            >
              new Agent
              <Plus />
            </div>
          </div>
          <DrawerClose
            className={cn(
              "bg-blue w-full py-3 text-white font-semibold font-sm rounded-xl",
              !selectedAgent && "bg-blue/80"
            )}
          >
            Save Changes
          </DrawerClose>
        </DrawerContent>
      </Drawer>
    );
  } else {
    return <div>error</div>;
  }
};

export default EditFlightAgents;
