export const getRecommendations = (accessToken, id) => {
  if (!accessToken) return;
  return new Promise(function (resolve, reject) {
    const rootUrl = 'https://api.spotify.com/v1';
    let queryUrl;
    if(sessionStorage.getItem('selectedSong')!==null && sessionStorage.getItem('selectedSong')!==id) {
      queryUrl = `/recommendations?seed_tracks=${id},${sessionStorage.getItem('selectedSong')}&limit=12`;
    } else {
      queryUrl = `/recommendations?seed_tracks=${id}&limit=12`;
    }
    fetch(`${rootUrl}${queryUrl}`, {
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
