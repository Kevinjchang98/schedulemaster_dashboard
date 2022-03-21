import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

interface Props {
    isLoaded: boolean;
    aircraftData: QueryDocumentSnapshot<DocumentData>[];
}

const HoursLeftStats = ({ isLoaded, aircraftData }: Props) => {
    return (
        <div>
            <h1>Aircraft</h1>
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
        </div>
    );
};

export default HoursLeftStats;
