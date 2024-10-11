import {GameUpgrade} from "./GameUpgrade.ts";
import {IGameState} from "./IGameState.ts";
import {IGameUpgrade} from "./IGameUpgrade.ts";

let getPrice = (
    upgradeName: string,
    gameState: IGameState,
    basePrice: number
): number => {
    let qty: number | undefined = gameState.getUpgradeQuantity(upgradeName);
    return basePrice*(1.15**qty);
}

export const upgrades: {[upgradeName: string]: IGameUpgrade} = {
    'beabnsies': new GameUpgrade({
        effectOrder: 1,
        speedFormulaEffect: (n: number, q: number): number => n + 0.1*q,
        purchaseCondition: (gameState: IGameState): boolean =>
            gameState.playerPlaceCounter >=
                getPrice('beabnsies', gameState, 10),
        purchaseAckMessage: "backtracked 10 blocks to find a beabnsy",
        purchaseNakMessage:
            "you aren't far enough to backtrack enough " +
            "to find a beabnsy",
        postPurchaseEffect: (gameState: IGameState): void => {
            gameState.playerPlaceCounter -=
                getPrice('beabnsies', gameState, 10);
        }
    }),
    'roket': new GameUpgrade({
        effectOrder: 1,
        speedFormulaEffect: (n: number, q: number): number => n + 2*q,
        purchaseCondition: (gameState: IGameState): boolean =>
            gameState.playerPlaceCounter >=
                getPrice('roket', gameState, 100),
        purchaseAckMessage:
            "picked up tarsh for the past 100 blocks " +
            "to build a roket",
        purchaseNakMessage: "ther not enough trarsh to built an raocket",
        postPurchaseEffect: (gameState: IGameState): void => {
            gameState.playerPlaceCounter -=
                getPrice('roket', gameState, 100);
        }
    }),
    'bigrkt': new GameUpgrade({
        effectOrder: 1,
        speedFormulaEffect: (n: number, q: number): number => n + 50*q,
        purchaseCondition: (gameState: IGameState): boolean =>
            gameState.playerPlaceCounter >=
                getPrice('bigrkt', gameState, 1000),
        purchaseAckMessage:
            "pikkocked oup tfarsh for the apst 1000 bloks " +
            "too bfilt an BIGRKT WOA WOA",
        purchaseNakMessage:
            "got go frther " +
            "theres not ef trarash bakc ther yet",
        postPurchaseEffect: (gameState: IGameState): void => {
            gameState.playerPlaceCounter -=
                getPrice('bigrkt', gameState, 1000);
        }
    })
};