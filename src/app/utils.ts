export const IDX_ATTR: string = 'pixidx';

export function extractIndex(target: HTMLElement): number {
    return Number(target.getAttribute(IDX_ATTR));
}

export function setColor(target: HTMLElement, color: string): void {
    target.style.backgroundColor = color || '#fff';

    // @ts-ignore
    target.attributes['style'].textContent = color ? `background-color:${color}` : '';
}

export function getColor(target: HTMLElement): string {
    // @ts-ignore
    const style = target.attributes['style'];
    if(style){
        return style.textContent.split(':')[1];
    }
    return '';
}