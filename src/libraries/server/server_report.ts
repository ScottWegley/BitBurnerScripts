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
    ns.disableLog('getServerSecurityLevel');
    var server: Server = (typeof serverName === 'string' && ns.serverExists(serverName) ? ns.getServer(serverName) : ns.getServer('home'));
    try {
        let printout: string = ' ';
        switch (lOD) {
            default:
                if (tall) {

                } else {
                    printout = `${server.hostname} || Root: ${server.hasAdminRights} || Ports: ${server.numOpenPortsRequired} || Cracked: ${server.openPortCount} || RAM: ${toReadable(server.maxRam)} || Pot. ${ns.nFormat(server.moneyMax, '($0.00a)').toUpperCase()}`;
                }
                break;
            case 2:
                if (tall) {

                } else {
                    printout = `${server.hostname} || Root: ${server.hasAdminRights} || Backdoored: ${server.backdoorInstalled} || Ports: ${server.numOpenPortsRequired} || Cracked: ${server.openPortCount} || RAM: ${toReadable(server.ramUsed)}/${toReadable(server.maxRam)} ${server.ramUsed / server.maxRam * 100}% || Pot. ${ns.nFormat(server.moneyAvailable, '($0.00a)').toUpperCase()}/${ns.nFormat(server.moneyMax, '($0.00a)').toUpperCase()} ${(server.moneyMax != 0 ? server.moneyAvailable / server.moneyMax * 100 : 0)}%`;
                }
                break;
            case 3:
                if (tall) {

                } else {
                    printout = `${server.hostname} || Root: ${server.hasAdminRights} || Backdoored: ${server.backdoorInstalled} || Ports: ${server.numOpenPortsRequired} || Cracked: ${server.openPortCount} || Security: ${ns.getServerSecurityLevel(server.hostname)} || RAM: ${toReadable(server.ramUsed)}/${toReadable(server.maxRam)} ${server.ramUsed / server.maxRam * 100}% || Pot. ${ns.nFormat(server.moneyAvailable, '($0.00a)').toUpperCase()}/${ns.nFormat(server.moneyMax, '($0.00a)').toUpperCase()} ${(server.moneyMax != 0 ? server.moneyAvailable / server.moneyMax * 100 : 0)}%`;
                }
                break;
            case 4:
                if (tall) {

                } else {
                    printout = `${server.hostname} || Root: ${server.hasAdminRights} || Backdoored: ${server.backdoorInstalled} || Ports: ${server.numOpenPortsRequired} || Cracked: ${server.openPortCount} || Security: ${ns.getServerSecurityLevel(server.hostname)} || RAM: ${toReadable(server.ramUsed)}/${toReadable(server.maxRam)} ${server.ramUsed / server.maxRam * 100}% || Hack Time: ${(ns.getHackTime(server.hostname)/1000).toFixed(2)} sec. || Grow Time: ${(ns.getGrowTime(server.hostname)/1000).toFixed(2)} sec. || Weak Time: ${(ns.getWeakenTime(server.hostname)/1000).toFixed(2)} sec. || Pot. ${ns.nFormat(server.moneyAvailable, '($0.00a)').toUpperCase()}/${ns.nFormat(server.moneyMax, '($0.00a)').toUpperCase()} ${(server.moneyMax != 0 ? server.moneyAvailable / server.moneyMax * 100 : 0)}%`;
                }
                break;
            case 5:
                if (tall) {

                } else {
                    printout = `${server.hostname} || Root: ${server.hasAdminRights} || Backdoored: ${server.backdoorInstalled} || Ports: ${server.numOpenPortsRequired} || Cracked: ${server.openPortCount} || FTP: ${server.ftpPortOpen} || SSH: ${server.sshPortOpen} || HTTP: ${server.httpPortOpen} || SQL: ${server.sqlPortOpen} || SMTP: ${server.smtpPortOpen} || Security: ${ns.getServerSecurityLevel(server.hostname)} || RAM: ${toReadable(server.ramUsed)}/${toReadable(server.maxRam)} ${server.ramUsed / server.maxRam * 100}% || Hack Time: ${(ns.getHackTime(server.hostname)/1000).toFixed(2)} sec. || Grow Time: ${(ns.getGrowTime(server.hostname)/1000).toFixed(2)} sec. || Weak Time: ${(ns.getWeakenTime(server.hostname)/1000).toFixed(2)} sec. || Pot. ${ns.nFormat(server.moneyAvailable, '($0.00a)').toUpperCase()}/${ns.nFormat(server.moneyMax, '($0.00a)').toUpperCase()} ${(server.moneyMax != 0 ? server.moneyAvailable / server.moneyMax * 100 : 0)}%`;
                }
                break;
        }
        printout = printout.replaceAll('true',ucChars.check).replaceAll('false',ucChars.x);
        if (print) {
            ns.print(printout);
        }
        if (terminal) {
            ns.tprint(printout);
        }
        return printout;
    } catch (err) {
        ns.print(err);
    }
}

export async function main(ns: NS) {
    report(ns, (typeof ns.args[0] === 'string' ? ns.args[0] : 'home'), (typeof ns.args[1] === 'number'? ns.args[1] : 1), true, true, false);
}