import {useState, useEffect} from "react";
import {Line} from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale
} from "chart.js";
import 'chartjs-adapter-date-fns';
import {et} from 'date-fns/locale';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale
)

const API_URL=import.meta.env.VITE_COIN_DETAILS_API_URL

const CoinChart = ({coinId}) => {

    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrices = async () => {
            const response = await fetch(`${API_URL}/${coinId}/market_chart?vs_currency=eur&days=7`);

            const data = await response.json();

            const prices = data.prices.map((price) => ({
                x: price[0],
                y: price[1]
            }));

            setChartData({
                datasets:[
                    {
                        label: 'Price, EUR',
                        data: prices,
                        fill: true,
                        borderColor: '#007bff',
                        backgroundColor: 'rgba(0, 123, 255, 0.1)',
                        pointRadius: 0,
                        tension: 0.3
                    }
                ]
            });

            setLoading(false);

        }

        fetchPrices();
    }, [coinId]);

    if (loading) return <p>Loading chart...</p>;

    return (
        <div style={{ marginTop: '30px' }}>
            <Line
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: { display: false }, // Hide the legend
                        tooltip: { mode: 'index', intersect: false }, // Tooltip appears when hovering near a point
                    },
                    scales: {
                        x: {
                            type: 'time', // Uses date-based axis
                            time: {
                                unit: 'day', // Each tick on the axis represents a day
                            },
                            adapters:{
                                date:{
                                    locale: et
                                }
                            },
                            ticks: {
                                autoSkip: true, // Skip ticks if there are too many
                                maxTicksLimit: 7, // Show at most 7 ticks
                            },
                        },
                        y: {
                            ticks: {
                                callback: (value) => `${value.toLocaleString('ee-ET')} €`, // Format numbers like $25,000
                            },
                        }
                    },
                }}
            />
        </div>
    );
}
export default CoinChart;