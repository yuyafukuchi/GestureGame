import { Vector2D } from '@tensorflow-models/posenet/dist/types';
import { Circle } from './util'
import { Event } from './Score'


export class Target {
    public circle: Circle
    private durations: Array<Event>
    private isTouched: Boolean = false

    constructor(circle: Circle, durations: Array<Event>) {
        this.circle = circle
        this.durations = durations;
    }

    public update(ctx: CanvasRenderingContext2D, points: Array<Vector2D>, timestamp: number): number {
        ctx.beginPath();
        ctx.arc(this.circle.x, this.circle.y, this.circle.r, 0, 2 * Math.PI);
        ctx.fillStyle = 'transparent';
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 25;
        let incrementScore = 0;
        const duration = this.getEvent(timestamp);
        if (duration != null) {
            if (this.isTouched) {
                ctx.strokeStyle = 'white';
            } else {
                ctx.strokeStyle = 'red';
            }
        }

        if (this.circle.IsAnyInCircle(points)) {
            ctx.fillStyle = 'red';
            if (duration != null) {
                incrementScore = duration.onTouched();
                this.isTouched = true;
            }
        }

        ctx.stroke();
        ctx.lineWidth = 10;
        ctx.strokeStyle = 'black';

        ctx.stroke();
        ctx.fill();
        return incrementScore;
    }

    public getEvent(timestamp: number): Event | null {
        // TODO: More efficient algorithm.

        for (const duration of this.durations) {
            if (duration.isInDuration(timestamp)) {

                return duration;
            }
        }
        return null
    }
}
