import {formatOrdinal} from "./util.ts";

/**
 * List of locations to which the player can walk.
 * Any location beyond the last one in this list will be represented
 * as "Nth Place Beyond" the last one in the list.
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

/**
 * Fetches or generates a name for the location whose index is i - 1.
 * If that value is a noninteger or is out of bounds,
 * an appropriate name is generated rather than fetched.
 * @param i Index + 1. May be noninteger. May be out of bounds.
 * @returns The name for the location.
 */
export function getPlaceName(i: number): string {
    if (i < 0 || isNaN(i) || !isFinite(i)) {
        return "Somewhere Strange Because the Game Malfunctioned " +
            "and Ejected You Into the Void";
    } else if (i < 1) {
        return "Home";
    } else if (i%1 != 0) {
        return `${Math.floor(100*(i%1))}% of the way ` +
            `through ${getPlaceName(Math.floor(i))}`;
    } else if (i > places.length) {
        return `${formatOrdinal(i - places.length)} Place ` +
            `Beyond ${places[places.length - 1]}`;
    } else {
        return places[i - 1];
    }
}