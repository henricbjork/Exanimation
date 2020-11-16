import { navigate } from '@reach/router';
import { putTrack } from './putTrack';

const backend_endpoint = process.env.REACT_APP_BACKEND_ENDPOINT;

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
      let refreshToken = sessionStorage.getItem('refreshToken');
      sessionStorage.removeItem('accessToken');
      navigate(`${backend_endpoint}/refresh_token?refresh_token=${refreshToken}`);
    });
  });
};
