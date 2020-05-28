import * as posenet_types from '@tensorflow-models/posenet/dist/types';

export class Circle {
    public x: number;
    public y: number;
    public r: number;

    constructor(x: number, y: number, r: number) {
        this.x = x;
        this.y = y;
        this.r = r;
    }
}

// circle{
//     x: ,
//     y: ,
//     r: ,
// }
// point{
//     x: ,
//     y: ,
// }
export function isInCircle(circle: Circle, point: posenet_types.Vector2D): boolean {
    // 中心位置の距離
    // eslint-disable-next-line max-len
    let distance = Math.sqrt(Math.pow(circle.x - point.x, 2) + Math.pow(circle.y - point.y, 2));
    return distance <= circle.r;
}

// allow_lengeは許容範囲
// 現状は鼻のポイントを引数として渡す
export function isInCenterLine(center_x: number, allow_lenge: number, point: posenet_types.Vector2D): boolean {  
    return center_x - allow_lenge <= point.x && point.x <= center_x + allow_lenge
}
