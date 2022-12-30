import { NS } from "@ns";

import { spider } from "libraries/server/spider";

/** @param {NS} ns */
export async function main(ns:NS) {
    let servers = await spider(ns, false);
    servers.forEach((x: string | undefined) => {
        let s = ns.getServer(x);
        if (!s.hasAdminRights) {
            try {
                ns.brutessh(s.hostname);
                ns.ftpcrack(s.hostname);
                ns.relaysmtp(s.hostname);
                ns.httpworm(s.hostname);
                ns.sqlinject(s.hostname);
            }
            catch (e) {
                ns.print(e);
            }
            finally {
                if (ns.getServerNumPortsRequired(s.hostname) <= s.openPortCount) {
                    ns.nuke(s.hostname);
                    ns.tprint(`Cracking ${s.hostname}`);
                }
            }
        }
        else if (s.hasAdminRights) {
            ns.tprint(s.hostname + ' was already cracked.');
        }
    });
}