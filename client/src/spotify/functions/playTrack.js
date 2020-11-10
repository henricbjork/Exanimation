import { navigate } from '@reach/router';
import { putTrack } from './putTrack';

let backend_endpoint;
if(process.env.NODE_ENV!=='development') {
  backend_endpoint = process.env.REACT_APP_NETLIFY_PATH;
} else {
  backend_endpoint = process.env.REACT_APP_LOCAL_ENDPOINT;
}

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
      sessionStorage.removeItem('accessToken');
      navigate(`${backend_endpoint}/refresh_token?refresh_token=${refreshToken}`);
    });
  });
};
