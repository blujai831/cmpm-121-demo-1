/**
 * List of locations to which the player can walk.
 * Any location beyond the last one in this list will be represented
 * as "Nth Place Beyond" the last one in the list.
 * When indexed with getPlaceName, this array is treated as 1-based,
 * i.e. its first element has index 1, not index 0.
 * (When indexed by any other means, it is 0-based;
 * it is, after all, just an array.)
 */
export const places: string[] = [
    "Corn",
    "More Corn",
    "Additional Corn",
    "Further Corn",
    "Probably Not Corn",
    "Pretty Far from Corn",
    "Land West of Corn",
    "Land West of Corn and Around the Corn-er",
    "Land of Scorn",
    "Scorn II: the Scornening",
    "Galapagos",
    "Kentucky",
    "Kentucky and a Half",
    "Three Kentuckies",
    "An Eggcelent Place to Sell Some Lizard Eggs if You Have Any Lizard Eggs",
    "Place You Go if You Didn't Have Any Lizard Eggs",
    "Lizard City AKA Lity",
    "Littier than Lity",
    "Littiest",
    "Giant Shoe",
    "Astral Plane",
    "Mars"
];