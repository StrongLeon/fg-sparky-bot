import { Baker, FilePersistenceProvider } from "cronbake";
import { Logger } from "../utils/logger";

export const baker: Baker = Baker.create({
  logger: Logger,
  persistence: {
    enabled: true,
    strategy: "file",
    provider: new FilePersistenceProvider("./numbers/numberdex-cron-jobs.json"),
    autoRestore: true,
  },
});

const spawnJob = baker.add({
  name: "numberdex-spawn-job",
  cron: "@every_minute",
  persist: true,
  overrunProtection: true,
  async callback() {
  },
});
