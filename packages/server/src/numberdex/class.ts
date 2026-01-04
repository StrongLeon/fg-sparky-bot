/**
 * @license
 * fg-sparky-bot - Guess the FG number based on its symbol
 * Copyright (C) 2025 Skylafalls
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
import { Option, type Rarities } from "@fg-sparky/utils";
import { randomRarity } from "../helpers.ts";
import { Numberhumans as NumbersJsonSchema, type NumberhumanInfo } from "./schema.ts";

interface StoredNumberhumanInfo extends NumberhumanInfo {
  rarity: Rarities;
}

export class NumberhumanStore {
  /**
   * Constructs the {@link NumberhumanStore} class. Because constructors cannot be asynchronous,
   * this is private and one of the static `load*` methods is used to construct the class.
   * @param data The numbers to load.
   */
  private constructor(private data: Record<Rarities, NumberhumanInfo[]>) {}

  /**
     * Creates an instance of {@link NumberhumanStore} without populating it with data.
     * @returns An empty instance.
     */
  static create(): NumberhumanStore {
    return new NumberhumanStore({
      common: [],
      epic: [],
      rare: [],
    });
  }

  /**
     * Reads the data from the file path specified and initializes the class.
     * @param filePath The path to the numberhumans.json data.
     * @returns The fully initialized class.
     */
  async loadFile(filePath: string): Promise<this> {
    const file = Bun.file(filePath);
    const validatedData = NumbersJsonSchema.parse(await file.json());
    this.data = validatedData;
    return this;
  }

  /**
     * Validates and parses the JSON data and initalizes the class.
     * @param filePath The raw JSON data.
     * @returns The fully initialized class.
     */
  loadJSON(fileData: unknown): this {
    const validatedData = NumbersJsonSchema.parse(fileData);
    this.data = validatedData;
    return this;
  }

  /**
   * Returns a random entry from the collection of entries.
   * @returns The entry.
   */
  getRandom(): NumberhumanInfo {
    const rarityPool = randomRarity();
    return this.getRandomByRarity(rarityPool);
  }

  /**
   * Returns a random entry from the specified difficulty pool.
   * @returns The entry.
   */
  getRandomByRarity(rarity: Rarities): StoredNumberhumanInfo {
    const numbers = this.data[rarity];
    return {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ...numbers[Math.floor(Math.random() * numbers.length)]!,
      rarity,
    };
  }

  /**
   * Returns an entry based on the UUID. Returns a Rust option if it doesn't exist.
   * @returns The entry or None.
   */
  getByID(id: string): Option<NumberhumanInfo> {
    const data = [...this.data.common, ...this.data.rare, ...this.data.epic];
    const number = Option.from(data.find(value => value.uuid === id));
    return number;
  }

  /**
     * Counts how many _unique_ numberhumans the player has guessed for that
     * specific rarity in comparison to the numberhumans stored.
     * @returns The unique count of entries.
     */
  countEntriesUnique(difficulty: Rarities, entries: string[]): number {
    const filtered = this.data[difficulty].filter((entry) => {
      for (const uuid of entries) {
        if (entry.uuid === uuid) return true;
      }
      return false;
    });
    return filtered.length;
  }

  /**
     * Counts how many _total_ numberhumans the player has guessed for that
     * specific rarity in comparison to the numberhumans stored.
     * @returns The unique count of entries.
     */
  countEntriesTotal(difficulty: Rarities, entries: string[]): number {
    const filtered = entries.filter((uuid) => {
      for (const entry of this.data[difficulty]) {
        if (uuid === entry.uuid) return true;
      }
      return false;
    });
    return filtered.length;
  }
}
