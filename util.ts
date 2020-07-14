import { Vector2D } from '@tensorflow-models/posenet/dist/types';

export class Circle {
    public x: number;
    public y: number;
    public r: number;

    constructor(x: number, y: number, r: number) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    public IsAnyInCircle(points: Array<Vector2D>): boolean {
        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            if (Math.sqrt(Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2)) < this.r) {
                return true;
            }
        }

        return false;
    }
}

export function addCircle(ctx: CanvasRenderingContext2D, circle: Circle) {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
  }

export function showRemainingTime(countdown: number) {
    var remainingTime = Math.floor(countdown / 1000); // 切り捨て
    document.getElementById('remaining_time').innerHTML= remainingTime.toString();
}

export function jumpToResultPage(point: number, level: String) {  
    var myurl="result.html"+"?"+"parm1="+point+"&parm2="+level;  //pass scores and current lv
    window.location.assign(encodeURI(myurl));  
}

export function showScore(score: number){
    var p = document.getElementById('score_box');
    p.innerHTML = score.toString();
}
