import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
  ns.tprint(ns.getServer('n00dles').hackDifficulty);
}
