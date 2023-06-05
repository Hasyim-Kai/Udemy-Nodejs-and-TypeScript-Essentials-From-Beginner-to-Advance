import { decode } from "jsonwebtoken";

export const getUserFromJwt = (jwtToken: string | undefined)=>{
  const token = jwtToken?.split(" ")[1] || '';
  return decode(token)
}