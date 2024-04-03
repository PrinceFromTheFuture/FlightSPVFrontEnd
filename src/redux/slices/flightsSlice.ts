import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import dayjs, { Dayjs } from "dayjs";
import AlltlvAvalableFlights from "./data.json";

import {
  flightCrewType,
  flightInterface,
  flightReportKeyMoments,
  tlvAvalableFlight,
} from "@/types";
import { getAirPortByCityName } from "@/lib/utils";

// Define the initial state using that type

interface initialStateInterface {
  tlvAvalableFlights: tlvAvalableFlight[];
  flights: flightInterface[];
}
const initialState: initialStateInterface = {
  tlvAvalableFlights: AlltlvAvalableFlights,

  flights: [
    {
      personalRole: "SPV",

      flightNumber: "J2 022",
      flightId: "tcp123",
      origin: { name: "Tel Aviv", shortName: "TLV" },
      destenation: { name: "Baku", shortName: "GYD" },
      flightTime: "2 hours",
      keyMoments: {
        planned: {
          shiftStarts: dayjs("2024-3-24T08:25"),
          countersOpening: dayjs("2024-3-24T08:55"),
          countersClosing: dayjs("2024-3-24T10:55"),
          bording: dayjs("2024-3-24T11:10"),
          departure: dayjs("2024-3-24T11:55"),
        },
        actual: {
          countersOpening: dayjs("2024-3-1T12:00"),
          countersClosing: dayjs("2024-3-1T12:00"),
          bordingEnd: dayjs("2024-3-1T12:00"),
          bordingStart: dayjs("2024-3-1T12:00"),
          offBlock: dayjs("2024-3-1T12:00"),
          openningBoardingPagia: dayjs("2024-3-1T12:00"),
        },
      },
      crew: {
        agents: [
          {
            name: "mikel marshel",
            role: "Agent",
            notes: "ffsdfdsffsdd",
            agentId: "1",
          },
          { name: "Tamar Tal", role: "Agent", agentId: "12" },
          { name: "Amir Waisblay", role: "Agent", agentId: "14fs3" },
        ],
        SPV: {
          name: "Angelica sabash",
          role: "SPV",
          notes: "אדווה מפוטרת",
          agentId: "143c3",
        },
        rampAgent: { name: "adva", role: "Ramp Agent", agentId: "143c32" },
      },

      gate: "432",

      PAGIAAgent: { name: "fdsdva", role: "Agent", agentId: "143c3fsda2" },
      totalPassangers: 3242,
      totalSuitcases: 142,
      totalStrollers: 342,
      counters: "62-64",
    },
  ],
};

