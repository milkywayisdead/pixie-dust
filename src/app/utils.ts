export const IDX_ATTR: string = 'pixidx';

export function extractIndex(target: HTMLElement): number {
    return Number(target.getAttribute(IDX_ATTR));
} 