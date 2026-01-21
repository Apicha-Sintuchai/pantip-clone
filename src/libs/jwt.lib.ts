import jwt from "jsonwebtoken";
import { env } from "@/config/env.config";

export interface JwtPayload {
  userId: string;
  email: string;
  [key: string]: any;
}

export const authen = {
    sign: (payload: JwtPayload, expiresIn: string = '1d'): string => {
        return jwt.sign(payload, env.JWT_SECRET, { expiresIn: expiresIn as jwt.SignOptions['expiresIn'] });
    },

    verify: (token: string): JwtPayload => {
        return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    },

    decode: (token: string): JwtPayload | null => {
        try {
            return jwt.decode(token) as JwtPayload;
        } catch (error) {
            return null;
        }
    },
};

export const decode = {
    token: (token: string): JwtPayload | null => {
        try {
            if (!token) return null;
            
            const payload = jwt.decode(token) as JwtPayload & { exp?: number };
            if (payload?.exp && Date.now() >= payload.exp * 1000) return null;

            return payload;
        } catch (error) {
            console.error("Invalid JWT:", error);
            return null;
        }
    },
};