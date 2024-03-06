import { agentType, flightCrewType } from "@/types";
import { useState } from "react";
import { useAppSelector } from "./hooks";
import { allAgentsSelector } from "@/redux/slices/agentsSlice";
import { nanoid } from "@reduxjs/toolkit";

export const editAgentsHook = (intialFlightCrew: flightCrewType) => {
  const [flightAgents, setFlightAgents] =
    useState<flightCrewType>(intialFlightCrew);
  const [selectedAgent, setSelectedAgent] = useState<agentType>(
    intialFlightCrew.SPV
  );

  const allAgent = useAppSelector(allAgentsSelector);

  const handleAgentPropChange = (prop: "name" | "notes", value: string) => {
    switch (selectedAgent?.role) {
      case "SPV":
        {
          const oldAgents = flightAgents.agents.map((agent) => {
            return agent;
          });
          const newFlightAgents: typeof flightAgents = {
            agents: oldAgents,
            rampAgent: flightAgents.rampAgent,
            SPV: { ...flightAgents.SPV, [prop]: value },
          };
          setFlightAgents(newFlightAgents);
          setSelectedAgent({ ...selectedAgent, [prop]: value });
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
            rampAgent: { ...flightAgents.rampAgent, [prop]: value },
          };
          setFlightAgents(newFlightAgents);
          setSelectedAgent({ ...selectedAgent, [prop]: value });
        }
        break;
      default: {
        const oldAgents = flightAgents.agents.map((agent) => {
          if (agent[prop] === selectedAgent?.[prop]) {
            return { ...agent, [prop]: value };
          }
          return agent;
        });
        const newFlightAgents: typeof flightAgents = {
          agents: oldAgents,
          SPV: flightAgents.SPV,
          rampAgent: flightAgents.rampAgent,
        };
        setFlightAgents(newFlightAgents);

        setSelectedAgent({ ...selectedAgent, [prop]: value });

        console.log(
          "all",
          newFlightAgents,
          "selected",
          selectedAgent,
          "newSelected"
        );
      }
    }
  };

  const handleAgentNotesChange = (newNote: string) => {
    handleAgentPropChange("notes", newNote);
  };

  const handleAgentNameChange = (newName: string) => {
    handleAgentPropChange("name", newName);
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
    const newAgents = flightAgents.agents.slice();

    newAgents.push({
      agentId: nanoid(),
      name: allAgent[0].name,
      role: "Agent",
      notes: "",
    });

    setFlightAgents({
      SPV: flightAgents.SPV,
      rampAgent: flightAgents.rampAgent,
      agents: newAgents,
    });
    setSelectedAgent(newAgents[newAgents.length - 1]);
  };

  const modifyFlightAgents = {
    handleAddAgent,
    handleDeleteAgent,
    handleAgentNotesChange,
    handleAgentNameChange,
  };
  return {
    modifyFlightAgents,
    setSelectedAgent,
    selectedAgent,
    flightAgents,
  };
};
