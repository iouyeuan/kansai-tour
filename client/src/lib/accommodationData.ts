import { markerById } from "./mapMarkersData";

const hotel = markerById("hotel");

export const accommodation = {
  name: "東橫INN大阪堺駅前",
  nameJa: "東横INN大阪堺駅前",
  address: "〒590-0985 大阪府堺市堺区戎島町2丁目74番地1",
  addressZh: "大阪府堺市堺區戎島町 2 丁目 74 番地 1",
  access: "南海本線「堺」駅東口，步行約 3 分鐘",
  phone: "072-225-5645",
  website: "https://www.toyoko-inn.com/search/detail/00366/",
  checkIn: "15:00 起",
  checkOut: "10:00",
  breakfast: "免費飯糰，約 6:30–9:00。6:00 起提供輕食。",
  nights: "11/15（日）入住，11/20（五）早上退房，共五晚",
  lat: hotel.lat,
  lng: hotel.lng,
  areaTitle: "為什麼住堺，不住京都",
  areaBody:
    "京都紅葉季的早晨要早到，但晚上把行李留在南海堺站，隔天去和歌山或京都都不用搬家。堺站往難波約 10 多分鐘，往關西機場的空港急行約 40–50 分，比住在京都車站再跑機場單純。",
  blocks: [
    {
      title: "落地當天",
      body: "10:40 降落，出關後直達飯店大約中午。15:00 前只能寄行李。寄完再決定去大仙陵或難波，不用把箱子拖去道頓堀。",
    },
    {
      title: "清晨出發",
      body: "第 2 天到第 6 天都是 07:30–08:00 左右出門。先吃飯店飯糰，再走 3 分鐘進站。回程若超過 17:00 才從京都移動，到堺多半是 18:30–19:30。",
    },
    {
      title: "附近怎麼吃",
      body: "不想再搭車時，堺站東口與大小路周邊就能吃拉麵。一蘭、金龍留在人已經到難波的晚上，不為了這兩家專程出門。",
    },
  ],
  warnings: [
    "住宿站是南海「堺」，不是 JR「堺市」。JR 堺市站在東南方，走路會錯。",
    "入住用護照與訂房時留下的姓名。確認信留在自己的信箱，不必抄到這個行程裡。",
    "入住與退房時間以飯店當日公告為準。上面的 15:00／10:00 是官網公開時段。",
  ],
};

export const stayFacts = [
  { label: "入住", value: accommodation.checkIn },
  { label: "退房", value: accommodation.checkOut },
  { label: "早餐", value: accommodation.breakfast },
  { label: "電話", value: accommodation.phone },
  { label: "住宿", value: accommodation.nights },
];
