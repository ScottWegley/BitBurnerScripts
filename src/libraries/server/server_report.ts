import { NS, Server } from "@ns";
import { toReadable } from "libraries/utils/ram_convert";
import { ucChars } from "libraries/utils/CreativeConsole";

/** 
 * @param {string} serverName - The hostname of the server to report.
 * @param {number} lOD - The level of detail for the report, 1-5.
 * @param {boolean} print - Whether or not to list the server details in the script logs.
 * @param {boolean} terminal - Whether or not to print the server details in the terinal.
 * @param {boolean} tall - If true, the printout is tall, if not, it's long.
*/
export async function report(ns: NS, serverName: string, lOD:number , print = true, terminal = false, tall = false) {
}

export async function main(ns: NS) {
    report(ns, (typeof ns.args[0] === 'string' ? ns.args[0] : 'home'), (typeof ns.args[1] === 'number'? ns.args[1] : 1), true, true, false);
}