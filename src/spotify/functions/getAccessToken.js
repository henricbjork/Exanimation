import queryString from 'query-string';

export const getAccessToken = () => {
  const parsed = queryString.parse(window.location.hash);
  if (parsed.access_token !== undefined) {
    return parsed.access_token;
  }
  return false;
};
