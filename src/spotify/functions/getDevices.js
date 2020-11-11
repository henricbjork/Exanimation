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
      resolve(devices);
    });
  });
};
