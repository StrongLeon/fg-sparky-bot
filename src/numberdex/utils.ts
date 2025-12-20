import { DiscordjsError } from "discord.js";
import { Err, Ok, type Result } from "rust-optionals";

export async function spawnNumberhuman(id: string, channelId: string): Promise<Result<void, Error>> {
  const channel = await client.channels.fetch(channelId);
  if (!channel) return Err("no error");
  if ((!channel.isSendable() && !channel.isTextBased()) || channel.isDMBased()) return Ok();
  try {
    await channel.send("pretend this is a numberhuman or smth");
    return Ok();
  } catch (err) {
    if (err instanceof DiscordjsError) return Err(err);
    return Err("unknown error");
  }
}
