import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";


interface UserInfo {
    username: string;
    password: string;
}

interface TokenInterface {
    token: string;
}

interface AuthSlice {
    isAuthorized: boolean;
    token: string;
    isLoading: boolean;
    isError: boolean;
    userInfo: UserInfo;
}

export const fetchAuth = createAsyncThunk(
    'auth/fetchAuthStatus',
    async (userInfo: UserInfo, thunkAPI) => {
        const bodyFormData = new FormData();
        bodyFormData.append('username', userInfo.username);
        bodyFormData.append('password', userInfo.password);
        const response = await axios({
            method: 'post',
            url: 'http://emphasoft-test-assignment.herokuapp.com/api-token-auth/',
            data: bodyFormData,
        });
        return response.data;


    }
)

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
            console.log(action.payload)
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