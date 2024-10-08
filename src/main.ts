import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Not my amazing game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const theButton = document.createElement("button");
theButton.innerHTML = "&#x1F6B6;";
theButton.style.fontSize = '32pt';
app.append(theButton);

const theNotice = document.createElement("div");
app.append(theNotice);

/**
 * This counter keeps track of the 1-based index of the location
 * to which the player has walked. It may be a noninteger,
 * in which case the integer coercion is used as the index,
 * and the fractional part represents how close the player is
 * to the next location.
 */
let playerPlaceCounter: number;
/**
 * The player advances autonomously by this many locations per second.
 * The player may take certain in-game actions to upgrade this value.
 */
let playerSpeed: number;
/**
 * List of locations to which the player can walk.
 * Any location beyond the last one in this list will be represented
 * as "Nth Place Beyond" the last one in the list.
 * When indexed with getPlaceName, this array is treated as 1-based,
 * i.e. its first element has index 1, not index 0.
 * (When indexed by any other means, it is 0-based;
 * it is, after all, just an array.)
 */
const places: string[] = [
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
 * Sets game variables to initial values.
 */
function initializeGame(): void {
    playerPlaceCounter = 0;
    playerSpeed = 0;
    updateTheNotice();
}

/**
 * Does first-time setup and calls initializeGame.
 */
function startGame(): void {
    initializeApp();
    initializeGame();
}

/**
 * Clarity alias for initializeGame.
 */
const resetGame = initializeGame;

/**
 * Looks up the name of a place by its index.
 * If an index is given which is not strictly valid,
 * attempts to construct a reasonable name.
 * @param i The index of the desired location. Defaults to placeCounter.
 * @returns The name of the desired location.
 */
function getPlaceName(i: number = playerPlaceCounter): string {
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

/**
 * Applies an appropriate ordinal suffix to the given number
 * (i.e. "-st", "-nd", "-rd", or "-th").
 */
function formatOrdinal(n: number): string {
    let result = `${n}`;
    /* Check if number's second-to-last digit is 1.
    (OK to possibly index out of bounds
    because undefined will not test equal to '1'.) */
    switch (result[result.length - 2]) {
        // A number whose second-to-last digit is 1 will always end in -th.
        case '1': result += "th"; break;
        // Other numbers have more varied suffices.
        default: switch (result[result.length - 1]) {
            case '1': result += "st"; break;
            case '2': result += "nd"; break;
            case '3': result += "rd"; break;
            default: result += "th"; break;
        } break;
    }
    return result;
}

/**
 * Sets theNotice's content to a sentence
 * describing the player's current location.
 */
function updateTheNotice(): void {
    theNotice.innerHTML = `You are at ${getPlaceName()}.`;
}

/**
 * Recursively calls requestAnimationFrame on an indefinite basis.
 */
function animateForever(what: (ts: DOMHighResTimeStamp) => void): void {
    requestAnimationFrame(function (ts: DOMHighResTimeStamp): void {
        what(ts);
        animateForever(what);
    });
}

/**
 * Sets up game-related callbacks.
 */
function initializeApp(): void {
    // Advance player to next location when theButton is clicked.
    theButton.onclick = function (): void {
        playerPlaceCounter += 1;
        updateTheNotice();
    }
    /* Additionally, advance player forward one per frame,
    by such an amount as to ensure they advance to the next location autonomously
    at a rate of playerSpeed locations per second. */
    let lastFrameTimeStamp: DOMHighResTimeStamp | null = null;
    animateForever(function (ts: DOMHighResTimeStamp): void {
        if (lastFrameTimeStamp !== null) {
            playerPlaceCounter += playerSpeed*(ts - lastFrameTimeStamp)/1000;
        }
        lastFrameTimeStamp = ts;
        updateTheNotice();
    });
}

startGame();