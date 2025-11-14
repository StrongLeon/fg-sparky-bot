import type { Client, Interaction } from "discord.js";
import type { DataSource } from "typeorm";
import { Logger } from "../scripts/logger";
import { Commands } from "./commands/commands";
import { handleSlashCommand } from "./commands/listener";
import { formatter } from "./utils/formatter";

export function registerHandlers(client: Client): void {
  client.once("clientReady", (client: Client<true>) => {
    const formattedDate = formatter.format(Date.now());
    Logger.notice(`Bot running as ${client.user.username} (started at ${formattedDate})`);
  });

  client.on("interactionCreate", async (interaction: Interaction) => {
    if (interaction.isCommand() || interaction.isContextMenuCommand()) {
      await handleSlashCommand(client, interaction, Commands);
    }
  });
}

export async function initDB(database: DataSource): Promise<void> {
  Logger.notice("Initializing database");

  try {
    await database.initialize();
  } catch (error) {
    if (!Error.isError(error)) throw error;
    Logger.error(`Failed to initialize database: ${error.message}`);
    Logger.error(error.stack ?? "No stack trace available");
    throw error;
  }
}
