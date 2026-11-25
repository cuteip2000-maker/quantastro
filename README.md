# Quantastro 新增內容指南

網站：<https://quantastro.org>

## 網站的結構

| 位置 | 放什麼 | 怎麼更新 |
|---|---|---|
| `index.html` | 首頁 | 平常不用改 |
| `data/catalog.js` | **首頁內容清單** | **新增內容主要改這裡** |
| `island/` | 星星糖好奇島 | 由建置程式產生 |
| `games/` | 互動遊戲 HTML | 放入檔案 |
| `resources/` | PDF、學習單、簡報 | 放入檔案 |
| `images/` | 封面圖片 | 放入檔案 |
| `data/island-games.js` | 島上遊戲資料 | 自動產生，不要手改 |

## 最簡單的方式：直接告訴 Claude

例如：

- 「把這部 YouTube 影片放上網站：（網址），分類天文」
- 「把這份 PDF 加到教學資源」
- 「做一個新遊戲，放進島上，並更新網站」

## 自己新增

打開 `data/catalog.js`，在「新內容加在這一行下面」之後加一行。

**影片**（`youtube` 是網址 `watch?v=` 後面的 11 個字元）

```js
{ type:'video', title:'影片名稱', desc:'一句話介紹', youtube:'影片ID', topic:'天文', date:'2026-12-01' },
```

**教學資源**（先把檔案放進 `resources/`，檔名建議用英文）

```js
{ type:'resource', title:'學習單名稱', desc:'一句話介紹', url:'resources/worksheet.pdf', topic:'數學', date:'2026-12-01' },
```

**不在島上的遊戲**（先把 HTML 放進 `games/`）

```js
{ type:'game', title:'遊戲名稱', desc:'一句話介紹', url:'games/my-game.html', topic:'物理', date:'2026-12-01' },
```

**產品或外部連結**

```js
{ type:'product', title:'產品名稱', desc:'一句話介紹', url:'https://example.com', image:'images/product.jpg', date:'2026-12-01' },
```

可選欄位：`series` 是系列名稱（例如 `series:'科學家故事'`，同系列會自動出現分類按鈕，也能用 `quantastro.org/#series=科學家故事` 直接分享整個系列），`image` 是封面圖，`featured:true` 會放進主打作品，`isNew:true` 會顯示 NEW 並排到前面。

注意：每一筆結尾要有逗號，文字要用單引號包起來。

## 用 GitHub 網頁更新

1. 打開 [catalog.js](https://github.com/cuteip2000-maker/quantastro/blob/main/data/catalog.js)，按右上角鉛筆。
2. 加上新內容，按 **Commit changes**。
3. 等一到兩分鐘，重新整理網站。

上傳檔案：進入資料夾，按 **Add file → Upload files**。

## 容量建議

- **影片放 YouTube**，網站只放連結。GitHub 單一檔案上限是 100 MB，整個網站建議低於 1 GB。
- 圖片盡量壓到 300 KB 以下。
- 網站與這個儲存庫都是公開的。學生資料、成績、內部文件不要放進來。

## 學生帳號與學習歷程

| 位置 | 用途 |
|---|---|
| `account/` | 學生登入，以及「我的學習歷程」 |
| `teacher/` | 老師後台：建班、列印登入卡、看進度、重設密碼、匯出 CSV |
| `qa.js` | 每個頁面共用的帳號程式；遊戲頁打開時會自動記錄 |
| `island-account.js` | 讓好奇島的探索護照跟帳號同步 |

後端放在 Cloudflare（`api.quantastro.org`），原始碼在另一個資料夾 `quantastro-api`，不在這個儲存庫。

- 學生用「班級代碼＋座號＋4 位數密碼」登入，不需要 email。
- 資料庫不存學生姓名、生日或 email。
- 新老師要用「開通碼」到 `teacher/` 自己建立帳號。
- 遊戲想記錄闖關成就時，可以呼叫 `QA.achieve('遊戲檔名', '成就代號', 數值)`，沒登入時會自動略過。
