import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addDoctorReview, createPatient, fetchCount, fetchPatientDashboard, getDoctorProfile, loginPatient, logoutPatient, requestAppointment } from './patientAPI';

const initialState = {
  isPatient: false,
  patientDashBoard: null,
  patientData: null,
  isPending:false,
  doctorProfileForPatient: null,
  status: 'idle',
};


// get doctor profile for patient
export const getDoctorProfileAsync = createAsyncThunk(
  'patient/getDoctorProfile',
  async (id) => {
    const response = await getDoctorProfile(id);
    return response.data;
  }
);

export const loginPatientAsync = createAsyncThunk(
  'patient/loginPatient',
  async (data) => {
    const response = await loginPatient(data);
    return response.data;
  }
);

export const createPatientAsync = createAsyncThunk(
  'patient/createPatient',
  async (data) => {
    const response = await createPatient(data);
    return response.data;
  }
);


export const logoutPatientAsync = createAsyncThunk(
  'patient/logoutPatient',
  async () => {
      const response = await logoutPatient();
      return response.data;
  }
);

export const getPatientDashboardAsync = createAsyncThunk(
  'patient/getPatientDashboard',
  async () => {
      const response = await fetchPatientDashboard();
      return response.data;
  }
);

export const requestAppointmentAsync = createAsyncThunk(
  'patient/requestAppointment',
  async (data) => {
      const response = await requestAppointment(data);
      return response.data;
  }
);

export const addDoctorReviewAsync = createAsyncThunk(
  'patient/addWorkExperience',
  async (reqData) => {
      const response = await addDoctorReview(reqData);
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
      // create patient
      .addCase(createPatientAsync.pending, (state) => {
        state.status = 'loading';
        state.isPending = true;
      })
      .addCase(createPatientAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.isPending = false;
        state.isPatient = true;
        state.patientData = action.payload;
      })
      // logout patient
      .addCase(logoutPatientAsync.pending, (state) => {
        state.isPending = true;
        state.status = 'loading';
      })
      .addCase(logoutPatientAsync.fulfilled, (state, action) => {
        state.isPending = false;
        state.status = 'idle';
        state.isPatient = false;
        state.patientDashBoard = null;
        state.doctorProfileForPatient = null;
      })
      // logout patient
      .addCase(getPatientDashboardAsync.pending, (state) => {
        state.isPending = true;
        state.status = 'loading';
      })
      .addCase(getPatientDashboardAsync.fulfilled, (state, action) => {
        state.isPending = false;
        state.status = 'idle';
        state.isPatient = true;
        state.patientDashBoard = action.payload;
      })
      // logout patient
      .addCase(requestAppointmentAsync.pending, (state) => {
        state.isPending = true;
        state.status = 'loading';
      })
      .addCase(requestAppointmentAsync.fulfilled, (state, action) => {
        state.isPending = false;
        state.status = 'idle';
      })
      ;
  },
});
export const { increment, decrement, incrementByAmount } = patientSlice.actions;

export const isPatient = (state) => state.patient.isPatient;
export const patientDashBoard = (state) => state.patient.patientDashBoard;
export const doctorProfile = (state) => state.patient.doctorProfileForPatient;
export const patientData = (state) => state.patient.patientData;

export default patientSlice.reducer;