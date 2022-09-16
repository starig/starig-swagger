import React, {FC, useEffect, useState} from 'react';
import styles from './UserList.module.css';
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {useNavigate} from "react-router-dom";
import {fetchUsersList, updateUsers, usersSelectors} from "../../redux/slices/usersSlice";
import {useSelector} from "react-redux";
import {AiOutlineSortAscending, AiOutlineSortDescending} from "react-icons/ai";
import {BsSortNumericUp, BsSortNumericDown} from "react-icons/bs";
import Loading from "../../components/Loading/Loading";
import User from "../../components/User/User";

const UserList: FC = () => {
    const {isAuthorized} = useAppSelector(state => state.auth);
    const token = useAppSelector(state => state.auth.token);

    const [isDescAlpabet, setIsDescAlphabet] = useState<boolean>(true);
    const [isDescId, setIsDescId] = useState<boolean>(false);

    const usersList = useSelector(usersSelectors.selectAll);
    const {isLoading} = useAppSelector(state => state.users);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUsersList(token))
    }, [])

    useEffect(() => {
        !isAuthorized && navigate('/')
    }, [isAuthorized])

    /*Sorting alphabeticly*/
    useEffect(() => {
        if (!isDescAlpabet) {
            usersList.sort((a, b) => (a.username > b.username) ? 1 : -1)
        } else {
            usersList.sort((a, b) => (b.username > a.username) ? 1 : -1)
        }
        dispatch(updateUsers(usersList));
    }, [isDescAlpabet]);

    /*Sorting by id */
    useEffect(() => {
        if (!isDescId) {
            usersList.sort((a, b) => (a.id > b.id) ? 1 : -1)
        } else {
            usersList.sort((a, b) => (b.id > a.id) ? 1 : -1)
        }
        dispatch(updateUsers(usersList));
    }, [isDescId]);


    return (
        <div>
            <header className={styles.header}>
                <h3>Users list</h3>
            </header>
            {
                isLoading && <Loading/>
            }

            <div className={styles.container}>
                <section className={styles.usersList}>
                    <div className={styles.userListHeader}>
                        <div className={styles.sortButtons}>
                            <h4>ID</h4>
                            <button className={styles.sortButton} onClick={() => setIsDescId(!isDescId)}>
                                {
                                    isDescId ? <BsSortNumericUp size={25}/> : <BsSortNumericDown size={25}/>
                                }

                            </button>
                        </div>
                        <div>
                            <h4>Name</h4>
                        </div>
                        <div className={styles.sortButtons}>
                            <h4>Username</h4>
                            <button className={styles.sortButton} onClick={() => setIsDescAlphabet(!isDescAlpabet)}>
                                {
                                    isDescAlpabet ? <AiOutlineSortDescending size={25}/> :
                                        <AiOutlineSortAscending size={25}/>
                                }

                            </button>
                        </div>
                        <div>
                            <h4>Second name</h4>
                        </div>
                    </div>
                    {
                        usersList.map(user => (
                            <User key={user.id} username={user.username}
                                  id={user.id}
                                  last_name={user.last_name}
                                  first_name={user.first_name}/>
                        ))
                    }
                </section>
            </div>
        </div>
    )
}

export default UserList;