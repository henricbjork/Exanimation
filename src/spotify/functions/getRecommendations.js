export const getRecommendations = (accessToken, id) => {
  if (!accessToken) return;
  return new Promise(function (resolve, reject) {
    const rootUrl = 'https://api.spotify.com/v1';
    fetch(`${rootUrl}/recommendations?seed_tracks=${id}&limit=12`, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
      .then((response) => response.json())
      .then((recommend) => {
        resolve(recommend.tracks);
      });
  });
};
