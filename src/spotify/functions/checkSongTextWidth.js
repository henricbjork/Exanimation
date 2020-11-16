export const checkSongTextWidth = () => {
  const songTextDiv = document.querySelector(".current-text-song");
  const songText = document.querySelector(".current-text-song p");
  songTextDiv.classList.remove('translate');
  if(songText.innerHTML.length>=28) {
    songTextDiv.classList.add('translate');
  }
}
