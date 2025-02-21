import type { CredentialsDto } from "@/server/domain/credentials-dto.type";
import type { UserTokenDto } from "@/server/domain/user-token-dto.type";
import { warn } from "@/server/shared/log.utils";
import type { JwtData } from "@server/domain/jwt-data.type";
import { hashPassword, verifyPassword } from "@server/shared/hash.utils";
import { generateJWT } from "@server/shared/jwt.utils";
import { getBody } from "@server/shared/request.utils";
import { badRequest, ok, unauthorized } from "@server/shared/response.utils";
import { findUserByEmail, insertUser } from "./auth.repository";

const DEFAULT_ROLE_ID = 1;

/**
 * Auth controller for /api/auth endpoints
 * @param request - The request
 * @returns The response
 */
export const auth = async (request: Request): Promise<Response> => {
	if (request.method !== "POST") {
		warn("Invalid method:", request.method);
		return badRequest("Method not allowed");
	}
	const credentials = (await getBody(request)) as CredentialsDto;
	if (!credentials || !credentials.email || !credentials.password)
		return badRequest("Missing required fields");
	const url = new URL(request.url);
	const path = url.pathname;
	if (path === "/api/auth/login") return await postLogin(credentials);
	if (path === "/api/auth/register") return await postRegister(credentials);
	console.warn("Invalid endpoint:", path);
	return badRequest("Invalid endpoint");
};

const postLogin = async (credentials: CredentialsDto): Promise<Response> => {
	const user = await findUserByEmail(credentials.email);
	if (!user) {
		warn("User not found:", credentials.email);
		return unauthorized("Invalid credentials");
	}

	const isValidPassword = await verifyPassword(
		credentials.password,
		user.password,
	);
	if (!isValidPassword) {
		warn("Invalid password for user:", credentials.email);
		return unauthorized("Invalid credentials");
	}

	const userToken = createUserToken(user.id);
	return ok(userToken);
};

const postRegister = async (credentials: CredentialsDto): Promise<Response> => {
	const existingUser = await findUserByEmail(credentials.email);
	if (existingUser) {
		warn("Email already registered:", credentials.email);
		return badRequest("Email already registered");
	}

	const hashedPassword = await hashPassword(credentials.password);
	const user = await insertUser(
		credentials.email,
		hashedPassword,
		DEFAULT_ROLE_ID,
	);

	const userToken = createUserToken(user.id);
	return ok<UserTokenDto>(userToken);
};

const createUserToken = (userId: number): UserTokenDto => {
	const jwtData: JwtData = { userId };
	const token = generateJWT(jwtData);
	return { userId, token };
};
