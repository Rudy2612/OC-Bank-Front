import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

let base = "http://localhost:3001/api/v1"

export const fetchUserInformation = createAsyncThunk(
    'user/profile',
    async (token) => {
        const response = await fetch(`${base}/user/profile`,
            {
                method: "POST",
                headers: {
                    Authorization: token
                }
            });
        const data = await response.json();
        return data.body;
    }
);



const userSlice = createSlice({
    name: 'user',
    initialState: {
        isConnected: false,
        id: "",
        token: "",

        firstName: "",
        lastName: "",

        status: 'idle', // idle | loading | succeeded | failed
        error: null,
    },
    reducers: {
        logoutUser: (state) => {
            state.isConnected = false;
            state.id = "";
            state.token = "";
            state.firstName = "";
            state.lastName = "";
        },
        editUser: (state, action) => {
            return { ...state, ...action.payload };
        },
    },


    extraReducers: (builder) => {
        builder
            .addCase(fetchUserInformation.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserInformation.fulfilled, (state, action) => {
                state.isConnected = true;
                state.status = 'succeeded';
                state.token = action.meta.arg;
                state.id = action.payload.id;
                state.firstName = action.payload.firstName;
                state.lastName = action.payload.lastName;
            })
            .addCase(fetchUserInformation.rejected, (state) => {
                state.status = 'failed';
                state.isConnected = false;
            })
    },
});

export const { getToken, setToken, logoutUser, editUser } = userSlice.actions;
export default userSlice.reducer;
