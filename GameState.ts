import { Vector2D } from '@tensorflow-models/posenet/dist/types';
import { Circle } from './util'
import { Target, Duration } from "./Target";

export class GameState {
    private readonly targets: Array<Target>;
    private startTime: number;

    constructor() {
        this.targets = new Array<Target>();
    }

    public start(): void {
        this.startTime = performance.now();
    }
    public update(points: Vector2D[], ctx: CanvasRenderingContext2D) {
        const gameTime = performance.now() - this.startTime;

        const hands: Vector2D[] = []
        if (points[7] && points[9]) {
            hands.push(this.getHandPosition(points[7], points[9]));
        }

        if (points[8] && points[10]) {
            hands.push(this.getHandPosition(points[8], points[10]));
        }
        this.targets.forEach(target => {
            target.render(ctx, hands, gameTime);
        });
    }

    public addTarget(circle: Circle, durations: Array<Duration>) {
        this.targets.push(new Target(circle, durations))
    }

    private getHandPosition(elbow: Vector2D, wrist: Vector2D): Vector2D {
        const ratio = 1.618;

        return {
            x: wrist.x + (wrist.x - elbow.x) / ratio / 2,
            y: wrist.y + (wrist.y - elbow.y) / ratio / 2
        }
    }
}
