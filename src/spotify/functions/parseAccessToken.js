import queryString from 'query-string';
const base_url = process.env.REACT_APP_BASE_URL;

export const parseAccessToken = () => {
  if (sessionStorage.getItem('accessToken') !== null) {
    window.history.pushState({}, null, base_url);
    return sessionStorage.getItem('accessToken');
  }
  const parsed = queryString.parse(window.location.hash);
  if (parsed.access_token !== undefined) {
    sessionStorage.setItem('accessToken', parsed.access_token);
    window.location.href = base_url;
    return sessionStorage.getItem('accessToken');
  }
  return false;
};
