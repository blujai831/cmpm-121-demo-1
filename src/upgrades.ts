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
        purchaseAckMessage: (gameState: IGameState): string =>
            "backtracked " +
            `${getPrice('beabnsies', gameState, 10)} ` +
            "blocks to find a beabnsy",
        purchaseNakMessage: (_dontCare: IGameState): string =>
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
        purchaseAckMessage: (gameState: IGameState): string =>
            "picked up tarsh for the past " +
            `${getPrice('roket', gameState, 100)} ` +
            "bloks to build a roket",
        purchaseNakMessage: (_dontCare: IGameState): string =>
            "ther not enough trarsh to built an raocket",
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
        purchaseAckMessage: (gameState: IGameState): string =>
            "pikkocked oup tfarsh for the apst " +
            `${getPrice('bigrkt', gameState, 1000)} ` +
            "blks too bfilt an BIGRKT WOA WOA",
        purchaseNakMessage: (_dontCare: IGameState): string =>
            "got go frther " +
            "theres not ef trarash bakc ther yet",
        postPurchaseEffect: (gameState: IGameState): void => {
            gameState.playerPlaceCounter -=
                getPrice('bigrkt', gameState, 1000);
        }
    })
};