import React, {FC} from 'react';
import styles from './User.module.css';
import {FiEdit2} from "react-icons/fi";
import {AiOutlineDelete} from "react-icons/ai";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {deleteUserRequest, fetchUsersList} from "../../redux/actions";

interface UserI {
    id: number;
    first_name?: string;
    last_name?: string;
    username: string;
}

const User: FC<UserI> = ({
                             id,
                             first_name,
                             last_name,
                             username
                         }) => {
    const dispatch = useAppDispatch();

    const { token } = useAppSelector(state => state.auth);

    const deleteUserReq = async () => {
        await dispatch(deleteUserRequest({token, id}));
    }

    const deleteUser = () => {
        if (confirm(`Are you sure to delete ${username}?`)) {
            deleteUserReq().then(() => {
                dispatch(fetchUsersList(token));
            })
        }
    }

    return (
        <div className={styles.user}>
            <div>
                {id}
            </div>
            <div className={styles.firstName}>
                {first_name}
            </div>
            <div className={styles.username}>
                {username}
            </div>
            <div className={styles.secondName}>
                {last_name}
            </div>
            <div>
                <FiEdit2 className={styles.editButton}/>
                <AiOutlineDelete className={styles.deleteButton} onClick={() => deleteUser()}/>
            </div>
        </div>
    )
}

export default User;