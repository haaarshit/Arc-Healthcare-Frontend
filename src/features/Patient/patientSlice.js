// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { fetchCount } from './counterAPI';

// const initialState = {
//   isPatient:false,
//   patientDashBoard: null,
//   status: 'idle',
// };


// export const incrementAsync = createAsyncThunk(
//   'counter/fetchCount',
//   async (amount) => {
//     const response = await fetchCount(amount);
//     return response.data;
//   }
// );

// export const patientSlice = createSlice({
//   name: 'patient',
//   initialState,
//   reducers: {
//     increment: (state) => {
    
//       state.value += 1;
//     },
//     decrement: (state) => {
//       state.value -= 1;
//     },
//     incrementByAmount: (state, action) => {
//       state.value += action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(incrementAsync.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(incrementAsync.fulfilled, (state, action) => {
//         state.status = 'idle';
//         state.value += action.payload;
//       });
//   },
// });
// export const { increment, decrement, incrementByAmount } = patientSlice.actions;

// export const isPatient = (state) => state.patient.isPatient;
// export const patientDashBoard = (state) => state.patient.patientDashBoard;

// export default patientSlice.reducer;