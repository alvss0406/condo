import { useState } from 'react';
import type { Game } from '@/lib/games';
import type { T } from '@/lib/translations';
import { generateToken } from '@/lib/token';
import { logGameAccess } from '@/lib/logger';
import { playClick } from '@/lib/sound';

interface Props {
  game: Game;
  t: T;
  onClose: () => void;
}

export default function GameModal({ game, t, onClose }: Props) {
  const [token, setToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [tokenWarning, setTokenWarning] = useState(false);

  function handleGenerateToken() {
    playClick();
    const tk = generateToken();
    setToken(tk);
  }

  function handleAccessGame() {
    playClick();
    if (!token) {
      setTokenWarning(true);
      setTimeout(() => setTokenWarning(false), 2800);
      return;
    }
    window.open(game.url, '_blank', 'noopener,noreferrer');
    logGameAccess(game.name, token);
  }

  function handleCopy() {
    playClick();
    if (!token) return;
    navigator.clipboard.writeText(token).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  function handleClose() {
    playClick();
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center p-4 animate-fade-in"
      style={{ background: 'rgba(4,9,19,0.82)', backdropFilter: 'blur(12px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden animate-fade-in"
        style={{
          background: 'linear-gradient(180deg, rgba(12,22,50,0.98) 0%, rgba(8,16,38,0.98) 100%)',
          border: '1px solid rgba(59,130,246,0.2)',
          boxShadow: '0 0 0 1px rgba(59,130,246,0.08), 0 40px 80px rgba(0,0,0,0.8), 0 0 100px rgba(37,99,235,0.08), inset 0 1px 0 rgba(255,255,255,0.05)',
          backdropFilter: 'blur(40px)',
        }}
      >
        {/* Glow line at top */}
        <div className="absolute top-0 left-[20%] right-[20%] h-px z-10"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.6), transparent)' }} />

        {/* Banner */}
        <div className="relative h-36 flex items-center justify-center"
          style={{ background: 'linear-gradient(180deg, #0a1833 0%, #060d22 100%)' }}>
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)',
              boxShadow: '0 0 40px rgba(59,130,246,0.5), 0 0 80px rgba(59,130,246,0.15), 0 8px 16px rgba(0,0,0,0.5)',
            }}
          >
            <game.icon />
          </div>

          {/* Close button */}
          <button
            data-testid="button-close-modal"
            onClick={handleClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
            style={{
              background: 'rgba(37,99,235,0.12)',
              border: '1px solid rgba(59,130,246,0.2)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(59,130,246,0.2)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(59,130,246,0.4)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(37,99,235,0.12)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(59,130,246,0.2)';
            }}
          >
            <svg className="w-4 h-4 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Title + tag */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-white tracking-tight">{game.name}</h2>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(148,163,184,0.7)' }}>{game.description}</p>
            </div>
            <span
              className="text-[0.6rem] font-semibold px-2 py-1 rounded-md uppercase tracking-wide flex-shrink-0 mt-0.5"
              style={{ background: 'rgba(37,99,235,0.15)', color: '#60a5fa' }}
            >
              {game.tag}
            </span>
          </div>

          {/* Entry requirements */}
          <div className="rounded-xl p-4 space-y-2"
            style={{ background: 'rgba(37,99,235,0.05)', border: '1px solid rgba(59,130,246,0.12)' }}>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(59,130,246,0.14)' }}>
                <svg className="w-3.5 h-3.5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <span className="text-xs font-semibold text-white">{t.entryRequirements}</span>
            </div>
            <p className="text-xs pl-8" style={{ color: 'rgba(148,163,184,0.75)' }}>
              <span style={{ color: '#f87171' }}>{t.accountAge} </span>
              {t.entryNote}
            </p>
            <p className="text-xs pl-8" style={{ color: 'rgba(148,163,184,0.6)' }}>{t.securityNote}</p>
          </div>

          {/* Token section */}
          <div className="rounded-xl p-4 space-y-3"
            style={{ background: 'rgba(37,99,235,0.05)', border: '1px solid rgba(59,130,246,0.12)' }}>
            <p className="text-xs" style={{ color: 'rgba(148,163,184,0.8)' }}>
              {t.generateToken}{' '}
              <span className="font-semibold text-blue-400">{t.tokenHint}</span>{' '}
              {t.tokenNote}
            </p>

            {token && (
              <div className="flex items-center gap-2 rounded-lg px-3 py-2"
                style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(59,130,246,0.1)' }}>
                <span className="flex-1 font-mono text-xs truncate" style={{ color: '#93c5fd', fontSize: '0.7rem' }}>
                  {token}
                </span>
                <button
                  onClick={handleCopy}
                  className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150"
                  style={{
                    background: 'rgba(37,99,235,0.1)',
                    border: '1px solid rgba(59,130,246,0.18)',
                  }}
                  title={t.copyToken}
                  onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'rgba(59,130,246,0.2)'}
                  onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'rgba(37,99,235,0.1)'}
                >
                  {copied
                    ? <svg className="w-3.5 h-3.5 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    : <svg className="w-3.5 h-3.5 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  }
                </button>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="space-y-2.5">
            {/* Generate token */}
            <button
              data-testid="button-generate-token"
              onClick={handleGenerateToken}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 60%, #2563eb 100%)',
                boxShadow: '0 0 0 1px rgba(59,130,246,0.3), 0 4px 20px rgba(37,99,235,0.4), inset 0 1px 0 rgba(255,255,255,0.15)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(135deg, #2563eb 0%, #60a5fa 60%, #3b82f6 100%)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 0 1px rgba(96,165,250,0.5), 0 6px 30px rgba(59,130,246,0.55), inset 0 1px 0 rgba(255,255,255,0.2)';
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 60%, #2563eb 100%)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 0 1px rgba(59,130,246,0.3), 0 4px 20px rgba(37,99,235,0.4), inset 0 1px 0 rgba(255,255,255,0.15)';
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
              }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
              {token ? t.tokenAlreadyGenerated : t.generateAccessToken}
            </button>

            {/* Access game */}
            <button
              data-testid="button-access-game"
              onClick={handleAccessGame}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200"
              style={{
                background: 'rgba(37,99,235,0.08)',
                border: '1px solid rgba(59,130,246,0.22)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
                opacity: token ? 1 : 0.5,
              }}
              onMouseEnter={e => {
                if (!token) return;
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(59,130,246,0.14)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(59,130,246,0.4)';
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(37,99,235,0.08)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(59,130,246,0.22)';
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
              }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              {t.accessGame}
            </button>
          </div>
        </div>

        {/* Token warning toast */}
        {tokenWarning && (
          <div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 text-xs font-semibold px-5 py-2.5 rounded-xl animate-fade-in whitespace-nowrap"
            style={{
              background: 'linear-gradient(135deg, #0c1a3d, #0f2259)',
              border: '1px solid rgba(59,130,246,0.4)',
              color: '#93c5fd',
              boxShadow: '0 8px 32px rgba(37,99,235,0.3)',
            }}
          >
            {t.tokenWarning}
          </div>
        )}
      </div>
    </div>
  );
}
