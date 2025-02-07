import React, { useState, useEffect } from 'react';
import './CountdownTimer.css';

const CountdownTimer = ({ startTime }) => {
	const [timeLeft, setTimeLeft] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	});
	const [status, setStatus] = useState('');

	useEffect(() => {
		if (!startTime) return;

		const timer = setInterval(() => {
			const now = new Date().getTime();
			const start = new Date(startTime).getTime();
			const distance = start - now;

			if (distance > 0) {
				const days = Math.floor(distance / (1000 * 60 * 60 * 24));
				const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
				const seconds = Math.floor((distance % (1000 * 60)) / 1000);

				setTimeLeft({ days, hours, minutes, seconds });
				setStatus('upcoming');
			} else {
				setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
				setStatus('started');
			}
		}, 1000);

		return () => clearInterval(timer);
	}, [startTime]);

	if (status === 'started') {
		return <div className="countdown-timer">Workshop in progress</div>;
	}

	return (
		<div className="countdown-timer">
			<div className="countdown-unit">
				<div className="time-value">{timeLeft.days}</div>
				<div className="time-label">Days</div>
			</div>
			<div className="countdown-unit">
				<div className="time-value">{timeLeft.hours}</div>
				<div className="time-label">Hours</div>
			</div>
			<div className="countdown-unit">
				<div className="time-value">{timeLeft.minutes}</div>
				<div className="time-label">Minutes</div>
			</div>
			<div className="countdown-unit">
				<div className="time-value">{timeLeft.seconds}</div>
				<div className="time-label">Seconds</div>
			</div>
		</div>
	);
};

export default CountdownTimer;