import React, {FC} from 'react';
import styles from './User.module.css';

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
        </div>
    )
}

export default User;