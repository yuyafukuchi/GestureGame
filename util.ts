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


export function setRemainingTime(countdown: number) {
    if (countdown>=0) {
        document.getElementById('remaining_time').innerHTML="Time: "+countdown+"s";
        countdown--;  
        setTimeout(function() {setRemainingTime(countdown)} ,1000);
    }
    else
        // FIXME: Scoreの値からpoint, levelを引数として与える
        jumpToResultPage(0, "1");
}

function jumpToResultPage(point: number, level: String) {  
    var myurl="Result.html"+"?"+"parm1="+point+"&parm2="+level;  //pass scores and current lv
    window.location.assign(encodeURI(myurl));  
}

export function showScore(score: number){
    var p = document.getElementById('score_box');
    p.innerHTML = score.toString();
}