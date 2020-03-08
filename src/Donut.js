import React, { useState, useEffect } from 'react';
import { useSprings, animated, config, useSpring } from 'react-spring';
import './Donut.css';

const staticSegments = [
	{
		label: 'Orders Received',
		color: '#0E696C',
		value: 91,
	},
	{
		label: 'Processed',
		color: '#80cbc4',
		value: 10,
	},
	{
		label: 'Received by Carrier',
		color: '#004400',
		value: 56,
	},
	{
		label: 'Dispatched',
		color: '#33691e',
		value: 120,
	},
	{
		label: 'Out on Van',
		color: '#689f38',
		value: 56,
	},
	{
		label: 'Delivered',
		color: '#7fba23',
		value: 28,
	},
];

const circleProps = {
	cx: 21,
	cy: 21,
	r: '15.91549430918954',
	fill: 'transparent',
	strokeWidth: 1,
};

function DonutSVG({ orders, segments, active }) {
	const totalLive = segments.reduce((a, s) => a + s.value, 0);
	const activeSegment = active ? segments.find(s => s.label === active) : null;

	const display = useSpring({
		number: activeSegment ? activeSegment.value : totalLive,
		from: { number: 0 },
	});

	const liveOrderPercent = (totalLive / orders) * 100;
	const liveOrders = useSpring({
		strokeDasharray: `${liveOrderPercent -
			circleProps.strokeWidth -
			0.5} ${100 - liveOrderPercent + circleProps.strokeWidth + 0.5}`,
		config: config.molasses,
	});

	let acc = 0;

	const springs = useSprings(
		segments.length,
		segments.map(segment => {
			const val = (segment.value / orders) * 100;

			const offset = 100 - acc + 25;
			acc += val;

			return {
				color: segment.color,
				strokeDasharray: `${val - circleProps.strokeWidth - 0.5} ${100 -
					val +
					circleProps.strokeWidth +
					0.5}`,
				strokeDashoffset: offset,
				strokeWidth: active === segment.label ? 1.75 : 1,
				opacity: !active || active === segment.label ? 1 : 0,
				config: key =>
					key === 'opacity' || key === 'strokeWidth'
						? config.default
						: config.molasses,
			};
		})
	);

	return (
		<svg width='100%' height='100%' viewBox='0 0 42 42' className='donut'>
			<circle {...circleProps} className='donut-ring' stroke='#ffffff' />
			<animated.circle
				{...circleProps}
				className='donut-live-ring'
				stroke='#E0E2E3'
				strokeDashoffset={25}
				strokeDasharray={liveOrders.strokeDasharray}
				strokeLinecap='round'
			/>
			{springs.map(s => (
				<animated.circle
					{...circleProps}
					className='donut-segment'
					stroke={s.color}
					strokeDasharray={s.strokeDasharray}
					strokeDashoffset={s.strokeDashoffset}
					strokeWidth={s.strokeWidth}
					opacity={s.opacity}
					strokeLinecap='round'
				/>
			))}
			<g className='chart-text'>
				<animated.text x='50%' y='50%' className='chart-number'>
					{display.number.interpolate(val => Math.round(val))}
				</animated.text>
				<text x='50%' y='58%' className='chart-label'>
					{activeSegment ? activeSegment.label : 'Live Orders'}
				</text>
			</g>
			<defs>
				<path
					id='textcircle'
					d='M7.8, 21
          a 13,13 0 1,0 26,0
          a 13,13 0 1,0 -26,0'
				/>
			</defs>
			<text x='50%' y='78%' className='chart-max'>
				<textPath alignmentBaseline='top' xlinkHref='#textcircle'>
					{activeSegment ? `${totalLive} live orders` : `${orders} total`}
				</textPath>
			</text>
		</svg>
	);
}

function LineSVG({ orders, segments }) {
	const totalLive = segments.reduce((a, s) => a + s.value, 0);

	const display = useSpring({
		number: totalLive,
		from: { number: 0 },
	});

	let acc = 0;

	const springs = useSprings(
		segments.length,
		segments.map(segment => {
			const val = (segment.value / orders) * 100 * 0.38;

			const offset = acc;
			acc += val;

			return {
				color: segment.color,
				strokeDasharray: `${val} ${39 - val}`,
				strokeDashoffset: offset * -1,
				config: config.molasses,
			};
		})
	);

	return (
		<svg width='100%' height='100%' viewBox='0 0 42 10' className='lineChart'>
			<line
				x1='2'
				y1='8'
				x2='40'
				y2='8'
				stroke='#f5f6f7'
				strokeWidth={1}
				strokeLinecap='round'
			/>
			{[
				...springs.map(s => {
					return (
						<animated.line
							x1='2'
							y1='8'
							x2='40'
							y2='8'
							stroke={s.color}
							strokeDasharray={s.strokeDasharray}
							strokeDashoffset={s.strokeDashoffset}
							strokeWidth={s.strokeWidth}
							opacity={s.opacity}
							strokeLinecap='round'
						/>
					);
				}),
			].reverse()}
			<g className='chart-text'>
				<text x='1.5' y='4' className='line-chart-text'>
					<animated.tspan className='line-chart-number'>
						{display.number.interpolate(val => Math.round(val))}
					</animated.tspan>{' '}
					of {orders}
				</text>
			</g>
		</svg>
	);
}

export default function App() {
	const [segments, setSegments] = useState(staticSegments);
	const [active, setActive] = useState('');

	useEffect(() => {
		let timeOut = setTimeout(() => {
			setSegments(([a, b, ...rest]) => [
				a,
				{
					...b,
					value: 40,
				},
				...rest,
			]);

			timeOut = setTimeout(() => {
				setActive('Dispatched');

				timeOut = setTimeout(() => {
					setActive('Orders Received');

					timeOut = setTimeout(() => {
						setSegments(([a, b, ...rest]) => [
							a,
							{
								...b,
								value: 56,
							},
							...rest,
						]);
					}, 3000);

					timeOut = setTimeout(() => {
						setActive('Processed');

						timeOut = setTimeout(() => {
							setActive('');
						}, 5000);
					}, 5000);
				}, 5000);
			}, 2500);
		}, 5000);

		return () => {
			clearTimeout(timeOut);
		};
	}, [setSegments]);

	return (
		<div className='App'>
			<div style={{ width: 300 }}>
				<DonutSVG segments={segments} orders={490} active={active} />
			</div>
			<div style={{ width: 300, backgroundColor: '#ffffff' }}>
				<LineSVG segments={segments} orders={490} active={active} />
			</div>
			<div style={{ width: 300, backgroundColor: '#ffffff', marginTop: 16 }}>
				<LineSVG
					segments={[
						{
							label: 'To Be Advised',
							color: '#ff9500',
							value: 91,
						},
					]}
					orders={540}
					active={active}
				/>
			</div>
		</div>
	);
}
