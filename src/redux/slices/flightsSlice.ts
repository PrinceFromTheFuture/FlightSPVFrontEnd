import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import dayjs, { Dayjs } from "dayjs";

import { flightInterface } from "@/types";

// Define the initial state using that type
const initialState: flightInterface[] = [
  {
    personalRole: "SPV",

    flightNumber: "IZ 101",
    flightId: "tcp123",
    origin: { name: "Tel Aviv", shortName: "TLV" },
    destenation: { name: "Larnaca", shortName: "LCA" },
    flightTime: "2 hours",
    keyMoments: {
      planned: {
        shiftStarts: dayjs("2024-3-4T17:00"),
        countersOpening: dayjs("2024-3-4T17:30"),
        countersClosing: dayjs("2024-3-4T19:30"),
        bording: dayjs("2024-3-4T19:45"),
        departure: dayjs("2024-3-4T20:30"),
      },
      actual: {
        countersOpening: dayjs("2024-3-1T12:00"),
        countersClosing: dayjs("2024-3-1T12:00"),
        bordingEnd: dayjs("2024-3-1T12:00"),
        bordingStart: dayjs("2024-3-1T12:00"),
        offBlock: dayjs("2024-3-1T12:00"),
      },
    },
    crew: {
      agents: [
        { name: "yosi", role: "Agent", notes: "ffsdfdsffsdd", agentId: "1" },
        { name: "shlomo", role: "Agent", agentId: "12" },
        { name: "ami", role: "Agent", agentId: "14fs3" },
      ],
      SPV: {
        name: "Amir",
        role: "SPV",
        notes: "אדווה מפוטרת",
        agentId: "143c3",
      },
      rampAgent: { name: "adva", role: "Ramp Agent", agentId: "143c32" },
    },

    gate: "432",

    PAGIAAgents: "423",
    totalPassangers: 342,
    totalSuitcases: 342,
    totalStrollers: 342,
    counters: "34-23",
  },
];

export const flightsSlice = createSlice({
  name: "flights",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setDepatrure: (
      state,
      action: PayloadAction<{ flightId: string; date: Dayjs }>
    ) => {
      const requestedFlight = state.find((flight) => {
        flight.flightId === action.payload.flightId;
      });
      if (requestedFlight)
        requestedFlight.keyMoments.planned.departure = action.payload.date;
    },
  },
});

export const { setDepatrure } = flightsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const allFlights = (state: RootState) => state.flights;
export const oneFlight = (state: RootState, flightId: string) => {
  return state.flights.find((flight) => flight.flightId === flightId);
};

export const flightReducer = flightsSlice.reducer;
