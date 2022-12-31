import { NS, Server } from "@ns";

import { spider } from "libraries/server/spider";
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

		if (args.length == 0 || matchesSearch(ns, server, args)) {
			await report(ns, name, lOD, false, true, false);
			returnArray.push(name);
		}
	});
}

function matchesSearch(ns: NS, s: Server, args: (string | number | boolean)[]): boolean {
	var params: string[] = [];
	var value: string[] = [];
	var outcome = true;
	for (let i = 0; i < args.length; i++) {
		if (i % 2 == 0) { params.push(args[i].toString()); }
		else { value.push(args[i].toString()); }
	}

	for (let i = 0; i < params.length; i++) {
		params[i].trim();
		value[i].trim();
		switch (params[i]) {
			case 'name':
				outcome = outcome && (s.hostname == value[i]);
				break;
			case 'root':
				outcome = outcome && (s.hasAdminRights == (value[i] == "true"));
				break;
			case 'ports':
			case 'aram':
			case 'mram':
			case 'security':
				let serverVal = (params[i] == 'ports' ? s.openPortCount : (params[i] == 'aram' ? s.maxRam - s.ramUsed : (params[i] == 'mram' ? s.maxRam : s.hackDifficulty)));
				let operation = value[i].slice(0, ((value[i].indexOf('>=') != -1 || value[i].indexOf('<=') != -1) ? 2 : 1));
				let comparison = parseInt(value[i].slice(operation.length));
				if (operation == '>=') { outcome = outcome && (serverVal >= comparison) }
				else if (operation == '<=') { outcome = outcome && (serverVal <= comparison) }
				else if (operation == '>') { outcome = outcome && (serverVal > comparison) }
				else if (operation == '<') { outcome = outcome && (serverVal < comparison) }
				else if (operation == '=') { outcome = outcome && (serverVal == comparison) }
				break;
			default:
				outcome = outcome && false;
				break;
		}
	}
	return outcome;
}