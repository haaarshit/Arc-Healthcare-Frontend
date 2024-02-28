import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/Authentication/authSlice"
import patientReducer from "../features/Patient/patientSlice"
import doctorReducer from "../features/Doctor/doctorSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    patient:patientReducer,
    doctor:doctorReducer
  },
});
