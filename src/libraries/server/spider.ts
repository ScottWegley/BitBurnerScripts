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
	ns.disableLog('disableLog');
	ns.disableLog('scan');
	for (let i = 0; i < tagCheck.length; i++) {
		let newScan = ns.scan(tagCheck[i]);
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
	if (log || terminal) {
		for (let i = 0; i < tagged.length; i++) {
			let barIndex = tagged[i].lastIndexOf('|');
			let q = 1;
			let foundLetter = false;
			while (!foundLetter && !(i + q == tagged.length)) {
				let matchingChar = tagged[i + q].charAt(barIndex);
				if (matchingChar != ' ' && matchingChar != '_' && matchingChar != '|') {
					foundLetter = true;
				}
				if (matchingChar == '|') {
					for (q; q > 0; q--) {
						let replacement = '|';
						tagged[i + q] = tagged[i + q].substring(0, barIndex) + replacement + tagged[i + q].substring(barIndex + replacement.length);
					}
					foundLetter = true;
				}
				q++;
			}
		}
		tagged.forEach(x => {
			if(log) ns.print(x);
			if(terminal) ns.tprint(x);
		});
	}
	if (raw) { return tagCheck }
	else { return tagged };
}

export async function main(ns: NS) {
	await spider(ns,false,false,true);
}