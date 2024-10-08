import { GameState } from "./GameState.ts";

export type Upgrade = {
    effectPriority: number,
    speedFormulaEffect: ((playerSpeed: number, qty: number) => number) | null,
    purchasePrecondition: ((gameState: GameState) => boolean) | null,
    purchasePostcondition: ((gameState: GameState) => void) | null,
    purchaseAckMessage: string | null,
    purchaseNakMessage: string | null,
    tickEffect:
        ((gameState: GameState, interval: number, qty: number) => void) |
        null,
    oneTimeEffect: ((gameState: GameState, qty: number) => void) | null
};

export const upgrades: {[name: string]: Upgrade} = {
    "beabnsy": {
        effectPriority: 1,
        speedFormulaEffect: (n, q) => n + 0.1*q,
        purchasePrecondition: state => state.playerPlaceCounter >= 10,
        purchasePostcondition: state => state.playerPlaceCounter -= 10,
        purchaseAckMessage: "backtracked 10 blocks to find a beabnsy",
        purchaseNakMessage: "you aren't far enough to backtrack enough " +
            "to find a beabnsy",
        tickEffect: null,
        oneTimeEffect: null
    },
    "roket": {
        effectPriority: 1,
        speedFormulaEffect: (n, q) => n + 2*q,
        purchasePrecondition: state => state.playerPlaceCounter >= 100,
        purchasePostcondition: state => state.playerPlaceCounter -= 100,
        purchaseAckMessage: "picked up tarsh for the past 100 blocks " +
            "to build a roket",
        purchaseNakMessage: "ther not enough trarsh to built an raocket",
        tickEffect: null,
        oneTimeEffect: null
    },
    "bigrkt": {
        effectPriority: 1,
        speedFormulaEffect: (n, q) => n + 50*q,
        purchasePrecondition: state => state.playerPlaceCounter >= 1000,
        purchasePostcondition: state => state.playerPlaceCounter -= 1000,
        purchaseAckMessage: "pikkocked oup tfarsh for the apst 1000 bloks " +
            "too bfilt an BIGRKT WOA WOA",
        purchaseNakMessage: "got go frther " +
            "theres not ef trarash bakc ther yet",
        tickEffect: null,
        oneTimeEffect: null
    }
}

export const upgradesByPriority: string[] =
    Object.keys(upgrades).sort((s, t) =>
        upgrades[t].effectPriority - upgrades[s].effectPriority);