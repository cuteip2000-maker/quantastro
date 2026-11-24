/* 好奇島的帳號功能：登入後，探索護照改用帳號裡的紀錄（換裝置也看得到）
   沒有登入時維持原本的做法，只記在這台裝置 */
(function () {
  if (!window.QA || typeof ZONES === 'undefined') return;
  var FILE2U = {};
  Object.keys(GAME_FILES).forEach(function (u) { FILE2U[GAME_FILES[u].replace(/\.html$/, '')] = u; });

  var css = document.createElement('style');
  css.textContent = '.qa-side{display:flex;flex-direction:column;align-items:flex-end;gap:6px}' +
    '.qa-acct{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:6px;font:700 13px/1.4 "Noto Sans TC",sans-serif}' +
    '.qa-acct a,.qa-acct button{background:var(--paper,#fff);border:2px solid var(--ink,#2f4a6d);border-radius:999px;padding:2px 11px;color:inherit;text-decoration:none;cursor:pointer;font:inherit}' +
    '.qa-acct .me{background:#fff2b8}';
  document.head.appendChild(css);

  var pass = document.querySelector('.pass');
  var side = document.createElement('div'); side.className = 'qa-side';
  pass.parentNode.insertBefore(side, pass); side.appendChild(pass);
  var acct = document.createElement('div'); acct.className = 'qa-acct'; side.appendChild(acct);
  var foot = document.querySelector('.foot');

  function guestUI() {
    acct.innerHTML = '<a href="../account/?next=island">登入，把護照存到帳號</a>';
    if (foot) foot.textContent = '沒有登入時，「探索護照」只記在這台裝置的瀏覽器裡。登入後會存到你的帳號，換電腦也看得到。';
  }
  function rerender() { updPass(); show((location.hash || '').slice(1) || ZONES[0].id); }

  QA.me().then(function (u) {
    if (!u || u.kind !== 'student') { guestUI(); return; }
    acct.innerHTML = '<a class="me" href="../account/">' + String(u.className).replace(/[&<>"']/g, '') + ' · ' + u.seat + ' 號的學習歷程</a><button type="button">登出</button>';
    acct.querySelector('button').onclick = function () {
      QA.logout().then(function () {
        seen = new Set();
        try { seen = new Set(JSON.parse(localStorage.getItem('island-seen') || '[]')); } catch (e) {}
        saveSeen = function () { try { localStorage.setItem('island-seen', JSON.stringify(Array.from(seen))); } catch (e) {} };
        guestUI(); rerender();
      });
    };
    if (foot) foot.textContent = '你已登入，「探索護照」存在你的帳號裡。用共用電腦的話，玩完記得登出。';
    // 登入時，護照只顯示帳號裡的紀錄，不把這台電腦上別人的紀錄算進來
    saveSeen = function () {};
    seen = new Set();
    rerender();
    QA.progress().then(function (d) {
      d.progress.forEach(function (p) { var k = FILE2U[p.game]; if (k) seen.add(k); });
      rerender();
    }, function () {});
  });
})();
