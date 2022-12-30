import { NS } from "@ns";

import { spider } from "libraries/server/spider";
import { toReadable } from "libraries/utils/ram_convert";
import { report } from "libraries/server/server_report";

/** @param {NS} ns */
export async function main(ns: NS) {
	network_report(ns, (typeof ns.args[0] === 'number' ? ns.args[0] : 1), ns.args);
}

export async function network_report(ns: NS, lOD: number, args: (string | number | boolean)[]) {
	if (!(lOD >= 1 && lOD <= 5)) lOD = 1;
	args.splice(0, 1);
	var returnArray: string[] = [];
	var serversArray = await spider(ns, false, true, false);
	if (args.length % 2 != 0) {
		ns.tprint('Invalid Arguments!');
		return;
	}
	serversArray.forEach(async x => {
		var server = ns.getServer(x);
		var name = server.hostname;
		for (let i = 20 - name.length; name.length <= 18; i++) {
			name = name + ' ';
		}

			ns.tprint(await report(ns, server.hostname, 1, false, false, false));
	});
}