import type { Credentials } from "@server/domain/credentials.type";
import type { JwtData } from "@server/domain/jwt-data.type";
import type { UserToken } from "@server/domain/user-token.type";
import { hashPassword, verifyPassword } from "@server/shared/hash.utils";
import { generateJWT } from "@server/shared/jwt.utils";
import { getBody } from "@server/shared/request.utils";
import { badRequest, ok, unauthorized } from "@server/shared/response.utils";
import { createUser, findUserByEmail } from "./auth.repository";

export const auth = async (request: Request): Promise<Response> => {
	const url = new URL(request.url);
	const path = url.pathname;

	if (request.method !== "POST") return badRequest("Method not allowed");

	try {
		const credentials = (await getBody(request)) as Credentials;

		if (path === "/api/auth/login") {
			return await login(credentials);
		}

		if (path === "/api/auth/register") {
			return await register(credentials);
		}

		return badRequest("Invalid endpoint");
	} catch (error) {
		return badRequest(String(error));
	}
};

const generateUserToken = (userId: number): UserToken => {
	const jwtData: JwtData = { userId };
	const token = generateJWT(jwtData);
	return { userId, token };
};

const login = async (credentials: Credentials): Promise<Response> => {
	const user = await findUserByEmail(credentials.email);
	if (!user) {
		return unauthorized("Invalid credentials");
	}

	const isValidPassword = await verifyPassword(
		credentials.password,
		user.password,
	);
	if (!isValidPassword) {
		return unauthorized("Invalid credentials");
	}

	// Don't send the password hash back to the client
	const { password: _, ...userWithoutPassword } = user;
	const userToken = generateUserToken(user.id);
	return ok({ user: userWithoutPassword, token: userToken });
};

const register = async (credentials: Credentials): Promise<Response> => {
	const existingUser = await findUserByEmail(credentials.email);
	if (existingUser) {
		return badRequest("Email already registered");
	}

	const hashedPassword = await hashPassword(credentials.password);
	const user = await createUser(credentials.email, hashedPassword);

	// Don't send the password hash back to the client
	const { password: _, ...userWithoutPassword } = user;
	const userToken = generateUserToken(user.id);
	return ok({ user: userWithoutPassword, token: userToken });
};
