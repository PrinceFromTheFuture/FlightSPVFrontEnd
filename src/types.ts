import { Dayjs } from "dayjs";

export type agentType = {
  name: string;
  role: "SPV" | "Agent" | "Gate Only" | "Desk Only" | "Ramp Agent";
  notes?: string;
  agentId: string;
};
export type flightCrewType = {
  agents: agentType[];
  SPV: agentType;
  rampAgent: agentType;
};
type airportType = {
  name: string;
  shortName: string;
};

export interface flightInterface {
  personalRole: "SPV" | "Agent";
  flightNumber: string;
  flightId: string;
  origin: airportType;
  destenation: airportType;
  flightTime: string;
  counters: string;
  keyMoments: {
    planned: {
      shiftStarts: Dayjs;
      countersOpening: Dayjs;
      countersClosing: Dayjs;
      bording: Dayjs;
      departure: Dayjs;
    };
    actual: {
      countersOpening: Dayjs;
      countersClosing: Dayjs;
      bordingEnd: Dayjs;
      bordingStart: Dayjs;
      offBlock: Dayjs;
    };
  };
  crew: flightCrewType;

  gate: string;
  PAGIAAgents: string;
  totalPassangers: number;
  totalSuitcases: number;
  totalStrollers: number;
}