export const flightsSlice = createSlice({
  name: "flights",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateFlightAgents: (
      state,
      action: PayloadAction<{ flightId: string; agents: flightCrewType }>
    ) => {
      const requestedFlight = state.flights.find((flight) => {
        return flight.flightId === action.payload.flightId;
      });
      if (requestedFlight) {
        requestedFlight.crew = action.payload.agents;
      }
    },
    updateFlightNumbers: (
      state,
      action: PayloadAction<{
        flightId: string;
        type: "totalPassangers" | "totalStrollers" | "totalSuitcases";
        value: number;
      }>
    ) => {
      const requestedFlight = state.flights.find((flight) => {
        return flight.flightId === action.payload.flightId;
      });
      if (requestedFlight) {
        requestedFlight[action.payload.type] = action.payload.value;
      }
    },
    updateFlightKeyMomentsActual: (
      state,
      action: PayloadAction<{
        flightId: string;
        type: flightReportKeyMoments;
        value: Dayjs;
      }>
    ) => {
      const requestedFlight = state.flights.find((flight) => {
        return flight.flightId === action.payload.flightId;
      });
      if (requestedFlight) {
        requestedFlight.keyMoments.actual[action.payload.type] =
          action.payload.value;
      }
    },
    updateFlightPagiaAgent: (
      state,
      action: PayloadAction<{
        flightId: string;
        value: string;
      }>
    ) => {
      const requestedFlight = state.flights.find((flight) => {
        return flight.flightId === action.payload.flightId;
      });
      if (requestedFlight) {
        requestedFlight.PAGIAAgent.name = action.payload.value;
      }
    },
    updateFlightMetaData: (
      state,
      action: PayloadAction<{
        flightId: string;
        flightNumber: string;
        gate: string;
        counters: string;
        departure: Dayjs;
        origin: string;
        destenation: string;
      }>
    ) => {
      const requestedFlight = state.flights.find((flight) => {
        return flight.flightId === action.payload.flightId;
      });
      if (requestedFlight) {
        requestedFlight.flightNumber = action.payload.flightNumber;
        requestedFlight.gate = action.payload.gate;
        requestedFlight.counters = action.payload.counters;

        requestedFlight.keyMoments.planned.shiftStarts =
          action.payload.departure.subtract(3.5, "hours");
        requestedFlight.keyMoments.planned.countersOpening =
          action.payload.departure.subtract(3, "hours");
        requestedFlight.keyMoments.planned.countersClosing =
          action.payload.departure.subtract(1, "hours");
        requestedFlight.keyMoments.planned.bording =
          action.payload.departure.subtract(0.45, "hours");
        requestedFlight.keyMoments.planned.departure = action.payload.departure;

        requestedFlight.origin.shortName = action.payload.origin;
        requestedFlight.destenation.shortName = action.payload.destenation;
      }
    },
    createNewFlightFromTLVFlight: (
      state,
      action: PayloadAction<{
        tlvFlight: tlvAvalableFlight;
      }>
    ) => {
      if (
        !state.flights.find(
          (flight) => flight.flightId === action.payload.tlvFlight.id
        )
      ) {
        const newFlight: flightInterface = {
          personalRole: "SPV",
          flightNumber: action.payload.tlvFlight.Flight,
          flightId: action.payload.tlvFlight.id,
          origin: {
            name: "Tel Aviv",
            shortName: "TLV",
          },
          destenation: {
            name: action.payload.tlvFlight.City,
            shortName: getAirPortByCityName(action.payload.tlvFlight.City),
          },
          flightTime: "3 hours",
          counters: action.payload.tlvFlight.Counter || "",
          keyMoments: {
            planned: {
              shiftStarts: dayjs(action.payload.tlvFlight.date).subtract(
                210,
                "minutes"
              ),
              countersOpening: dayjs(action.payload.tlvFlight.date).subtract(
                180,
                "minutes"
              ),
              countersClosing: dayjs(action.payload.tlvFlight.date).subtract(
                60,
                "minutes"
              ),
              bording: dayjs(action.payload.tlvFlight.date).subtract(
                45,
                "minutes"
              ),
              departure: dayjs(action.payload.tlvFlight.date),
            },
            actual: {
              countersOpening: dayjs(action.payload.tlvFlight.date),
              countersClosing: dayjs(action.payload.tlvFlight.date),
              bordingEnd: dayjs(action.payload.tlvFlight.date),
              bordingStart: dayjs(action.payload.tlvFlight.date),
              offBlock: dayjs(action.payload.tlvFlight.date),
              openningBoardingPagia: dayjs(action.payload.tlvFlight.date),
            },
          },
          crew: {
            agents: [
              {
                name: "32",
                role: "SPV",
                notes: "string",
                agentId: "43245f3",
              },
            ],
            SPV: {
              name: "32",
              role: "SPV",
              notes: "string",
              agentId: "43245f3",
            },
            rampAgent: {
              name: "32",
              role: "SPV",
              notes: "string",
              agentId: "43245f3",
            },
          },

          gate: "E1A",
          PAGIAAgent: {
            name: "32",
            role: "SPV",
            notes: "string",
            agentId: "43245f3",
          },
          totalPassangers: 342,
          totalSuitcases: 423,
          totalStrollers: 123,
        };

        state.flights.push(newFlight);
      }
    },
  },
});

export const {
  updateFlightAgents,
  updateFlightNumbers,
  updateFlightKeyMomentsActual,
  updateFlightPagiaAgent,
  updateFlightMetaData,
  createNewFlightFromTLVFlight,
} = flightsSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export const allTLVFlights = (state: RootState) => {
  return state.flights.tlvAvalableFlights;
};
export const allFlights = (state: RootState) => state.flights.flights;
export const oneFlight = (state: RootState, flightId: string) => {
  return state.flights.flights.find((flight) => flight.flightId === flightId);
};

export const flightReducer = flightsSlice.reducer;
