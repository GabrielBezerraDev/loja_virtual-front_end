
export class TokenJwt {

private static token: string;

public static setToken(token:string):void{
  TokenJwt.token ? TokenJwt.token : TokenJwt.token = token;
}

public static getToken():string{
  return TokenJwt.token;
}

}
