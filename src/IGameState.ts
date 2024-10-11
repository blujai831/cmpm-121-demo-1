import {IGameUI} from "./IGameUI.ts";

/**
 * Current game state.
 */
export interface IGameState {
    /**
     * Player's current progress through the world.
     * Integer part is one plus the index of the place the player occupies
     * in the global location array defined in places.ts.
     * Fractional part is the player's current progress
     * through that specific place.
     * If the integer part is out of the array bounds,
     * the caller should synthesize an appropriate location name,
     * e.g. "Nowhere Yet,"
     * or "[Nth] Place Beyond [final defined location name]."
     */
    playerPlaceCounter: number;
    /**
     * Current speed of player's autonomous progress.
     * May or may not be settable [n]or actually stored.
     */
    get playerSpeed(): number;
    /**
     * Should allow this game state object to automatically update
     * the given UI when corresponding changes are made to the game state,
     * and should register callbacks influencing this game state object
     * to the given UI's inputs. The game state is only required
     * to support connection to at most one UI at a time.
     * It is required not to support connecting to the same UI
     * more than once at a time, and an attempt to do so
     * is required to fail silently, and not be treated as an error.
     * @param ui The UI to connect to.
     */
    connectUI(ui: IGameUI): void;
    /**
     * After this call, the game state object should cease
     * automatically updating the given UI
     * when corresponding changes are made to the game state,
     * and should remove its callbacks from the UI if they were registered.
     * If no UI is given, the game state object should disconnect
     * from all currently associated UI objects.
     * @param ui The UI to disconnect from.
     */
    disconnectUI(ui?: IGameUI): void;
    /**
     * If the player is able to purchase 1 of the given upgrade at this time,
     * this method should apply the transaction,
     * and send an affirmative notice to any UI connected.
     * Otherwise, this method should not apply the transaction,
     * and should send a negative notice to any UI connected.
     * At this time, the method is only required
     * to support specifically the parameter value "beabnsies",
     * but this expectation is due to become more general in the near future.
     * @param what Name of upgrade to purchase.
     * @returns Whether the purchase succeeded.
     */
    tryPurchaseUpgrade(what: string): boolean;
    /**
     * Gets the quantity of the given upgrade that the player owns.
     * @returns The quantity.
     */
    getUpgradeQuantity(what: string): number;
    /**
     * Should apply any autonomous game logic,
     * e.g. autonomous upgrade effects.
     * @param interval Time elapsed from previous tick to this one, in ms.
     */
    doTick(interval: number): void;
}