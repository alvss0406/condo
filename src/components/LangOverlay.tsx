import { useState } from 'react';
import { Lang } from '@/lib/translations';
import { playClick } from '@/lib/sound';

interface Props {
  onSelect: (lang: Lang) => void;
}

const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
];

export default function LangOverlay({ onSelect }: Props) {
  const [hiding, setHiding] = useState(false);

  function choose(lang: Lang) {
    playClick();
    setHiding(true);
    setTimeout(() => onSelect(lang), 200);
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${hiding ? 'animate-fade-out' : 'animate-fade-in'}`}
      style={{ background: 'linear-gradient(180deg, #040913 0%, #060c1e 100%)', backdropFilter: 'blur(30px)' }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }}
      />

      {/* Glow blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 max-w-sm w-full">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)',
              boxShadow: '0 0 40px rgba(59,130,246,0.5), 0 0 80px rgba(59,130,246,0.15)',
            }}
          >
            <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-black tracking-tight"
              style={{ background: 'linear-gradient(90deg, #fff 40%, rgba(147,197,253,0.9) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Roblox <span style={{ color: '#60a5fa', WebkitTextFillColor: '#60a5fa', textShadow: '0 0 30px rgba(96,165,250,0.4)' }}>Condo</span>
            </h1>
            <p className="text-sm mt-1" style={{ color: 'rgba(148,163,184,0.8)' }}>Select Language</p>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(100,116,139,0.8)' }}>Choose your language to continue</p>
          </div>
        </div>

        {/* Lang buttons */}
        <div className="grid grid-cols-2 gap-3 w-full">
          {LANGS.map(({ code, label, flag }) => (
            <button
              key={code}
              onClick={() => choose(code)}
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200"
              style={{
                background: 'rgba(37,99,235,0.08)',
                border: '1px solid rgba(59,130,246,0.22)',
              }}
              onMouseEnter={e => {
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
              <span className="text-lg">{flag}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
