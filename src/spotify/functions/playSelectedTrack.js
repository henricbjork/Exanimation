import { playTrack } from './playTrack.js';
import { getTrack } from './getTrack.js';
import { queueTrack } from './queueTrack.js';
import { getRecommendations } from './getRecommendations.js';
import { checkSongTextWidth } from './checkSongTextWidth';
import { checkArtistTextWidth } from './checkArtistTextWidth';
// import { getAudioAnalysis } from './getAudioAnalysis.js';

export const playSelectedTrack = (
  uri,
  accessToken,
  setRecommendedTracks,
  setCurrentSong,
  currentDevice
) => {
  if (!accessToken) return;
  if (sessionStorage.getItem('queuedTrackUri') !== null) {
    sessionStorage.removeItem('queuedTrackUri');
  }
  const id = uri.split(':')[2];
  playTrack(uri, accessToken, currentDevice);
  getTrack(accessToken, id).then((current) => {
    console.log('Currently playing: ' + current.artists[0].name + ' - ' + current.name);
    // getAudioAnalysis(accessToken, id)
    // .then((audioAnalysis) => {
    //   console.log(audioAnalysis)
    // });
    getRecommendations(accessToken, id).then((recommend) => {
      setRecommendedTracks(recommend);
      setCurrentSong({
        id: id,
        artist: current.artists[0].name,
        song: current.name,
        album: {
          image: current.album.images[0].url,
          name: current.album.name
        }
      });
      checkSongTextWidth('player');
      checkArtistTextWidth('player');
      const trackUri = recommend[Math.floor(Math.random() * recommend.length)].uri; // select a random track from recommendations
      queueTrack(
        trackUri,
        accessToken,
        setRecommendedTracks,
        setCurrentSong,
        currentDevice,
        current.duration_ms
      );
    });
    // getRecentlyPlayed();
  });
};
