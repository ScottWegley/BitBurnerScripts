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
	}
}