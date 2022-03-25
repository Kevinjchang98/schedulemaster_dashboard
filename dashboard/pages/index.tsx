import {
    collection,
    DocumentData,
    getDocs,
    query,
    QueryDocumentSnapshot,
} from 'firebase/firestore';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import { firestore } from '../firestore/clientApp';
import HoursLeftStats from '../components/HoursTilMaint/HoursLeftStats';
import ReservationsList from '../components/HoursTilMaint/ReservationsList';
import FadeIn from 'react-fade-in/lib/FadeIn';
import ScheduleWeekDayGraph from '../components/ScheduleWeekdayGraph/ScheduleWeekdayGraph';
import CostVsFlightLength from '../components/CostVsFlightLength';
import Image from 'next/image';
import LengthVsStart from '../components/LengthVsStart';

const Home: NextPage = () => {
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(
        new Date(new Date().setDate(new Date().getDate() + 7))
    );
    const [scheduleData, setScheduleData] = useState<Array<{}>>([]);
    const [aircraftList, setAircraftList] = useState<Array<{}>>([]);
    const [aircraftData, setAircraftData] = useState<
        QueryDocumentSnapshot<DocumentData>[]
    >([]);

    const [aircraftHours, setAircraftHours] = useState<Array<Object>>([]);

    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [initialQuery, setInitialQuery] = useState<boolean>(true);

    const aircraftCollection = collection(firestore, 'aircraft');

    const runQueries = async (initialQuery: boolean) => {
        let promises = [];

        if (initialQuery) {
            promises.push(getAircraftData());
            setInitialQuery(false);
        }
        promises.push(getScheduleData());
        promises.push(getAircraftList());

        Promise.all(promises).then(() => {
            setIsLoaded(true);
        });
    };

    const getScheduleData = async () => {
        // Dates for url need to be formatted as YYYYMMDD
        // TODO: Confirm UTC timezone for date format
        const res = await fetch(
            `https://schedulemaster-dashboard.herokuapp.com/get-schedule-data?username=${
                process.env.NEXT_PUBLIC_SM_USERNAME
            }&password=${process.env.NEXT_PUBLIC_SM_PASSWORD}&start=${startDate
                .toISOString()
                .split('T')[0]
                .replace('-', '')
                .replace('-', '')}&end=${endDate
                .toISOString()
                .split('T')[0]
                .replace('-', '')
                .replace('-', '')}`
        );

        await res.json().then((d) => {
            setScheduleData(d.response);
        });
    };

    const getAircraftData = async () => {
        const aircraftQuery = query(aircraftCollection);
        const querySnapshot = await getDocs(aircraftQuery);

        const result: QueryDocumentSnapshot<DocumentData>[] = [];

        querySnapshot.forEach((snapshot) => {
            result.push(snapshot);
        });

        setAircraftData(result);
        setAircraftHours(
            result.map((aircraft) => ({
                tailNum: aircraft.data().tail_num,
                hoursLeft: aircraft.data().hours_remaining,
            }))
        );
    };

    const getAircraftList = async () => {
        const res = await fetch(
            `https://schedulemaster-dashboard.herokuapp.com/get-aircraft-list?username=${process.env.NEXT_PUBLIC_SM_USERNAME}&password=${process.env.NEXT_PUBLIC_SM_PASSWORD}`
        );

        await res.json().then((d) => {
            setAircraftList(
                d.response.filter((d: any) => {
                    return d.CATEGORY === 'AIRPLANE';
                })
            );
        });
    };

    useEffect(() => {
        runQueries(initialQuery);
    }, [startDate, endDate]);

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
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Schedulemaster Dashboard</h1>
                <FadeIn delay={100}>
                    <HoursLeftStats
                        isLoaded={isLoaded}
                        aircraftHours={aircraftHours}
                        setAircraftHours={setAircraftHours}
                    />

                    <ReservationsList
                        isLoaded={isLoaded}
                        scheduleData={scheduleData}
                        aircraftHours={aircraftHours}
                        aircraftList={aircraftList}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                    />

                    <ScheduleWeekDayGraph
                        timeCaption={`from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`}
                        subSectionNumber={'03'}
                        scheduleData={scheduleData}
                    />
                    <CostVsFlightLength
                        timeCaption={`from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`}
                        subSectionNumber={'04'}
                        scheduleData={scheduleData}
                        aircraftList={aircraftList}
                    />

                    <LengthVsStart
                        scheduleData={scheduleData}
                        subSectionNumber={'05'}
                        timeCaption={`from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`}
                    />
                </FadeIn>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://github.com/Kevinjchang98"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Created by Kevin Chang
                </a>
            </footer>
        </div>
    );
};

export default Home;
