import { playSelectedTrack } from './playSelectedTrack.js';
import { clearQueueTimer } from './clearQueueTimer.js';
let timer;

export const queueTrack = (uri, accessToken, setRecommendedTracks, setCurrentSong, currentDevice, queueTime=null) => {
  clearQueueTimer(timer).then(()=>{
    if(queueTime) {
      timer=setTimeout(() => {
        playSelectedTrack(uri, accessToken, setRecommendedTracks, setCurrentSong, currentDevice);
      }, queueTime);
    }
  })
}
