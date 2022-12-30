import { NS } from "@ns";

export async function main(ns:NS){
    let name = ns.getHostname();
    while(true){
        if(ns.getServerSecurityLevel(name) != ns.getServerMinSecurityLevel(name)){
            await ns.weaken(name);
        } else if (ns.getServerMoneyAvailable(name) != ns.getServerMaxMoney(name)){
            await ns.grow(name);
        } else {
            await ns.hack(name);
        }
    }
}