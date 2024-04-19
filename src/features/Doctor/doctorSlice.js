import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addQualification, addWorkExperience, createAppointmet, createDoctor, doctorOtpVerification, fetchAllDoctors, fetchDoctorDashboard, fetchPatientProfile, getDoctorByCity, loginDoctor, logoutDoctor, rejectAppointmet, updateAppointment, updateAvailability } from './doctorAPI';

const initialState = {
    isDoctor: false,
    doctorData: null,
    doctorDashBoard: null,
    patientProfileForDoctor: null,
    status: 'idle',
    isPanding: false,
    isError:false,
    errorMessage:null,
    allDoctors: []
};


export const createDoctorAsync = createAsyncThunk(
    'doctor/createDoctor',
    async (data) => {
        const response = await createDoctor(data);
        return response.data;
    }
);

export const loginDoctorAsync = createAsyncThunk(
    'doctor/loginDoctor',
    async (data) => {
        const response = await loginDoctor(data);
        return response.data;
    }
);

export const logoutDoctorAsync = createAsyncThunk(
    'doctor/logoutDoctor',
    async () => {
        const response = await logoutDoctor();
        return response.data;
    }
);

export const getAllDoctorAsync = createAsyncThunk(
    'doctor/getAllDoctor',
    async () => {
        const response = await fetchAllDoctors();
        return response.data;
    }
);

export const getDoctorByCityAsync = createAsyncThunk(
    'doctor/getDoctorByCity',
    async (data) => {
        const response = await getDoctorByCity(data);
        return response.data;
    }
);

export const getDoctorDashboardAsync = createAsyncThunk(
    'doctor/getDoctorDashboard',
    async () => {
        const response = await fetchDoctorDashboard();
        return response.data;
    }
);

//  fetch patinet profile for doctor
export const getPatientProfileAsync = createAsyncThunk(
    'doctor/getPatientProfile',
    async (id) => {
        const response = await fetchPatientProfile(id);
        return response.data;
    }
);

//  
export const updateAppointmentAsync = createAsyncThunk(
    'doctor/updateAppointment',
    async (data) => {
        const response = await updateAppointment(data);
        return response.data;
    }
);

export const updateAvailabilityAsync = createAsyncThunk(
    'doctor/updateAvailability',
    async (data) => {
        const response = await updateAvailability(data);
        return response.data;
    }
);

export const createAppointmetAsync = createAsyncThunk(
    'doctor/createAppointmet',
    async (data) => {
        const response = await createAppointmet(data);
        return response.data;
    }
);

export const rejectAppointmetAsync = createAsyncThunk(
    'doctor/rejectAppointmet',
    async (id) => {
        const response = await rejectAppointmet(id);
        return response.data;
    }
);

export const addQualificationAsync = createAsyncThunk(
    'doctor/addQualification',
    async (data) => {
        const response = await addQualification(data);
        return response.data;
    }
);

export const addWorkExperienceAsync = createAsyncThunk(
    'doctor/addWorkExperience',
    async (data) => {
        const response = await addWorkExperience(data);
        return response.data;
    }
);

export const doctorOtpVerificationAsync = createAsyncThunk(
    'doctor/otpverification',
    async (data) => {
        const response = await doctorOtpVerification(data);
        return response.data;
    }
);




