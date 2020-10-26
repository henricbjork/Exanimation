import { putTrack } from './putTrack.js';
import { getTrack } from './getTrack.js';
import { getRecommendations } from './getRecommendations.js';
import { getAudioAnalysis } from './getAudioAnalysis.js';

export const playSelectedTrack = (
  uri,
  accessToken,
  setRecommendedTracks,
  setCurrentSong,
  device
) => {
  if (!accessToken) return;
  const id = uri.split(":")[2];
  putTrack(uri, accessToken, device);
  getTrack(accessToken, id).then((current) => {
    console.log(
      'Currently playing: ' +
        current.artists[0].name +
        ' - ' +
        current.name
    );
    getAudioAnalysis(accessToken, id)
    .then((audioAnalysis) => {
      console.log(audioAnalysis)
    });
    getRecommendations(accessToken, id)
    .then((recommend)=> {
      setRecommendedTracks(recommend.tracks);
      setCurrentSong({
        id: id,
        artist: current.artists[0].name,
        song: current.name,
        album: {
          image: current.album.images[0].url,
          name: current.album.name,
        },
      });
    });
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
    // getRecentlyPlayed();
  });
};
