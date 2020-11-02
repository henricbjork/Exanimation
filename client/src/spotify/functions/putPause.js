export const putPause = (accessToken) => {
  if (!accessToken) return;
  return new Promise(function (resolve, reject) {
    const rootUrl = 'https://api.spotify.com/v1';
    fetch(`${rootUrl}/me/player/pause`, {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
    .then(() => resolve());
  })
};
