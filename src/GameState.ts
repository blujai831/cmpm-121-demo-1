import {getPlaceName} from "./places.ts";
import {IGameState} from "./IGameState.ts";
import {IGameUI} from "./IGameUI.ts";
import {IGameUpgrade} from "./IGameUpgrade.ts";
import {upgrades} from "./upgrades.ts";

/**
 * See IGameState.
 */
export class GameState implements IGameState {
    private _connectedUI?: IGameUI
    private _playerPlaceCounter: number;
    private _upgradeAmounts: {[upgradeName: string]: number};
    public get playerPlaceCounter(): number {return this._playerPlaceCounter;}
    public set playerPlaceCounter(where: number) {
        this._playerPlaceCounter = where;
        if (this._connectedUI !== undefined) {
            this._connectedUI.location = getPlaceName(where);
        }
    }
    public get playerSpeed(): number {
        // TODO: cache this value
        // so we don't have to recalculate it 60 times per second
        let result: number = 0;
        for (let upgradeName of Object.keys(upgrades)) {
            let qty: number | undefined = this._upgradeAmounts[upgradeName];
            if (qty !== undefined && qty > 0) {
                let upgrade: IGameUpgrade = upgrades[upgradeName];
                result = upgrade.calculateModifiedSpeed(result, qty);
            }
        }
        return result;
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
        let upgrade: IGameUpgrade = upgrades[what];
        if (upgrade.canPurchase(this)) {
            let qty: number | undefined = this._upgradeAmounts[what];
            if (qty === undefined) {
                qty = 0;
            }
            qty += 1;
            this._upgradeAmounts[what] = qty;
            upgrade.doPostPurchase(this);
            if (upgrade.purchaseAckMessage !== undefined) {
                this._notice(upgrade.purchaseAckMessage);
            }
            return true;
        } else {
            if (upgrade.purchaseNakMessage !== undefined) {
                this._notice(upgrade.purchaseNakMessage);
            }
            return false;
        }
    }
    public doTick(interval: number): void {
        this.playerPlaceCounter += this.playerSpeed*interval/1000;
    }
    public constructor() {
        this._playerPlaceCounter = 0;
        this._upgradeAmounts = {};
    }
}