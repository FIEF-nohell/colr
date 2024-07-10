export interface colorType {
    red: number;
    green: number;
    blue: number;
}

export interface submittedColorType extends colorType {
    rStatus: string;
    gStatus: string;
    bStatus: string;
}


export interface monoColorType {
    c: number;
}

export interface submittedMonoColorType extends monoColorType {
    cStatus: string;
}