import React, { useState } from 'react';
import { playSong } from './playSong.js';
import { fetchCurrent } from './fetchCurrent.js';
import { fetchRecommendations } from './fetchRecommendations.js';

export const playSelected = (
  uri,
  accessToken,
  setRecommendedTracks,
  setCurrentSong
) => {
  if (!accessToken) return;

  playSong(uri, accessToken).then(() => {
    fetchCurrent(accessToken).then((current) => {
      // console.log(current);
      console.log(
        'Currently playing: ' +
          current.item.artists[0].name +
          ' - ' +
          current.item.name
      );
      setCurrentSong({
        id: current.item.id,
        artist: current.item.artists[0].name,
        song: current.item.name,
        album: {
          image: current.item.album.images[0].url,
          name: current.item.album.name,
        },
      });
      fetchRecommendations(current.item.id, accessToken, setRecommendedTracks);
      // .then((res)=> {
      // return res;
      // }).then((recommendTracks)=> {
      // timer = setTimeout(() => {
      // const track = recommendTracks[Math.floor(Math.random() * recommendTracks.length)];
      // songCount+=1;
      // console.log(track);
      // playSelected(track.uri);
      // }, current.item.duration_ms - current.progress_ms); // 1000ms delay required to ensure next track is playing when useEffect/fetch is triggered
      // })
      // fetchHistory();
    });
  });
};
