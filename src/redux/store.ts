import { configureStore } from "@reduxjs/toolkit";

import { flightReducer } from "./slices/flightsSlice";
import { agentsReducer } from "./slices/agentsSlice";
import { ariportsReducer } from "./slices/airportsSlice";

// ...

export const store = configureStore({
  reducer: {
    flights: flightReducer,
    agents: agentsReducer,
    airports: ariportsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
