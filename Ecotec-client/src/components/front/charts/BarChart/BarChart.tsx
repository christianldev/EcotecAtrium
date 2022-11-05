import {useEffect, useState} from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';

import {Bar} from 'react-chartjs-2';
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);
const options: Object = {
	maintainAspectRatio: false,
	plugins: {
		legend: {
			display: false,
		},
	},
	scales: {
		x: {
			ticks: {
				display: false,
			},
			grid: {
				display: false,
			},
		},
		y: {
			ticks: {
				display: false,
			},
			grid: {
				display: false,
				drawBorder: false,
			},
		},
	},
};

// Fake visitor data
const reportBarChartData = new Array(40)
	.fill(0)
	.map((data, key) => {
		if (key % 3 == 0 || key % 5 == 0) {
			return Math.ceil(Math.random() * (0 - 20) + 20);
		} else {
			return Math.ceil(Math.random() * (0 - 7) + 7);
		}
	});

const reportBarChartColor = () => {
	return reportBarChartData.map((data) => {
		if (data >= 8 && data <= 14) {
			return '#FFC107';
		} else if (data >= 15) {
			return '#4CAF50';
		}

		return '#F44336';
	});
};

interface IBarChartProps {}

const BarChart: React.FC<IBarChartProps> = () => {
	const [data, setData] = useState<any>({
		labels: [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
		],
		datasets: [
			{
				label: 'Dataset 1',

				barPercentage: 0.5,
				barThickness: 6,
				maxBarThickness: 8,
				minBarLength: 2,
				data: [],
				borderColor: 'rgb(12, 100, 235)',
				backgroundColor: 'rgb(12, 100, 235)',
			},
			{
				label: 'Dataset 2',
				barPercentage: 0.5,
				barThickness: 6,
				maxBarThickness: 8,
				minBarLength: 2,
				data: [],
				borderColor: 'rgb(12, 100, 235)',
				backgroundColor: 'rgb(12, 100, 235)',
			},
		],
	});
	useEffect(() => {
		const fetchData = async () => {
			const url =
				'https://jsonplaceholder.typicode.com/posts/1/comments';
			const labelSet = [];
			const dataSet1: number[] = [];
			const dataSet2: number[] = [];
			await fetch(url)
				.then((data) => {
					console.log('Api data', data);
					const res = data.json();
					return res;
				})
				.then((res) => {
					console.log('ressss', res);
					for (const val of res) {
						dataSet1.push(val.id);
						dataSet2.push(val.postId);
						// labelSet.push(val.name)
					}
					setData({
						labels: [
							'Sunday',
							'Monday',
							'Tuesday',
							'Wednesday',
							'Thursday',
							'Friday',
							'Saturday',
						],
						datasets: [
							{
								label: 'Dataset ID',
								data: dataSet1,
								borderColor: 'rgb(255, 99, 132)',
								backgroundColor: 'rgba(99, 132, 0.5)',
							},
							{
								label: 'Dataset ID2',
								data: dataSet2,
								borderColor: 'rgb(53, 162, 235)',
								backgroundColor: 'rgba(53, 235, 0.5)',
							},
						],
					});
					console.log('arrData', dataSet1, dataSet2);
				})
				.catch((e) => {
					console.log('error', e);
				});
		};

		fetchData();
	}, []);
	return (
		<div
			style={{
				display: 'block',
				boxSizing: 'border-box',
				height: '250px',
				width: '240px',
			}}>
			{console.log('dataaaaaaaa', data)}
			<Bar data={data} options={options} />
		</div>
	);
};

export default BarChart;
