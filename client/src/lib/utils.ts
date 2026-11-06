export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export const dayAccents: Record<number, { ink: string; wash: string; seal: string }> = {
  1: { ink: "#24344a", wash: "#e4edf6", seal: "抵" },
  2: { ink: "#6a4b24", wash: "#f4ead6", seal: "城" },
  3: { ink: "#234838", wash: "#e3f0e7", seal: "竹" },
  4: { ink: "#8a6414", wash: "#f8efcf", seal: "銀" },
  5: { ink: "#7d2c28", wash: "#f8e4de", seal: "楓" },
  6: { ink: "#2d3b4e", wash: "#e6eef5", seal: "歸" },
};

export function accentFor(day: number) {
  return dayAccents[day] ?? dayAccents[1];
}

export const categoryLabel: Record<string, string> = {
  station: "車站",
  hotel: "飯店",
  sight: "景點",
  food: "用餐方向",
};
