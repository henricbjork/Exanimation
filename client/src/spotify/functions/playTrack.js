import { navigate } from '@reach/router';
import { putTrack } from './putTrack';

export const playTrack = (uri, accessToken, currentDevice, progress=0) => {
  if (!accessToken) return;
  return new Promise(function (resolve, reject) {
    putTrack(uri, accessToken, currentDevice, progress)
    .then((response) => {
      if (response.status===401) {
        throw new Error(response.status)
      } else {
        resolve();
      }
    })
    .catch(function(error) {
      sessionStorage.setItem('queuedTrackUri', uri);
      console.log('queuedTrackUri added');
      let refreshToken = sessionStorage.getItem('refreshToken');
      navigate(`http://localhost:8888/refresh_token?refresh_token=${refreshToken}`);
    });
  });
};
