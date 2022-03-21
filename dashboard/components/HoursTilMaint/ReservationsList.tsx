import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import ReservationByAircraft from './ReservationByAircraft';

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
                aircraftList.map((d: any, i: number) => (
                    <ReservationByAircraft
                        key={i}
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
