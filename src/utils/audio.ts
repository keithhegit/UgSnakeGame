const audioCache: { [key: string]: HTMLAudioElement } = {};

export function loadSound(name: string) {
  if (!audioCache[name]) {
    const audio = new Audio(`/sounds/${name}.wav`);
    audio.load();
    audioCache[name] = audio;
  }
  return audioCache[name];
}

export function playSound(name: string) {
  if (document.body.classList.contains('user-interacted')) {
    const audio = loadSound(name);
    audio.currentTime = 0;
    audio.play().catch(error => {
      console.warn(`Failed to play sound ${name}:`, error);
    });
  }
}

document.addEventListener('click', () => {
  document.body.classList.add('user-interacted');
}, { once: true }); 