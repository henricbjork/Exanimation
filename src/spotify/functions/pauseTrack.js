import { getCurrentlyPlaying } from './getCurrentlyPlaying.js';
import { putPause } from './putPause.js';

export const pauseTrack = (accessToken) => {
  if (!accessToken) return;
  const position = new Promise(function (resolve, reject) {
    getCurrentlyPlaying(accessToken)
    .then((current) => {
      putPause(accessToken);
      resolve({uri: current.item.uri, position: current.progress_ms});
    });
  })
  return position;
}
