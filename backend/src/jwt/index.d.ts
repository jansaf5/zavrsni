interface JwtPayload implements AuthResponse {
    email: string;
    iat: number;
    exp: number;
}