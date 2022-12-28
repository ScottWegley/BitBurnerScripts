import { NS } from "@ns";

/**
 * @param {boolean} log - True saves a tree of the scan to the script logs.
 * @param {boolean} raw - True returns just an array of servers, false returns it with tree indents.
 * @param {boolean} terminal - True prints the tree to the terminal.
*/
export async function spider(ns: NS, log: boolean = true, raw: boolean = true, terminal = false) {
	var tagged = ['home'];
	var indentMod = '|___';
	var tagCheck = ['home'];

	ns.disableLog('scan');

	for (let i = 0; i < tagCheck.length; i++) {
		let newScan = await ns.scan(tagCheck[i]);
		for (let j = newScan.length - 1; j >= 0; j--) {
			if (tagCheck.indexOf(newScan[j]) === -1) { //If the server in the scan has not been tagged yet.
				let indent = tagged[i].substring(0, tagged[i].lastIndexOf('_') + 1) + indentMod;
				let preString = indent.substring(0, indent.lastIndexOf('|')).length;
				indent = indent.substring(preString, indent.length);
				for (let q = 0; q < preString; q++) {
					indent = " " + indent;
				}
				tagged.splice(i + 1, 0, indent + newScan[j]);
				tagCheck.splice(i + 1, 0, newScan[j]);
			}
		}
	}
}
