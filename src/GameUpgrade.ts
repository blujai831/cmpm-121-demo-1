import {Properties} from "./util.ts";
import {IGameState} from "./IGameState.ts";
import {IGameUpgrade} from "./IGameUpgrade.ts";

/**
 * See IGameUpgrade.
 */
export class GameUpgrade implements IGameUpgrade {
    /**
     * See IGameUpgrade.effectOrder.
     */
    public effectOrder!: number;
    /**
     * Callback to be invoked to implement calculateModifiedSpeed.
     */
    public speedFormulaEffect?: ((speed: number, qty: number) => number);
    /**
     * Callback to be invoked to implement canPurchase.
     */
    public purchaseCondition?: ((gameState: IGameState) => boolean);
    /**
     * See IGameUpgrade.purchaseAckMessage.
     */
    public purchaseAckMessage?: string;
    /**
     * See IGameUpgrade.purchaseNakMessage.
     */
    public purchaseNakMessage?: string;
    /**
     * Callback to be invoked to implement doPostPurchase.
     */
    public postPurchaseEffect?: ((gameState: IGameState) => void);
    /**
     * Callback to be invoked to implement doTick.
     */
    public tickEffect?: ((
        gameState: IGameState,
        interval: number,
        qty: number
    ) => void);
    /**
     * Defers to speedFormulaEffect callback.
     * If no such callback, then this upgrade has no effect
     * on the player's autonomous progress speed.
     * See IGameUpgrade.calculateModifiedSpeed.
     */
    public calculateModifiedSpeed(speed: number, qty: number): number {
        if (this.speedFormulaEffect !== undefined) {
            return this.speedFormulaEffect(speed, qty);
        } else {
            return speed;
        }
    }
    /**
     * Defers to purchaseCondition callback.
     * If no such callback, then this upgrade has no stipulated cost,
     * nor any other purchase preconditions.
     * See IGameUpgrade.canPurchase.
     */
    public canPurchase(gameState: IGameState): boolean {
        return this.purchaseCondition === undefined ||
            this.purchaseCondition(gameState);
    }
    /**
     * Defers to postPurchaseEffect callback.
     * If no such callback, then this upgrade has no effective cost,
     * nor any other once-per-purchase influence on game state.
     * See IGameUpgrade.doPostPurchase.
     */
    public doPostPurchase(gameState: IGameState): void {
        if (this.postPurchaseEffect !== undefined) {
            this.postPurchaseEffect(gameState);
        }
    }
    /**
     * Defers to tickEffect callback.
     * If no such callback, then this upgrade has no continuous effect.
     * See IGameUpgrade.doTick.
     */
    public doTick(
        gameState: IGameState,
        interval: number,
        qty: number
    ): void {
        if (this.tickEffect !== undefined) {
            this.tickEffect(gameState, interval, qty);
        }
    }
    /**
     * Copies properties from the given object, which typically
     * should be supplied as an object literal representing keyword arguments.
     * Therefore, in effect, the constructor's keyword arguments specify
     * the instance's properties, mimicking C/++'s designated initializers.
     * @param properties Keyword arguments / property donor object.
     */
    public constructor(properties: Properties<GameUpgrade>) {
        Object.assign(this, properties);
    }
}