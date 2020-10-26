export const getTrack = (accessToken, id) => {
  if (!accessToken) return;
return new Promise(function (resolve, reject) {
  const rootUrl = 'https://api.spotify.com/v1';
    fetch(`${rootUrl}/tracks/${id}`, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
      .then((response) => response.json())
      .then((track) => {
        resolve(track);
      });
});
};
