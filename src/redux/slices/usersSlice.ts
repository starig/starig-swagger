import {createAsyncThunk, createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../store";

export type UserInterface  = {
    id: number;
    username: string;
    first_name?: string;
    last_name?: string;
    is_active: boolean;
    last_login?: string;
    is_superuser: boolean;
}

interface usersState {
    users: UserInterface[],
}

export const usersAdapter = createEntityAdapter<UserInterface>();
export const usersSelectors = usersAdapter.getSelectors<RootState>((state) => state.users);



export const fetchUsersList = createAsyncThunk(
    'users/fetchUsersListStatus',
    async (token: string) => {
        try {
            const response = await axios({
                method: 'get',
                url: `https://emphasoft-test-assignment.herokuapp.com/api/v1/users/`,
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }
)

export const usersSlice = createSlice({
    name: 'users',
    initialState: usersAdapter.getInitialState(),
    reducers: {
        setUsers: (state, action: PayloadAction<usersState>) => {

        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsersList.fulfilled, (state, action) => {
            usersAdapter.setAll(state, action.payload)
        })
    }
})


export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;