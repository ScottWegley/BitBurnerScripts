import { NS } from "@ns";

export async function main(ns:NS){
    let s = ns.getServer();
    while(true){
        if(s.hackDifficulty != s.minDifficulty){
            await ns.weaken(s.hostname);
        } else if (s.moneyAvailable != s.moneyMax){
            await ns.grow(s.hostname);
        } else {
            await ns.hack(s.hostname);
        }
    }
}