export const checkArtistTextWidth = () => {
  const artistTextDiv = document.querySelector(".current-text-artist");
  const artistText = document.querySelector(".current-text-artist p");
  artistTextDiv.classList.remove('translate');
  if(artistText.innerHTML.length>=28) {
    artistTextDiv.classList.add('translate');
  }
}
