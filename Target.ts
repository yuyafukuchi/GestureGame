import { Vector2D } from '@tensorflow-models/posenet/dist/types';
import { Circle } from './util'

export class Target {
    public circle: Circle

    constructor(circle: Circle, expireTime: number) {
        this.circle = circle
    }

    public render(ctx: CanvasRenderingContext2D, points: Array<Vector2D>): void {
        ctx.beginPath();
        ctx.arc(this.circle.x, this.circle.y, this.circle.r, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
    }
}
