import fetch from 'node-fetch';
require('dotenv').config();

process.env.SILENCE_EMPTY_LAMBDA_WARNING = true; // removes a netlify-lambda warning
const client_id = process.env.SPOTIFY_CLIENT;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
const base_url = process.env.BASE_URL;

exports.handler = async function(event, context) {
  const code = event.queryStringParameters.code;
  console.log('code: ' + code)

  return new Promise((resolve, reject) => {

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
        console.log(postData);
        fetch('https://api.spotify.com/v1/me', {
            headers: { Authorization: 'Bearer ' + postData.access_token },
        })
        .then((data)=>data.json())
        .then((body)=>{
          console.log(body)
          const url = `${base_url}/#access_token=${postData.access_token}&refresh_token=${postData.refresh_token}`;
          console.log('url: ' + url);

          resolve({
            statusCode: 302,
            headers: {
              Location: url
            }
          });
        })

      })

    } catch (err) {
      reolve({ statusCode: 500, body: err.message });
    }

  })

};


