import {
    collection,
    DocumentData,
    getDocs,
    query,
    QueryDocumentSnapshot,
} from 'firebase/firestore';
import { NextComponentType } from 'next';
import { useEffect, useState } from 'react';
import { firestore } from '../firestore/clientApp';

const HoursTilMaint: NextComponentType = () => {
    // Referencing https://www.section.io/engineering-education/introduction-to-nextjs-with-typescript-and-firebase-database
    const [aircraftData, setAircraftData] = useState<
        QueryDocumentSnapshot<DocumentData>[]
    >([]);
    const [scheduleData, setScheduleData] = useState<Array<{}>>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const aircraftCollection = collection(firestore, 'aircraft');

    const runQueries = async () => {
        let promises = [];

        promises.push(getAircraftData());

        promises.push(getScheduleData());

        Promise.all(promises).then(() => {
            setIsLoaded(true);
        });
    };

    const getScheduleData = async () => {
        const res = await fetch(
            'https://schedulemaster-dashboard.herokuapp.com/sample'
        );

        await res.json().then((d) => {
            console.log(d.response);
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

    useEffect(() => {
        runQueries();

        setTimeout(() => {
            setIsLoaded(true);
        }, 2000);
    }, []);

    return (
        <div>
            <h1>Aircraft</h1>

            {!isLoaded ? (
                <p>Loading</p>
            ) : aircraftData.length == 0 ? (
                <div>No aircraft data available</div>
            ) : (
                aircraftData.map((aircraft: any, i: number) => (
                    <div key={i}>
                        <h3>{aircraft.data().tail_num}</h3>
                        <p
                            style={
                                aircraft.data().hours_remaining < 10
                                    ? { color: 'red' }
                                    : {}
                            }
                        >
                            {aircraft.data().hours_remaining} hours left
                        </p>
                    </div>
                ))
            )}

            <h1>Flight reservations</h1>

            {!isLoaded ? null : scheduleData.length == 0 ? (
                <div>No schedules</div>
            ) : (
                scheduleData.map((schedule: any, i: number) => {
                    let startTime = new Date(schedule.sch_start);
                    let endTime = new Date(schedule.sch_end);
                    let length =
                        Math.abs(endTime.getTime() - startTime.getTime()) /
                        (60 * 60 * 1000);

                    let hoursLeft = 0;

                    aircraftData.forEach((aircraft) => {
                        if (aircraft.data().tail_num === schedule.N_NO) {
                            hoursLeft = aircraft.data().hours_remaining;
                        }
                    });

                    return (
                        <div
                            key={i}
                            style={
                                hoursLeft - length < 0 ? { color: 'red' } : {}
                            }
                        >
                            <h3>
                                {schedule.N_NO} - {schedule.NAME}
                            </h3>
                            <p>{startTime.toTimeString()}</p>
                            <p>{endTime.toTimeString()}</p>
                            <p>Flight length: {length.toFixed(1)} hours</p>
                            <p>Hours left for aircraft: {hoursLeft}</p>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default HoursTilMaint;
