import { NS } from "@ns";

import { spider } from "libraries/server/spider";

/** @param {NS} ns */
export async function main(ns:NS) {
    let servers = await spider(ns, false);
    servers.forEach((x:string|undefined) =>{
        let s = ns.getServer(x);
        if(s.hasAdminRights && !s.purchasedByPlayer){
            ns.rm('/scripts/primativehacking.js',x!);
            //ns.scp('/scripts/primativehacking.js',x!);
        }
    })
}