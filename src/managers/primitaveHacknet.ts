import { NodeStats, NS, } from "@ns";

export async function main(ns: NS) {
    ns.disableLog('sleep');
    let active = true;
    while (active) {
        let curHacknodes = ns.hacknet.numNodes();
        let myNodes: NodeStats[] = [];
        /*for (let i = 0; i <= curHacknodes; i++) {
            if (i == curHacknodes) {
                (ns.hacknet.purchaseNode() != -1 ? myNodes[i] = ns.hacknet.getNodeStats(i) : null);
            } else {
                myNodes[i] = ns.hacknet.getNodeStats(i);
                try {
                    if(ns.hacknet.upgradeCore(i,1)){
                        ns.print(`Upgrading Node ${i}'s Cores.`);
                        i = curHacknodes + 1;
                    }
                    else if(ns.hacknet.upgradeRam(i,1)){
                        ns.print(`Upgrading Node ${i}'s RAM.`);
                        i = curHacknodes + 1;
                    }
                    else if(ns.hacknet.upgradeLevel(i,1)){
                        ns.print(`Upgrading Node ${i}'s Level.`);
                        i = curHacknodes + 1;
                    }
                } catch (err) { ns.print(err); }
            }
        }*/
        for (let i = 0; i < curHacknodes; i++) {
            myNodes[i] = ns.hacknet.getNodeStats(i);
        }
        let options: Array<number> = new Array();
        for (let i = 0; i < curHacknodes; i++) {
            options.push(Math.min(ns.hacknet.getCoreUpgradeCost(i, 1), ns.hacknet.getRamUpgradeCost(i, 1), ns.hacknet.getLevelUpgradeCost(i, 1)));
        }
        options.push(ns.hacknet.getPurchaseNodeCost());
        }
        await ns.sleep(100);
    }
}