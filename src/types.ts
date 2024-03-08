import { Dayjs } from "dayjs";

export type agentType = {
  name: string;
  role: "SPV" | "Agent" | "Ramp Agent";
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
export type flightReportKeyMoments =
  | "countersOpening"
  | "countersClosing"
  | "bordingEnd"
  | "bordingStart"
  | "openningBoardingPagia"
  | "offBlock";

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
      openningBoardingPagia: Dayjs;
    };
  };
  crew: flightCrewType;

  gate: string;
  PAGIAAgent: agentType;
  totalPassangers: number;
  totalSuitcases: number;
  totalStrollers: number;
}