export const doctorSlice = createSlice({
    name: 'doctor',
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
            // Create doctor
            .addCase(createDoctorAsync.pending, (state) => {
                state.status = 'loading';
                state.isPanding = true
                state.isError = false
                state.errorMessage = null
            })
            .addCase(createDoctorAsync.rejected, (state,action) => {
                state.status = "failed"
                state.isDoctor = false;
                state.isPanding = false
                state.doctorData = null
                state.isError = true;
                state.errorMessage = action.payload
            })
            .addCase(createDoctorAsync.fulfilled, (state, action) => {
                console.log("Acotion payload => " + action.payload)
                state.status = 'idle';
                state.isDoctor = true;
                state.isPanding = false
                state.doctorData = action.payload
                state.isError = false
                state.errorMessage = null
            })
            // Login doctor
            .addCase(loginDoctorAsync.pending, (state) => {
                state.status = 'loading';
                state.isPanding = true
                state.isError = false
                state.errorMessage = null
            })
            .addCase(loginDoctorAsync.rejected, (state, action) => {
                state.status = "failed"
                state.isDoctor = false;
                state.isPanding = false
                state.doctorData = null
                state.isError = true
                state.errorMessage = action.payload
            })
            .addCase(loginDoctorAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.isDoctor = true;
                state.isPanding = false
                state.doctorData = action.payload
            })
            // get all doctor
            .addCase(getAllDoctorAsync.pending, (state) => {
                state.status = 'loading';
                state.isPanding = true
            })
            .addCase(getAllDoctorAsync.rejected, (state, action) => {
                state.isPanding = false
                state.allDoctors = []
            })
            .addCase(getAllDoctorAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.isPanding = false
                state.allDoctors = action.payload
            })
            //logout doctor

            // get doctor dashboard
            .addCase(getDoctorDashboardAsync.pending, (state) => {
                state.status = 'loading';
                state.isPanding = true
            })
            .addCase(getDoctorDashboardAsync.rejected, (state, action) => {
                state.isPanding = false
            })
            .addCase(getDoctorDashboardAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.isPanding = false
                state.isDoctor = true;
                state.doctorDashBoard = action.payload
            })
            .addCase(logoutDoctorAsync.pending, (state) => {
                state.status = 'loading';
                state.isPanding = true
            })
            .addCase(logoutDoctorAsync.rejected, (state, action) => {
                state.isPanding = false
            })
            .addCase(logoutDoctorAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.isPanding = false
                state.isDoctor = false;
                state.doctorData = null
                state.doctorDashBoard = null
            })
            // get Patient Profile for doctor
            .addCase(getPatientProfileAsync.pending, (state) => {
                state.status = 'loading';
                state.isPanding = true
            })
            .addCase(getPatientProfileAsync.rejected, (state, action) => {
                state.isPanding = false
            })
            .addCase(getPatientProfileAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.isPanding = false
                state.patientProfileForDoctor = action.payload
            })
            // update appointment
            .addCase(updateAppointmentAsync.pending, (state) => {
                state.status = 'loading';
                state.isPanding = true
            })
            .addCase(updateAppointmentAsync.rejected, (state, action) => {
                state.isPanding = false
            })
            .addCase(updateAppointmentAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.isPanding = false
            })
            // update doctors Availability 
            .addCase(updateAvailabilityAsync.pending, (state) => {
                state.status = 'loading';
                state.isPanding = true
            })
            .addCase(updateAvailabilityAsync.rejected, (state, action) => {
                state.isPanding = false
            })
            .addCase(updateAvailabilityAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.isPanding = false
            })
            // create appointment 
            .addCase(createAppointmetAsync.pending, (state) => {
                state.status = 'loading';
                state.isPanding = true
            })
            .addCase(createAppointmetAsync.rejected, (state, action) => {
                state.isPanding = false
            })
            .addCase(createAppointmetAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.isPanding = false
            })
            // create appointment 
            .addCase(getDoctorByCityAsync.pending, (state) => {
                state.status = 'loading';
                state.isPanding = true
            })
            .addCase(getDoctorByCityAsync.rejected, (state, action) => {
                state.isPanding = false
            })
            .addCase(getDoctorByCityAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.isPanding = false
                state.allDoctors = action.payload
            })
            .addCase(rejectAppointmetAsync.pending, (state) => {
                state.status = 'loading';
                state.isPanding = true
            })
            .addCase(rejectAppointmetAsync.rejected, (state, action) => {
                state.isPanding = false
            })
            .addCase(rejectAppointmetAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.isPanding = false
            })
            .addCase(doctorOtpVerificationAsync.pending, (state) => {
                state.status = 'loading';
                state.isPanding = true
                state.isError = false
                state.errorMessage = null
            })
            .addCase(doctorOtpVerificationAsync.rejected, (state, action) => {
                state.isPanding = false
                state.isError = true
                state.errorMessage = action.payload
                state.isDoctor = false
            })
            .addCase(doctorOtpVerificationAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.isPanding = false
                state.doctorData = action.payload
                state.isError = false
                state.errorMessage = null
            })
            ;
    },
});

export const { increment, decrement, incrementByAmount } = doctorSlice.actions;
export const isDoctor = (state) => state.doctor.isDoctor;
export const doctorStatus = (state) => state.doctor.status;
export const isDoctorPending = (state) => state.doctor.isPanding;
export const doctorData = (state) => state.doctor.doctorData;
export const getAllDoctors = (state) => state.doctor.allDoctors;
export const doctorDashBoard = (state) => state.doctor.doctorDashBoard;
export const patientProfile = (state) => state.doctor.patientProfileForDoctor;
export const isDoctorError = (state) => state.doctor.isError;
export const doctorErrorMessage = (state) => state.doctor.errorMessage;

export default doctorSlice.reducer