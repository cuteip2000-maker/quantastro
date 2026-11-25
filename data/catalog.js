/* ==========================================================
   Quantastro 內容清單：想在首頁新增內容，只要改這個檔案
   詳細說明請看 README.md

   每一筆用 { } 包起來，結尾加逗號。可用的 type：
     world     互動世界（像好奇島這種大型作品）
     game      單獨的互動遊戲
     video     影片（填 youtube，放 YouTube 影片 ID）
     resource  教學資源（學習單、簡報、PDF）
     product   我設計的產品

   範例（刪掉開頭的 // 再改內容就能使用）：
   // { type:'video', title:'影片名稱', desc:'一句話介紹', youtube:'dQw4w9WgXcQ', topic:'天文', date:'2026-12-01' },
   // { type:'resource', title:'學習單名稱', desc:'一句話介紹', url:'resources/worksheet.pdf', topic:'數學', date:'2026-12-01' },
   // { type:'product', title:'產品名稱', desc:'一句話介紹', url:'https://example.com', image:'images/product.jpg', date:'2026-12-01' },
   // { type:'game', title:'遊戲名稱', desc:'一句話介紹', url:'games/my-game.html', topic:'物理', date:'2026-12-01' },

   同一系列的影片加上 series:'系列名稱'，例如 series:'科學家故事'，影片區會自動出現系列分類
   想放到首頁最上方的大卡片，加上 featured:true
   ========================================================== */
window.SITE_ITEMS = [
  {
    type: 'world',
    title: '星星糖好奇島',
    desc: '一座可以旋轉的小島，五個地區藏著 40 個科學與數學遊戲。從火箭碼頭出發，一路玩到數學迷宮花園。',
    url: 'island/',
    topic: '科學探索',
    featured: true,
    date: '2026-11-23'
  },

  /* ↓ 新內容加在這一行下面 ↓ */
  { type:'video', title:'發光的元素：居禮夫人', desc:'居禮夫人從成噸的礦石裡提煉出會發光的鐳，成為第一位兩度獲得諾貝爾獎的人。4 分 50 秒。', youtube:'Hzd2q2MzC20', series:'科學家故事', topic:'化學', isNew:true, date:'2026-11-25' },
  { type:'video', title:'化名的數學家：索菲・熱爾曼', desc:'女性不能進大學的年代，熱爾曼化名「勒布朗先生」自學數學，還在費馬最後定理留下重要成果。5 分 05 秒。', youtube:'mfH9f2pxfAI', series:'科學家故事', topic:'數學', date:'2026-11-25' },
  { type:'video', title:'巴塞爾問題：歐拉與 π 的驚喜', desc:'1＋¼＋⅑＋… 一直加下去會等於多少？歐拉算出答案竟然是 π²/6。4 分 55 秒。', youtube:'aAYRdRgP3FY', topic:'數學', date:'2026-11-25' },
  { type:'video', title:'星艦第 15 次試飛', desc:'老師當主播，34 秒快速看完星艦第 15 次試飛。', youtube:'9O79g_kDOUs', topic:'太空', date:'2026-11-25' },
  { type:'video', title:'宇宙的量尺：勒維特的故事', desc:'勒維特從造父變星的明暗變化裡，找到量測宇宙距離的方法。4 分 52 秒。', youtube:'4Z8ORDTJ9O0', series:'科學家故事', topic:'天文', date:'2026-11-24' },
  { type:'video', title:'七十二歲的第一次', desc:'七十二歲那年，第一次騎上腳踏車的故事。完整版短片，6 分 16 秒。', youtube:'kjX64R1BCMw', topic:'短片', date:'2026-11-23' },

];
