import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

const initialState = {
    name: "",
    token: ""
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setAdminDetails: (state, action) => {
            state.name = action.payload.name;
            state.token = action.payload.token
        },
        setSignoutState: (state, action) => {
            state.name = null;
            state.tocken = null;
        }
    }
})

export const { setSignoutState, setAdminDetails } = adminSlice.actions;

export default adminSlice.reducer;