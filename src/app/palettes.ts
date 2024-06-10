import { Palette } from "./interfaces/palettes";


const basicPalette: Palette = {
    name: 'basic',
    colors: [
        'black',
        'white',
        'red',
        'orange',
        'yellow',
        'green',
        'lightblue',
        'blue',
        'purple',
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