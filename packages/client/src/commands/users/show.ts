import { getUser } from "@fg-sparky/server";
import { formatPercent, joinStringArray, type ServerSlashCommandInteraction } from "@fg-sparky/utils";
import type { Client } from "discord.js";

export default async function userShow(client: Client, interaction: ServerSlashCommandInteraction): Promise<void> {
  const userId = interaction.options.get("user", true).value as string;
  const userInfo = await getUser(userId, interaction.guildId);
  const discordUser = await client.users.fetch(userId);
  if (userInfo) {
    const { guessedEntries, uniqueGuessed, numberhumansGuessed, numberhumansGuessedUnique } = userInfo;
    const percentage = {
      all: uniqueGuessed.length / NumberStore.UNIQUE_ENTRIES,
      easy: NumberStore.countEntriesUnique("easy", uniqueGuessed) / NumberStore.UNIQUE_EASY_ENTRIES,
      medium: NumberStore.countEntriesUnique("medium", uniqueGuessed) / NumberStore.UNIQUE_MEDIUM_ENTRIES,
      hard: NumberStore.countEntriesUnique("hard", uniqueGuessed) / NumberStore.UNIQUE_HARD_ENTRIES,
      legendary: NumberStore.countEntriesUnique("legendary", uniqueGuessed) / NumberStore.UNIQUE_LEGENDARY_ENTRIES,
    };
    const content = joinStringArray([
      `# Profile information for ${discordUser.displayName} (${discordUser.username})`,
      "## fg sparky:",
      `terminus tokens: ${userInfo.tokens.toString()} <:terminusfinity:1444859277515690075>`,
      `highest guessing streak: ${Math.max(userInfo.bestStreak - 1, 0).toString()}`,
      `numbers guessed: ${guessedEntries.length.toString()} (total), ${uniqueGuessed.length.toString()} (unique) [${formatPercent(percentage.all)}]`,
      `- easy numbers: ${NumberStore.countEntriesTotal("easy", guessedEntries).toString()} (total), ${NumberStore.countEntriesUnique("easy", uniqueGuessed).toString()} (unique) [${formatPercent(percentage.easy)}]`,
      `- medium numbers: ${NumberStore.countEntriesTotal("medium", guessedEntries).toString()} (total), ${NumberStore.countEntriesUnique("medium", uniqueGuessed).toString()} (unique) [${formatPercent(percentage.medium)}]`,
      `- hard numbers: ${NumberStore.countEntriesTotal("hard", guessedEntries).toString()} (total), ${NumberStore.countEntriesUnique("hard", uniqueGuessed).toString()} (unique) [${formatPercent(percentage.hard)}]`,
      `- legendary numbers: ${NumberStore.countEntriesTotal("legendary", guessedEntries).toString()} (total), ${NumberStore.countEntriesUnique("legendary", uniqueGuessed).toString()} (unique) [${formatPercent(percentage.legendary)}]`,
      "",
      "## numberdex:",
      `numberhumans caught: ${numberhumansGuessed.length.toString()} (total), ${numberhumansGuessedUnique.length.toString()} (unique)`,
    ]);
    await interaction.reply({
      content,
    });
  } else {
    await interaction.reply("sorry, fg sparky bot doesn't have data for this user");
  }
}
