import {
	BAD_REQUEST_ERROR,
	UNAUTHORIZED_ERROR,
} from "@/server/domain/api-error.type";
import type { CredentialsDto } from "@/server/domain/credentials-dto.type";
import type { UserTokenDto } from "@/server/domain/user-token-dto.type";
import {
	validateCredentials,
	validatePostRequest,
} from "@/server/domain/validations.utils";
import { warn } from "@/server/shared/log.utils";
import type { JwtData } from "@server/domain/jwt-data.type";
import { hashPassword, verifyPassword } from "@server/shared/hash.utils";
import { generateJWT } from "@server/shared/jwt.utils";
import { getBody } from "@server/shared/request.utils";
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
	const credentials = (await getBody(request)) as CredentialsDto;
	validateCredentials(credentials);
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

const postRegister = async (credentials: CredentialsDto): Promise<Response> => {
	const existingUser = await findUserByEmail(credentials.email);
	if (existingUser) {
		warn("Email already registered:", credentials.email);
		throw BAD_REQUEST_ERROR;
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
