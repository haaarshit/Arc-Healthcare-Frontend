// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { fetchCount } from './authAPI';

// const initialState = {
//   isAuthenticated: false,
//   status: 'idle',
// };


// export const loginAsync = createAsyncThunk(
//   'counter/login',
//   async (amount) => {
//     const response = await fetchCount(amount);
//     return response.data;
//   }
// );
// export const singUpAsync = createAsyncThunk(
//   'counter/singup',
//   async (amount) => {
//     const response = await fetchCount(amount);
//     return response.data;
//   }
// );

// export const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     increment: (state) => {
//       state.value += 1;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginAsync.pending, (state) => {
//         state.status = 'loading';
//         state.isAuthenticated = false;
//       })
//       .addCase(loginAsync.rejected, (state) => {
//         state.status = 'rejected';
//         state.isAuthenticated = false;
//       })
//       .addCase(loginAsync.fulfilled, (state, action) => {
//         state.status = 'idle';
//         state.isAuthenticated = true;
//       });
//   },
// });

// export const { increment, decrement, incrementByAmount } = authSlice.actions;

// export const isAuthenticated = (state) => state.auth.isAuthenticated;

// export default authSlice.reducer;
