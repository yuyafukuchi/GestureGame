import { Vector2D } from '@tensorflow-models/posenet/dist/types';
import { Circle } from './util'


export class Target {
    public circle: Circle
    private durations: Array<Duration>

    constructor(circle: Circle, durations: Array<Duration>) {
        this.circle = circle
        this.durations = durations;
    }

    public render(ctx: CanvasRenderingContext2D, points: Array<Vector2D>, timestamp: number): void {
        ctx.beginPath();
        ctx.arc(this.circle.x, this.circle.y, this.circle.r, 0, 2 * Math.PI);
        ctx.fillStyle = 'transparent';
        ctx.strokeStyle = 'white';
        if (this.isInDurations(timestamp)) {
            ctx.strokeStyle = 'red';
        }

        if(this.circle.IsAnyInCircle(points)){
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

export class Duration {
    public start: number
    public duration: number

    constructor(start: number, duration: number) {
        this.start = start;
        this.duration = duration;
    }

    public isInDuration(timestamp: number) {
        return this.start <= timestamp && timestamp <= this.start + this.duration;
    }
}
