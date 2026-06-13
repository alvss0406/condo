(function () {
  'use strict';

  var LANG_KEY = 'rc2_lang';

  /* ── IP Access limit ────────────────────────────────── */
  function showBlockScreen() {
    var block = document.createElement('div');
    block.id = 'rc-blocked';
    block.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:9999999',
      'background:linear-gradient(180deg,#040913 0%,#060c1e 100%)',
      'display:flex', 'flex-direction:column',
      'align-items:center', 'justify-content:center',
      'font-family:Outfit,Inter,sans-serif',
      'gap:16px',
    ].join(';');

    var icon = document.createElement('div');
    icon.style.cssText = [
      'width:64px', 'height:64px', 'border-radius:50%',
      'background:linear-gradient(135deg,#1d4ed8,#3b82f6)',
      'display:flex', 'align-items:center', 'justify-content:center',
      'box-shadow:0 0 40px rgba(59,130,246,0.5)',
      'font-size:28px',
    ].join(';');
    icon.textContent = '🔒';

    var title = document.createElement('div');
    title.style.cssText = [
      'color:#fff', 'font-size:22px', 'font-weight:800',
      'letter-spacing:-0.03em',
    ].join(';');
    title.textContent = 'Access Limit Reached';

    var sub = document.createElement('div');
    sub.style.cssText = [
      'color:rgba(147,197,253,0.7)', 'font-size:14px',
      'font-weight:500', 'text-align:center', 'max-width:320px',
      'line-height:1.6',
    ].join(';');
    sub.textContent = 'You have exceeded the maximum number of accesses (10) from your IP address.';

    block.appendChild(icon);
    block.appendChild(title);
    block.appendChild(sub);
    document.body.appendChild(block);
    document.body.style.overflow = 'hidden';
  }

  function checkIpAccess() {
    fetch('/api/check-access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (!data.allowed) {
          showBlockScreen();
        }
      })
      .catch(function () {});
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkIpAccess);
  } else {
    checkIpAccess();
  }

  /* ── Sound ─────────────────────────────────────────── */
  var audio = null;
  function playClick() {
    try {
      if (!audio) {
        audio = new Audio('/click-sound.mp3');
        audio.volume = 0.5;
      }
      audio.currentTime = 0;
      audio.play().catch(function () {});
    } catch (e) {}
  }

  /* ── Token enforcement ─────────────────────────────── */
  var tokenGeneratedInSession = false;

  var WARN_MSGS = {
    en: 'Generate a token first to access the game.',
    es: 'Genera un token primero para acceder al juego.',
    pt: 'Gere um token primeiro para acessar o jogo.',
    ru: 'Сначала создайте токен, чтобы войти в игру.',
  };

  function showWarning() {
    var lang = localStorage.getItem(LANG_KEY) || 'en';
    var msg = WARN_MSGS[lang] || WARN_MSGS.en;
    var existing = document.getElementById('rc-token-warning');
    if (existing) return;
    var warn = document.createElement('div');
    warn.id = 'rc-token-warning';
    warn.style.cssText = [
      'position:fixed', 'bottom:24px', 'left:50%', 'transform:translateX(-50%)',
      'background:#1c2028', 'border:1px solid #ef4444', 'color:#fca5a5',
      'font-size:13px', 'font-weight:600', 'padding:10px 20px',
      'border-radius:12px', 'z-index:999999', 'white-space:nowrap',
      'box-shadow:0 4px 20px rgba(0,0,0,.6)',
      'font-family:Inter,sans-serif',
    ].join(';');
    warn.textContent = msg;
    document.body.appendChild(warn);
    setTimeout(function () { warn.remove(); }, 2800);
  }

  /* ── Language overlay logic ─────────────────────────── */
  function dismissOverlay(lang) {
    localStorage.setItem(LANG_KEY, lang);
    var overlay = document.getElementById('rc-lang-overlay');
    if (overlay) {
      overlay.style.animation = 'rc-fadeout .2s ease forwards';
      setTimeout(function () { overlay.classList.add('rc-hidden'); }, 210);
    }
  }

  /* ── MutationObserver: sound + token enforcement ───── */
  var observer = new MutationObserver(function () {
    /* Sound on all buttons and links */
    document.querySelectorAll('button:not([data-rc-s]), a:not([data-rc-s])').forEach(function (el) {
      el.setAttribute('data-rc-s', '1');
      el.addEventListener('click', playClick);
    });

    /* Enforce token before Access Game */
    document.querySelectorAll('[data-testid="button-access-game"]:not([data-rc-e])').forEach(function (el) {
      el.setAttribute('data-rc-e', '1');
      el.addEventListener('click', function (e) {
        if (!tokenGeneratedInSession) {
          e.preventDefault();
          e.stopImmediatePropagation();
          showWarning();
        }
      }, true);
    });

    /* Track when token is generated */
    document.querySelectorAll('[data-testid="button-generate-token"]:not([data-rc-t])').forEach(function (el) {
      el.setAttribute('data-rc-t', '1');
      el.addEventListener('click', function () {
        tokenGeneratedInSession = true;
      });
    });
  });

  /* Reset token state when a modal closes */
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t) return;
    if (
      (t.tagName === 'BUTTON' && t.dataset && t.dataset.testid === 'button-close-modal') ||
      t.id === 'rc-lang-overlay'
    ) {
      tokenGeneratedInSession = false;
    }
  }, true);

  /* ── Wire up language buttons ───────────────────────── */
  document.querySelectorAll('#rc-lang-overlay .rc-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      playClick();
      dismissOverlay(btn.dataset.lang);
    });
  });

  /* ── Start observing ────────────────────────────────── */
  observer.observe(document.body, { childList: true, subtree: true });

})();
