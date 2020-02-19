const api = require('axios').default

export const TOKEN_KEY = "auth";

api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `${token}`;
    }

    config.baseURL = 'http://localhost:3333/'

    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {

        if ((error.response && error.response.status) && [401, 403].includes(error.response.status)) {
            logout()
            window.location = '/'
        } else {
            return Promise.reject(error)
        }
    })

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = ({ email, password }) => {
    return api.post(`http://localhost:3333/login`, { email, password }, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
};