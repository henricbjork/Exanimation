import queryString from 'query-string';

export const parseAccessToken = () => {
  if (sessionStorage.getItem('accessToken')!==null) {
    return sessionStorage.getItem('accessToken');
  }
  const parsed = queryString.parse(window.location.hash);
  if (parsed.access_token !== undefined) {
    sessionStorage.setItem('accessToken', parsed.access_token);
    window.history.pushState({}, null, "http://localhost:3000/");
    return sessionStorage.getItem('accessToken');
  }
  return false;
};
