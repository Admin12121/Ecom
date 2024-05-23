import Cookies from 'js-cookie';

interface Token {
  access_token: string;
  refresh_token: string;
}

const storeToken = (value: Token): void => {
  if (value) {
    const { access_token, refresh_token } = value;
    Cookies.set('access_token', access_token);
    Cookies.set('refresh_token', refresh_token);
  }
};

const getToken = () => {
  const access_token = Cookies.get('access_token') || "";
  const refresh_token = Cookies.get('refresh_token') || "";
  return { access_token, refresh_token };
};

const removeToken = () => {
  Cookies.remove('access_token');
  Cookies.remove('refresh_token');
};

export { storeToken, getToken, removeToken };
