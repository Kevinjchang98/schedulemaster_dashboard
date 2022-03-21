import {
    collection,
    DocumentData,
    getDocs,
    query,
    QueryDocumentSnapshot,
} from 'firebase/firestore';
import { NextComponentType } from 'next';
import { useEffect, useState } from 'react';
import { firestore } from '../../firestore/clientApp';
import HoursLeftStats from './HoursLeftStats';
import ReservationsList from './ReservationsList';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { start } from 'repl';

const HoursTilMaint: NextComponentType = () => {
    // Referencing https://www.section.io/engineering-education/introduction-to-nextjs-with-typescript-and-firebase-database

    // TODO: Init startDate to be start of today and endDate to be start of tomorrow
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [scheduleData, setScheduleData] = useState<Array<{}>>([]);
    const [aircraftList, setAircraftList] = useState<Array<{}>>([]);
    const [aircraftData, setAircraftData] = useState<
        QueryDocumentSnapshot<DocumentData>[]
    >([]);

    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const aircraftCollection = collection(firestore, 'aircraft');

    const runQueries = async () => {
        let promises = [];

        promises.push(getAircraftData());
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
    };

    const getAircraftList = async () => {
        const res = await fetch(
            `https://schedulemaster-dashboard.herokuapp.com/sample-aircraft-list?username=${process.env.NEXT_PUBLIC_SM_USERNAME}&password=${process.env.NEXT_PUBLIC_SM_PASSWORD}`
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
        runQueries();
    }, [startDate, endDate]);

    return (
        <div>
            <HoursLeftStats isLoaded={isLoaded} aircraftData={aircraftData} />

            <h1>Filter</h1>
            <p>Start Date:</p>
            <DatePicker
                selected={startDate}
                onChange={(date: any) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
            />
            <p>End Date:</p>
            <DatePicker
                selected={endDate}
                onChange={(date: any) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
            />

            <ReservationsList
                isLoaded={isLoaded}
                scheduleData={scheduleData}
                aircraftData={aircraftData}
                aircraftList={aircraftList}
            />
        </div>
    );
};

export default HoursTilMaint;
