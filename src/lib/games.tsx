import { ReactNode } from 'react';
import type { T } from './translations';

export interface Game {
  id: string;
  name: string;
  description: string;
  tag: string;
  url: string;
  icon: () => ReactNode;
}

function SwordIcon() {
  return (
    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 17.5L3 6V3h3l11.5 11.5"/>
      <path d="M13 19l6-6"/>
      <path d="M16 16l4 4"/>
      <path d="M19 21l2-2"/>
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  );
}

function StarIcon() {
  return (
    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}

export function getGames(t: T): Game[] {
  return [
    {
      id: 'fun-combat',
      name: 'Fun Combat',
      description: 'Jump into intense battles with friends. Fast-paced action with unique mechanics and epic arenas that keep you on the edge of your seat.',
      tag: t.tagAction,
      url: 'https://roblox.com.ug/games/78896868574590/Untitled-C-Experience-New?privateServerLinkCode=88924758311736364864455513835573',
      icon: ZapIcon,
    },
    {
      id: 'sex-game',
      name: 'Sex Game',
      description: 'Explore a creative interactive world filled with challenges, surprises, and social gameplay. Connect with players from around the globe.',
      tag: t.tagSocial,
      url: 'https://roblox.com.ug/games/78896868574590/Untitled-C-Experience-New?privateServerLinkCode=88924758311736364864455513835573',
      icon: UsersIcon,
    },
    {
      id: 'sword-game',
      name: 'Sword Game',
      description: 'Master the art of blade combat. Duel opponents, unlock legendary weapons, and rise through the ranks to become the ultimate swordsman.',
      tag: t.tagCombat,
      url: 'https://roblox.com.ug/games/78896868574590/Untitled-C-Experience-New?privateServerLinkCode=88924758311736364864455513835573',
      icon: SwordIcon,
    },
    {
      id: 'roblox-condo',
      name: 'Roblox Condo',
      description: 'The original exclusive condo experience. Premium access to private servers, exclusive rooms, and unique gameplay found nowhere else.',
      tag: t.tagExclusive,
      url: 'https://roblox.com.ug/games/78896868574590/Untitled-C-Experience-New?privateServerLinkCode=88924758311736364864455513835573',
      icon: StarIcon,
    },
  ];
}
