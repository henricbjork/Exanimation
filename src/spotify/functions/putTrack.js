export const putTrack = (uri, accessToken, currentDevice, position=0) => {
  if (!accessToken) return;
  return new Promise(function (resolve, reject) {
    const rootUrl = 'https://api.spotify.com/v1';
    fetch(`${rootUrl}/me/player/play?device_id=${currentDevice}`, {
      method: 'PUT',
      body: JSON.stringify({ uris: [`${uri}`], position_ms: `${position}` }),
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    }).then(() => {
      resolve();
    });
  });
};