import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

interface Props {
    scheduleData: any;
    aircraftData: QueryDocumentSnapshot<DocumentData>[];
    aircraftTailNum: string;
}

const ReservationItem = ({
    scheduleData,
    aircraftData,
    aircraftTailNum,
}: Props) => {
    // Filter scheduleData to only have aircraftTailNum's schedules
    const filteredData = scheduleData.filter((d: any) => {
        return d.N_NO === aircraftTailNum;
    });

    const hoursLeft: Array<number> = [filteredData.length];

    filteredData.forEach((schedule: any) => {
        let startTime = new Date(schedule.sch_start);
        let endTime = new Date(schedule.sch_end);
        schedule.sch_length_hours =
            Math.abs(endTime.getTime() - startTime.getTime()) /
            (60 * 60 * 1000);
    });

    console.log(filteredData);

    for (let i = 0; i < filteredData.length; i++) {
        if (i == 0) {
            aircraftData.forEach((aircraft) => {
                if (aircraft.data().tail_num === aircraftTailNum) {
                    hoursLeft[0] =
                        aircraft.data().hours_remaining -
                        filteredData[0].sch_length_hours;
                }
            });
        } else {
            hoursLeft[i] = hoursLeft[i - 1] - filteredData[i].sch_length_hours;
        }
    }

    console.log(hoursLeft);

    return filteredData.map((schedule: any, i: number) => {
        let startTime = new Date(schedule.sch_start);
        let endTime = new Date(schedule.sch_end);
        let length =
            Math.abs(endTime.getTime() - startTime.getTime()) /
            (60 * 60 * 1000);

        return (
            <div key={i} style={hoursLeft[i] < 0 ? { color: 'red' } : {}}>
                <h3>
                    {schedule.N_NO} - {schedule.NAME}
                </h3>
                <p>{startTime.toTimeString()}</p>
                <p>{endTime.toTimeString()}</p>
                <p>Flight length: {length.toFixed(1)} hours</p>
                <p>Hours left for aircraft: {hoursLeft[i] + length}</p>
                <p>
                    Hours left if flight time is {length.toFixed(1)} hours:{' '}
                    {hoursLeft[i].toFixed(1)}
                </p>
            </div>
        );
    });
};

export default ReservationItem;
