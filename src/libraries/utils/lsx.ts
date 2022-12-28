import { NS } from "@ns";

/** @param {NS} ns */
export async function main(ns:NS) { //Lists every file on computer instead of current directory
	var root = (ns.ls('home'));
	root.forEach(i => ns.tprint(i + "\n"));
}