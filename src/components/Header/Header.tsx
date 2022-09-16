import React, {FC, useState} from 'react';
import styles from './Header.module.css';
import {FiUserPlus} from "react-icons/fi";
import {AiOutlineCloseCircle, AiOutlineQuestionCircle} from "react-icons/ai";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {fetchNewUser, fetchUsersList} from "../../redux/actions";
import {setSearchValue} from "../../redux/slices/usersSlice";


const Header: FC = () => {
    const dispatch = useAppDispatch();

    const [username, setUsername] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [showTipUsername, setShowTipUsername] = useState<boolean>(false);
    const [showTipPassword, setShowTipPassword] = useState<boolean>(false);

    const [showModal, setShowModal] = useState<boolean>(false);

    const { token } = useAppSelector(state => state.auth);
    const { searchValue } = useAppSelector(state => state.users);

    const changeInput = (value: string) => {
        dispatch(setSearchValue(value));
    }

    const dataRefresh = () => {
        setUsername('');
        setFirstName('');
        setLastName('');
        setPassword('');
        setShowModal(false);
    }

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        const args = {
            token,
            user: {
                username,
                first_name: firstName,
                last_name: lastName,
                password: password,
                is_active: true,
            }
        };

        const createNewUser = async () => {
            await dispatch(fetchNewUser(args));
        }

        createNewUser().then(() => {
            dispatch(fetchUsersList(token));
            dataRefresh();
        });

    }

    return (
        <header className={styles.header}>
            <h3>Users list</h3>
            <input className={styles.searchInput}
                   type='text'
                   value={searchValue}
                   placeholder={'Search user'}
                   onChange={(e) => changeInput(e.target.value)} />
            <button className={styles.createButton} onClick={() => setShowModal(true)}>
                Create new user <FiUserPlus />
            </button>
            {
                showModal && <div className={styles.newUserModal}>
                    <AiOutlineCloseCircle className={styles.newUserCloseButton}
                                          size={20}
                                          onClick={() => setShowModal(false)}/>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <h4 className={styles.labelTitle}>
                                Username:
                                <AiOutlineQuestionCircle style={{cursor: "pointer"}}
                                                         onClick={() => setShowTipUsername(!showTipUsername)}/>
                            </h4>
                            {
                                showTipUsername && <div className={styles.labelSubtitle}>
                                    150 characters or fewer. Letters, digits and @/./+/-/_ only.
                                </div>
                            }
                            <input type={'text'}
                                   value={username}
                                   className={styles.newUserInput}
                                   pattern='^[\w.@+-]+$'
                                   required
                                   minLength={1}
                                   maxLength={150}
                                   onChange={(e) => setUsername(e.target.value)} />
                        </label>
                        <label>
                            <h4>First name:</h4>
                            <input type={'text'}
                                   value={firstName}
                                   className={styles.newUserInput}
                                   maxLength={30}
                                   onChange={(e) => setFirstName(e.target.value)}/>
                        </label>
                        <label>
                            <h4>Last name:</h4>
                            <input type={'text'}
                                   value={lastName}
                                   className={styles.newUserInput}
                                   maxLength={150}
                                   onChange={(e) => setLastName(e.target.value)}/>
                        </label>
                        <label>
                            <h4 className={styles.labelTitle}>
                                Password:
                                <AiOutlineQuestionCircle style={{cursor: "pointer"}}
                                                         onClick={() => setShowTipPassword(!showTipPassword)}/>
                            </h4>
                            {
                                showTipPassword && <div className={styles.labelSubtitle}>
                                    128 characters or fewer.
                                </div>
                            }
                            <input type={'password'}
                                   value={password}
                                   className={styles.newUserInput}
                                   pattern='^(?=.*[A-Z])(?=.*\d).{8,}$'
                                   required
                                   onChange={(e) => setPassword(e.target.value)}/>
                        </label>
                        <input type="submit" value="Create" className={`${styles.createButton} ${styles.submitButton}`} />
                    </form>
                </div>
            }

        </header>
    )
}

export default Header;