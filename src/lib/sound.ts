let audio: HTMLAudioElement | null = null;

export function playClick(): void {
  try {
    if (!audio) {
      audio = new Audio('/click-sound.mp3');
      audio.volume = 0.5;
    }
    audio.currentTime = 0;
    audio.play().catch(() => {});
  } catch {
    // silent
  }
}
