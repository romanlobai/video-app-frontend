import jwt from "jsonwebtoken";

export const getJWTPayload = (token: string): Record<string, any> => {
    const { payload } = jwt.decode(token)

    return payload
}