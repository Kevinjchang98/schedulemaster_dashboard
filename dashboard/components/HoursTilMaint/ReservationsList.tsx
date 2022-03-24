import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import ReservationByAircraft from './ReservationByAircraft';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FadeIn from 'react-fade-in/lib/FadeIn';
import styles from '../../styles/HoursTilMaint.module.css';
import { useEffect, useState } from 'react';

interface Props {
    isLoaded: boolean;
    scheduleData: Array<{}>;
    aircraftData: QueryDocumentSnapshot<DocumentData>[];
    aircraftList: Array<{}>;
    setStartDate: Function;
    setEndDate: Function;
}

const ReservationsList = ({
    isLoaded,
    scheduleData,
    aircraftData,
    aircraftList,
    setStartDate,
    setEndDate,
}: Props) => {
    const [localStart, setLocalStart] = useState<Date>(new Date());
    const [localEnd, setLocalEnd] = useState<Date>(
        new Date(new Date().setDate(new Date().getDate() + 7))
    );
    const [hide, setHide] = useState<boolean>(!isLoaded);

    useEffect(() => {
        setHide(false);
    }, [scheduleData]);

    return (
        <div className={styles.container}>
            <div className={styles.sectionNumber}>02</div>
            <h1 className={styles.subSectionTitle}>Scheduled flights</h1>
            <div className={styles.subSectionContentsContainer}>
                <div className={styles.subSectionSticky}>
                    <h3>Filter</h3>
                    <p>Start Date:</p>
                    <DatePicker
                        selected={localStart}
                        onChange={(date: any) => {
                            setLocalStart(date);
                        }}
                        selectsStart
                        startDate={localStart}
                        endDate={localEnd}
                    />
                    <p>End Date:</p>
                    <DatePicker
                        selected={localEnd}
                        onChange={(date: any) => {
                            setLocalEnd(date);
                        }}
                        selectsEnd
                        startDate={localStart}
                        endDate={localEnd}
                        minDate={localStart}
                    />

                    <button
                        onClick={() => {
                            setHide(true);
                            setStartDate(localStart);
                            setEndDate(localEnd);
                        }}
                    >
                        Query
                    </button>
                </div>

                <div className={styles.subSectionMain}>
                    {hide ? null : scheduleData.length === 0 ? (
                        <p>No scheduled flights within selected dates</p>
                    ) : (
                        <FadeIn
                            delay={100}
                            className={styles.subSectionContentsContainerWrap}
                            visible={isLoaded}
                        >
                            {aircraftList.map((d: any, i: number) => (
                                <ReservationByAircraft
                                    key={i}
                                    scheduleData={scheduleData}
                                    aircraftData={aircraftData}
                                    aircraftTailNum={d.N_NO}
                                />
                            ))}
                        </FadeIn>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReservationsList;
