import { NS, Server } from "@ns";

export async function main(ns: NS) {
    nuke(ns, 'home');
}

export async function nuke(ns: NS, host: string) {
    ns.ls(host).forEach(x => { 
        ns.rm(x,host);
    });
}