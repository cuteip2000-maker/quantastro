/* Quantastro 帳號與學習歷程（所有頁面共用）
   QA.me()            目前登入的人（沒登入是 null）
   QA.visit(game)     記錄玩過某個遊戲（遊戲頁會自動呼叫）
   QA.achieve(game, key, value)  記錄遊戲內成就，例如 QA.achieve('kaprekar-6174','quiz',8)
   沒有登入的訪客：這些呼叫都會安靜略過，不會出錯 */
(function () {
  var host = location.hostname;
  var API = /(^|\.)quantastro\.org$/.test(host) ? 'https://api.quantastro.org' : location.protocol + '//' + host + ':8787';
  var FLAG = 'qa-login';
  function hasFlag() { try { return localStorage.getItem(FLAG) === '1'; } catch (e) { return false; } }
  function setFlag(on) { try { on ? localStorage.setItem(FLAG, '1') : localStorage.removeItem(FLAG); } catch (e) {} }

  function call(path, opts) {
    opts = opts || {};
    var init = { method: opts.method || 'GET', credentials: 'include', headers: {} };
    if (opts.body !== undefined) { init.headers['Content-Type'] = 'application/json'; init.body = JSON.stringify(opts.body); }
    return fetch(API + path, init).then(function (r) {
      return r.json().catch(function () { return null; }).then(function (data) {
        if (!r.ok) { var e = new Error((data && data.error) || '連線失敗（' + r.status + '）'); e.status = r.status; throw e; }
        return data;
      });
    }, function () { var e = new Error('連不上伺服器，請檢查網路'); e.status = 0; throw e; });
  }

  var meCache = null;
  var QA = {
    api: API,
    call: call,
    me: function (force) {
      if (!hasFlag()) return Promise.resolve(null);
      if (meCache && !force) return meCache;
      meCache = call('/api/me').then(function (d) {
        if (!d || !d.user) setFlag(false);
        return d && d.user || null;
      }, function (e) { if (e.status === 401) setFlag(false); meCache = null; return null; });
      return meCache;
    },
    loginStudent: function (code, seat, pin) {
      return call('/api/student/login', { method: 'POST', body: { code: code, seat: Number(seat), pin: pin } })
        .then(function (d) { setFlag(true); meCache = Promise.resolve(d.user); return d.user; });
    },
    loginTeacher: function (username, password) {
      return call('/api/teacher/login', { method: 'POST', body: { username: username, password: password } })
        .then(function (d) { setFlag(true); meCache = Promise.resolve(d.user); return d.user; });
    },
    setupTeacher: function (setup, username, password) {
      return call('/api/teacher/setup', { method: 'POST', body: { setup: setup, username: username, password: password } })
        .then(function (d) { setFlag(true); meCache = Promise.resolve(d.user); return d.user; });
    },
    logout: function () {
      meCache = null;
      return call('/api/logout', { method: 'POST', body: {} }).catch(function () {}).then(function () { setFlag(false); });
    },
    progress: function () { return call('/api/progress'); },
    visit: function (game) {
      if (!hasFlag()) return Promise.resolve(false);
      return call('/api/visit', { method: 'POST', body: { game: game } }).then(function () { return true; },
        function (e) { if (e.status === 401) setFlag(false); return false; });
    },
    achieve: function (game, key, value) {
      if (!hasFlag()) return Promise.resolve(false);
      return call('/api/achieve', { method: 'POST', body: { game: game, key: key, value: value } }).then(function () { return true; },
        function (e) { if (e.status === 401) setFlag(false); return false; });
    }
  };
  window.QA = QA;

  var m = location.pathname.match(/\/games\/([a-z0-9-]+)\.html$/);
  if (m) QA.me().then(function (u) { if (u && u.kind === 'student') QA.visit(m[1]); });
})();
