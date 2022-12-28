/** @type import(".").NS */
let ns = null;

import { spider } from "/libraries/utils/spider.js";

/** @param {NS} ns */
export async function main(_ns) {
    ns = _ns;
    let servers = await spider(ns, false);
    servers.forEach(x => {
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
                }
            }
        }
        else if (s.hasAdminRights) {
            ns.tprint(s.hostname + ' has been cracked.');
        }
    });
}