import { NextPage } from 'next';
import { useRouter } from 'next/router';
import homeStyles from '../../../styles/Home.module.css';
import styles from '../../../styles/Aircraft.module.css';

const Aircraft: NextPage = () => {
    const router = useRouter();
    const { tailNum } = router.query;

    return (
        <div className={homeStyles.container}>
            <main className={homeStyles.main}>
                <h1 className={homeStyles.title}>{tailNum} Details</h1>
                <div className={styles.container}></div>
            </main>
        </div>
    );
};

export default Aircraft;
