declare global {
    interface Window {
        _env: Partial<NodeJS.ProcessEnv>;
    }
}

window._env = window._env || {};

export const SKIP_PREFLIGHT_CHECK = process.env.SKIP_PREFLIGHT_CHECK || window._env.SKIP_PREFLIGHT_CHECK;
export const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || window._env.REACT_APP_BACKEND_URL;
export const REACT_APP_BACKEND_URL_SOCKET = process.env.REACT_APP_BACKEND_URL_SOCKET || window._env.REACT_APP_BACKEND_URL_SOCKET;
export const REACT_APP_ACCESS_TOKEN_COOKIE_NAME = process.env.REACT_APP_ACCESS_TOKEN_COOKIE_NAME || window._env.REACT_APP_ACCESS_TOKEN_COOKIE_NAME;