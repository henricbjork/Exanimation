import React from 'react';

export const playSong = (uri, accessToken) => {
  if (!accessToken) return;
  return new Promise(function (resolve, reject) {
    const rootUrl = 'https://api.spotify.com/v1';
    fetch(`${rootUrl}/me/player/play`, {
      method: 'PUT',
      body: JSON.stringify({ uris: [`${uri}`] }),
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    }).then(() => {
      resolve();
    });
  });
};
