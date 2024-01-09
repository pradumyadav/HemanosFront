import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createCourse, getCourses } from "./courseAPI";

const initialState = {
  allCourses: null,
  status: "idle",
  error: null,
};

// Replace with the actual path
export const getCourseAsync = createAsyncThunk(
  "course/getCourse",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCourses();
      return response.data;
    } catch (error) {
      console.error(error);
      throw rejectWithValue(error);
    }
  }
);

export const createCourseAsync = createAsyncThunk(
  "course/createCourse",
  async (courseData) => {
    const response = await createCourse(courseData);
    return response.data;
  }
);

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourseAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCourseAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.allCourses = action.payload;
      })
      .addCase(createCourseAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCourseAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log(action.payload);
        state.allCourses = [...state.allCourses, action.payload];
      });
  },
});

export const selectAllCourses = (state) => state.course.allCourses;

export default courseSlice.reducer;
