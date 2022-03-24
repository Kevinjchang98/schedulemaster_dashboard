import { extent, scaleBand, scaleLinear } from 'd3';
import { useEffect, useRef, useState } from 'react';
import useResizeObserver from '../../hooks/useResizeObserver';
import styles from '../../styles/BarChart.module.css';

interface Props {
    xData: Array<any>;
    yData: Array<any>;
}

const ScatterPlot = ({ xData, yData }: Props) => {
    const [width, setWidth] = useState(800);
    const [height, setHeight] = useState(400);
    const margin = { top: 30, right: 30, bottom: 30, left: 30 };
    const innerWidth = width - margin.right - margin.left;
    const innerHeight = height - margin.top - margin.bottom;

    const extentX: any = extent(xData);
    const extentY: any = extent(yData);

    const xScale: any = scaleLinear().domain(extentX).range([0, innerWidth]);
    const yScale: any = scaleLinear().domain(extentY).range([0, innerHeight]);

    const graphRef: any = useRef();
    const dimensions: any = useResizeObserver(graphRef);

    useEffect(() => {
        if (dimensions) {
            setWidth(dimensions.width);
        }
    }, [dimensions]);

    const xScaleMarks = xScale.ticks().map((tickValue: number, i: number) => (
        <g key={i}>
            <line
                x1={0}
                x2={innerWidth}
                y1={innerHeight}
                y2={innerHeight}
                stroke="gray"
            />
            <text
                style={{ textAnchor: 'middle' }}
                dy={'0.71em'}
                y={innerHeight + 15}
                x={xScale(tickValue)}
            >
                {tickValue}
            </text>
        </g>
    ));

    const yScaleMarks = yScale.ticks().map((tickValue: number, i: number) => (
        <g key={i} transform={`translate(0, ${yScale(tickValue)})`}>
            <line
                x1={0}
                x2={0}
                y1={0 - yScale(tickValue)}
                y2={innerHeight - yScale(tickValue) + 10}
                stroke="gray"
            />
            <text style={{ textAnchor: 'end' }} dy={'0.71em'} x={-10} y={-6}>
                {tickValue}
            </text>
        </g>
    ));

    const marks = xData.map((x: number, i: number) => (
        <circle
            cx={xScale(x)}
            cy={yScale(yData[i])}
            className={styles.mark}
            r={5}
            key={i}
            opacity={0.4}
        ></circle>
    ));

    return (
        <div ref={graphRef}>
            <svg height={height} width={width}>
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    {xScaleMarks}
                    {yScaleMarks}
                    {marks}
                </g>
            </svg>
        </div>
    );
};

export default ScatterPlot;
