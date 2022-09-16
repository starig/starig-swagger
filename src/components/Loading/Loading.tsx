import React, {FC} from 'react';
import loadingSvg from '../../assets/loading.svg';
import styles from './Loading.module.css';


const Loading: FC = () => {
    return (
        <div className={styles.wrapper}>
            <img src={loadingSvg} alt={'Loading'} />
        </div>
    )
}

export default Loading;