export interface IStation {
    name: string,
    range: number,
    blindSpot: number,
    cost: number,
    position?: [number, number];
    id?: string
}