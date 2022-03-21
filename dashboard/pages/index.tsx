import type { NextPage } from 'next';
import Head from 'next/head';
import HoursTilMaint from '../components/HoursTilMaint/HoursTilMaint';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Schedulemaster Dashbaord</title>
                <meta
                    name="description"
                    content="Dashboard of Schedulemaster reservations"
                />

                {/* TODO: Change icon */}
                <link rel="icon" href="/favicon.ico" />
                <style>
                    @import
                    url("https://fonts.googleapis.com/css2?family=Titillium+Web:wght@200;400&display=swap");
                </style>
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Schedulemaster Dashboard</h1>
                <HoursTilMaint />
            </main>

            {/* <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
                        <Image
                            src="/vercel.svg"
                            alt="Vercel Logo"
                            width={72}
                            height={16}
                        />
                    </span>
                </a>
            </footer> */}
        </div>
    );
};

export default Home;
