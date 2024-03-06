import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount, getDoctorProfile, loginPatient, logoutPatient } from './patientAPI';

const initialState = {
  isPatient: false,
  patientDashBoard: null,
  doctorProfileForPatient: null,
  status: 'idle',
};


// get doctor profile for patient
export const getDoctorProfileAsync = createAsyncThunk(
  'counter/getDoctorProfile',
  async (id) => {
    const response = await getDoctorProfile(id);
    return response.data;
  }
);

export const loginPatientAsync = createAsyncThunk(
  'counter/loginPatient',
  async (data) => {
    const response = await loginPatient(data);
    return response.data;
  }
);

export const createPatientAsync = createAsyncThunk(
  'counter/createPatient',
  async (data) => {
    const response = await loginPatient(data);
    return response.data;
  }
);


export const logoutPatientAsync = createAsyncThunk(
  'doctor/logoutPatient',
  async () => {
      const response = await logoutPatient();
      return response.data;
  }
);

export const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    increment: (state) => {

      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDoctorProfileAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getDoctorProfileAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.doctorProfileForPatient = action.payload;
      })
      .addCase(loginPatientAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginPatientAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.isPatient = true;
      })
      // logout patient
      .addCase(logoutPatientAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logoutPatientAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.isPatient = false;
        state.patientDashBoard = null;
        state.doctorProfileForPatient = null;
      });
  },
});
export const { increment, decrement, incrementByAmount } = patientSlice.actions;

export const isPatient = (state) => state.patient.isPatient;
export const patientDashBoard = (state) => state.patient.patientDashBoard;
export const doctorProfile = (state) => state.patient.doctorProfileForPatient;

export default patientSlice.reducer;