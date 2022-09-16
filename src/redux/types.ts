export interface UserInfo {
    username: string;
    password: string;
}

export interface TokenInterface {
    token: string;
}

export interface AuthSlice {
    isAuthorized: boolean;
    token: string;
    isLoading: boolean;
    isError: boolean;
    userInfo: UserInfo;
}

export type UserInterface  = {
    id: number;
    username: string;
    first_name?: string;
    last_name?: string;
    is_active: boolean;
    last_login?: string;
    password?: string;
    is_superuser: boolean;
}

export type NewUserType = {
    username: string;
    first_name?: string;
    last_name?: string;
    password: string;
    is_active: boolean;
}

export type UpdateUserType = {
    id: number;
    username: string;
    first_name?: string;
    last_name?: string;
    password?: string;
    is_active?: boolean;
}

export interface PostReqArgInterface {
    token: string;
    user: NewUserType;
}

export interface PatchReqArgInterface {
    token: string;
    user: UpdateUserType;
}

export interface DeleteReqUserInterface {
    token: string;
    id: number;
}