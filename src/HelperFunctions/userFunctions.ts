import Cookies from 'js-cookie';

export function isUserLoggedIn() : boolean{
    const authenticatedUser = JSON.parse(Cookies.get('authenticatedUser') || '{}');
    if (authenticatedUser && authenticatedUser.jwtToken) {
        return true;
    }
    return false;
}

export function logOutUser() {
    Cookies.remove('authenticatedUser', { path: '/' });    
}

