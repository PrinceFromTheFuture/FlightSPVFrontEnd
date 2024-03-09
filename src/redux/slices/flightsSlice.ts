import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import dayjs, { Dayjs } from "dayjs";

import {
  flightCrewType,
  flightInterface,
  flightReportKeyMoments,
} from "@/types";

// Define the initial state using that type
const initialState: flightInterface[] = [
  {
    personalRole: "SPV",

    flightNumber: "IZ 773",
    flightId: "tcp123",
    origin: { name: "Tel Aviv", shortName: "TLV" },
    destenation: { name: "Grenoble", shortName: "GNB" },
    flightTime: "2 hours",
    keyMoments: {
      planned: {
        shiftStarts: dayjs("2024-3-10T03:30"),
        countersOpening: dayjs("2024-3-10T04:00"),
        countersClosing: dayjs("2024-3-10T06:00"),
        bording: dayjs("2024-3-10T06:15"),
        departure: dayjs("2024-3-10T07:00"),
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
    counters: "46-51",
  },
  {
    personalRole: "Agent",

    flightNumber: "IZ 415",
    flightId: "tcp1231",
    origin: { name: "Tel Aviv", shortName: "TLV" },
    destenation: { name: "Batumi", shortName: "BUS" },
    flightTime: "2 hours",
    keyMoments: {
      planned: {
        shiftStarts: dayjs("2024-3-10T01:45"),
        countersOpening: dayjs("2024-3-10T02:15"),
        countersClosing: dayjs("2024-3-10T04:15"),
        bording: dayjs("2024-3-10T05:00"),
        departure: dayjs("2024-3-10T05:45"),
      },
      actual: {
        countersOpening: dayjs("2024-3-10T01:00"),
        countersClosing: dayjs("2024-3-10T12:00"),
        bordingEnd: dayjs("2024-3-10T12:00"),
        bordingStart: dayjs("2024-3-10T12:00"),
        offBlock: dayjs("2024-3-10T12:00"),
        openningBoardingPagia: dayjs("2024-3-10T12:00"),
      },
    },
    crew: {
      agents: [
        { name: "Amir", role: "Agent", notes: "ffsdfdsffsdd", agentId: "135" },
        { name: "Dalia Sidi", role: "Agent", agentId: "122356" },
        { name: "Hezi Akiva", role: "Agent", agentId: "14fs3f3" },
      ],
      SPV: {
        name: "Yosef Mubarak",
        role: "SPV",
        notes: "אדווה מפוטרת",
        agentId: "143c233",
      },
      rampAgent: { name: "adva", role: "Ramp Agent", agentId: "143f3c32" },
    },

    gate: "432",

    PAGIAAgent: { name: "fdsdva", role: "Agent", agentId: "143c3fsda2" },
    totalPassangers: 3242,
    totalSuitcases: 142,
    totalStrollers: 342,
    counters: "34-38",
  },
];

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
      const requestedFlight = state.find((flight) => {
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
      const requestedFlight = state.find((flight) => {
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
      const requestedFlight = state.find((flight) => {
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
      const requestedFlight = state.find((flight) => {
        return flight.flightId === action.payload.flightId;
      });
      if (requestedFlight) {
        requestedFlight.PAGIAAgent.name = action.payload.value;
      }
    },
  },
});

export const {
  updateFlightAgents,
  updateFlightNumbers,
  updateFlightKeyMomentsActual,
  updateFlightPagiaAgent,
} = flightsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const allFlights = (state: RootState) => state.flights;
export const oneFlight = (state: RootState, flightId: string) => {
  return state.flights.find((flight) => flight.flightId === flightId);
};

export const flightReducer = flightsSlice.reducer;
