import { agentType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: agentType[] = [
  { name: "Terry Osborne", role: "Agent", notes: "", agentId: "f3" },
  { name: "Felipe Garrett", role: "Agent", notes: "", agentId: "f33fsd" },
  { name: "Adva gamlieli", role: "Agent", notes: "", agentId: "f33d32" },
  { name: "Deborah Powell", role: "Agent", notes: "", agentId: "f33da23" },
  { name: "Rex Gutierrez", role: "Agent", notes: "", agentId: "f33d32 3d" },
  { name: "Preston Manning", role: "Agent", notes: "", agentId: "f3323d3d" },
  { name: "Adva gamlieli", role: "Agent", notes: "", agentId: "f33das3" },
  { name: "ustine Vega", role: "Agent", notes: "", agentId: "f33d33qddas" },
  { name: "amir", role: "Agent", notes: "", agentId: "f333dadw" },
  { name: "Yosi", role: "Agent", notes: "", agentId: "f33d32d" },
  { name: "Mateo Yang", role: "Agent", notes: "", agentId: "f33d23ds" },
  { name: "Terry Osborne", role: "Agent", notes: "", agentId: "f33jkad3232" },
];

const agentsSlice = createSlice({
  name: "agents",
  initialState,
  reducers: {
    addAgent: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const allAgentsSelector = (state: RootState) => state.agents;
export const { addAgent } = agentsSlice.actions;

export const agentsReducer = agentsSlice.reducer;
