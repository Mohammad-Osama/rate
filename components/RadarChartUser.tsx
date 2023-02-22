import { IRate } from '../helpers/types';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);
interface X {
    rateInfo: IRate
}
const RadarChartUser = ({ rateInfo }: X) => {
    const {
        acting,
        story,
        dialogue,
        directing,
        cinematography,
        visual_effects,
        sound_effects
    } = rateInfo


    const data = {
        labels: [
            'Acting',
            'Story',
            'Dialogue',
            'Directing',
            'Cinematography',
            'Visual effects',
            'Sound effects'],
        datasets: [
            {
                label: `My Rate `,
                data: [
                    acting,
                    story,
                    dialogue,
                    directing,
                    cinematography,
                    visual_effects,
                    sound_effects],
                backgroundColor: '#39d353', // label box  background
                borderColor: '#39d353', // lines 
                borderWidth: 5,
                fill: false,
                fillColor: "red",
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: 'red',

            },
        ]
    };
    return (
        <Radar
            options={{
                responsive: true,
                maintainAspectRatio: true,
                color: "yellow",// color of the main label at the top
                scales: {
                    r: {
                        min: 0,
                        max: 10,
                        pointLabels: { // edit labels 
                            color: "white",
                            font: {
                                size: 15
                            }
                        },
                        //  reverse,
                        //  startAngle:33, // rotates the chart
                        //  suggestedMax:44,
                        //   suggestedMin,
                        ticks: {
                            display: false,
                            stepSize: 1
                            //  textStrokeColor: 'rgb(54, 162, 235)',
                            //   color: 'white',
                            //  backdropColor: 'red'
                        },
                        angleLines: {
                            //     color: 'yellow',
                        },
                        //  type,
                        //  weight,
                        grid: {
                            color: "#2C2E33",
                            lineWidth: 2,
                        }
                    }
                }
            }}
            data={data}
        />
    )
}

export default RadarChartUser
