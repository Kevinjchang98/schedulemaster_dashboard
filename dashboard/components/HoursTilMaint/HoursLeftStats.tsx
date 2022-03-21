import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import FadeIn from 'react-fade-in/lib/FadeIn';
import styles from '../../styles/HoursTilMaint.module.css';

interface Props {
    isLoaded: boolean;
    aircraftData: QueryDocumentSnapshot<DocumentData>[];
}

const HoursLeftStats = ({ isLoaded, aircraftData }: Props) => {
    return (
        <>
            <h1 className={styles.subSectionTitle}>Aircraft</h1>
            <div className={styles.subSectionContentsContainer}>
                {!isLoaded ? (
                    <FadeIn>
                        <p>Loading</p>
                    </FadeIn>
                ) : aircraftData.length == 0 ? (
                    <FadeIn>
                        <div>No aircraft data available</div>
                    </FadeIn>
                ) : (
                    aircraftData.map((aircraft: any, i: number) => (
                        <FadeIn delay={200}>
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
                        </FadeIn>
                    ))
                )}
            </div>
        </>
    );
};

export default HoursLeftStats;
