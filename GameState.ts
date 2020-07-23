import { Vector2D } from '@tensorflow-models/posenet/dist/types';
import { Circle } from './util'
import { Target } from "./Target";
import { Event } from './Score';
import { ScorePanel } from './ScorePanel';

export class GameState {
    private readonly targets: Array<Target>;
    private startTime: number;
    public score: number;
    private scorePanel: ScorePanel;
    private gameTime: number;

    constructor(scorePanel: ScorePanel, gameTime: number) {
        this.targets = new Array<Target>();
        this.score = 0;
        this.scorePanel = scorePanel;
        this.gameTime = gameTime;
        this.startTime = NaN;
    }

    public start(): void {
        this.startTime = performance.now();
    }

    public update(points: Vector2D[], ctx: CanvasRenderingContext2D) {
        const currentTime = performance.now() - this.startTime;

        const hands: Vector2D[] = []
        if (points[7] && points[9]) {
            hands.push(this.getHandPosition(points[7], points[9]));
        }

        if (points[8] && points[10]) {
            hands.push(this.getHandPosition(points[8], points[10]));
        }
        this.targets.forEach(target => {
            this.score += target.update(ctx, hands, currentTime);
        });
        this.scorePanel.score = this.score;
        this.scorePanel.time = (this.gameTime - currentTime) / 1000;
        console.log(this.score);
    }

    public addTarget(circle: Circle, durations: Array<Event>) {
        this.targets.push(new Target(circle, durations))
    }

    public getRemainingTime(): number {
        const diffTime = performance.now() - this.startTime;
        const remainTime = this.gameTime - diffTime
        return remainTime
    }

    private getHandPosition(elbow: Vector2D, wrist: Vector2D): Vector2D {
        const ratio = 1.618;

        return {
            x: wrist.x + (wrist.x - elbow.x) / ratio / 2,
            y: wrist.y + (wrist.y - elbow.y) / ratio / 2
        }
    }
}
