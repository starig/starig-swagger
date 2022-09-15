import React, {FC, useEffect} from 'react';
import styles from './UserList.module.css';
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {useNavigate} from "react-router-dom";
import {fetchUsersList, usersSelectors} from "../../redux/slices/usersSlice";
import {useSelector} from "react-redux";

const UserList: FC = () => {
    const { isAuthorized } = useAppSelector(state => state.auth);
    const token = useAppSelector(state => state.auth.token);
    const usersList = useSelector(usersSelectors.selectAll);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUsersList(token))
    }, [])

    useEffect(() => {
        !isAuthorized && navigate('/')
    }, [isAuthorized])
    return (
        <div>
            <header className={styles.header}>
                <h3>Users list</h3>
            </header>
            <div className={styles.container}>
                <section className={styles.usersList}>
                    {
                        usersList.map(user => (
                            <div className={styles.userItem} key={user.id}>
                                {user.username}
                            </div>
                        ))
                    }
                </section>
            </div>
        </div>
    )
}

export default UserList;