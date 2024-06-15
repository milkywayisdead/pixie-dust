import { Palette, PreviewPalette } from "./interfaces/palettes";
import { strToFrameObject } from "./utils";
import { BASIC, MARIO, GOOMBA } from "./strframes";

const marioFrame = strToFrameObject('mario', MARIO);
const goombaFrame = strToFrameObject('goomba', GOOMBA);
const basicFrame = strToFrameObject('basic', BASIC);

const basicPalette: PreviewPalette = {
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
    frame: basicFrame,
}

const marioPalette: PreviewPalette = {
    name: 'mario',
    colors: [
        '#d82900',
        '#857000',
        '#fb9838',
    ],
    frame: marioFrame,
}

const goombaPalette: PreviewPalette = {
    name: 'goomba',
    colors: [
        '#9c4a00',
        '#000000',
        '#ffcec5',
        '#ffffff',
    ],
    frame: goombaFrame,
}


export const palettes = {
    basic: basicPalette,
    mario: marioPalette,
    goomba: goombaPalette,
}