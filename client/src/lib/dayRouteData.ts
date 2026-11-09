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

/** 直線只表示先後順序，不是鐵軌、巴士或步行的真實幾何。 */
export const dayRoutes: RouteLeg[] = [
  leg("d1-train", 1, "南海到難波日本橋", "train", ["kix", "namba-nankai", "hotel-namba"]),
  leg("d1-walk", 1, "下午：道頓堀與心齋橋", "walk", ["hotel-namba", "dotonbori", "shinsaibashi"]),

  leg("d2-train", 2, "南海到和歌山城", "train", ["hotel-namba", "namba-nankai", "wakayamashi"]),
  leg("d2-walk", 2, "步行到城", "walk", ["wakayamashi", "castle"]),
  leg("d2-kimi", 2, "可選：紀三井寺", "train", ["castle", "kimiidera"], true),

  leg("d3-keihan", 3, "京阪到七條", "train", ["hotel-namba", "namba-metro", "yodoyabashi", "shichijo"]),
  leg("d3-nishi", 3, "步行到西本願寺", "walk", ["shichijo", "nishi"]),
  leg("d3-eikan", 3, "京阪往神宮丸太町", "train", ["shichijo", "jingu-marutamachi"]),
  leg("d3-walk-eikan", 3, "步行到永觀堂", "walk", ["jingu-marutamachi", "eikando"]),
  leg(
    "d3-hankyu",
    3,
    "可選：阪急河原町",
    "train",
    ["namba-metro", "umeda-metro", "hankyu-umeda", "kawaramachi"],
    true,
  ),

  leg("d4-morning", 4, "京阪到東福寺", "train", ["hotel-namba", "namba-metro", "yodoyabashi", "tofukuji-st"]),
  leg("d4-walk-tofuku", 4, "步行進東福寺", "walk", ["tofukuji-st", "tofukuji"]),
  leg("d4-afternoon", 4, "京阪到南禪寺側", "train", ["tofukuji-st", "jingu-marutamachi"]),
  leg("d4-path", 4, "水路閣與哲學之道", "walk", ["jingu-marutamachi", "suirokaku", "nanzenji", "tetsugaku"]),
  leg("d4-ginkaku", 4, "備案：銀閣寺", "walk", ["tetsugaku", "ginkakuji"], true),
  leg(
    "d4-move",
    4,
    "回難波取行李，高野線到堺東",
    "train",
    ["jingu-marutamachi", "yodoyabashi", "namba-metro", "namba-nankai", "sakaihigashi", "hotel-sakai"],
  ),

  leg("d5-train", 5, "高野線到極樂橋", "train", ["hotel-sakai", "sakaihigashi", "hashimoto", "gokurakubashi"]),
  leg("d5-cable", 5, "纜車到高野山站", "train", ["gokurakubashi", "koyasan-st"]),
  leg("d5-bus", 5, "山內巴士到奧之院", "train", ["koyasan-st", "okunoin"]),
  leg("d5-temples", 5, "下午：金剛峯寺與壇上伽藍", "walk", ["okunoin", "kongobuji", "garan"]),
  leg("d5-daimon", 5, "可選：大門", "walk", ["garan", "daimon"], true),

  leg("d6-bus", 6, "南海巴士到堺站", "train", ["hotel-sakai", "bus-yuya", "sakai"]),
  leg("d6-air", 6, "空港急行到關西機場", "train", ["sakai", "kix"]),
  leg("d6-alt", 6, "可選：堺東轉天下茶屋", "train", ["hotel-sakai", "sakaihigashi", "tengachaya", "kix"], true),
];

export function routesForDays(days: number[]) {
  const wanted = new Set(days);
  return dayRoutes.filter((route) => wanted.has(route.day));
}

export const dayRouteNotes: Record<number, string> = {
  1: "實線是機場到難波日本橋。下午就在道頓堀與心齋橋，不再去堺。",
  2: "紀三井寺是加購時間，不是回程必經。",
  3: "實線走京阪七條。淡線的阪急河原町是備案，步行更遠。",
  4: "早上京阪到東福寺，下午到南禪寺側，傍晚那條長線是回難波取行李再換去堺東。",
  5: "橋本是可能的轉車點，不是每班都要下。山內那段是巴士。纜車只有極樂橋到高野山站那一小段。圖會把堺東到奧之院、金剛峯寺、大門一起放進畫面。",
  6: "實線是南海巴士到堺站，再搭空港急行。淡線是改從堺東轉天下茶屋，不繞難波。",
};
