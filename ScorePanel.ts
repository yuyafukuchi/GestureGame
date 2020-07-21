export class ScorePanel {
    private scoreBox: HTMLDivElement;
    private timeBox: HTMLDivElement;
    private modeBox: HTMLDivElement;

    constructor(level: string) {
        this.scoreBox = <HTMLDivElement>document.getElementById('score');
        this.timeBox = <HTMLDivElement>document.getElementById('remaining_time');
        this.modeBox = <HTMLDivElement>document.getElementById('mode');
        this.modeBox.innerText = level;
    }

    public set score(v: number) {
        this.scoreBox.innerText = v.toString();
    }

    public set time(v: number) {
        this.timeBox.innerText = v > 0 ? Math.round(v).toString() : 'End';
    }
}
