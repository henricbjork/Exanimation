export const pauseTrack = (accessToken) => {
  if (!accessToken) return;
  const position = new Promise(function (resolve, reject) {
    const rootUrl = 'https://api.spotify.com/v1';
    fetch(`${rootUrl}/me/player/currently-playing`, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
    .then((response) => response.json())
    .then((current) => {
      new Promise(function (resolve, reject) {
        fetch(`${rootUrl}/me/player/pause`, {
          method: 'PUT',
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
        })
        .then(() => resolve());
      })
    resolve({uri: current.item.uri, position: current.progress_ms});
    })
  })
  return position;
}
