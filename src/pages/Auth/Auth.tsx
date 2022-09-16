import React, {FC, useEffect} from 'react';
import styles from './Auth.module.css';
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {setPassword, setUsername} from "../../redux/slices/authSlice";
import {useNavigate} from "react-router-dom";
import {fetchAuth} from "../../redux/actions";

const Auth: FC = () => {
    const dispatch = useAppDispatch();
    const {username, password} = useAppSelector(state => state.auth.userInfo);
    const {isAuthorized, isError, isLoading} = useAppSelector(state => state.auth);
    const navigate = useNavigate();


    const changeUsername = (value: string) => {
        dispatch(setUsername(value))
    }
    const changePassword = (value: string) => {
        dispatch(setPassword(value));
    }
    const authFetch = async () => {
        try {
            dispatch(fetchAuth({username, password}))
        } catch (e) {
            console.log(e);
        }

    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
    }

    useEffect(() => {
        isAuthorized && navigate('/userlist')
    }, [isAuthorized])
    useEffect(() => {
        if (isError) {
            changeUsername('');
            changePassword('');
        }
    }, [isError])

    return (
        <div className={styles.container}>
            <form className={styles.loginFormBlock} onSubmit={handleSubmit}>
                <header className={styles.loginHeader}>
                    <h1>Authorization</h1>
                </header>
                <section className={styles.loginBody}>
                    {
                        isError && <div className={styles.error}>
                            <strong>Error</strong>
                        </div>
                    }
                    <div className={styles.inputBlock}>
                        <div className={styles.inputTitle}>
                            <label>Username</label>
                        </div>
                        <input type="text"
                               className={styles.inputForm}
                               minLength={1}
                               required
                               value={username}
                               onChange={(e) => changeUsername(e.target.value)}/>
                    </div>
                    <div className={styles.inputBlock}>
                        <div className={styles.inputTitle}>
                            <label>Password</label>
                        </div>
                        <input type="password"
                               className={styles.inputForm}
                               minLength={1}
                               required
                               value={password}
                               onChange={(e) => changePassword(e.target.value)}/>
                    </div>
                    <button className={styles.loginButton} onClick={authFetch} disabled={isLoading}>Login</button>
                </section>
            </form>
        </div>
    )
}

export default Auth;