import { agentType } from "@/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";

export const getAllAgents = createAsyncThunk(
  "agents/getAllAgents",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_BASE_ROUTE}/agents/getAll`
    );
    return response.data;
  }
);

const initialState: agentType[] = [];

const agentsSlice = createSlice({
  name: "agents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getAllAgents.fulfilled,
      (_, action: PayloadAction<agentType[]>) => {
        return action.payload;
      }
    );
  },
});

export const allAgentsSelector = (state: RootState) => state.agents;

export const agentsReducer = agentsSlice.reducer;
