import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
import homeStyles from '../../../styles/Home.module.css';
import styles from '../../../styles/Aircraft.module.css';
import ScheduleWeekDayGraph from '../../../components/ScheduleWeekdayGraph/ScheduleWeekdayGraph';

const Aircraft: NextPage = () => {
    const router = useRouter();
    const { tailNum } = router.query;

    const [aircraftData, setAircraftData] = useState<any>();
    const [scheduleData, setScheduleData] = useState<any>();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const runQueries = async () => {
        let promises = [];

        promises.push(getAircraftData());
        promises.push(getAircraftSchedules());

        Promise.all(promises).then(() => {
            setIsLoaded(true);
        });
    };

    const getAircraftData = async () => {
        const res = await fetch(
            `https://schedulemaster-dashboard.herokuapp.com/get-aircraft-details?username=${process.env.NEXT_PUBLIC_SM_USERNAME}&password=${process.env.NEXT_PUBLIC_SM_PASSWORD}&n_no=${tailNum}`
        );

        await res.json().then((d) => {
            console.log(d.response[0]);
            // NOTE: Assumes one aircraft is returned
            setAircraftData(d.response[0]);
        });
    };

    const getAircraftSchedules = async () => {
        const startDate = new Date(
            new Date().setDate(new Date().getDate() - 365)
        )
            .toISOString()
            .split('T')[0]
            .replace('-', '')
            .replace('-', '');

        const endDate = new Date()
            .toISOString()
            .split('T')[0]
            .replace('-', '')
            .replace('-', '');

        const res = await fetch(
            `https://schedulemaster-dashboard.herokuapp.com/get-schedule-data?username=${process.env.NEXT_PUBLIC_SM_USERNAME}&password=${process.env.NEXT_PUBLIC_SM_PASSWORD}&start=${startDate}&end=${endDate}&specificTailNum=${tailNum}`
        );

        await res.json().then((d) => {
            console.log(d.response);
            setScheduleData(d.response);
        });
    };

    useEffect(() => {
        runQueries();
    }, [tailNum]);

    return (
        <div className={homeStyles.container}>
            <main className={homeStyles.main}>
                <h1 className={homeStyles.title}>{tailNum} Details</h1>
                {!isLoaded || !aircraftData ? null : (
                    <>
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
                        <FadeIn>
                            <ScheduleWeekDayGraph
                                timeCaption={'over the past year'}
                                subSectionNumber={'02'}
                                scheduleData={scheduleData}
                            />
                        </FadeIn>
                    </>
                )}
            </main>
        </div>
    );
};

export default Aircraft;
