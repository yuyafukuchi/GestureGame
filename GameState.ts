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

        this.targets.forEach(target => {
            target.render(ctx, null, gameTime);
        });
    }

    public addTarget(circle: Circle, durations: Array<Duration>) {
        this.targets.push(new Target(circle, durations))
    }
}
