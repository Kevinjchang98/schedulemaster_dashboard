import { useState } from 'react';

interface Props {
    i: number;
    hoursLeft: number;
    tailNum: string;
    name: string;
    startTime: Date;
    endTime: Date;
}

const ReservationIndividual = ({
    i,
    hoursLeft,
    tailNum,
    name,
    startTime,
    endTime,
}: Props) => {
    const [isExpanded, setIsExpanded] = useState<Boolean>(false);
    const length =
        Math.abs(endTime.getTime() - startTime.getTime()) / (60 * 60 * 1000);

    const expand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div key={i} style={hoursLeft < 0 ? { color: 'red' } : {}}>
            <h3
                onClick={() => {
                    expand();
                }}
            >
                {tailNum} - {name}
            </h3>

            {isExpanded ? (
                <>
                    <p>{startTime.toDateString()}</p>
                    <p>{startTime.toTimeString()}</p>
                    <p>{endTime.toTimeString()}</p>
                    <p>Flight length: {length.toFixed(1)} hours</p>
                    <p>
                        Hours left for aircraft:{' '}
                        {(hoursLeft + length).toFixed(1)}
                    </p>
                    <p>
                        Hours left if flight time is {length.toFixed(1)} hours:{' '}
                        {hoursLeft.toFixed(1)}
                    </p>
                </>
            ) : (
                <>
                    <p>{startTime.toDateString()}</p>
                    <p>{startTime.toTimeString()}</p>
                </>
            )}
        </div>
    );
};

export default ReservationIndividual;
