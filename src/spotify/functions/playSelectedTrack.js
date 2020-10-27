import { putTrack } from './putTrack.js';
import { getTrack } from './getTrack.js';
import { queueTrack } from './queueTrack.js';
import { getRecommendations } from './getRecommendations.js';
// import { getAudioAnalysis } from './getAudioAnalysis.js';

export const playSelectedTrack = (
  uri,
  accessToken,
  setRecommendedTracks,
  setCurrentSong,
  currentDevice
) => {
  if (!accessToken) return;
  const id = uri.split(":")[2];
  putTrack(uri, accessToken, currentDevice);
  getTrack(accessToken, id).then((current) => {
    // console.log(current)
    console.log(
      'Currently playing: ' +
        current.artists[0].name +
        ' - ' +
        current.name
    );
    // getAudioAnalysis(accessToken, id)
    // .then((audioAnalysis) => {
    //   console.log(audioAnalysis)
    // });
    getRecommendations(accessToken, id)
    .then((recommend)=> {
      setRecommendedTracks(recommend);
      setCurrentSong({
        id: id,
        artist: current.artists[0].name,
        song: current.name,
        album: {
          image: current.album.images[0].url,
          name: current.album.name,
        },
      });
      const trackUri = recommend[Math.floor(Math.random() * recommend.length)].uri;
      queueTrack(trackUri, accessToken, setRecommendedTracks, setCurrentSong, currentDevice, current.duration_ms);
    })
    // getRecentlyPlayed();
  });
};
