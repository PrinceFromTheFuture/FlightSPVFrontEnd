import { agentType, flightCrewType } from "@/types";
import { useState } from "react";

export const editAgentsHook = (intialFlightCrew: flightCrewType) => {
  const [flightAgents, setFlightAgents] = useState(intialFlightCrew);
  const [selectedAgent, setSelectedAgent] = useState<agentType>(
    intialFlightCrew.SPV
  );

  const handleNameChange = (newName: string) => {
    switch (selectedAgent?.role) {
      case "SPV":
        {
          const oldAgents = flightAgents.agents.map((agent) => {
            return agent;
          });
          const newFlightAgents: typeof flightAgents = {
            agents: oldAgents,
            rampAgent: flightAgents.rampAgent,
            SPV: { ...flightAgents.SPV, name: newName },
          };
          setFlightAgents(newFlightAgents);
          setSelectedAgent({ ...flightAgents.SPV, name: newName });
        }
        break;
      case "Ramp Agent":
        {
          const oldAgents = flightAgents.agents.map((agent) => {
            return agent;
          });
          const newFlightAgents: typeof flightAgents = {
            agents: oldAgents,
            SPV: flightAgents.SPV,
            rampAgent: { ...flightAgents.rampAgent, name: newName },
          };
          setFlightAgents(newFlightAgents);
          setSelectedAgent({ ...flightAgents.rampAgent, name: newName });
        }
        break;
      default: {
        const oldAgents = flightAgents.agents.map((agent) => {
          if (agent.name === selectedAgent?.name) {
            return { ...agent, name: newName };
          }
          return agent;
        });
        const newFlightAgents: typeof flightAgents = {
          agents: oldAgents,
          SPV: flightAgents.SPV,
          rampAgent: flightAgents.rampAgent,
        };
        setFlightAgents(newFlightAgents);
        const newSelectedAgent = flightAgents.agents.find((agent) => {
          agent.name === selectedAgent?.name;
        });
        setSelectedAgent({ ...newSelectedAgent!, name: newName });
      }
    }
  };
  return { handleNameChange, selectedAgent, setSelectedAgent, flightAgents };
};
