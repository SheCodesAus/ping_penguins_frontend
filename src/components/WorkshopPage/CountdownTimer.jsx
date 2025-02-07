import React, { useState, useEffect } from 'react';
import './CountdownTimer.css';

const CountdownTimer = ({ startTime }) => {
	const [timeLeft, setTimeLeft] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	});
	const [isWorkshopOver, setIsWorkshopOver] = useState(false);

	useEffect(() => {
		const calculateTimeLeft = () => {
			const startDate = new Date(startTime);
			const now = new Date();
			const difference = startDate - now;

			if (difference > 0) {
				const days = Math.floor(difference / (1000 * 60 * 60 * 24));
				const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
				const minutes = Math.floor((difference / 1000 / 60) % 60);
				const seconds = Math.floor((difference / 1000) % 60);

				setTimeLeft({ days, hours, minutes, seconds });
				setIsWorkshopOver(false);
			} else {
				setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
				setIsWorkshopOver(true);
			}
		};

		calculateTimeLeft();
		const timer = setInterval(calculateTimeLeft, 1000);
		return () => clearInterval(timer);
	}, [startTime]);

	if (isWorkshopOver) {
		return null;
	}

	return (
		<div className="countdown-timer">
			{timeLeft.days > 0 && (
				<div className="countdown-item">
					<span className="countdown-value">{timeLeft.days}</span>
					<span className="countdown-label">Days</span>
				</div>
			)}
			<div className="countdown-item">
				<span className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</span>
				<span className="countdown-label">Hours</span>
			</div>
			<div className="countdown-item">
				<span className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
				<span className="countdown-label">Minutes</span>
			</div>
			<div className="countdown-item">
				<span className="countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
				<span className="countdown-label">Seconds</span>
			</div>
		</div>
	);
};

export default CountdownTimer;