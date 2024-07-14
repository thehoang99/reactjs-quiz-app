export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const doLogin = (data) => {
    return {
        type: LOGIN_SUCCESS,
        payload: data
    }
}

export const doLogout = () => {
    return {
        type: LOGOUT_SUCCESS,
    }
}