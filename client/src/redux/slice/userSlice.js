import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: '',
    email: '',
    address: []
}

export const userSlice = createSlice({
    name: 'userDetails',
    initialState,
    reducers : {
        setUserDetails : (state, action) => {
        return { ...state, ...action.payload };
        },

        updateUserAddress : (state, action) => {
            const { index, newAddress } = action.payload;
            if (state.address[index]) {
                state.address[index] = newAddress;
            }
        },

        addNewAddress : (state, action) => {
            state.address.push(action.payload.address);
        }
    }
})

// Action creators are generated for each case reducer function
export const {setUserDetails, updateUserAddress, addNewAddress} = userSlice.actions;

export default userSlice.reducer;

// Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes