import { markerById } from "./mapMarkersData";
import type { RouteLeg, RoutePoint } from "./types";

function point(id: string): RoutePoint {
  const marker = markerById(id);
  return { name: marker.name, lat: marker.lat, lng: marker.lng };
}

function leg(
  id: string,
  day: number,
  label: string,
  mode: RouteLeg["mode"],
  ids: string[],
  optional = false,
): RouteLeg {
  return { id, day, label, mode, optional, points: ids.map(point) };
}

/** 直線只表示先後順序，不是鐵軌或步行的真實幾何。 */
export const dayRoutes: RouteLeg[] = [
  leg("d1-train", 1, "空港急行到堺", "train", ["kix", "sakai", "hotel"]),
  leg("d1-kofun", 1, "可選：大仙陵", "walk", ["hotel", "daisen"], true),
  leg("d1-namba", 1, "可選：難波", "train", ["sakai", "namba-nankai", "dotonbori"], true),

  leg("d2-train", 2, "南海到和歌山城", "train", ["hotel", "sakai", "wakayamashi"]),
  leg("d2-walk", 2, "步行到城", "walk", ["wakayamashi", "castle"]),
  leg("d2-kimi", 2, "可選：紀三井寺", "train", ["castle", "kimiidera"], true),

  leg(
    "d3-train",
    3,
    "堺到嵐山",
    "train",
    ["sakai", "namba-nankai", "namba-metro", "umeda-metro", "hankyu-umeda", "katsura", "arashiyama"],
  ),
  leg("d3-walk", 3, "嵐山步行", "walk", ["arashiyama", "togetsukyo", "tenryuji", "bamboo", "nonomiya"]),
  leg("d3-jo", 3, "可選：常寂光寺", "walk", ["nonomiya", "jojakkoji"], true),
  leg("d3-dinner", 3, "可選：四條晚餐", "train", ["katsura", "kawaramachi"], true),

  leg(
    "d4-train",
    4,
    "JR 到京都",
    "train",
    ["sakai", "namba-nankai", "namba-metro", "umeda-metro", "osaka-jr", "kyoto"],
  ),
  leg("d4-nishi", 4, "步行到西本願寺", "walk", ["kyoto", "nishi"]),
  leg("d4-sub", 4, "地鐵到蹴上", "train", ["kyoto", "karasuma-oike", "keage"]),
  leg("d4-walk", 4, "步行到永觀堂", "walk", ["keage", "eikando"]),

  leg(
    "d5-morning",
    5,
    "到東福寺",
    "train",
    ["sakai", "namba-nankai", "namba-metro", "umeda-metro", "osaka-jr", "kyoto", "tofukuji-st"],
  ),
  leg("d5-walk-tofuku", 5, "步行進東福寺", "walk", ["tofukuji-st", "tofukuji"]),
  leg(
    "d5-afternoon",
    5,
    "下午到南禪寺",
    "train",
    ["tofukuji-st", "kyoto", "karasuma-oike", "keage"],
  ),
  leg("d5-path", 5, "水路閣與哲學之道", "walk", ["keage", "suirokaku", "nanzenji", "tetsugaku"]),
  leg("d5-ginkaku", 5, "備案：銀閣寺", "walk", ["tetsugaku", "ginkakuji"], true),

  leg("d6-train", 6, "空港急行回機場", "train", ["hotel", "sakai", "kix"]),
];

export function routesForDays(days: number[]) {
  const wanted = new Set(days);
  return dayRoutes.filter((route) => wanted.has(route.day));
}

export const dayRouteNotes: Record<number, string> = {
  1: "實線是必做的機場到飯店。兩條淡線是下午二擇一，不要兩條都走。",
  2: "紀三井寺是加購時間，不是回程必經。",
  3: "電車線在桂轉折。特急若沒停桂，這條線就接不上嵐山。",
  4: "上午在京都站西邊，下午改搭地鐵到東邊。中間用午餐把兩邊分開。",
  5: "早上的奈良線與下午的東西線是兩段，不是同一條車坐到底。",
  6: "終點是關西空港。開往和歌山市的車不要上。",
};
