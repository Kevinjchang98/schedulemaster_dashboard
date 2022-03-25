import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import ReservationIndividual from './ReservationIndividual';
import FadeIn from 'react-fade-in/lib/FadeIn';

interface Props {
    scheduleData: any;
    aircraftHours: Array<any>;
    aircraftTailNum: string;
}

const ReservationByAircraft = ({
    scheduleData,
    aircraftHours,
    aircraftTailNum,
}: Props) => {
    // Filter scheduleData to only have aircraftTailNum's schedules
    const filteredData = scheduleData.filter((d: any) => {
        return d.N_NO === aircraftTailNum;
    });

    // Array of hours after each flight. Matched by index to filteredData
    const hoursLeft: Array<number> = [filteredData.length];

    // Calculate each schedule's length
    filteredData.forEach((schedule: any) => {
        schedule.sch_length_hours =
            Math.abs(
                Date.parse(schedule.sch_end) - Date.parse(schedule.sch_start)
            ) /
            (60 * 60 * 1000);
    });

    // Populate hoursLeft array
    for (let i = 0; i < filteredData.length; i++) {
        if (i == 0) {
            aircraftHours.forEach((aircraft) => {
                if (aircraft.tailNum === aircraftTailNum) {
                    hoursLeft[0] =
                        aircraft.hoursLeft - filteredData[0].sch_length_hours;
                }
            });
        } else {
            hoursLeft[i] = hoursLeft[i - 1] - filteredData[i].sch_length_hours;
        }
    }

    return (
        <FadeIn>
            <h2>{aircraftTailNum}</h2>
            <h3>
                {filteredData.length} reservation
                {filteredData.length !== 1 ? 's' : ''}
            </h3>
            {filteredData.map((schedule: any, i: number) => {
                let startTime = new Date(schedule.sch_start);
                let endTime = new Date(schedule.sch_end);

                return (
                    <div
                        key={i}
                        style={hoursLeft[i] < 0 ? { color: 'red' } : {}}
                    >
                        <ReservationIndividual
                            i={i}
                            hoursLeft={hoursLeft[i]}
                            name={schedule.NAME}
                            startTime={startTime}
                            endTime={endTime}
                        />
                    </div>
                );
            })}
        </FadeIn>
    );
};

export default ReservationByAircraft;
