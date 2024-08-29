export type jwtTokenDecode = {
    user: {
        id: string;
        email: string;
        role: string
    }, 
    iat: number,
    exp: number
}