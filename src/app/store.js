import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import homeReducer from '../features/Home/homeSlice';
import courseSlice from '../features/course/courseSlice';
import lectureSlice from '../features/lecture/lectureSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer, 
    course: courseSlice,
    lecture: lectureSlice
  },
});
