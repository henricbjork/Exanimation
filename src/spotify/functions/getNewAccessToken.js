import queryString from 'query-string';

export const getNewAccessToken = () => {
  return new Promise(function (resolve, reject) {
    const parsed = queryString.parse(window.location.hash);
    if (parsed.access_token !== undefined) {
      resolve(parsed.access_token);
    }
    resolve(false);
  });
};
