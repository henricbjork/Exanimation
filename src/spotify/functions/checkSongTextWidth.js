export const checkSongTextWidth = (textTile) => {
  const root = document.querySelector(':root');
  let length;
  if (textTile === 'player') {
    const songTextDiv = document.querySelector('.current-text-song');
    const songText = document.querySelector('.current-text-song p');
    songTextDiv.classList.remove('translateSong');
    if (songText.innerHTML.length >= 27) {
      length = songText.innerHTML.length * 7.8; // Magic number / approximate character length in pixels
      root.style.setProperty('--animation-song-length', `${length}px`);
      songTextDiv.classList.add('translateSong');
    }
  } else if (textTile === 'recommendation') {
    const recommendedSongTextDiv = document.querySelector('.recommendation-text-song');
    const recommendedSongText = document.querySelector('.recommendation-text-song p');
    if (recommendedSongTextDiv) {
      recommendedSongTextDiv.classList.remove('translateRecommendedSong');
      if (recommendedSongText.innerText.length >= 22) {
        length = recommendedSongText.innerText.length * 7.8; // Magic number / approximate character length in pixels
        root.style.setProperty('--recommendation-song-length', `${length}px`);
        recommendedSongTextDiv.classList.add('translateRecommendedSong');
      }
    }
  }
};
