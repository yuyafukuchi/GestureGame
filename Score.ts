import EasyData = require("./score/easy.json")
import NormalData = require("./score/normal.json")
import HardData = require("./score/hard.json")

export class Event {
    public start: number;
    public end:   number;
    public circleNumber: number;
    public isTouched: boolean;
    // 得点
    public point: number;

    constructor(start: number, end: number, circleNumber: number, point: number) {
        this.start = start;
        this.end = end;
        this.circleNumber = circleNumber;
        this.point = point
        this.isTouched = false
    }

    // 得点を返す
    public onTouched(): number {
        // 既にタッチされている場合
        if (this.isTouched) {
            return 0
        }
        this.isTouched = true
        return this.point
    }
}

export class Score {
    public events: Array<Event>;

    constructor(level: String) {
        this.events = this.loadScore(level);
    }

    public getEvents(time: number): Array<Event> {
        return this.events.filter(event => event.start <= time && time <= event.end);
    }

    private loadScore(level: String): Array<Event>{
        switch(level) {
            case "easy":
                var data = EasyData.data
                break;
            case "normal":
                var data = NormalData.data
                break;
            case "hard":
                var data = HardData.data
                break
            default:
                console.log("please input correct level")
                return null
        }

        var events: Array<Event>
        data.forEach(element => {
            var event = new Event(element.start, element.end, element.circleNumber, element.point);
            events.push(event)
        });

        return events
    }

}