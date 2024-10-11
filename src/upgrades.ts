import {GameUpgrade} from "./GameUpgrade.ts";
import {IGameState} from "./IGameState.ts";
import {IGameUpgrade} from "./IGameUpgrade.ts";

export const upgrades: {[upgradeName: string]: IGameUpgrade} = {
    'beabnsies': new GameUpgrade({
        effectOrder: 1,
        speedFormulaEffect: (n: number, q: number): number => n + q,
        purchaseCondition: (gameState: IGameState): boolean =>
            gameState.playerPlaceCounter >= 10,
        purchaseAckMessage: "backtracked 10 blocks to find a beabnsy",
        purchaseNakMessage:
            "you aren't far enough to backtrack enough " +
            "to find a beabnsy",
        postPurchaseEffect: (gameState: IGameState): void => {
            gameState.playerPlaceCounter -= 10;
        }
    })
};