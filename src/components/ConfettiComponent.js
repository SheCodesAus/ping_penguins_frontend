import confetti from 'canvas-confetti';

const fireConfetti = () => {
    const colors = [
        '#F613A5', // Pink
        '#FFC0E9', // Light Pink
        '#FF69B4', // Hot Pink
        '#FFFF00', // Yellow
        '#0000FF', // Blue
        '#800080', // Purple
    ];

    // Left side confetti
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.1, y: 0.5 },
        colors: colors,
        startVelocity: 40,
        gravity: 0.8,
        shapes: ['circle', 'square'],
        ticks: 200,
        drift: 0.4, // Adds a more dynamic "drift" effect
    });

    // Right side confetti
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.9, y: 0.5 },
        colors: colors,
        startVelocity: 40,
        gravity: 0.8,
        shapes: ['circle', 'square'],
        ticks: 200,
        drift: -0.4, // Adds a more dynamic "drift" effect
    });

    // Top confetti (adds to the "dance" effect)
    confetti({
        particleCount: 50,
        spread: 100,
        origin: { x: 0.5, y: 0 },
        colors: colors,
        startVelocity: 30,
        gravity: 1.2, // Increase gravity for a faster drop
        shapes: ['circle'],
        ticks: 150,
    });
};

export default fireConfetti;
