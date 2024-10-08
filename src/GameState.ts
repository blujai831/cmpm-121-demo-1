export type GameState = {
    /**
     * If this value is false, extra side effects from setters will not run.
     */
    initialized: boolean,
    /**
     * This counter keeps track of the 1-based index of the location
     * to which the player has walked. It may be a noninteger,
     * in which case the integer coercion is used as the index,
     * and the fractional part represents how close the player is
     * to the next location.
     */
    playerPlaceCounter: number,
    /**
     * The player advances autonomously by this many locations per second.
     * The player may take certain in-game actions to upgrade this value.
     * It is a computed property: it is not actually stored,
     * and cannot be directly set.
     */
    playerSpeed: number,
    /**
     * Number of beabnsies purchased. Each increases playerSpeed by 1.
     */
    beabnsies: number,
    /**
     * Current opacity of last notice shown, or 0 if no notice yet shown.
     */
    noticeOpacity: number
}