import { NS, Server } from "@ns";

/** @param {NS} ns */
export async function main(ns: NS) {
	var ramPower = 20;
	var servers = ns.getPurchasedServers();

	for (ramPower; ramPower > 0; ramPower--) {
		if (ns.getServerMoneyAvailable('home') > ns.getPurchasedServerCost(Math.pow(2, ramPower))) {
			if (servers.length < ns.getPurchasedServerLimit()) { //If we have space for a new server
				var newServerName = ("Server_" + (servers.length + 1));
				ns.tprint("Purchasing a server: " + newServerName);
				ns.purchaseServer(("Server_" + (servers.length + 1)), Math.pow(2, ramPower));
				return;
			}
		} else { //We need to upgrade a server.
			var lowestRAM = Math.pow(2, 20);
			var lowServer: Server | undefined = undefined;
			for (let i = 0; i < servers.length; i++) {
				if (ns.getServer(servers[i]).maxRam < lowestRAM) {
					lowestRAM = ns.getServer(servers[i]).maxRam;
					lowServer = ns.getServer(servers[i]);
				}
			}
		}
	}
}