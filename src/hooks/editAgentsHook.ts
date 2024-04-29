import { agentType, flightCrewType } from "@/types";
import { useState } from "react";
import { useAppSelector } from "./hooks";
import { allAgentsSelector } from "@/redux/slices/agentsSlice";

export const editAgentsHook = (intialFlightCrew: flightCrewType) => {
  const [flightAgents, setFlightAgents] =
    useState<flightCrewType>(intialFlightCrew);
  const [selectedAgent, setSelectedAgent] = useState<{
    agent: agentType;
    notes?: string;
  }>(intialFlightCrew.SPV);

  const allAgents = useAppSelector(allAgentsSelector);

  const handleAgentNotesChange = (newNote: string) => {
    console.log(newNote);
  };

  const handleAgentChange = (agentId: string) => {
    const requestedNewAgent = allAgents.find(
      (agent) => agent.agentId === agentId
    );

    if (flightAgents.SPV.agent === selectedAgent.agent) {
      const newFlightCrew: flightCrewType = JSON.parse(
        JSON.stringify(flightAgents)
      );
      newFlightCrew.SPV = { agent: requestedNewAgent! };
      setFlightAgents(newFlightCrew);
      setSelectedAgent({ agent: requestedNewAgent! });
    } else if (flightAgents.rampAgent.agent === selectedAgent.agent) {
      const newFlightCrew: flightCrewType = JSON.parse(
        JSON.stringify(flightAgents)
      );
      newFlightCrew.rampAgent = { agent: requestedNewAgent! };
      setFlightAgents(newFlightCrew);
      setSelectedAgent({ agent: requestedNewAgent! });
    } else {
      const newFlightCrew: flightCrewType = JSON.parse(
        JSON.stringify(flightAgents)
      );
      newFlightCrew.agents = newFlightCrew.agents.filter(
        (agent) => agent.agent === selectedAgent.agent
      );
      newFlightCrew.agents.push({ agent: requestedNewAgent! });

      setFlightAgents(newFlightCrew);
      setSelectedAgent({ agent: requestedNewAgent! });
    }
  };

  const handleDeleteAgent = () => {
    if (flightAgents.agents) {
      const newAgents = flightAgents.agents.filter((agent) => {
        if (agent !== selectedAgent) {
          return agent;
        }
      });
      setFlightAgents({
        SPV: flightAgents.SPV,
        rampAgent: flightAgents.rampAgent,
        agents: newAgents,
      });
      setSelectedAgent(newAgents[newAgents.length - 1] || flightAgents.SPV);
    }
  };

  const handleAddAgent = () => {
    const newFlightAgents: flightCrewType = JSON.parse(
      JSON.stringify(flightAgents)
    );

    const newAgent: agentType = allAgents[0];
    newFlightAgents.agents.push({ agent: newAgent });

    setSelectedAgent({ agent: newAgent });
    setFlightAgents(newFlightAgents);
  };

  const modifyFlightAgents = {
    handleAddAgent,
    handleDeleteAgent,
    handleAgentNotesChange,
    handleAgentChange,
  };
  return {
    modifyFlightAgents,
    setSelectedAgent,
    selectedAgent,
    flightAgents,
  };
};
