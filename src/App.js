import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import './App.css';

function App() {
  const [cruiseMode, setCruiseMode] = useState(false);
  const [pause, setPause] = useState(false); // pause function only working when Cruise Mode is off
  const [recommendedTracks, setRecommendedTracks] = useState('');
  const [fetchTrigger, setFetchTrigger] = useState(''); // triggers the useEffect
  const [currentSong, setCurrentSong] = useState({
    id: '',
    artist: '',
    name: ''
  });
  let timer;

  const url = `
https://accounts.spotify.com/authorize?
client_id=5d27d394dabe48ceb3546e56bc892ada&
show_dialog=true&
response_type=token&
scope=user-read-currently-playing&
redirect_uri=http://localhost:3000`;

  const getAccessToken = () => {
    const parsed = queryString.parse(window.location.hash);

    if (parsed.access_token !== undefined) {
      return parsed.access_token;
    }

    return false;
  };

  const accessToken = getAccessToken();

  useEffect(() => {
    if (!accessToken) return;

    const rootUrl = 'https://api.spotify.com/v1';

    async function fetchCurrent() {
      await fetch(`${rootUrl}/me/player/currently-playing`, {
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      })
        .catch((error) => {
          console.log(error.message);
        })
        .then((res) => res.json())
        .then((current) => {
          console.log(
            'Currently playing: ' + current.item.artists[0].name + ' - ' + current.item.name
          );
          if (fetchTrigger === current.progress_ms) {
            setPause(true);
            return;
          }

          if (current.item.id !== currentSong.id) {
            async function fetchRecommendation(id, artist, song, progress) {
              await fetch(`${rootUrl}/recommendations?seed_tracks=${id}`, {
                headers: {
                  Authorization: 'Bearer ' + accessToken
                }
              })
                .then((res) => res.json())
                .then((recommend) => {
                  console.log(recommend.tracks);
                  setCurrentSong({
                    id: id,
                    artist: artist,
                    name: song
                  });
                  setRecommendedTracks(recommend.tracks);
                  setFetchTrigger(progress); // a dummy trigger to restart the useEffect / data is not used
                });
            }
            fetchRecommendation(
              current.item.id,
              current.item.artists[0].name,
              current.item.name,
              current.progress_ms
            );
          } else {
            if (!cruiseMode) {
              // if user wishes to toggle songs
              timer = setTimeout(() => {
                setFetchTrigger(current.progress_ms);
              }, 2000);
            } else {
              // if user is in cruiseMode and let's songs finish. Less fetches => better performance
              timer = setTimeout(() => {
                setFetchTrigger(current.progress_ms);
              }, current.item.duration_ms - current.progress_ms + 1000); // 1000ms delay required to ensure next track is playing when useEffect/fetch is triggered
            }
          }
        });
    }
    fetchCurrent();
  }, [fetchTrigger]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="App">
      {!accessToken && (
        <a href={url} onClick={getAccessToken}>
          Authorize
        </a>
      )}
      <button
        onClick={() => {
          setCruiseMode(!cruiseMode);
          clearTimeout(timer);
          setFetchTrigger('dummyStartUseEffect');
        }}
      >
        Toggle Cruise Mode
      </button>
      <p>Cruise Mode: {cruiseMode ? 'ON' : 'OFF'}</p>

      {pause && <p>Music currently paused</p>}
      {pause && (
        <button
          onClick={() => {
            clearTimeout(timer);
            setPause(false);
            setFetchTrigger('dummyStartUseEffect');
          }}
        >
          Resume Examination (after resuming Spotify)
        </button>
      )}
      <p>
        Currently playing: {currentSong.artist} - {currentSong.name}
      </p>
      <ul>
        {recommendedTracks &&
          recommendedTracks.map((track, i) => {
            return (
              <li key={i}>
                {track.artists[0].name} - {track.name}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default App;
