
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode';

export function logOutUser() {
    Cookies.remove('authenticatedUser', { path: '/' });    
}



export interface JwtPayload {
  id: string
  email: string
  exp: number
  // add more fields if needed
}

export function getUserFromToken(): JwtPayload | null {
  const data = Cookies.get('authenticatedUser')
  const {jwtToken} = JSON.parse(data??"{}");
  
  if (!jwtToken) return null

  try {
    const decoded = jwtDecode<JwtPayload>(jwtToken)
    if (decoded.exp * 1000 > Date.now()) {
      return decoded
    } else {
      Cookies.remove('authenticatedUser')
      return null
    }
  } catch(err:any) {
    console.log(err);
    
    return null
  }
}

