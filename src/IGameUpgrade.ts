import {IGameState} from "./IGameState.ts";

/**
 * Purchasable player ability upgrade, e.g. to allow more rapid progress.
 */
export interface IGameUpgrade {
    /**
     * Upgrades with lower effectOrder should be applied earlier
     * within the same game tick.
     */
    effectOrder: number;
    /**
     * Calculates the result of this upgrade contributing its effect
     * to the player's autonomous progress speed.
     * The player's final autonomous progress speed
     * is calculated by starting at 0
     * and then accumulating every possessed upgrade's contribution
     * in order of effectOrder.
     * @param speed Player speed prior to modification by this upgrade.
     * @param qty Quantity of this upgrade the player possesses.
     * @returns The new player speed.
     */
    calculateModifiedSpeed(speed: number, qty: number): number;
    /**
     * True iff the player should currently be allowed to increase
     * their possessed quantity of this upgrade by 1 at will.
     * @param gameState Game state object to check condition against.
     * @returns Whether the player can afford the upgrade.
     */
    canPurchase(gameState: IGameState): boolean;
    /**
     * If this property exists, it should be used as the message for a notice
     * to be displayed when the player successfully purchases this upgrade.
     */
    purchaseAckMessage?: (gameState: IGameState) => string;
    /**
     * If this property exists, it should be used as the message for a notice
     * to be displayed when the player tries and fails to purchase
     * this upgrade.
     */
    purchaseNakMessage?: (gameState: IGameState) => string;
    /**
     * Does any modifications to the game state consistent with purchasing
     * this upgrade, other than increasing the player's possessed quantity
     * of the upgrade by 1, which the caller should take care of.
     * E.g., your implementation of this method should typically deduct
     * the upgrade's cost from the player's relevant resource, and,
     * depending on the desired mechanics of your upgrade,
     * might also do any arbitrary thing you want to happen as a unique effect
     * that the upgrade activates only when first applied.
     * @param gameState Game state object to modify.
     */
    doPostPurchase(gameState: IGameState): void;
    /**
     * Does any modifications to the game state which the upgrade should apply
     * continuously over the course of the game, other than contributing
     * to the player's autonomous progress speed.
     * @param gameState Game state object to modify.
     * @param interval Time elapsed from previous tick to this one, in ms.
     * @param qty Quantity of this upgrade the player possesses.
     */
    doTick(gameState: IGameState, interval: number, qty: number): void;
}