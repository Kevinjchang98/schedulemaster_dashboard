import { useState } from 'react';
import styles from '../../styles/HoursTilMaint.module.css';
import FadeIn from 'react-fade-in/lib/FadeIn';

interface Props {
    i: number;
    hoursLeft: number;
    tailNum: string;
    name: string;
    startTime: Date;
    endTime: Date;
}

const ReservationIndividual = ({
    i,
    hoursLeft,
    tailNum,
    name,
    startTime,
    endTime,
}: Props) => {
    const [isExpanded, setIsExpanded] = useState<Boolean>(false);
    const length =
        Math.abs(endTime.getTime() - startTime.getTime()) / (60 * 60 * 1000);

    const expand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div
            key={i}
            style={hoursLeft < 0 ? { color: 'red' } : {}}
            className={styles.reservationIndividualContainer}
        >
            <h3
                className={styles.reservationTitle}
                onClick={() => {
                    expand();
                }}
            >
                {name}
            </h3>
            <div className={styles.reservationDetails}>
                {isExpanded ? (
                    <FadeIn delay={25} transitionDuration={125}>
                        <p>{startTime.toDateString()}</p>
                        <p>{startTime.toTimeString()}</p>
                        <p>{endTime.toTimeString()}</p>
                        <p>Flight length: {length.toFixed(1)} hours</p>
                        <p>
                            Hours left for aircraft:{' '}
                            {(hoursLeft + length).toFixed(1)}
                        </p>
                        <p>
                            Hours left if flight time is {length.toFixed(1)}{' '}
                            hours: {hoursLeft.toFixed(1)}
                        </p>
                    </FadeIn>
                ) : null}
            </div>
        </div>
    );
};

export default ReservationIndividual;
