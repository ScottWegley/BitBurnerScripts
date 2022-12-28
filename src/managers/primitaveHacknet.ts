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
        let min: number | undefined = undefined;
        options.forEach(q => {
            if (min == undefined) {
                min = q;
            } else {
                if (q < min) {
                    min = q;
                }
            }
        });
        let selection = options.indexOf(min!);
        if (selection == curHacknodes) { ns.hacknet.purchaseNode() }
        else {
            if (ns.hacknet.upgradeCore(selection, 1)) {
                ns.print(`Upgrading Node ${selection}'s Cores.`);
            }
            else if (ns.hacknet.upgradeRam(selection, 1)) {
                ns.print(`Upgrading Node ${selection}'s RAM.`);
            }
            else if (ns.hacknet.upgradeLevel(selection, 1)) {
                ns.print(`Upgrading Node ${selection}'s Level.`);
            }
        }
        await ns.sleep(100);
    }
}