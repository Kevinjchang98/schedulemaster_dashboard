import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import Link from 'next/link';
import FadeIn from 'react-fade-in/lib/FadeIn';
import styles from '../../styles/HoursTilMaint.module.css';

interface Props {
    isLoaded: boolean;
    aircraftData: QueryDocumentSnapshot<DocumentData>[];
}

const HoursLeftStats = ({ isLoaded, aircraftData }: Props) => {
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
                ) : aircraftData.length == 0 ? (
                    <div>No aircraft data available</div>
                ) : (
                    aircraftData.map((aircraft: any, i: number) => (
                        <Link
                            key={i}
                            href={`/aircraft/${aircraft.data().tail_num}`}
                        >
                            <div className={styles.aircraftDetailsLink}>
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
                        </Link>
                    ))
                )}
            </FadeIn>
        </div>
    );
};

export default HoursLeftStats;
