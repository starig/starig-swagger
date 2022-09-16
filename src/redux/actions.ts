import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {DeleteReqUserInterface, PatchReqArgInterface, PostReqArgInterface, UserInfo} from "./types";

export const fetchAuth = createAsyncThunk(
    'auth/fetchAuthStatus',
    async (userInfo: UserInfo) => {
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

const usersAPI_url = `https://emphasoft-test-assignment.herokuapp.com/api/v1/users/`

export const fetchNewUser = createAsyncThunk(
    'users/fetchNewUserStatus',
    async (arg: PostReqArgInterface) => {
        const { token, user } = arg;
        try {
            await axios({
                method: 'post',
                url: usersAPI_url,
                headers: {
                    Authorization: `Token ${token}`,
                },
                data: {
                    'username': user.username,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'password': user.password,
                    'is_active': user.is_active,
                }
            })
        } catch (e) {
            console.error(e)
        }
    }
)

export const deleteUserRequest = createAsyncThunk(
    'users/deleteUser',
    async (arg: DeleteReqUserInterface) => {
        const { token, id } = arg;
        try {
            await axios({
                method: 'delete',
                url: usersAPI_url + `${id}/`,
                headers: {
                    Authorization: `Token ${token}`,
                }
            })
        } catch (e) {
            console.error(e)
        }
    }
);

export const updateUserInfo = createAsyncThunk(
    'users/updateUserInfoStatus',
    async (arg: PatchReqArgInterface) => {
        const { token, user } = arg;
        const { id, username, first_name, last_name, password, is_active } = user;
        try {
            await axios({
                method: 'patch',
                url: usersAPI_url + `${id}/`,
                headers: {
                    Authorization: `Token ${token}`,
                },
                data: {
                    username,
                    first_name,
                    last_name,
                    password,
                    is_active
                }
            })
        } catch (e) {
            console.error(e)
        }
    }
);

export const fetchUsersList = createAsyncThunk(
    'users/fetchUsersListStatus',
    async (token: string) => {
        try {
            const response = await axios({
                method: 'get',
                url: usersAPI_url,
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }
);

