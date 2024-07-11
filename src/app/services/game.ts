import { colorType } from "./types";

export function generateRandomColor(m: number): colorType {
    return { red: rnd(m), green: rnd(m), blue: rnd(m), };
}

export function generateRandomMonoColor(m: number) {
    return {
        c: rnd(m)
    };
}

function rnd(multiplier: number) {
    return Math.floor(Math.random() * (256 / multiplier)) * multiplier;
}

export function getStatus(guess: colorType, target: colorType) {
    let infoRed: number = 0;
    let infoGreen: number = 0;
    let infoBlue: number = 0;

    // Compare red values
    if (guess.red < target.red) {
        infoRed = 0; // too low
    } else if (guess.red === target.red) {
        infoRed = 1; // correct
    } else if (guess.red > target.red) {
        infoRed = 2; // too high
    }

    // Compare green values
    if (guess.green < target.green) {
        infoGreen = 0; // too low
    } else if (guess.green === target.green) {
        infoGreen = 1; // correct
    } else if (guess.green > target.green) {
        infoGreen = 2; // too high
    }

    // Compare blue values
    if (guess.blue < target.blue) {
        infoBlue = 0; // too low
    } else if (guess.blue === target.blue) {
        infoBlue = 1; // correct
    } else if (guess.blue > target.blue) {
        infoBlue = 2; // too high
    }

    return { red: infoRed, green: infoGreen, blue: infoBlue };
}

function hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
    }
    return hash;
}

export function dateToRGB(date: Date, multiple = 5): colorType {
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

export function adjustToMultiple(rgb: colorType, m: number): colorType {
    const adjust = (value: number, multiple: number): number => {
        return Math.round(value / multiple) * multiple;
    };

    return {
        red: adjust(rgb.red, m),
        green: adjust(rgb.green, m),
        blue: adjust(rgb.blue, m)
    };
}