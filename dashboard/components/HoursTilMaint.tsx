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
import ReservationsList from './ReservationsList';

const HoursTilMaint: NextComponentType = () => {
    // Referencing https://www.section.io/engineering-education/introduction-to-nextjs-with-typescript-and-firebase-database
    const [aircraftData, setAircraftData] = useState<
        QueryDocumentSnapshot<DocumentData>[]
    >([]);
    const [scheduleData, setScheduleData] = useState<Array<{}>>([]);
    const [aircraftList, setAircraftList] = useState<Array<{}>>([]);

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
        const res = await fetch(
            'https://schedulemaster-dashboard.herokuapp.com/sample'
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
            console.log(
                d.response.filter((d: any) => {
                    return d.CATEGORY === 'AIRPLANE';
                })
            );

            setAircraftList(
                d.response.filter((d: any) => {
                    return d.CATEGORY === 'AIRPLANE';
                })
            );
        });
    };

    useEffect(() => {
        runQueries();
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
