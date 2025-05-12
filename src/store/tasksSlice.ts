
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: string;
  createdAt: string;
}

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [
    {
      id: "1",
      title: "Complete project proposal",
      description: "Finish the proposal for the new client project including timeline and budget estimates.",
      status: "in-progress",
      priority: "high",
      dueDate: "2025-05-20",
      createdAt: "2025-05-10",
    },
    {
      id: "2",
      title: "Weekly team meeting",
      description: "Discuss project progress and address any roadblocks.",
      status: "pending",
      priority: "medium",
      dueDate: "2025-05-15",
      createdAt: "2025-05-08",
    },
    {
      id: "3",
      title: "Update documentation",
      description: "Review and update the project documentation with recent changes.",
      status: "completed",
      priority: "low",
      dueDate: "2025-05-05",
      createdAt: "2025-05-01",
    },
  ],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, "id" | "createdAt">>) => {
      const newTask: Task = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split("T")[0],
        ...action.payload,
      };
      state.tasks.unshift(newTask);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    setTaskStatus: (state, action: PayloadAction<{ id: string; status: Task["status"] }>) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
      }
    },
  },
});

export const { addTask, updateTask, deleteTask, setTaskStatus } = tasksSlice.actions;
export default tasksSlice.reducer;
