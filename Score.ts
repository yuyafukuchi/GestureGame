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

    constructor(events: Array<Event>) {
        this.events = events;
    }

    public getEvents(time: number): Array<Event> {
        return this.events.filter(event => event.start <= time && time <= event.end);
    }

}