export const checkSongTextWidth = () => {
  const songTextDiv = document.querySelector(".current-text-song");
  const songText = document.querySelector(".current-text-song p");
  const root = document.querySelector(':root');
  songTextDiv.classList.remove('translateSong');
  if(songText.innerHTML.length>=27) {
    const length = songText.innerHTML.length * 7.5; // Magic number / approximate character length in pixels
    root.style.setProperty('--animation-song-length', `${length}px`)
    songTextDiv.classList.add('translateSong');
  }
}
