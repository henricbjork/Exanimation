import { playSelectedTrack } from './playSelectedTrack.js';
let timer;

export const queueTrack = (uri, accessToken, setRecommendedTracks, setCurrentSong, currentDevice, queueTime) => {
  const clearTimer = new Promise(function (resolve, reject) {
    if (timer) clearTimeout(timer);
    resolve();
  });

  clearTimer.then(()=>{
    timer=setTimeout(() => {
      console.log('new track');
      playSelectedTrack(uri, accessToken, setRecommendedTracks, setCurrentSong, currentDevice);
    }, queueTime);
  })
}
