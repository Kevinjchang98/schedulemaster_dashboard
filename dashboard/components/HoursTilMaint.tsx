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
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const aircraftCollection = collection(firestore, 'aircraft');

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
        getAircraftData();

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
                        <h2>{aircraft.data().tail_num}</h2>
                        <p>{aircraft.data().hours_remaining} hours left</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default HoursTilMaint;
