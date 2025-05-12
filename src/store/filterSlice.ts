
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "./tasksSlice";

interface FilterState {
  status: Task["status"] | "all";
  priority: Task["priority"] | "all";
  searchTerm: string;
}

const initialState: FilterState = {
  status: "all",
  priority: "all",
  searchTerm: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setStatusFilter: (state, action: PayloadAction<FilterState["status"]>) => {
      state.status = action.payload;
    },
    setPriorityFilter: (state, action: PayloadAction<FilterState["priority"]>) => {
      state.priority = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    clearFilters: (state) => {
      state.status = "all";
      state.priority = "all";
      state.searchTerm = "";
    },
  },
});

export const { setStatusFilter, setPriorityFilter, setSearchTerm, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;
