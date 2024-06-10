import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const httpClient = axios.create({ timeout: 2 * 60 * 1000 });

export const createUser = createAsyncThunk("createUser", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post("https://65d481c63f1ab8c6343550a5.mockapi.io/crm", data, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "post",
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const fetchUsers = createAsyncThunk('fetchUsers', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('https://65d481c63f1ab8c6343550a5.mockapi.io/crm');
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const deleteUser = createAsyncThunk('deleteUser', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`https://65d481c63f1ab8c6343550a5.mockapi.io/crm/${id}`, {
            data: {},
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const updateUser = createAsyncThunk("updateUser", async (data, { rejectWithValue }) => {
    const response = await axios.put(`https://65d481c63f1ab8c6343550a5.mockapi.io/crm/${data.id}`, JSON.stringify(data), {
        method: "put",
        headers: {
            "Content-Type": "application/json"
        },
    });
    try {
        const result = await response.data;
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const loginUser = createAsyncThunk('api/login', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(
            'https://65d481c63f1ab8c6343550a5.mockapi.io/crm', JSON.stringify(data),
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            }
        );
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});



const userDetail = createSlice({
    name: 'userDetail',
    initialState: {
        userDetail: [],
        loading: false,
        error: null,
        search: []
    },

    reducers: {
        searchUser: (state, action) => {
            state.search = action.payload;
            console.log(action.payload)
        },
    },

    extraReducers: (builder) => {
        builder

            .addCase(createUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userDetail.push(action.payload);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(deleteUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userDetail = state.userDetail.filter((x) => x.id !== action.payload.id);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(fetchUsers.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.userDetail = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(updateUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                //state.userDetail = [action.payload];
                state.userDetail = state.userDetail.map((item) => {
                    return item.id === action.payload.id ? action.payload : item;
                });
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(loginUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userDetail = action.payload
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    }
});

export default userDetail.reducer;
export const { searchUser } = userDetail.actions;












