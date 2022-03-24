import styles from '../styles/BarChart.module.css';
import ScatterPlot from './ScatterPlot/ScatterPlot';

interface Props {
    scheduleData: Array<any>;
    aircraftList: Array<any>;
    subSectionNumber: number | string;
    timeCaption: string | null;
}

const CostVsFlightLength = ({
    scheduleData,
    aircraftList,
    subSectionNumber,
    timeCaption,
}: Props) => {
    const xData = scheduleData.map(
        (schedule: any) =>
            Math.abs(
                Date.parse(schedule.sch_end) - Date.parse(schedule.sch_start)
            ) /
            (60 * 60 * 1000)
    );

    const yData = scheduleData.map(
        (schedule: any) =>
            aircraftList.find(({ tailNum }: any) => tailNum === schedule.n_no)!
                .costperhour
    );

    return (
        <div className={styles.container}>
            <div className={styles.sectionNumber}>{subSectionNumber}</div>
            <h1 className={styles.subSectionTitle}>
                Rental Rate vs Flight Length
            </h1>
            <h2 className={styles.subSectionTitle}>{timeCaption}</h2>

            {scheduleData.length > 0 ? (
                <ScatterPlot xData={xData} yData={yData} />
            ) : null}
        </div>
    );
};

export default CostVsFlightLength;
