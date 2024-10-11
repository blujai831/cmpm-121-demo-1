import {IGameUI} from "./IGameUI.ts";
import {animateForever} from "./util.ts";

/**
 * See IGameUI.
 */
export class GameUI implements IGameUI {
    static readonly GAME_NAME: string = "oo they walkin";
    static readonly NOTICE_FADEOUT_TIME: number = 2;
    private _locationDiv: HTMLDivElement;
    private _buttonRow: HTMLDivElement;
    private _walkButton: HTMLButtonElement;
    private _buyBeabnsyButton: HTMLButtonElement;
    private _buyRoketButton: HTMLButtonElement;
    private _buyBigrktButton: HTMLButtonElement;
    private _noticeDiv: HTMLDivElement;
    private _noticeOpacity: number;
    private _location: string;
    /**
     * Valid buttonNames are 'walk', 'buyBeabnsy', 'buyRoket',
     * and 'buyBigrkt'.
     */
    public buttonCallbacks: {[buttonName: string]: () => void};
    public tickCallback?: (interval: number) => void;
    public get location(): string {return this._location;}
    public set location(where: string) {
        this._location = where;
        this._locationDiv.innerHTML = `the budy at ${where}`;
    }
    public notice(what: string): void {
        this._noticeDiv.innerHTML = what;
        this._noticeOpacity = 1;
    }
    constructor() {
        this._locationDiv = document.createElement('div');
        this._locationDiv.innerHTML = "&nbsp;"
        this._buttonRow = document.createElement('div');
        this._buttonRow.style.textAlign = 'center';
        let makeButton = (name: string, label: string): HTMLButtonElement => {
            let button = document.createElement('button');
            button.innerHTML = label;
            button.style.display = 'inline-block';
            button.style.fontSize = '32pt';
            button.style.margin = '0.5em';
            button.onclick = (_dontCare: MouseEvent): void => {
                let callback = this.buttonCallbacks[name];
                if (callback !== undefined) {
                    callback();
                }
            };
            return button;
        };
        this._walkButton =
            makeButton('walk', "&#x1F6B6;"); // walking emoji
        this._buyBeabnsyButton =
            makeButton('buyBeabnsy', "&#x1FAD8;"); // beans emoji
        this._buyRoketButton =
            makeButton('buyRoket', "&#x1F680;"); // rocket emoji
        this._buyBigrktButton =
            makeButton('buyBigrkt', "&#x1F6F8;"); // ufo emoji
        this._noticeDiv = document.createElement('div');
        this._noticeDiv.style.color = "#ff7f00";
        this._noticeDiv.style.opacity = '0';
        this._noticeDiv.style.fontWeight = 'bold';
        this._noticeDiv.innerHTML = "nothin happen yet";
        this._noticeOpacity = 0;
        this._location = "&nbsp;"; // To be filled in by connected GameState
        this.buttonCallbacks = {}; // ^
        this.tickCallback = undefined; // ^
    }
    present(): void {
        document.title = GameUI.GAME_NAME;
        const app: HTMLDivElement = document.querySelector("#app")!;
        const header = document.createElement('h1');
        header.innerHTML = GameUI.GAME_NAME;
        app.append(header);
        app.append(this._noticeDiv);
        app.append(this._buttonRow);
        this._buttonRow.append(this._walkButton);
        this._buttonRow.append(this._buyBeabnsyButton);
        this._buttonRow.append(this._buyRoketButton);
        this._buttonRow.append(this._buyBigrktButton);
        app.append(this._locationDiv);
        animateForever((interval: number) => {
            this._noticeOpacity = Math.max(0, Math.min(1,
                this._noticeOpacity -
                interval/(1000*GameUI.NOTICE_FADEOUT_TIME)
            ));
            this._noticeDiv.style.opacity = String(this._noticeOpacity);
            if (this.tickCallback !== undefined) {
                this.tickCallback(interval);
            }
        });
    }
}