import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createInstructor, getAllInstructor } from "./homeAPI";

const initialState = {
  allInstructor: null,
  status: "idle",
  error: null,
};

// Replace with the actual path
export const getAllInstructorAsync = createAsyncThunk(
  "instructor/getAllInstructor",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllInstructor();
      return response.data;
    } catch (error) {
      console.error(error);
      throw rejectWithValue(error);
    }
  }
);

export const createInstructurAsync = createAsyncThunk(
  "instructor/createInstructor",
  async (instructorData) => {
    const response = await createInstructor(instructorData);
    return response.data;
  }
);

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllInstructorAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllInstructorAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.allInstructor = action.payload;
      })
      .addCase(createInstructurAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createInstructurAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.allInstructor = [...state.allInstructor, action.payload];
      });
  },
});

export const selectAllInstructor = (state) => state.home.allInstructor;

export default homeSlice.reducer;
