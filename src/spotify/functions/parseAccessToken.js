import queryString from 'query-string';
const backend_endpoint = process.env.REACT_APP_BACKEND_ENDPOINT;

export const parseAccessToken = () => {
  if (sessionStorage.getItem('accessToken')!==null) {
    return sessionStorage.getItem('accessToken');
  }
  const parsed = queryString.parse(window.location.hash);
  if (parsed.access_token !== undefined) {
    sessionStorage.setItem('accessToken', parsed.access_token);
    window.history.pushState({}, null, backend_endpoint);
    return sessionStorage.getItem('accessToken');
  }
  return false;
};
