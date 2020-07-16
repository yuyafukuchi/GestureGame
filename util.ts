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

export function jumpToResultPage(point: number) {  
    var myurl="result.html"+"?"+"parm1="+point;  //pass scores and current lv
    window.location.assign(encodeURI(myurl));  
}
