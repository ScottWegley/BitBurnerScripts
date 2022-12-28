import { NodeStats, NS, } from "@ns";

export async function main(ns: NS) {
    ns.disableLog('sleep');
    let active = true;
    while (active) {
        await ns.sleep(100);
    }
}