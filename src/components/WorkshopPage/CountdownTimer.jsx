import React, { useState, useEffect } from 'react';
import './CountdownTimer.css';

const CountdownTimer = ({ startTime, onStatusChange }) => {
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
			const workshopEnd = start + (24 * 60 * 60 * 1000); // 24 hours after start
			const distance = start - now;
			const timeFromStart = now - start;

			if (distance > 0) {
				// Workshop hasn't started yet
				const days = Math.floor(distance / (1000 * 60 * 60 * 24));
				const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
				const seconds = Math.floor((distance % (1000 * 60)) / 1000);

				setTimeLeft({ days, hours, minutes, seconds });
				setStatus('upcoming');
				onStatusChange('upcoming');
			} else if (timeFromStart <= (24 * 60 * 60 * 1000)) {
				// Workshop is in progress (within 24 hours from start)
				setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
				setStatus('in_progress');
				onStatusChange('in_progress');
			} else {
				// Workshop is closed (more than 24 hours from start)
				setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
				setStatus('closed');
				onStatusChange('closed');
			}
		}, 1000);

		return () => clearInterval(timer);
	}, [startTime, onStatusChange]);

	if (status === 'in_progress') {
		return <div className="countdown-timer">Workshop in progress</div>;
	}

	if (status === 'closed') {
		return <div className="countdown-timer">Workshop is closed</div>;
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