import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
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
            <FadeIn delay={70} className={styles.subSectionContentsContainer}>
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
            </FadeIn>
        </div>
    );
};

export default HoursLeftStats;
