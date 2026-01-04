/**
 * @license
 * fg-sparky-bot - Guess the FG number based on its symbol
 * Copyright (C) 2025 Skylafalls
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
import { NUMBERDEX_SPAWN_MESSAGES, Result } from "@fg-sparky/utils";
import { DiscordjsError, type Message, type SendableChannels } from "discord.js";
import type { NumberhumanStore } from "./class.ts";
import type { NumberhumanInfo } from "./schema.ts";

export async function spawnNumberhuman(store: NumberhumanStore, channel: SendableChannels): Promise<Result<[NumberhumanInfo, Message], DiscordjsError | TypeError>> {
  const numberhuman = store.getRandom();
  const randomSpawnMessage = NUMBERDEX_SPAWN_MESSAGES[Math.floor(Math.random() * NUMBERDEX_SPAWN_MESSAGES.length)];
  try {
    return Result.ok([
      numberhuman,
      await channel.send({ content: randomSpawnMessage ?? "hello", files: [numberhuman.image] },
      )]);
  } catch (err) {
    if (err instanceof DiscordjsError) return Result.err(err);
    return Result.err(new TypeError("unknown error"));
  }
}
