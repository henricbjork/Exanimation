require('dotenv').config();

process.env.SILENCE_EMPTY_LAMBDA_WARNING = true; // removes a netlify-lambda warning
const client_id = process.env.SPOTIFY_CLIENT;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;

exports.handler = function(event, context, callback) {
  const scope = 'user-read-private%20user-read-email%20user-modify-playback-state%20user-read-playback-state%20user-read-recently-played';
  const url = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}`;

  // return new Promise((resolve, reject) => {

    try {
      callback(null,{
        statusCode: 302,
        headers: {
          Location: url,
        },
      })
    } catch (err) {
      callback(null,{ statusCode: 500, body: err.message });
    }

  // })

}
