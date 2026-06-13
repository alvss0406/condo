import { playClick } from '@/lib/sound';
import type { Game } from '@/lib/games';

interface Props {
  game: Game;
  onClick: () => void;
  label: string;
}

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  default: { bg: 'rgba(37,99,235,0.15)', text: '#60a5fa' },
};

export default function GameCard({ game, onClick, label }: Props) {
  function handleClick() {
    playClick();
    onClick();
  }

  return (
    <button
      data-testid={`card-game-${game.id}`}
      onClick={handleClick}
      className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-left group transition-all duration-300 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(15,25,55,0.9) 0%, rgba(10,18,42,0.9) 100%)',
        border: '1px solid rgba(59,130,246,0.12)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
        backdropFilter: 'blur(16px)',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLButtonElement;
        el.style.background = 'linear-gradient(135deg, rgba(20,35,75,0.95) 0%, rgba(14,24,55,0.95) 100%)';
        el.style.borderColor = 'rgba(59,130,246,0.35)';
        el.style.boxShadow = '0 0 0 1px rgba(59,130,246,0.15), 0 8px 40px rgba(59,130,246,0.12), 0 4px 24px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)';
        el.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLButtonElement;
        el.style.background = 'linear-gradient(135deg, rgba(15,25,55,0.9) 0%, rgba(10,18,42,0.9) 100%)';
        el.style.borderColor = 'rgba(59,130,246,0.12)';
        el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)';
        el.style.transform = 'translateY(0)';
      }}
    >
      {/* Left accent line on hover */}
      <div className="absolute left-0 top-[15%] bottom-[15%] w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(180deg, transparent, #3b82f6, transparent)' }} />

      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          background: 'linear-gradient(135deg, #1d4ed8, #2563eb)',
          boxShadow: '0 0 20px rgba(37,99,235,0.4)',
        }}
      >
        <game.icon />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[15px] font-semibold text-white tracking-tight truncate">{game.name}</span>
          <span
            className="text-[0.62rem] font-semibold px-1.5 py-0.5 rounded-md uppercase tracking-wide flex-shrink-0"
            style={{ ...TAG_COLORS.default, background: TAG_COLORS.default.bg, color: TAG_COLORS.default.text }}
          >
            {game.tag}
          </span>
        </div>
        <p className="text-xs mt-0.5 truncate" style={{ color: 'rgba(148,163,184,0.7)' }}>{game.description}</p>
      </div>

      {/* Play button hint */}
      <div
        className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity"
        style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)' }}
      >
        <svg className="w-3.5 h-3.5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 19 12 5 21 5 3"/>
        </svg>
      </div>
    </button>
  );
}
