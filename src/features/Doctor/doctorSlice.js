import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createDoctor } from './doctorAPI';

const initialState = {
    isDoctor: false,
    // isAuthenticated: false,
    doctorDashBoard: null,
    patientProfileByDoctor: null,
    status: 'idle',
    allDoctors: []
};


export const createDoctorAsync = createAsyncThunk(
    'doctor/createDoctor',
    async (data) => {
        const response = await createDoctor(data);
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
            .addCase(createDoctorAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createDoctorAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value += action.payload;
            });
    },
});

export const { increment, decrement, incrementByAmount } = doctorSlice.actions;
export const isDoctor = (state) => state.doctor.isDoctor;
export const doctorDashBoard = (state) => state.doctor.doctorDashBoard;

export default doctorSlice.reducer