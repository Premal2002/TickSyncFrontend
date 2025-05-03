

export function isUserLoggedIn() : boolean{
    const authenticatedUser = localStorage.getItem("authenticatedUser");
    if(authenticatedUser != null && authenticatedUser != undefined)
        return true;
    return false;
}

export function logOutUser() {
    localStorage.removeItem("authenticatedUser")
}

