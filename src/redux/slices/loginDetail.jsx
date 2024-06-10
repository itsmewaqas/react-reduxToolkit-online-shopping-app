import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';

const loginDetail = createSlice({
    name: 'loginDetail',
    initialState: {
        loginDetail: [],
        loading: false,
        error: null,
        isAuth: false
    },

    reducers: {
        loginMethod: (state, action) => {
            state.loginDetail = action.payload;
            state.isAuth = true;
        },

        logout: (state, action) => {
            state.loginDetail = null;
            localStorage.clear();
            state.isAuth = false;
        }
    },
});

console.log(loginDetail.actions);
export default loginDetail.reducer;
export const { loginMethod, logout } = loginDetail.actions;












