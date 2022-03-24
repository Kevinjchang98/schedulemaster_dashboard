import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import Link from 'next/link';
import FadeIn from 'react-fade-in/lib/FadeIn';
import styles from '../../styles/HoursTilMaint.module.css';

interface Props {
    isLoaded: boolean;
    aircraftHours: Array<Object>;
}

const HoursLeftStats = ({ isLoaded, aircraftHours }: Props) => {
    console.log(aircraftHours);
    return (
        <div className={styles.container}>
            <div className={styles.sectionNumber}>01</div>
            <h1 className={styles.subSectionTitle}>Aircraft</h1>
            <FadeIn
                delay={70}
                className={styles.subSectionContentsContainer}
                visible={isLoaded}
            >
                {!isLoaded ? (
                    // Following contents to achieve same height as if elements were already loaded; could be simplified with an empty div with min-height probably
                    <div>
                        <div className={styles.aircraftDetailsLink}>
                            <h3>Loading</h3>
                            <p>...</p>
                        </div>
                    </div>
                ) : aircraftHours.length == 0 ? (
                    <div>No aircraft data available</div>
                ) : (
                    aircraftHours.map((aircraft: any, i: number) => (
                        <Link key={i} href={`/aircraft/${aircraft.tailNum}`}>
                            <div className={styles.aircraftDetailsLink}>
                                <h3>{aircraft.tailNum}</h3>
                                <p
                                    style={
                                        aircraft.hoursLeft < 10
                                            ? { color: 'red' }
                                            : {}
                                    }
                                >
                                    {aircraft.hoursLeft} hours left
                                </p>
                            </div>
                        </Link>
                    ))
                )}
            </FadeIn>
        </div>
    );
};

export default HoursLeftStats;
