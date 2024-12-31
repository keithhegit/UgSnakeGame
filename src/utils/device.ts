export function isMobile(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export function isTouch(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
} 