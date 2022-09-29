/** @type import(".").NS
 * @param {Boolean} log - Whether or not to log a tree in the script's logs.
 * @param {Boolean} raw - whether to return a list of names or a list with tree format;
*/
export async function spider(ns,log = true,raw = true) {
	var tagged = ['home'];
	var indentMod = '|___';
	var tagCheck = ['home'];

	for (let i = 0; i < tagCheck.length; i++) {
		let newScan = await ns.scan(tagCheck[i]);
		for (let j = newScan.length - 1; j >= 0; j--) {
			if (tagCheck.indexOf(newScan[j]) === -1) {
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
	for (let i = 0; i < tagged.length; i++) {
		let barIndex = tagged[i].lastIndexOf('|');
		let q = 1;
		let foundLetter = false;
		while (!foundLetter && !(i+q == tagged.length)) {
			let matchingChar = tagged[i + q].charAt(barIndex);
			if (matchingChar != ' ' && matchingChar != '_' && matchingChar != '|') {
				foundLetter = true;
			}
			if (matchingChar == '|') {
				for (q; q > 0; q--) {
					let replacement = '|';
					tagged[i+q] = tagged[i+q].substring(0,barIndex) + replacement + tagged[i+q].substring(barIndex + replacement.length);
				}
				foundLetter = true;
			}
			q++;
		}
	}
	if(log) tagged.forEach(x => ns.print(x));

	if(raw){ return tagCheck; }
	else { return tagged; }
}

export async function main(ns) {
	await spider(ns);
}