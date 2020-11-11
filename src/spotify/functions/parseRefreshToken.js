import queryString from 'query-string';

export const parseRefreshToken = () => {
  const parsed = queryString.parse(window.location.hash);
  if (parsed.refresh_token !== undefined) {
    return parsed.refresh_token;
  }
  return false;
};
