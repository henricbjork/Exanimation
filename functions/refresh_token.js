import fetch from 'node-fetch';
require('dotenv').config();

process.env.SILENCE_EMPTY_LAMBDA_WARNING = true; // removes a netlify-lambda warning
const client_id = process.env.SPOTIFY_CLIENT;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const base_url = process.env.REACT_APP_BASE_URL;

exports.handler = function(event, context, callback) {
  const refresh_token = event.queryStringParameters.refresh_token;
  console.log('refresh-token: ' + refresh_token)

    try {
      fetch(`https://accounts.spotify.com/api/token?grant_type=refresh_token&refresh_token=${refresh_token}`, {
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
        console.log(postData);

        const url = `${base_url}/#access_token=${postData.access_token}`;
        console.log('url: ' + url);

        return callback(null,{
          statusCode: 301,
          headers: {
            Location: url,
            "Cache-Control": "no-cache"
          }
        });
      })

    } catch (err) {
      return callback(null,{ statusCode: 500, body: err.message });
    }

};
