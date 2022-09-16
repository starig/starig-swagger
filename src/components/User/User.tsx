import React, {FC, useState} from 'react';
import styles from './User.module.css';
import {FiEdit2} from "react-icons/fi";
import {AiOutlineDelete} from "react-icons/ai";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {deleteUserRequest, fetchUsersList, updateUserInfo} from "../../redux/actions";

interface UserI {
    id: number;
    first_name?: string;
    last_name?: string;
    username: string;
    password?: string;
    is_active?: boolean;
}

const User: FC<UserI> = ({
                             id,
                             first_name,
                             last_name,
                             username,
                             password,
                             is_active
                         }) => {
    const dispatch = useAppDispatch();
    const [updateMode, setUpdateMode] = useState<boolean>(false);

    const [localUsername, setLocalUsername] = useState<string>(username);
    const [localFirstName, setLocalFirstName] = useState<string | undefined>(first_name);
    const [localLastName, setLocalLastName] = useState<string | undefined>(last_name);


    const {token} = useAppSelector(state => state.auth);

    const deleteUserReq = async () => {
        await dispatch(deleteUserRequest({token, id}));
    }

    const updateUserReq = async () => {
        await dispatch(updateUserInfo({
            token,
            user: {
                id: id,
                username: localUsername,
                first_name: localFirstName,
                last_name: localLastName,
                password,
                is_active
            }
        }));
    }

    const deleteUser = () => {
        if (confirm(`Are you sure to delete ${username}?`)) {
            deleteUserReq().then(() => {
                dispatch(fetchUsersList(token));
            })
        }
    }

    const updateUser = () => {
        updateUserReq().then(() => {
            setUpdateMode(false);
            dispatch(fetchUsersList(token));
        });
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        updateUser();
    }

    return (
        <form className={styles.user} onSubmit={handleSubmit}>
            <div className={styles.userColumn}>
                <h4 className={styles.mobileTitle}>ID:</h4>
                {id}
            </div>
            <div className={`${styles.firstName} ${styles.userColumn}`}>
                <h4 className={styles.mobileTitle}>First name:</h4>
                {
                    updateMode ? <input className={styles.updateInput}
                                        value={localFirstName}
                                        type={'text'}
                                        maxLength={30}
                                        minLength={1}
                                        onChange={(e) => setLocalFirstName(e.target.value)}/> : first_name
                }
            </div>
            <div className={`${styles.username} ${styles.userColumn}`}>
                <h4 className={styles.mobileTitle}>Username:</h4>
                {
                    updateMode ? <input className={styles.updateInput}
                                        value={localUsername}
                                        pattern='^[\w.@+-]+$'
                                        minLength={1}
                                        maxLength={150}
                                        required
                                        onChange={(e) => setLocalUsername(e.target.value)}/> : username
                }
            </div>
            <div className={`${styles.secondName} ${styles.userColumn}`}>
                <h4 className={styles.mobileTitle}>Last name:</h4>
                {
                    updateMode ? <input className={styles.updateInput}
                                        value={localLastName}
                                        type={'text'}
                                        minLength={1}
                                        maxLength={150}
                                        onChange={(e) => setLocalLastName(e.target.value)}/> : last_name
                }
            </div>
            <div className={styles.userButtons}>
                <FiEdit2 className={styles.editButton} size={20} onClick={() => setUpdateMode(!updateMode)}/>
                <AiOutlineDelete className={styles.deleteButton} size={20} onClick={() => deleteUser()}/>
                <button type='submit' className={styles.updateButton} disabled={!updateMode}>Update</button>
            </div>
        </form>
    )
}

export default User;