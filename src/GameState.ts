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
    private _playerSpeed: number;
    private _playerSpeedNeedsRecalc: boolean;
    private _notice(what: string): void {
        if (this._connectedUI !== undefined) {
            this._connectedUI.notice(what);
        }
    }
    private _showInventoryList(): void {
        if (this._connectedUI !== undefined) {
            this._connectedUI.showInventoryList(
                this._playerSpeed,
                this._upgradeAmounts
            );
        }
    }
    public get playerPlaceCounter(): number {return this._playerPlaceCounter;}
    public set playerPlaceCounter(where: number) {
        this._playerPlaceCounter = where;
        if (this._connectedUI !== undefined) {
            this._connectedUI.location = getPlaceName(where);
        }
    }
    public get playerSpeed(): number {
        if (this._playerSpeedNeedsRecalc) {
            let result: number = 0;
            for (let upgradeName of Object.keys(upgrades)) {
                let qty: number | undefined =
                    this._upgradeAmounts[upgradeName];
                if (qty !== undefined && qty > 0) {
                    let upgrade: IGameUpgrade = upgrades[upgradeName];
                    result = upgrade.calculateModifiedSpeed(result, qty);
                }
            }
            this._playerSpeed = result;
            this._playerSpeedNeedsRecalc = false;
            this._showInventoryList();
        }
        return this._playerSpeed;
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
                this._notice("oo they walkin");
            };
            ui.buttonCallbacks['buyBeabnsy'] = (): void => {
                this.tryPurchaseUpgrade('beabnsies');
            };
            ui.buttonCallbacks['buyRoket'] = (): void => {
                this.tryPurchaseUpgrade('roket');
            };
            ui.buttonCallbacks['buyBigrkt'] = (): void => {
                this.tryPurchaseUpgrade('bigrkt');
            };
            ui.tickCallback = (interval: number): void => {
                this.doTick(interval);
            };
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
            this._playerSpeedNeedsRecalc = true;
            this._showInventoryList();
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
        this._playerSpeed = 0;
        this._playerSpeedNeedsRecalc = false;
    }
}