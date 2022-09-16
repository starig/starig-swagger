import React, {FC, useEffect, useState} from 'react';
import styles from './UserList.module.css';
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {useNavigate} from "react-router-dom";
import {setSearchValue, setUsers, usersSelectors} from "../../redux/slices/usersSlice";
import {useSelector} from "react-redux";
import {AiOutlineSortAscending, AiOutlineSortDescending} from "react-icons/ai";
import {BsSortNumericUp, BsSortNumericDown} from "react-icons/bs";
import Loading from "../../components/Loading/Loading";
import User from "../../components/User/User";
import Header from "../../components/Header/Header";
import {fetchUsersList} from "../../redux/actions";
import {UserInterface} from "../../redux/types";

const UserList: FC = () => {
    const {isAuthorized, token} = useAppSelector(state => state.auth);

    const [isDescAlphabet, setIsDescAlphabet] = useState<boolean>(true);
    const [isDescId, setIsDescId] = useState<boolean>(false);


    const usersList = useSelector(usersSelectors.selectAll);
    const {isLoading, searchValue} = useAppSelector(state => state.users);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [filteredList, setFilteredList] = useState(usersList);

    useEffect(() => {
        if (token) {
            dispatch(fetchUsersList(token));
        }
    }, []);

    useEffect(() => {
        !isAuthorized && navigate('/');
    }, [isAuthorized]);

    useEffect(() => {
        dispatch(setSearchValue(''));
        setFilteredList(usersList);
    }, [usersList])

    /*Sorting alphabetically*/
    useEffect(() => {
        if (!isDescAlphabet) {
            usersList.sort((a, b) => (a.username > b.username) ? 1 : -1);
        } else {
            usersList.sort((a, b) => (b.username > a.username) ? 1 : -1);
        }
        dispatch(setUsers(usersList));
    }, [isDescAlphabet]);

    /*Sorting by id */
    useEffect(() => {
        if (!isDescId) {
            usersList.sort((a, b) => (a.id > b.id) ? 1 : -1);
        } else {
            usersList.sort((a, b) => (b.id > a.id) ? 1 : -1);
        }
        dispatch(setUsers(usersList));
    }, [isDescId]);

    /* Search by username */
    useEffect(() => {
        let currentArr: UserInterface[];
        if (searchValue) {
            currentArr = usersList.filter((item) => {
                return item.username.toLowerCase().includes(searchValue.toLowerCase());
            });
            setFilteredList(currentArr);
        } else if (searchValue === "") {
            setFilteredList(usersList);
        }
    }, [searchValue])

    return (
        <div>
            <Header />
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
                        <div className={styles.userListHeaderItem}>
                            <h4>Name</h4>
                        </div>
                        <div className={styles.sortButtons}>
                            <h4>Username</h4>
                            <button className={styles.sortButton} onClick={() => setIsDescAlphabet(!isDescAlphabet)}>
                                {
                                    isDescAlphabet ? <AiOutlineSortDescending size={25}/> :
                                        <AiOutlineSortAscending size={25}/>
                                }

                            </button>
                        </div>
                        <div className={styles.userListHeaderItem}>
                            <h4>Last name</h4>
                        </div>
                        <div className={styles.userListHeaderItem}>
                            <h4>Edit/delete</h4>
                        </div>
                    </div>
                    {
                        filteredList.map(user => (
                            <User key={user.id}
                                  username={user.username}
                                  id={user.id}
                                  last_name={user.last_name}
                                  first_name={user.first_name}
                                  password={user.password}
                                  is_active={user.is_active}/>
                        ))
                    }
                </section>
            </div>
        </div>
    )
}

export default UserList;