import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, getUser, loginUser } from "./authAPI";

const initialState = {
  loggedInUserToken: null,
  user: null,
  status: "idle",
  error: null,
};

export const loginUserAsync = createAsyncThunk(
  "user/loginUser",
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await loginUser(loginInfo);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);


export const getUserAsync = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUser();
      return response.data;
    } catch (error) {
      console.error(error);
      throw rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
    clearLoggedInUser: (state) => {
      state.loggedInUserToken = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      })
      .addCase(getUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectUser = (state) => state.auth.user;
export const selectAuthError = (state) => state.auth.error;

export const {clearAuthError} = authSlice.actions;
export const {clearLoggedInUser} = authSlice.actions;



export default authSlice.reducer;
