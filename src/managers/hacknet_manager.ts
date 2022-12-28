import { NodeStats, NS, HacknetNodesFormulas, HacknetMultipliers } from "@ns";

export async function name(ns: NS) {
    let active = true;
    while (active) {
        let myMoney = ns.getServerMoneyAvailable('home');
        let curHacknodes = ns.hacknet.numNodes();
        let myNodes: NodeStats[] = [];
        for (let i = 0; i < curHacknodes; i++) {
            myNodes[i] = ns.hacknet.getNodeStats(i);
        }
        let buyNewNode =  ns.hacknet.getPurchaseNodeCost();
    }
}