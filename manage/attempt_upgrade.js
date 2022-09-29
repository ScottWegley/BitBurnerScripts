/** @type import(".").NS */

/** @param {NS} ns */
export async function main(ns) {
	var ramPower = 20;

	for (ramPower; ramPower > 0; ramPower--) {
		var servers = ns.getPurchasedServers();
		if (ns.getServerMoneyAvailable('home') > ns.getPurchasedServerCost(Math.pow(2, ramPower))) {
			if (servers.length < ns.getPurchasedServerLimit()) { //If we have space for a new server
				var newServerName = ("Server_" + (servers.length + 1) + "_" + Math.pow(2, ramPower) + "GB");
				ns.tprint("Purchasing a new server: " + newServerName);
				ns.purchaseServer(("Server_" + (servers.length + 1) + "_" + Math.pow(2, ramPower) + "GB"), Math.pow(2, ramPower));
				return;
			}
			else { //We need to replace a server.
				var lowestRAM = Math.pow(2, 20);
				var lowestIndex = -1;
				for (let i = 0; i < servers.length; i++) {
					if (ns.getServer(servers[i]).maxRam < lowestRAM) {
						lowestIndex = i;
						lowestRAM = ns.getServer(servers[i]).maxRam;
					}
				}
				if (!lowestIndex == -1) {
					var newServerName = ("Server-" + (lowestIndex) + "-" + Math.pow(2, ramPower) + "GB");
					ns.tprint("Purchasing a new server: " + newServerName);
				}
				return;
			}
		}
	}
}