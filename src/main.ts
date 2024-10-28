import "./style.css";

// Constants

const GAME_TITLE = "Feed the Fire";
const GAME_PREMISE = `
    You have discovered a new way to generate energy
    by harvesting ecological damage done by global warming.
    As a side effect, this reverses the damage.
    Your miraculous discovery has made you the revered hero
    of reasonable people and climate change denialists alike,
    but you don't care about any of that. For you, the real question
    is exactly what it's always been: how much more cheap junk
    can you build and sell via this method?
`;

const MSEC_PER_SEC = 1000;
const BASIC_ACTION_NAME = 'Fire';
const BASIC_ACTION_DESCRIPTION = "&#x1F525; Makes things hotter.";
const ITEM_COST_GROWTH_BASE = 1.15;
const DECIMAL_PRECISION = 1;

const availableItems = [
    {name: 'Cellphone', cost: 10, rate: 0.1, description: "&#x1F4F1; " +
        "Hello? Hello? Can you hear me?"},
    {name: 'Computer', cost: 100, rate: 2, description: "&#x1F4BB; " +
        "No one knows what this is for other than playing video games."},
    {name: 'Building', cost: 1000, rate: 50, description: "&#x1F3E2; " +
        "Invented to contain homo sapiens infestations."},
    {name: 'Rocket', cost: 10000, rate: 1500, description: "&#x1F680; " +
        "Invented to cause homo sapiens infestations."},
    {name: 'UFO', cost: 100000, rate: 52500, description: "&#x1F6F8; " +
        "Invented to... hm... No, wait, this hasn't been invented yet."}
] as const;

// Interfaces and utility functions

function arrayToRecord<K extends string | symbol | number, V, T>(
    ts: readonly T[], k: (t: T) => K, v: (t: T) => V
): Record<K, V> {
    return Object.fromEntries(ts.map(t => [k(t), v(t)])) as Record<K, V>;
}

interface Item {
    name: ItemName,
    cost: number,
    rate: number,
    description: string
}

type ItemName = typeof availableItems[number]['name'];

// Game logic

let gameState = {
    globalWarmingIndex: 0,
    globalWarmingRate: 0,
    itemQuantities: arrayToRecord(availableItems, item => item.name, _ => 0)
};

function doBasicAction(state: typeof gameState): void {
    state.globalWarmingIndex += 1;
}

function getItemRealCost(item: Item, alreadyHave: number): number {
    return item.cost*(ITEM_COST_GROWTH_BASE**alreadyHave);
}

function canAffordItem(state: typeof gameState, item: Item): boolean {
    return state.globalWarmingIndex >=
        getItemRealCost(item, state.itemQuantities[item.name]);
}

function tryPurchaseItem(state: typeof gameState, item: Item): boolean {
    let realCost = getItemRealCost(item, state.itemQuantities[item.name]);
    if (state.globalWarmingIndex >= realCost) {
        state.globalWarmingIndex -= realCost;
        state.itemQuantities[item.name] += 1;
        state.globalWarmingRate += item.rate;
        return true;
    } else return false;
}

function tickGameState(state: typeof gameState, interval: number): void {
    state.globalWarmingIndex += state.globalWarmingRate*interval/MSEC_PER_SEC;
}

// UI

document.title = GAME_TITLE;
const app: HTMLDivElement = document.querySelector('#app')!;

function makeElement<Tag extends keyof HTMLElementTagNameMap>(
    what: Tag, how?: (elem: HTMLElementTagNameMap[Tag]) => void
): HTMLElementTagNameMap[Tag] {
    const elem = document.createElement(what);
    how?.call(elem, elem);
    app.appendChild(elem);
    return elem;
}

makeElement('h1', elem => elem.innerHTML = GAME_TITLE);
const globalWarmingIndexDisplay =
    makeElement('div', elem => elem.id = 'global-warming-index');
makeElement('button', elem => {
    elem.className = 'item-button';
    elem.innerHTML =
        `<strong>${BASIC_ACTION_NAME}</strong><br />` +
        BASIC_ACTION_DESCRIPTION;
    elem.onclick = _ => doBasicAction(gameState);
});
const itemButtons = arrayToRecord(availableItems, item => item.name, item =>
    makeElement('button', elem => {
        elem.disabled = true;
        elem.className = 'item-button not-unlocked';
        elem.onclick = _ => tryPurchaseItem(gameState, item);
    })
);
const statusDisplay = makeElement('div');

function updateGlobalWarmingIndexDisplay(state: typeof gameState): void {
    if (state.globalWarmingIndex > 0) {
        globalWarmingIndexDisplay.innerHTML =
            `<p>${state.globalWarmingIndex.toFixed(DECIMAL_PRECISION)}
                EcD units available</p>`;
    } else {
        globalWarmingIndexDisplay.innerHTML = `<p>${GAME_PREMISE}</p>`;
    }
}

function updateItemButton(state: typeof gameState, item: Item): void {
    let qty = state.itemQuantities[item.name];
    let button = itemButtons[item.name];
    button.disabled = !canAffordItem(state, item);
    if (!button.disabled) {
        button.className = 'item-button unlocked';
    }
    button.innerHTML = `
        <strong>${item.name}</strong><br />
        Cost: ${getItemRealCost(item, qty).toFixed(DECIMAL_PRECISION)}
            EcD units<br />
        ${item.description}
    `;
}

function updateStatusDisplay(state: typeof gameState): void {
    statusDisplay.innerHTML = "";
    if (state.globalWarmingRate > 0) {
        statusDisplay.innerHTML += `
            <p>Passively generating
            ${state.globalWarmingRate.toFixed(DECIMAL_PRECISION)}
            units of ecological damage per second.</p>
        `;
    }
}

function appendInventoryListToStatusDisplay(state: typeof gameState): void {
    let listInnerHTML = "";
    for (let item of availableItems) {
        let qty = state.itemQuantities[item.name];
        if (qty > 0) {
            listInnerHTML +=
                `<li>${qty.toFixed(0)}x ${item.name}</li>`;
        }
    }
    if (listInnerHTML !== "") {
        statusDisplay.innerHTML +=
            `<p>Junk built:</p><ul>${listInnerHTML}</ul>`
    }
}

function updateUI(state: typeof gameState): void {
    updateGlobalWarmingIndexDisplay(state);
    for (let item of availableItems) updateItemButton(state, item);
    updateStatusDisplay(state);
    appendInventoryListToStatusDisplay(state);
}

function animateForever(
    what: (interval: number) => void,
    lastTimeStamp: DOMHighResTimeStamp = performance.now(),
    thisTimeStamp: DOMHighResTimeStamp = performance.now()
): void {
    what(thisTimeStamp - lastTimeStamp);
    requestAnimationFrame(nextTimeStamp =>
        animateForever(what, thisTimeStamp, nextTimeStamp));
}

animateForever(interval => {
    tickGameState(gameState, interval);
    updateUI(gameState);
});