# 關西六日・和歌山與京都紅葉

2026/11/15（日）到 11/20（五）。住南海堺站前的東橫INN，和歌山城一天、京都賞楓三天，不排清水寺。航班是台灣虎航：11/15 高雄 06:55 到關西 10:40，11/20 關西 11:30 回高雄。

靜態單頁網站，React、Vite、Tailwind。每日時間軸、地圖、交通、住宿、景點都從 `client/src/lib/` 的資料畫出來。車資與門票是參考數字，頁面上沒有訂房或機票代號。

## 在自己的電腦看

```bash
pnpm install
pnpm dev
```

瀏覽器打開 [http://localhost:5173/kansai-tour/](http://localhost:5173/kansai-tour/)。網址要帶 `/kansai-tour/`，因為這是 GitHub 專案頁的路徑。

要看跟 Pages 一樣的建置結果：

```bash
pnpm run build
pnpm preview
```

然後開 [http://127.0.0.1:4173/kansai-tour/](http://127.0.0.1:4173/kansai-tour/)。

## 用 GitHub Pages 打開

`docs/` 就是建置好的網站（`index.html`、`404.html`、`.nojekyll`）。

1. 打開這個倉庫的 **Settings → Pages**。
2. **Build and deployment** 選 **Deploy from a branch**。
3. Branch 選 **main**，資料夾選 **/docs**，按 Save。
4. 等一分鐘左右，打開 `https://iouyeuan.github.io/kansai-tour/`。

改行程文字或座標之後，在專案根目錄執行 `pnpm run build`，把更新後的 `docs/` 一起提交，Pages 才會換新。

`/day/3` 這類網址在 GitHub Pages 會先落到 `404.html`，再回到首頁交給前端路由，所以分享某一天的連結也可以開。

如果之後改放在自己的網域根目錄，把 `vite.config.ts` 裡的 `base` 改成 `"/"`，再執行一次 `pnpm run build`。

## 列印

右上角「列印」會進整份行程。用瀏覽器的列印或「另存為 PDF」，中文才不會缺字。
