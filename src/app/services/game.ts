import { colorType } from "./types";

function generateRandomColor(m: number): colorType {
    function rnd(multiplier: number) {
        return Math.floor(Math.random() * (256 / multiplier)) * multiplier;
    }

    return {
        red: rnd(m),
        green: rnd(m),
        blue: rnd(m),
    };
}

function generateRandomMonoColor(m: number) {
    function genNum(multiplier: number) {
        return Math.floor(Math.random() * (256 / multiplier)) * multiplier;
    }

    return {
        c: genNum(m)
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

function hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

function dateToRGB(date: Date, multiple = 5): colorType {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const dateString = `${year}-${month}-${day}`;
    const hash = hashCode(dateString);

    const r = (hash & 0xFF0000) >> 16;
    const g = (hash & 0x00FF00) >> 8;
    const b = (hash & 0x0000FF);

    return adjustToMultiple({ red: r, green: g, blue: b }, multiple);
}

function adjustToMultiple(rgb: colorType, m: number): colorType {
    const adjust = (value: number, multiple: number): number => {
        return Math.round(value / multiple) * multiple;
    };

    return {
        red: adjust(rgb.red, m),
        green: adjust(rgb.green, m),
        blue: adjust(rgb.blue, m)
    };
}

export { generateRandomColor, getIcon, getColor, getStatus, dateToRGB, generateRandomMonoColor };