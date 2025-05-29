
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode';

export function logOutUser() {
    Cookies.remove('authenticatedUser', { path: '/' });    
}

export interface JwtPayload {
  id: string
  email: string
  name: string
  exp: number
  roles : []
}

export function getUserFromToken(): JwtPayload | null {
  const data = Cookies.get('authenticatedUser')
  
  const {jwtToken} = JSON.parse(data??"{}");
  
  if (!jwtToken) return null

  try {
    const decoded = jwtDecode<any>(jwtToken)
    const userObj = <JwtPayload>decoded;
    if (decoded.exp * 1000 > Date.now()) {
      userObj.roles = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || [];
      return userObj
    } else {
      Cookies.remove('authenticatedUser')
      return null
    }
  } catch(err:any) {
    console.log(err);
    
    return null
  }
}

export function capitalizeFirstLetter(string:string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

