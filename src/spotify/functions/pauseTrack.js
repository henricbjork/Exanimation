import { getCurrentlyPlaying } from './getCurrentlyPlaying.js';
import { putPause } from './putPause.js';

export const pauseTrack = (accessToken, recommendedTracks) => {
  if (!accessToken) return;
  const position = new Promise(function (resolve, reject) {
    getCurrentlyPlaying(accessToken)
    .then((current) => {
      putPause(accessToken);
      const randomRecommendation = recommendedTracks[Math.floor(Math.random() * recommendedTracks.length)].uri;
      resolve({currentUri: current.item.uri, position: current.progress_ms, duration: current.item.duration_ms, nextTrackUri: randomRecommendation});
    });
  })
  return position;
}
