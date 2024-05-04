import { airportType } from "@/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

const initialState: airportType[] = [];

export const getAllAirPorts = createAsyncThunk("airports/getAll", async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_SERVER_BASE_ROUTE}/airports/getAll`
  );

  return response.data;
});

const ariportSlice = createSlice({
  name: "airports",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getAllAirPorts.fulfilled,
      (_, action: PayloadAction<airportType[]>) => {
        return action.payload;
      }
    );
  },
});

export const getAllAirPortsSelector = (state: RootState) => state.airports;

export const ariportsReducer = ariportSlice.reducer;
