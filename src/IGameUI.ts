/**
 * User interface for interacting with the game.
 * Setting properties of IGameUI should very quickly,
 * but not necessarily immediately, result in changes
 * reflected in actual UI elements.
 */
export interface IGameUI {
    /**
     * Name of the player's last-known location.
     */
    location: string;
    /**
     * Maps button names to callbacks to be called when the buttons
     * are pressed. If there is no callback mapped, the button does nothing.
     * Valid button names are implementation-dependent.
     * Constructor should not supply callbacks; GameState will provide them.
     */
    buttonCallbacks: {[buttonName: string]: () => void};
    /**
     * Per-tick callback. If none, then it is not called.
     * Implementing classes may do more every tick than just this,
     * but must at least do this. Constructor should not supply callback;
     * GameState will provide it.
     */
    tickCallback?: (interval: number) => void;
    /**
     * Should display a transient message.
     * @param what Message to display.
     */
    notice(what: string): void;
    /**
     * Should update the inventory list part of the UI.
     * @param playerSpeed Player current autonomous progress speed.
     * @param inventory Table mapping item names to possessed quantities.
     */
    showInventoryList(
        playerSpeed: number,
        inventory: {[upgradeName: string]: number}
    ): void;
    /**
     * Should show the UI to the user.
     */
    present(): void;
}