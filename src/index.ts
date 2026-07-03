 import { MemWal } from "@mysten-incubation/memwal";
import * as dotenv from "dotenv";

dotenv.config();

const memwal = MemWal.create({
  key: process.env.MEMWAL_PRIVATE_KEY ?? "<YOUR_PRIVATE_KEY>",
  accountId: process.env.MEMWAL_ACCOUNT_ID ?? "0x9d5a747bd9c38779b7ac47401984b3c1372d6253c3b03f296c2921d9e8c6d17a",
  serverUrl: process.env.MEMWAL_SERVER_URL ?? "https://relayer.memory.walrus.xyz",
});

async function main(): Promise<void> {
  try {
    console.log("Sedang menyimpan memori...");
    const job = await memwal.remember("I live in Hanoi and prefer dark mode.");
    await memwal.waitForRememberJob(job.job_id);
    console.log("Memori berhasil disimpan!");

    console.log("\nMencari memori dari basis data...");
    const result = await memwal.recall("What do we know about this user?");
    
    if (result && result.results && result.results.length > 0) {
      result.results.forEach((memory, index: number) => {
        console.log(`${index + 1}. ${memory.text}`);
      });
    } else {
      console.log("Memori tidak ditemukan.");
    }
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  }
}

main();