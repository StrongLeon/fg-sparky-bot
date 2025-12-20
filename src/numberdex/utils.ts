/**
 * @license
 * fg-sparky-bot - Guess the FG number based on its symbol
 * Copyright (C) 2025 Skylafalls
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
import { DiscordjsError, type SendableChannels } from "discord.js";
import { Err, Ok, type Result } from "rust-optionals";

export async function spawnNumberhuman(id: string, channel: SendableChannels): Promise<Result<void, Error>> {
  try {
    await channel.send({ content: "hello", files: [`numbers/humans/${id}.jpg`] });
    return Ok();
  } catch (err) {
    if (err instanceof DiscordjsError) return Err(err);
    return Err("unknown error");
  }
}
