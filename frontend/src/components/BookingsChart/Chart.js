import React from 'react';
import { Bar } from 'react-chartjs-2'

const BOOKINGS_BUCKETS = {
    'Cheap': 1,
    'Normal': 2,
    'Exprnsive': 3
}

const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};

function ChartElement({ bookings }) {
    const output = []

    for (const bucket in BOOKINGS_BUCKETS) {
        const bookingsAmmout = bookings.reduce((prev, current) => {
            if (current.event.price < BOOKINGS_BUCKETS[bucket]) {
                return prev + 1
            }
            return prev
        }, 0)
        output[bucket] = bookingsAmmout
    }

    const chartData = {
        labels: Object.keys(output),
        datasets: [
            {
                label: 'ammout of bookings',
                data: Object.values(output)
            }
        ]
    }
    

    console.log(output);
    return (
        <div>
            Chart
            <Bar data={chartData} options={options}/>
        </div>
    )
}

export default ChartElement