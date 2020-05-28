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

export function addCircle(ctx: CanvasRenderingContext2D, circle: utils.Circle) {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
  }