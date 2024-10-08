import { GameState } from "./GameState.ts";

export type upgrade = {
    effectPriority: number,
    speedFormulaEffect: ((playerSpeed: number) => number) | null,
    purchasePrecondition: ((gameState: GameState) => boolean) | null,
    purchasePostcondition: ((gameState: GameState) => void) | null,
    purchaseAckMessage: string | null,
    purchaseNakMessage: string | null,
    tickEffect: ((gameState: GameState, interval: number) => void) | null,
    oneTimeEffect: ((gameState: GameState) => void) | null
};

export const upgrades: {[name: string]: upgrade} = {
    "beabnsy": {
        effectPriority: 1,
        speedFormulaEffect: n => n + 0.1,
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
        speedFormulaEffect: n => n + 2,
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
        speedFormulaEffect: n => n + 50,
        purchasePrecondition: state => state.playerPlaceCounter >= 1000,
        purchasePostcondition: state => state.playerPlaceCounter -= 1000,
        purchaseAckMessage: "pikkocked oup tfarsh for the apst 1000 bloks " +
            "too bfilt an BIGRKT WOA WOA",
        purchaseNakMessage: "got go frther theres not ef trarash bakc ther yet",
        tickEffect: null,
        oneTimeEffect: null
    }
}