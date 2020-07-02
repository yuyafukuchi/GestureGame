import { Vector2D } from '@tensorflow-models/posenet/dist/types';
import { Circle } from './util'
import { Event } from './Score'


export class Target {
    public circle: Circle
    private durations: Array<Event>

    constructor(circle: Circle, durations: Array<Event>) {
        this.circle = circle
        this.durations = durations;
    }

    public render(ctx: CanvasRenderingContext2D, points: Array<Vector2D>, timestamp: number): void {
        ctx.beginPath();
        ctx.arc(this.circle.x, this.circle.y, this.circle.r, 0, 2 * Math.PI);
        ctx.fillStyle = 'transparent';
        ctx.strokeStyle = 'white';
        const duration = this.isInDurations(timestamp);
        if (duration) {
            ctx.strokeStyle = 'red';
        }

        if (this.circle.IsAnyInCircle(points)) {
            ctx.fillStyle = 'red';
        }

        ctx.stroke();
        ctx.fill();
    }

    public isInDurations(timestamp: number) {
        // TODO: More efficient algorithm.

        for (const duration of this.durations) {
            if (duration.isInDuration(timestamp)) {

                return true;
            }
        }
        return false;
    }
}
