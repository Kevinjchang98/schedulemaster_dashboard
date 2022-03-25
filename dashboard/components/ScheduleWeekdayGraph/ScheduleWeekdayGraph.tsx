import { max, scaleBand, scaleLinear } from 'd3';
import { useEffect, useRef, useState } from 'react';
import useResizeObserver from '../../hooks/useResizeObserver';
import styles from '../../styles/BarChart.module.css';

interface Props {
    scheduleData: Array<Object>;
    subSectionNumber: number | string;
    timeCaption: string | null;
}

const ScheduleWeekDayGraph = ({
    scheduleData,
    subSectionNumber,
    timeCaption,
}: Props) => {
    const [width, setWidth] = useState(800);
    const [height, setHeight] = useState(400);
    const margin = { top: 30, right: 30, bottom: 30, left: 60 };
    const innerWidth = width - margin.right - margin.left;
    const innerHeight = height - margin.top - margin.bottom;

    const freq = [0, 0, 0, 0, 0, 0, 0];

    const graphRef: any = useRef();
    const dimensions: any = useResizeObserver(graphRef);

    useEffect(() => {
        if (dimensions) {
            setWidth(dimensions.width);
        }
    }, [dimensions]);

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
        .map((tickValue: number, i: number) => (
            <g transform={`translate(0, ${-yScale(tickValue)})`} key={i}>
                <text
                    key={tickValue + 'text'}
                    style={{ textAnchor: 'end' }}
                    dy={'0.32em'}
                    x={'-10'}
                    y={innerHeight + 3}
                >
                    {tickValue}
                </text>
            </g>
        ));

    const xScaleMarks = xScale.domain().map((tickValue: number, i: number) => (
        <g key={i}>
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

    const xAxisLine = (
        <line
            x1={0}
            x2={innerWidth}
            y1={innerHeight}
            y2={innerHeight}
            stroke="gray"
        />
    );

    const yAxisLine = (
        <>
            <line x1={0} x2={0} y1={0} y2={innerHeight + 10} stroke="gray" />
            <text
                x={-innerHeight / 2}
                y={-40}
                transform={`rotate(270)`}
                style={{ textAnchor: 'middle' }}
            >
                Number of scheduled flights
            </text>
        </>
    );

    const bars = freq.map((d: any, i: any) => (
        <rect
            key={i}
            x={xScale(weekdays[i])}
            y={innerHeight - yScale(d)}
            width={xScale.bandwidth()}
            height={yScale(d)}
            color={'black'}
        />
    ));

    return (
        <div className={styles.container}>
            <div className={styles.sectionNumber}>{subSectionNumber}</div>
            <h1 className={styles.subSectionTitle}>Flights per Weekday</h1>
            <h2 className={styles.subSectionTitle}>{timeCaption}</h2>
            <div ref={graphRef}>
                {maxFreq === 0 ? null : (
                    <svg height={height} width={width}>
                        <g
                            transform={`translate(${margin.left}, ${margin.top})`}
                        >
                            {xScaleMarks}
                            {xAxisLine}
                            {yAxisLine}
                            {yScaleMarks}
                            {bars}
                        </g>
                    </svg>
                )}
            </div>
        </div>
    );
};

export default ScheduleWeekDayGraph;
