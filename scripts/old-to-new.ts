import oldData from "../numbers/numbers.json" with { type: "json" };

const newData = [
  ...oldData.easy.map(value => Object.assign(value, { difficulty: "easy" })),
  ...oldData.medium.map(value => Object.assign(value, { difficulty: "medium" })),
  ...oldData.hard.map(value => Object.assign(value, { difficulty: "hard" })),
  ...oldData.legendary.map(value => Object.assign(value, { difficulty: "legendary" })),
];

await Bun.write("numbers/new-numbers.json", JSON.stringify(newData, undefined, 2));
