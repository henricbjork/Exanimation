import { navigate } from '@reach/router';

export const getDevices = (accessToken) => {
  if (!accessToken) return;
  return new Promise(function (resolve, reject) {
    const rootUrl = 'https://api.spotify.com/v1';
    fetch(`${rootUrl}/me/player/devices`, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
    .then((response) => response.json())
    .then((devices) => {
      if(Object.keys(devices).length===0) {
        const base_url = process.env.REACT_APP_BASE_URL;
        sessionStorage.setItem('noDevices', true);
        navigate(`${base_url}/login`);
      }
      resolve(devices);
    });
  });
};
