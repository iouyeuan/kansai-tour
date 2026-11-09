import type { MapMarker } from "./types";
import { markerById } from "./mapMarkersData";

export interface Stay {
  id: string;
  name: string;
  nameJa: string;
  nights: string;
  address: string;
  addressZh: string;
  access: string;
  phone: string;
  website: string;
  checkIn: string;
  checkOut: string;
  breakfast: string;
  lat: number;
  lng: number;
}

function stayFrom(id: string, fields: Omit<Stay, "id" | "lat" | "lng">): Stay {
  const marker: MapMarker = markerById(id);
  return { id, lat: marker.lat, lng: marker.lng, ...fields };
}

const breakfast = "免費早餐約 6:30–9:00。6:00–6:30 只有麵包和咖啡。";

export const stays: Stay[] = [
  stayFrom("hotel-namba", {
    name: "東橫INN大阪難波日本橋",
    nameJa: "東横INN大阪なんば日本橋",
    nights: "11/15（日）入住，11/18（三）早上退房，三晚",
    address: "〒556-0005 大阪府大阪市浪速区日本橋4丁目11番4号",
    addressZh: "大阪府大阪市浪速區日本橋 4 丁目 11 番地 4",
    access: "南海「難波」站步行約 6 分鐘。官網同時寫堺筋線惠美須町站 1-B 出口約 5 分、御堂筋線難波站 4 號出口約 8 分。",
    phone: "06-7668-1045",
    website: "https://www.toyoko-inn.com/search/detail/00254/",
    checkIn: "15:00 起",
    checkOut: "10:00",
    breakfast,
  }),
  stayFrom("hotel-sakai", {
    name: "東橫INN大阪堺東駅",
    nameJa: "東横INN堺東駅",
    nights: "11/18（三）入住，11/20（五）早上退房，兩晚",
    address: "〒590-0952 大阪府堺市堺区市之町東6丁2-14",
    addressZh: "大阪府堺市堺區市之町東 6 丁 2 番地 14",
    access:
      "南海高野線「堺東」站西口。官網寫步行約 6 分，部分訂房頁寫約 7 分。官網另寫到南海本線「堺」站東口約 17 分；這不是已實測的距離，回機場仍以巴士為主。",
    phone: "072-282-1045",
    website: "https://www.toyoko-inn.com/search/detail/00071/",
    checkIn: "15:00 起",
    checkOut: "10:00",
    breakfast,
  }),
];

export const accommodationIntro = {
  eyebrow: "五晚，兩間飯店",
  title: "先難波日本橋，再換堺東",
  body: "11/15 到 11/18 早上住東橫INN大阪難波日本橋，落地與前兩天京都都不用先跑去堺。11/18 傍晚改住東橫INN大阪堺東駅，第 5 天高野山與第 6 天回機場都從高野線堺東出發。不再全程住堺駅前。",
};

export const stayBlocks = [
  {
    title: "落地當天",
    body: "10:40 到關西機場，南海進難波。15:00 前先把行李寄在難波日本橋的櫃台，下午留在心齋橋、道頓堀與飯店旁的日本橋。不必為了入住再去堺。",
  },
  {
    title: "11/18 換房",
    body: "早上可先從難波日本橋退房。行李放櫃台或隨身去京都。傍晚回南海難波取行李，改搭高野線到堺東。入住 15:00 起。行李如果很重，退房後可先送到堺東再北上，多一趟短程，當天櫃台是否收行李以現場為準。",
  },
  {
    title: "高野山與回程",
    body: "後兩晚的站是高野線堺東，不是南海本線堺。回機場若搭巴士，那是南海巴士的付費公車，停熊野小学校前，不是飯店的免費接駁。",
  },
];

export const stayWarnings = [
  "兩間都叫東橫INN，站不一樣。11/18 傍晚以前回難波日本橋，之後回堺東。",
  "堺東這間對的是南海高野線「堺東」。南海本線「堺」與 JR「堺市」都是別的站。",
  "難波這間對的是南海難波。JR 難波在另一邊，不要走到那裡才開始找飯店。",
  "確認信與入住姓名留在自己的信箱。這個行程不放訂房資料。",
  "15:00 入住、10:00 退房是兩間官網目前公開的時段，仍以當天櫃台為準。",
];
