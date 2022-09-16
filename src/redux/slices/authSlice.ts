import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchAuth} from "../actions";
import {AuthSlice, TokenInterface} from "../types";


const initialState: AuthSlice = {
    isAuthorized: false,
    token: '',
    isLoading: false,
    isError: false,
    userInfo: {
        username: '',
        password: '',
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.userInfo.username = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.userInfo.password = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAuth.fulfilled, (state, action: PayloadAction<TokenInterface>) => {
            state.token = action.payload.token;
            state.isAuthorized = true;
            state.isLoading = false;
            state.isError = false;
        });
        builder.addCase(fetchAuth.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchAuth.rejected, (state) => {
            state.isError = true;
            state.isLoading = false;
            state.isAuthorized = false;
        })
    }
})

export const {setUsername, setPassword} = authSlice.actions;
export default authSlice.reducer;