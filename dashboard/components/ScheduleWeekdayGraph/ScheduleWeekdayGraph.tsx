import { max, scaleBand, scaleLinear } from 'd3';
import styles from '../../styles/BarChart.module.css';

interface Props {
    scheduleData: Array<Object>;
}

const ScheduleWeekDayGraph = ({ scheduleData }: Props) => {
    const width = 800;
    const height = 400;
    const margin = { top: 30, right: 30, bottom: 30, left: 30 };
    const innerWidth: number = width - margin.right - margin.left;
    const innerHeight: number = height - margin.top - margin.bottom;

    const freq = [0, 0, 0, 0, 0, 0, 0];

    scheduleData.forEach((schedule: any) => {
        const date = new Date(Date.parse(schedule.sch_start));

        freq[date.getDay()]++;
    });

    const weekdays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];

    const xScale: any = scaleBand()
        .domain(weekdays.map((d) => d)) // Maybe need .map()
        .range([0, innerWidth])
        .paddingInner(0.4);

    const maxFreq: any = max(freq);

    const yScale: any = scaleLinear()
        .domain([0, maxFreq])
        .range([0, innerHeight]);

    const yScaleMarks = yScale
        .ticks(maxFreq < 10 ? maxFreq : null)
        .map((tickValue: number) => (
            <g transform={`translate(0, ${-yScale(tickValue)})`}>
                <text
                    key={tickValue + 'text'}
                    style={{ textAnchor: 'end' }}
                    dy={'0.32em'}
                    x={'0'}
                    y={innerHeight + 3}
                >
                    {tickValue}
                </text>
            </g>
        ));

    const xScaleMarks = xScale.domain().map((tickValue: number) => (
        <g>
            <text
                style={{ textAnchor: 'middle' }}
                dy={'0.71em'}
                y={innerHeight + 15}
                x={xScale(tickValue) + xScale.bandwidth() / 2}
            >
                {tickValue}
            </text>
        </g>
    ));

    const bars = freq.map((d: any, i: any) => (
        <rect
            x={xScale(weekdays[i])}
            y={innerHeight - yScale(d)}
            width={xScale.bandwidth()}
            height={yScale(d)}
            color={'black'}
        />
    ));

    return (
        <div>
            <h1>Flights per weekday</h1>
            <svg height={height} width={width}>
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    {yScale}
                    {xScale}
                    {xScaleMarks}
                    {yScaleMarks}
                    {bars}
                </g>
            </svg>
        </div>
    );
};

export default ScheduleWeekDayGraph;