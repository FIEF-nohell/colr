export interface colorType {
    red: number;
    green: number;
    blue: number;
}

interface highsAndLows {
    // 0 is too low
    // 1 is correct
    // 2 is too high
    red: number;
    green: number;
    blue: number;
}

export interface submittedColorType extends colorType {
    feedback: highsAndLows;
    guessNumber: number;
}

export interface monoColorType {
    c: number;
}

export interface submittedMonoColorType extends monoColorType {
    cStatus: string;
}

export interface RGBInputsProps {
    guess: colorType;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>, color: keyof colorType) => void;
}

export interface HistoryDisplayProps {
    history: submittedColorType[];
}
