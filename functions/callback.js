import fetch from 'node-fetch';
require('dotenv').config();

process.env.SILENCE_EMPTY_LAMBDA_WARNING = true; // removes a netlify-lambda warning
const client_id = process.env.SPOTIFY_CLIENT;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
const base_url = process.env.REACT_APP_BASE_URL;

exports.handler = function(event, context, callback) {
  const code = event.queryStringParameters.code;

  try {
    fetch(`https://accounts.spotify.com/api/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}`, {
      method: 'POST',
      headers: {
        Authorization:
          'Basic ' +
          new Buffer.from(client_id + ':' + client_secret).toString('base64'),
        "Cache-Control": "no-cache",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((data) => data.json())
    .then((postData)=> {
      fetch('https://api.spotify.com/v1/me', {
          headers: { Authorization: 'Bearer ' + postData.access_token },
      })
      .then((data)=>data.json())
      .then((body)=>{
        console.log(body) // Console log user's details
        const url = `${base_url}/#access_token=${postData.access_token}&refresh_token=${postData.refresh_token}`;

        return callback(null,{
          statusCode: 301,
          headers: {
            Location: url,
            "Cache-Control": "no-cache"
          }
        });
      })

    })

  } catch (err) {
    return callback(null,{ statusCode: 500, body: err.message });
  }

};


