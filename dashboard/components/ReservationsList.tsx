import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import ReservationItem from './ReservationItem';

interface Props {
    isLoaded: boolean;
    scheduleData: Array<{}>;
    aircraftData: QueryDocumentSnapshot<DocumentData>[];
    aircraftList: Array<{}>;
}

const ReservationsList = ({
    isLoaded,
    scheduleData,
    aircraftData,
    aircraftList,
}: Props) => {
    return (
        <div>
            <h1>Scheduled flights</h1>

            {!isLoaded ? null : scheduleData.length === 0 ? (
                <p>No schedules</p>
            ) : (
                aircraftList.map((d: any) => (
                    <ReservationItem
                        scheduleData={scheduleData}
                        aircraftData={aircraftData}
                        aircraftTailNum={d.N_NO}
                    />
                ))
            )}
        </div>
    );
};

export default ReservationsList;
