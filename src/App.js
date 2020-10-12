import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import './App.css';

function App() {
  const url = `
https://accounts.spotify.com/authorize?
client_id=5d27d394dabe48ceb3546e56bc892ada&
show_dialog=true&
response_type=token&
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
    const rootUrl = 'https://api.spotify.com/v1';

    fetch(`${rootUrl}/tracks/11dFghVXANMlKmJXsNCbNl`, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
  }, [accessToken]);

  return (
    <div className='App'>
      <a href={url} onClick={getAccessToken}>
        Authorize
      </a>
    </div>
  );
}

export default App;
