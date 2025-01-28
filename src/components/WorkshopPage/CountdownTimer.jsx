import React, { useState, useEffect } from 'react';
import getBoard from '../../api/get-board';  

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem'
  },
  timerRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  timeUnit: {
    position: 'relative',
    width: '8rem',
    height: '12rem',
    margin: '0 1rem'
  },
  square: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffeb7f',
    position: 'relative'
  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  },
  number: {
    fontSize: '3.75rem',
    fontWeight: 'bold',
    fontFamily: 'Futura, sans-serif',
    marginBottom: '0.5rem',
    color: '#808080'
  },
  label: {
    fontSize: '1.125rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    fontFamily: 'Futura, sans-serif',
    color: '#808080'
  }
};

const CountdownTimer = ({ boardId }) => {  // Accept boardId as a prop
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [startDate, setStartDate] = useState(null);

  // Fetch the start date from backend using existing getBoard function
  useEffect(() => {
    const fetchStartDate = async () => {
      try {
        const boardData = await getBoard(boardId);
        if (boardData && boardData.date_start) {
          setStartDate(new Date(boardData.date_start));
        }
      } catch (error) {
        console.error('Error fetching start date:', error);
      }
    };

    if (boardId) {
      fetchStartDate();
    }
  }, [boardId]);

  // Calculate time left once we have the start date
  useEffect(() => {
    if (!startDate) return;

    const calculateTimeLeft = () => {
      const difference = +startDate - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        // If the start date has passed
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, [startDate]);

  const TimeUnit = ({ value, label }) => (
    <div style={styles.timeUnit}>
      <div style={styles.square}>
        <div style={styles.content}>
          <span style={styles.number}>
            {String(value).padStart(2, '0')}
          </span>
          <span style={styles.label}>
            {label}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.timerRow}>
        <TimeUnit value={timeLeft.days} label="Days" />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <TimeUnit value={timeLeft.minutes} label="Minutes" />
        <TimeUnit value={timeLeft.seconds} label="Seconds" />
      </div>
    </div>
  );
};

export default CountdownTimer;