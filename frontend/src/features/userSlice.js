import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

const initialState = {
    name: "",
    id:"",
    email:"",
    phone:"",
    image:"",
    token:""
}

const userSlice =createSlice({
    name:"user",
    initialState,
    reducers:{
        setUserDetails:(state,action)=>{
            state.name=action.payload.name;
            state.id=action.payload.id;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.image=action.payload.image;
            state.token = action.payload.token
        },
        setSignoutState:(state,action)=>{
            state.name=null;
            state.tocken=null;
        }
    }
})

export const{setSignoutState,setUserDetails}=userSlice.actions;

export default userSlice.reducer;