import { Vector2D } from '@tensorflow-models/posenet/dist/types';
import { Circle } from './util'
import { Target } from "./Target";

export class GameState {
    private readonly targets: Array<Target>;

    constructor() {
        this.targets = new Array<Target>();
    }

    public update(points: Vector2D[], ctx: CanvasRenderingContext2D) {
        this.targets.forEach(target => {
            target.render(ctx, null);
        });
    }

    public addTarget(circle: Circle, duration: number) {
        this.targets.push(new Target(circle, duration))
    }
}

