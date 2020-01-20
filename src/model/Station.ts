export interface IStation {
    name: string,
    range: number,
    blindSpot: number,
    coast: number,
    position?: [number, number]
}