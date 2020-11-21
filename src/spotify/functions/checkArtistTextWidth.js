export const checkArtistTextWidth = (textTile) => {
  const root = document.querySelector(':root');
  let length;
  if(textTile==='player') {
    const artistTextDiv = document.querySelector(".current-text-artist");
    const artistText = document.querySelector(".current-text-artist p");
    artistTextDiv.classList.remove('translateArtist');
    if(artistText.innerHTML.length>=27) {
      length = artistText.innerHTML.length * 7.8; // Magic number / approximate character length in pixels
      root.style.setProperty('--animation-artist-length', `${length}px`)
      artistTextDiv.classList.add('translateArtist');
    }
  } else if (textTile==='recommendation') {
    const recommendedArtistTextDiv = document.querySelector(".recommendation-text-artist");
    const recommendedArtistText = document.querySelector(".recommendation-text-artist p");
    recommendedArtistTextDiv.classList.remove('translateRecommendedArtist');
    if(recommendedArtistText.innerText.length>=21) {
      length = recommendedArtistText.innerText.length * 7.8; // Magic number / approximate character length in pixels
      root.style.setProperty('--recommendation-artist-length', `${length}px`)
      recommendedArtistTextDiv.classList.add('translateRecommendedArtist');
    }
  }
}
