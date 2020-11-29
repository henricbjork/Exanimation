export const setSongSelection = (uri, accessToken) => {
  if (!accessToken) return;
  const id = uri.split(":")[2];
  return new Promise(function (resolve, reject) {
    resolve(sessionStorage.setItem('selectedSong', id));
  });
};
