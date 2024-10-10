import {IGameState} from "./IGameState.ts";
import {IGameUI} from "./IGameUI.ts";
import {getPlaceName} from "./places.ts";

/**
 * See IGameState.
 */
export class GameState implements IGameState {
    private _connectedUI?: IGameUI
    private _playerPlaceCounter: number;
    public get playerPlaceCounter(): number {return this._playerPlaceCounter;}
    public set playerPlaceCounter(where: number) {
        this._playerPlaceCounter = where;
        if (this._connectedUI !== undefined) {
            this._connectedUI.location = getPlaceName(where);
        }
    }
    public beabnsies: number;
    public get playerSpeed(): number {
        return this.beabnsies;
    }
    public connectUI(ui: IGameUI): void {
        if (this._connectedUI === ui) {
            return;
        } else {
            if (this._connectedUI !== undefined) {
                this.disconnectUI();
            }
            this._connectedUI = ui;
            ui.location = getPlaceName(this.playerPlaceCounter);
            ui.buttonCallbacks['walk'] = (): void => {
                this.playerPlaceCounter += 1;
            };
            ui.buttonCallbacks['buyBeabnsy'] = (): void => {
                this.tryPurchaseUpgrade('beabnsies');
            };
            ui.tickCallback = (interval: number): void => {
                this.doTick(interval);
            }
        }
    }
    public disconnectUI(ui?: IGameUI): void {
        if (this._connectedUI !== undefined && (
            ui === this._connectedUI || ui === undefined
        )) {
            ui = this._connectedUI;
            ui.location = "&nbsp;"
            ui.buttonCallbacks = {};
            ui.tickCallback = undefined;
        }
    }
    private _notice(what: string): void {
        if (this._connectedUI !== undefined) {
            this._connectedUI.notice(what);
        }
    }
    public tryPurchaseUpgrade(what: string): boolean {
        if (what !== 'beabnsies') {
            this._notice("uuuhhh that dont exist yet");
            return false;
        } else if (this.playerPlaceCounter >= 10) {
            this.playerPlaceCounter -= 10;
            this.beabnsies += 1;
            this._notice("backtracked 10 blocks to find a beabnsy");
            return true;
        } else {
            this._notice("you aren't far enough to backtrack enough " +
                "to find a beabnsy");
            return false;
        }
    }
    public doTick(interval: number): void {
        this.playerPlaceCounter += this.playerSpeed*interval/1000;
    }
    public constructor() {
        this._playerPlaceCounter = 0;
        this.beabnsies = 0;
    }
}