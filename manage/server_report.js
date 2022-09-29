/** @type import(".").NS */

import { spider } from "/libraries/utils/spider.js";
import { toReadable } from "libraries/utils/ram_convert.js";

/** @param {NS} ns */
export async function main(ns) {
	var serversArray = await spider(ns, false);
	serversArray.forEach(x => {
		var server = ns.getServer(x);
		var rooted = ((server.hasAdminRights) ? '\u2713' : '\u2717');
		var name = server.hostname;
		for (let i = 20 - name.length; name.length <= 18; i++) {
			name = name + ' ';
		}

		ns.tprint(name + '|| Root:' + rooted + ' || Ports:' + server.numOpenPortsRequired + ' || Cracked:' + server.openPortCount + ' || RAM:' + toReadable(server.maxRam)
			+ ' || Pot. ' + ns.nFormat(server.moneyMax, '($0.00a)').toUpperCase());
	});
}