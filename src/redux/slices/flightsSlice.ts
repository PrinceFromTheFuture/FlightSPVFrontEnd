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
  {
    personalRole: "SPV",

    flightNumber: "IZ 417",
    flightId: "tcp1231",
    origin: { name: "Tel Aviv", shortName: "TLV" },
    destenation: { name: "Tbilisi", shortName: "TBS" },
    flightTime: "2 hours",
    keyMoments: {
      planned: {
        shiftStarts: dayjs("2024-3-24T11:40"),
        countersOpening: dayjs("2024-3-24T12:10"),
        countersClosing: dayjs("2024-3-24T14:10"),
        bording: dayjs("2024-3-24T14:25"),
        departure: dayjs("2024-3-24T15:10"),
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
    counters: "46-55",
  },
  {
    personalRole: "SPV",

    flightNumber: "IZ 295",
    flightId: "tcp1231",
    origin: { name: "Tel Aviv", shortName: "TLV" },
    destenation: { name: "Bucharest", shortName: "OTP" },
    flightTime: "2 hours",
    keyMoments: {
      planned: {
        shiftStarts: dayjs("2024-3-24T12:30"),
        countersOpening: dayjs("2024-3-24T13:00"),
        countersClosing: dayjs("2024-3-24T15:00"),
        bording: dayjs("2024-3-24T15:15"),
        departure: dayjs("2024-3-24T16:00"),
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
    counters: "46-55",
  },
  {
    personalRole: "SPV",

    flightNumber: "IZ 363",
    flightId: "tcp1231",
    origin: { name: "Tel Aviv", shortName: "TLV" },
    destenation: { name: "Sofia", shortName: "SOF" },
    flightTime: "2 hours",
    keyMoments: {
      planned: {
        shiftStarts: dayjs("2024-3-24T15:05"),
        countersOpening: dayjs("2024-3-24T15:35"),
        countersClosing: dayjs("2024-3-24T17:35"),
        bording: dayjs("2024-3-24T17:50"),
        departure: dayjs("2024-3-24T18:35"),
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
    counters: "46-55",
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
      const requestedFlight = state.find((flight) => {
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
  },
});

export const {
  updateFlightAgents,
  updateFlightNumbers,
  updateFlightKeyMomentsActual,
  updateFlightPagiaAgent,
  updateFlightMetaData,
} = flightsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const allFlights = (state: RootState) => state.flights;
export const oneFlight = (state: RootState, flightId: string) => {
  return state.flights.find((flight) => flight.flightId === flightId);
};

export const flightReducer = flightsSlice.reducer;
