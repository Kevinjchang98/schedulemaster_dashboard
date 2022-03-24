import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import Link from 'next/link';
import FadeIn from 'react-fade-in/lib/FadeIn';
import styles from '../../styles/HoursTilMaint.module.css';

interface Props {
    isLoaded: boolean;
    aircraftHours: Array<Object>;
    setAircraftHours: Function;
}

const HoursLeftStats = ({
    isLoaded,
    aircraftHours,
    setAircraftHours,
}: Props) => {
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
                    <div>
                        <div className={styles.aircraftDetailsLink}>
                            <h2>Loading</h2>
                            <div className={styles.hoursLeftContainer} />
                        </div>
                    </div>
                ) : aircraftHours.length == 0 ? (
                    <div>No aircraft data available</div>
                ) : (
                    aircraftHours.map((aircraft: any, i: number) => (
                        <div key={i}>
                            <Link href={`/aircraft/${aircraft.tailNum}`}>
                                <div className={styles.aircraftDetailsLink}>
                                    <h2>{aircraft.tailNum}</h2>
                                </div>
                            </Link>
                            <div className={styles.hoursLeftContainer}>
                                <input
                                    type="number"
                                    onChange={(event) => {
                                        setAircraftHours(
                                            aircraftHours.map((item: any) =>
                                                item.tailNum ===
                                                aircraft.tailNum
                                                    ? {
                                                          ...item,
                                                          hoursLeft:
                                                              event.target
                                                                  .value,
                                                      }
                                                    : item
                                            )
                                        );
                                    }}
                                    step={0.1}
                                    value={aircraft.hoursLeft}
                                    className={styles.hoursLeftInput}
                                    style={
                                        aircraft.hoursLeft < 10
                                            ? { color: 'red' }
                                            : {}
                                    }
                                />
                                <p
                                    style={
                                        aircraft.hoursLeft < 10
                                            ? { color: 'red' }
                                            : {}
                                    }
                                >
                                    hours left
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </FadeIn>
        </div>
    );
};

export default HoursLeftStats;
