import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createLecture, getLecture } from "./lectureAPI";

const initialState = {
  allLecture: null,
  status: "idle",
  error: null,
};

// Replace with the actual path
export const getLectureAsync = createAsyncThunk(
  "lecture/getLecture",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getLecture();
      return response.data;
    } catch (error) {
      console.error(error);
      throw rejectWithValue(error);
    }
  }
);

export const createLectureAsync = createAsyncThunk(
  "lecture/createLecture",
  async (lectureData, { rejectWithValue }) => {
    try {
      const response = await createLecture(lectureData);
      return response.data;
    } catch (error) {
      console.error(error);
      throw rejectWithValue(error);
    }
  }
);

export const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder 
      .addCase(getLectureAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getLectureAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.allLecture = action.payload;
      })
      .addCase(createLectureAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createLectureAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.allLecture = [...state.allLecture, action.payload];
      })
      .addCase(createLectureAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
  },
});

export const selectAllLecture = (state) => state.lecture.allLecture;
export const selectLectureError = (state) => state.lecture.error;
export const {clearError} = lectureSlice.actions;

export default lectureSlice.reducer;
