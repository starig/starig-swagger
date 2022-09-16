import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {UserInterface} from "../types";
import {fetchUsersList} from "../actions";


export const usersAdapter = createEntityAdapter<UserInterface>();
export const usersSelectors = usersAdapter.getSelectors<RootState>((state) => state.users);


export const usersSlice = createSlice({
    name: 'users',
    initialState: usersAdapter.getInitialState({
        isLoading: false,
        searchValue: '',
    }),
    reducers: {
        setUsers: usersAdapter.setAll,
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsersList.fulfilled, (state, action) => {
            usersAdapter.setAll(state, action.payload);
            state.isLoading = false;
        });
        builder.addCase(fetchUsersList.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUsersList.rejected, (state) => {
            state.isLoading = false;
        });
    }
})


export const { setUsers, setSearchValue } = usersSlice.actions;
export default usersSlice.reducer;