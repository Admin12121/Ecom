import Cookies from 'js-cookie';

interface Token {
  access: string;
  refresh: string;
  remember: boolean;
}

const storeToken = (value: Token): void => {
  if (value) {
    const { access, refresh, remember } = value;
    const options = remember ? { expires: 7 } : undefined;
    Cookies.set('access_token', access, options);
    Cookies.set('refresh_token', refresh, options);
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
