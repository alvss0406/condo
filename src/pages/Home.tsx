import { useState, useEffect } from 'react';
import { logVisit } from '@/lib/logger';
import { getGames } from '@/lib/games';
import type { Game } from '@/lib/games';
import { TRANSLATIONS, type Lang } from '@/lib/translations';
import LangOverlay from '@/components/LangOverlay';
import GameCard from '@/components/GameCard';
import GameModal from '@/components/GameModal';
import { playClick } from '@/lib/sound';

const LANG_KEY = 'rc2_lang';

export default function Home() {
  const [lang, setLang] = useState<Lang | null>(null);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(LANG_KEY) as Lang | null;
    if (saved && ['en', 'es', 'pt', 'ru'].includes(saved)) {
      setLang(saved);
    }
    // Log visit
    logVisit();
    const timer = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(timer);
  }, []);

  function handleLangSelect(l: Lang) {
    localStorage.setItem(LANG_KEY, l);
    setLang(l);
  }

  function handleChangeLang() {
    playClick();
    setLang(null);
    localStorage.removeItem(LANG_KEY);
  }

  const t = TRANSLATIONS[lang ?? 'en'];
  const games = getGames(t);

  return (
    <>
      {/* Language overlay */}
      {!lang && <LangOverlay onSelect={handleLangSelect} />}

      {/* Main app */}
      <div
        className="min-h-screen text-white flex flex-col relative"
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s ease', fontFamily: "'Outfit', 'Inter', sans-serif" }}
      >
        {/* Ambient glow */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.08) 0%, transparent 70%)', filter: 'blur(90px)' }}
          />
          <div
            className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(29,78,216,0.06) 0%, transparent 70%)', filter: 'blur(90px)' }}
          />
        </div>

        {/* Header */}
        <header
          className="relative z-10 sticky top-0"
          style={{
            background: 'rgba(4,9,19,0.80)',
            borderBottom: '1px solid rgba(59,130,246,0.14)',
            boxShadow: '0 1px 0 rgba(59,130,246,0.08), 0 4px 40px rgba(4,9,19,0.8)',
            backdropFilter: 'blur(28px) saturate(160%)',
          }}
        >
          <div className="max-w-2xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)',
                  boxShadow: '0 0 20px rgba(59,130,246,0.55), 0 0 0 1px rgba(59,130,246,0.3)',
                }}
              >
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <span
                className="font-black text-base tracking-tight"
                style={{
                  background: 'linear-gradient(90deg, #fff 40%, rgba(147,197,253,0.9) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: '1.05rem',
                  letterSpacing: '-0.02em',
                }}
              >
                Roblox <span style={{ color: '#60a5fa', WebkitTextFillColor: '#60a5fa' }}>Condo</span>
              </span>
            </div>

            {lang && (
              <button
                onClick={handleChangeLang}
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200"
                style={{
                  background: 'rgba(37,99,235,0.08)',
                  border: '1px solid rgba(59,130,246,0.18)',
                  color: 'rgba(148,163,184,0.8)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(59,130,246,0.14)';
                  (e.currentTarget as HTMLButtonElement).style.color = '#93c5fd';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(37,99,235,0.08)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'rgba(148,163,184,0.8)';
                }}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                {lang?.toUpperCase()}
              </button>
            )}
          </div>
        </header>

        {/* Main content */}
        <main className="relative z-10 flex-1 max-w-2xl mx-auto w-full px-6 py-10">
          {/* Hero */}
          <div className="mb-10 text-center">
            {/* Welcome badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-xs font-semibold"
              style={{
                background: 'rgba(37,99,235,0.12)',
                border: '1px solid rgba(59,130,246,0.28)',
                boxShadow: '0 0 12px rgba(59,130,246,0.1)',
                color: '#93c5fd',
              }}>
              <span
                className="w-1.5 h-1.5 rounded-full pulse-dot"
                style={{ background: '#3b82f6', boxShadow: '0 0 8px rgba(59,130,246,0.8)' }}
              />
              LIVE
            </div>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none mb-4">
              <span style={{
                background: 'linear-gradient(90deg, #fff 40%, rgba(147,197,253,0.85) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                {t.welcome.split(' ').slice(0, -1).join(' ')}{' '}
              </span>
              <span style={{ color: '#60a5fa', textShadow: '0 0 30px rgba(96,165,250,0.4)', WebkitTextFillColor: '#60a5fa' }}>
                {t.welcome.split(' ').slice(-1)[0]}
              </span>
            </h1>

            <p className="text-sm max-w-md mx-auto leading-relaxed" style={{ color: 'rgba(148,163,184,0.8)' }}>
              {t.subtitle}
            </p>
          </div>

          {/* Games section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2
                  className="text-xl font-black tracking-tight"
                  style={{
                    background: 'linear-gradient(90deg, #fff 0%, rgba(147,197,253,0.85) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {t.featuredGames}
                </h2>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(100,116,139,0.9)' }}>{t.gamesAvailable}</p>
              </div>
            </div>

            <div className="space-y-3">
              {games.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onClick={() => setSelectedGame(game)}
                  label={t.playNow}
                />
              ))}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="relative z-10 text-center py-6 text-xs"
          style={{ color: 'rgba(71,85,105,0.6)', borderTop: '1px solid rgba(59,130,246,0.06)' }}>
          © {new Date().getFullYear()} Roblox Condo. All rights reserved.
        </footer>
      </div>

      {/* Game modal */}
      {selectedGame && (
        <GameModal
          game={selectedGame}
          t={t}
          onClose={() => setSelectedGame(null)}
        />
      )}
    </>
  );
}
