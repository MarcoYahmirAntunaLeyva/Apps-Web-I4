import jwt from 'jsonwebtoken';
import {cache} from './cahce'

const ACCESS_SECRET = 'secret1234utd';

export const generateAccessToken = (payload: { userId: string, username: string, role: string[] }) => {
    return jwt.sign(payload, ACCESS_SECRET, { expiresIn: "15m" });
};

export const verifyOurToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, ACCESS_SECRET) as { userId: string, username: string, role: string[] };

        // Verificar que esté en caché
        const cachedToken = cache.get(decoded.userId);
        if (!cachedToken || cachedToken !== token) {
            throw new Error("Token no generado por esta app");
        }

        return {
            isValid: true,
            userId: decoded.userId,
            username: decoded.username,
            role: decoded.role,
            message: "Token válido y generado por esta Fers"
        };
    } catch (error) {
        return {
            isValid: false,
            message: "Token inválido: "
        };
    }
};
