import "./style.css";
import { places } from "./places.ts";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "oo they walkin";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const buttons = document.createElement("div");
buttons.style.textAlign = 'center';
app.append(buttons);

function makeButton(label: string) {
    let button = document.createElement("button");
    button.innerHTML = label;
    button.style.display = 'inline-block';
    button.style.fontSize = '32pt';
    button.style.margin = '0.5em';
    buttons.append(button);
    return button;
}

const walkButton = makeButton("&#x1F6B6;");
const beabnsiesButton = makeButton("&#x1FAD8;");

const placeLabel = document.createElement("div");
app.append(placeLabel);

const inventoryLabel = document.createElement("div");
app.append(inventoryLabel);

/**
 * This object holds the game state. Though this program is simple enough
 * that we could be using bare variables, and do for other things,
 * here we are using an object because we need setters.
 */
let gameState: {
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
     */
    playerSpeed: number
} = (function () {
    let playerPlaceCounter: number = 0;
    let playerSpeed: number = 0;
    return {
        initialized: false,
        get playerPlaceCounter() {return playerPlaceCounter;},
        set playerPlaceCounter(value) {
            playerPlaceCounter = value;
            if (this.initialized) {
                updateGameUI();
            }
        },
        get playerSpeed() {return playerSpeed;},
        set playerSpeed(value) {
            playerSpeed = value;
            if (this.initialized) {
                updateGameUI();
            }
        }
    };
})();

/**
 * Sets game variables to initial values.
 */
function initializeGame(): void {
    gameState.initialized = false;
    gameState.playerPlaceCounter = 0;
    gameState.playerSpeed = 0;
    gameState.initialized = true;
    updateGameUI();
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
 * Updates the state of all game UI elements.
 */
function updateGameUI(): void {
    updatePlaceLabel();
}

/**
 * Looks up the name of a place by its index.
 * If an index is given which is not strictly valid,
 * attempts to construct a reasonable name.
 * @param i The index of the desired location. Defaults to placeCounter.
 * @returns The name of the desired location.
 */
function getPlaceName(i: number = gameState.playerPlaceCounter): string {
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
 * Sets placeLabel's content to a sentence
 * describing the player's current location.
 */
function updatePlaceLabel(): void {
    placeLabel.innerHTML = `the budy at ${getPlaceName()}`;
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
    // Advance player to next location when walkButton is clicked.
    walkButton.onclick = function (): void {
        gameState.playerPlaceCounter += 1;
        updateGameUI();
    }
    /* Additionally, advance player forward one per frame,
    by such an amount as to ensure they advance to the next location
    autonomously at a rate of playerSpeed locations per second. */
    let lastFrameTimeStamp: DOMHighResTimeStamp | null = null;
    animateForever(function (ts: DOMHighResTimeStamp): void {
        if (lastFrameTimeStamp !== null) {
            gameState.playerPlaceCounter +=
                gameState.playerSpeed*(ts - lastFrameTimeStamp)/1000;
        }
        lastFrameTimeStamp = ts;
        updateGameUI();
    });
}

startGame();