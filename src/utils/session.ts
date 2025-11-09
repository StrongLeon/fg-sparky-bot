import { AppDataSource } from "../db.ts";
import { SparkySession } from "../entities/sparky-seesion.ts";
import { formatter } from "./formatter.ts";
import { Logger } from "./logger.ts";

export async function saveSession(channelId: bigint): Promise<void> {
  Logger.info("Generating new sparky session...");
  const expiration = new Date().setMinutes(new Date().getMinutes() + 1);
  const session = new SparkySession();
  session.expiration_time = BigInt(expiration);
  session.channel_id = channelId;
  Logger.debug(`Saving new session for channel ${channelId.toString()} (id: ${session.id.toString()}, expires at ${formatter.format(expiration)})`);
  await AppDataSource.manager.save(session);
}

export async function getSession(channelId: bigint): Promise<SparkySession | null> {
  return await AppDataSource.manager.findOneBy(SparkySession, { channel_id: channelId });
}
