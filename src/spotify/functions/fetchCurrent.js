import React from 'react';

export const fetchCurrent = (accessToken) => {
    if (!accessToken) return;
  return new Promise(function (resolve, reject) {
    const rootUrl = 'https://api.spotify.com/v1';
    setTimeout(() => {
      fetch(`${rootUrl}/me/player/currently-playing`, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      })
        .then((response) => response.json())
        .then((current) => {
          resolve(current);
        });
    }, 500); // delay ensures song is playing before fetch takes place / promise runs faster than Spotify
  });
};
