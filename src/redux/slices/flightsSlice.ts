import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";

import {
  flightCrewType,
  flightInterface,
  flightReportKeyMoments,
  tlvFlightInterface,
} from "@/types";

export const getAllFlights = createAsyncThunk(
  "flights/getAllFlights",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_BASE_ROUTE}/flights/allFlights`
    );
    return response.data;
  }
);
export const getAllTLVFlights = createAsyncThunk(
  "flights/getAllTLV",
  async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_BASE_ROUTE}/flights/tlvFlights`,
      {
        from: dayjs().format("YYYY-MM-DD"),
        to: dayjs().add(7, "days").format("YYYY-MM-DD"),
      }
    );
    return response.data;
  }
);

interface initialStateInterface {
  tlvFlights: tlvFlightInterface[];
  flights: flightInterface[];
}
const initialState: initialStateInterface = {
  tlvFlights: [],

  flights: [],
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
        axios.patch(
          `${
            import.meta.env.VITE_SERVER_BASE_ROUTE
          }/flights/flightReportNumbers`,
          { ...action.payload }
        );
        requestedFlight[action.payload.type] = action.payload.value;
      }
    },
    updateFlightKeyMomentsActual: (
      state,
      action: PayloadAction<{
        flightId: string;
        type: flightReportKeyMoments;
        value: string;
      }>
    ) => {
      const requestedFlight = state.flights.find((flight) => {
        return flight.flightId === action.payload.flightId;
      });
      if (requestedFlight) {
        axios.patch(
          `${import.meta.env.VITE_SERVER_BASE_ROUTE}/flights/actualKeyMoments`,
          { ...action.payload }
        );
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

        requestedFlight.origin.code = action.payload.origin;
        requestedFlight.destenation.code = action.payload.destenation;
      }
    },
    createNewFlightFromTLVFlight: (
      state,
      action: PayloadAction<flightInterface>
    ) => {
      const newFlight: flightInterface = action.payload;

      state.flights.push(newFlight);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getAllFlights.fulfilled,
      (state, action: PayloadAction<flightInterface[]>) => {
        state.flights = action.payload;
      }
    );
    builder.addCase(
      getAllTLVFlights.fulfilled,
      (state, action: PayloadAction<tlvFlightInterface[]>) => {
        state.tlvFlights = action.payload;
      }
    );
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
  return state.flights.tlvFlights;
};
export const allFlights = (state: RootState) => state.flights.flights;
export const oneFlight = (state: RootState, flightId: string) => {
  return state.flights.flights.find((flight) => flight.flightId === flightId);
};

export const flightReducer = flightsSlice.reducer;
