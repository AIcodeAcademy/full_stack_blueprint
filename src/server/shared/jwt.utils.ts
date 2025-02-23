import { type JwtData, NULL_JWT_DATA } from "@/server/shared/jwt-data.type";
import type { CryptoHasher } from "bun";

const ALGORITHM = "sha256";
const SECRET = "my-super-secret-key-for-jwt-with-bun-crypto";

const ENCODED_HEADER = encodeObject({
	typ: "JWT",
	alg: "HS256",
});

function encodeObject(object: Record<string, unknown>): string {
	return btoa(JSON.stringify(object));
}

/**
 * Generates a JWT token
 * @param jwtData - The JWT data to encode
 * @param expiresIn - The expiration time in seconds (default: 3600)
 * @returns The generated JWT token
 */
export function generateJWT(jwtData: JwtData, expiresIn = 3600): string {
	const hasher = new Bun.CryptoHasher(ALGORITHM, SECRET);
	const iat = Math.floor(Date.now() / 1000);
	const exp = iat + expiresIn;
	const payload = { ...jwtData, iat, exp };
	const encodedPayload = encodeObject(payload);
	const sign = digestHash(hasher, encodedPayload);
	return `${ENCODED_HEADER}.${encodedPayload}.${sign}`;
}

/**
 * Verifies a JWT token
 * @param token - The JWT token to verify
 * @returns The decoded JWT data
 * @throws Error if the token is invalid or expired
 */
export function verifyJWT(token: string): JwtData {
	if (!token) return NULL_JWT_DATA;
	const hasher = new Bun.CryptoHasher(ALGORITHM, SECRET);
	const [encodedHeader, encodedPayload, encodedSign] = token.split(".");
	const sign = digestHash(hasher, encodedPayload);
	if (encodedSign !== sign) throw new Error("Invalid token");
	const payloadString = atob(encodedPayload);
	const payload: JwtData & { exp: number } = JSON.parse(payloadString);
	const now = Math.floor(Date.now() / 1000);
	if (now > payload.exp) throw new Error("Token expired");
	return payload;
}

function digestHash(hasher: CryptoHasher, data: string): string {
	return hasher.update(data).digest("base64");
}
