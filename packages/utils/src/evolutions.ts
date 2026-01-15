export enum EvolutionType {
  None = 0,
  Superscaled = 1,
  Mastered = 2,
  Endfimidian = 3,
  Celestial = 4,
  Eternal = 5,
  Corrotechnic = 6,
  Subeuclidean = 7,
  Zyrolexic = 8,
  Transcendent = 9,
  Corrupt = 10,
  Absolute = 11,
}

export const EvolutionMap: Record<EvolutionType, [number, number]> = {
  [EvolutionType.None]: [1, 1],
  [EvolutionType.Superscaled]: [1.5, 1.5],
  [EvolutionType.Mastered]: [2, 2],
  [EvolutionType.Endfimidian]: [2.5, 1.5],
  [EvolutionType.Celestial]: [2, 3],
  [EvolutionType.Eternal]: [5, 1.6],
  [EvolutionType.Corrotechnic]: [1.5, 4],
  [EvolutionType.Subeuclidean]: [3.5, 3],
  [EvolutionType.Zyrolexic]: [4, 4],
  [EvolutionType.Transcendent]: [5, 4],
  [EvolutionType.Corrupt]: [2, 6],
  [EvolutionType.Absolute]: [7, 7],
};

export function getEvolutionBuff(
  evolution: EvolutionType,
  type: "hp" | "atk"
): number {
  return EvolutionMap[evolution][type === "hp" ? 0 : 1];
}
