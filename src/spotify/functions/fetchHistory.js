  // const fetchHistory = () => {
  //   if (songCount === 0) return;
  //   if (songCount > 50) {
  //     limit = 50;
  //   } else {
  //     limit = songCount;
  //   }
  //   const rootUrl = 'https://api.spotify.com/v1';
  //   fetch(`${rootUrl}/me/player/recently-played?limit=${limit}`, {
  //     headers: {
  //       Authorization: 'Bearer ' + accessToken
  //     }
  //   })
  //   .then((response) => response.json())
  //   .then((history) => {
  //     setCompletedTracks(history.items);
  //   })
  // }


  // FOR App.js

    // //  {completedTracks && <h2>Completed Tracks</h2>}
    // //   {completedTracks &&
    //       completedTracks.map((track, i) => {
    //         return (
    //           <div className="completed-div" key={i} onClick={()=>{clearTimeout(timer);playSelected(track.track.uri);}}>
    //           <img className="completed-album-cover" src={track.track.album.images[0].url} alt={track.track.album.name}/>
    //           <h4>{track.track.artists[0].name} - {track.track.name}</h4>
    //           </div>
    //         );
    //       })}
