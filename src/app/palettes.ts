import { Palette } from "./interfaces/palettes";


const basicPalette: Palette = {
    name: 'basic',
    colors: [
        '#000000',
        '#ffffff',
        '#ff0000',
        '#ffa500',
        '#ffff00',
        '#008000',
        '#add8e6',
        '#0000ff',
        '#800080',
    ],
}

const marioPalette: Palette = {
    name: 'mario',
    colors: [
        '#d82900',
        '#857000',
        '#fb9838',
    ],
}

const goombaPalette: Palette = {
    name: 'goomba',
    colors: [
        '#9c4a00',
        '#000000',
        '#ffcec5',
    ],
}


export const palettes = {
    basic: basicPalette,
    mario: marioPalette,
    goomba: goombaPalette,
}