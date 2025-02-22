import type { CredentialsRequest } from "@/server/api/auth/credentials-request.type";
import type { UserTokenResponse } from "@/server/api/auth/user-token-response.type";
import type { User } from "@/server/domain/user.type";
import { validateUser } from "@/server/domain/validations.utils";
import {
	BAD_REQUEST_ERROR,
	UNAUTHORIZED_ERROR,
} from "@/server/shared/api-error.type";
import type { JwtData } from "@/server/shared/jwt-data.type";
import { warn } from "@/server/shared/log.utils";
import { hashPassword, verifyPassword } from "@server/shared/hash.utils";
import { generateJWT } from "@server/shared/jwt.utils";
import { getBody, validatePostRequest } from "@server/shared/request.utils";
import { badRequest, ok } from "@server/shared/response.utils";
import { findUserByEmail, insertUser } from "./auth.repository";
const DEFAULT_ROLE_ID = 1;

/**
 * Auth controller for /api/auth endpoints
 * @param request - The request
 * @returns The response
 */
export const authController = async (request: Request): Promise<Response> => {
	validatePostRequest(request);
	const credentials = (await getBody(request)) as CredentialsRequest;
	const url = new URL(request.url);
	const path = url.pathname;
	if (path === "/api/auth/login") return await postLogin(credentials);
	if (path === "/api/auth/register") return await postRegister(credentials);
	console.warn("Invalid endpoint:", path);
	return badRequest("Invalid endpoint");
};

const postLogin = async (
	credentials: CredentialsRequest,
): Promise<Response> => {
	const user = await findUserByEmail(credentials.email);
	if (!user) {
		warn("User not found:", credentials.email);
		throw UNAUTHORIZED_ERROR;
	}

	const isValidPassword = await verifyPassword(
		credentials.password,
		user.password,
	);
	if (!isValidPassword) {
		warn("Invalid password for user:", credentials.email);
		throw UNAUTHORIZED_ERROR;
	}

	const userToken = createUserToken(user.id);
	return ok(userToken);
};

const postRegister = async (
	credentials: CredentialsRequest,
): Promise<Response> => {
	const existingUser = await findUserByEmail(credentials.email);
	if (existingUser) {
		warn("Email already registered:", credentials.email);
		throw BAD_REQUEST_ERROR;
	}

	const hashedPassword = await hashPassword(credentials.password);
	const userToInsert: Partial<User> = {
		email: credentials.email,
		password: hashedPassword,
		roleId: DEFAULT_ROLE_ID,
	};
	validateUser(userToInsert);
	const user = await insertUser(userToInsert);

	const userToken = createUserToken(user.id);
	return ok<UserTokenResponse>(userToken);
};

const createUserToken = (userId: number): UserTokenResponse => {
	const jwtData: JwtData = { userId };
	const token = generateJWT(jwtData);
	return { userId, token };
};
