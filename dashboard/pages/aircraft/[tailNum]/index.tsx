import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
import homeStyles from '../../../styles/Home.module.css';
import styles from '../../../styles/Aircraft.module.css';

const Aircraft: NextPage = () => {
    const router = useRouter();
    const { tailNum } = router.query;

    const [aircraftData, setAircraftData] = useState<any>();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const getAircraftData = async () => {
        console.log(tailNum);
        const res = await fetch(
            `https://schedulemaster-dashboard.herokuapp.com/get-aircraft-details?username=${process.env.NEXT_PUBLIC_SM_USERNAME}&password=${process.env.NEXT_PUBLIC_SM_PASSWORD}&n_no=${tailNum}`
        );

        await res.json().then((d) => {
            console.log(d.response);
            // NOTE: Assumes one aircraft is returned
            setAircraftData(d.response[0]);
            setIsLoaded(true);
        });
    };

    useEffect(() => {
        getAircraftData();
    }, [tailNum]);

    return (
        <div className={homeStyles.container}>
            <main className={homeStyles.main}>
                <h1 className={homeStyles.title}>{tailNum} Details</h1>
                {!isLoaded || !aircraftData ? null : (
                    <FadeIn className={styles.container}>
                        <p>
                            {aircraftData.year_model} {aircraftData.model}
                        </p>
                        <p>Class: {aircraftData.class}</p>
                        <p>Fuel capacity: {aircraftData.FUELCAPACITY}</p>
                        <p>Horsepower: {aircraftData.HP}</p>
                        <p>Cost per hour: {aircraftData.costperhour}</p>
                        <p>
                            {aircraftData.elig_BasicMed
                                ? 'Flyable'
                                : 'Not flyable'}{' '}
                            by BasicMed pilots
                        </p>
                        <p>
                            {aircraftData.elig_SportPilot
                                ? 'Flyable'
                                : 'Not flyable'}{' '}
                            by Sport pilots
                        </p>
                    </FadeIn>
                )}
            </main>
        </div>
    );
};

export default Aircraft;
