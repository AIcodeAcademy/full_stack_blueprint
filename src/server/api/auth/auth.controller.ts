import type { Credentials } from "@server/domain/credentials.type";
import type { JwtData } from "@server/domain/jwt-data.type";
import type { UserToken } from "@server/domain/user-token.type";
import { hashPassword, verifyPassword } from "@server/shared/hash.utils";
import { generateJWT } from "@server/shared/jwt.utils";
import { getBody } from "@server/shared/request.utils";
import { badRequest, ok, unauthorized } from "@server/shared/response.utils";
import { createUser, findUserByEmail } from "./auth.repository";

export const auth = async (request: Request): Promise<Response> => {
	if (request.method !== "POST") {
		console.warn("Invalid method:", request.method);
		return badRequest("Method not allowed");
	}
	const credentials = (await getBody(request)) as Credentials;
	const url = new URL(request.url);
	const path = url.pathname;
	if (path === "/api/auth/login") return await login(credentials);
	if (path === "/api/auth/register") return await register(credentials);
	console.warn("Invalid endpoint:", path);
	return badRequest("Invalid endpoint");
};

const generateUserToken = (userId: number): UserToken => {
	const jwtData: JwtData = { userId };
	const token = generateJWT(jwtData);
	return { userId, token };
};

const login = async (credentials: Credentials): Promise<Response> => {
	const user = await findUserByEmail(credentials.email);
	if (!user) {
		console.warn("User not found:", credentials.email);
		return unauthorized("Invalid credentials");
	}

	const isValidPassword = await verifyPassword(
		credentials.password,
		user.password,
	);
	if (!isValidPassword) {
		console.warn("Invalid password for user:", credentials.email);
		return unauthorized("Invalid credentials");
	}

	const userToken = generateUserToken(user.id);
	return ok(userToken);
};

const register = async (credentials: Credentials): Promise<Response> => {
	const existingUser = await findUserByEmail(credentials.email);
	if (existingUser) {
		console.warn("Email already registered:", credentials.email);
		return badRequest("Email already registered");
	}

	const hashedPassword = await hashPassword(credentials.password);
	const user = await createUser(credentials.email, hashedPassword);

	const userToken = generateUserToken(user.id);
	return ok<UserToken>(userToken);
};
