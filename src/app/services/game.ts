function generateRandomColor(m: number) {
    function genNum(multiplier: number) {
        return Math.floor(Math.random() * (256 / multiplier)) * multiplier;
    }

    return {
        r: genNum(m),
        g: genNum(m),
        b: genNum(m),
    };
}

function getIcon(status: string) {
    switch (status) {
        case 'low':
            return '🔼';
        case 'high':
            return '🔽';
        default:
            return '✅';
    }
}

function getColor(status: string) {
    switch (status) {
        case 'low':
            return 'text-orange-500';
        case 'high':
            return 'text-red-500';
        default:
            return 'text-green-500';
    }
}

function getStatus(guess: number, target: number) {
    if (guess < target) {
        return 'low';
    } else if (guess > target) {
        return 'high';
    }
    return 'correct';
}

export { generateRandomColor, getIcon, getColor, getStatus };