export interface ColorMap {
    [name: string]: number[]
}


export interface Frame {
    meta: Object;
    colorMap: ColorMap[];
}