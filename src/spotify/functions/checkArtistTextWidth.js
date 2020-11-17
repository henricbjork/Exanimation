export const checkArtistTextWidth = () => {
  const artistTextDiv = document.querySelector(".current-text-artist");
  const artistText = document.querySelector(".current-text-artist p");
  const root = document.querySelector(':root');
  artistTextDiv.classList.remove('translateArtist');
  if(artistText.innerHTML.length>=28) {
    const length = artistText.innerHTML.length * 7.5; // Magic number / approximate character length in pixels
    root.style.setProperty('--animation-artist-length', `${length}px`)
    artistTextDiv.classList.add('translateArtist');
  }
}
