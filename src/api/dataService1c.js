import { API_URL } from '../Constants'
import { encode } from 'base-64'

export const getToken = (username, password) => {
    return 'Basic ' + encode(username + ":" + password);
}

//https://auth0.com/blog/secure-your-react-and-redux-app-with-jwt-authentication/

export const executeAuthenticationService = (token) => {
    return fetch(`${API_URL}/?typerequest=authenticate`,
        {
            method: 'get',
            headers: new Headers({
                'Authorization': token,
                'Content-Type': 'application/json',
            })
        })
        ;
}



