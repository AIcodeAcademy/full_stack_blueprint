import type { User } from "@/server/domain/user.type";
import { validateUser } from "@/server/domain/validations.utils";
import {
	BAD_REQUEST_ERROR,
	UNAUTHORIZED_ERROR,
} from "@/server/shared/api-error.type";
import type { JwtData } from "@/server/shared/jwt-data.type";
import { warn } from "@/server/shared/log.utils";
import type { EntityProperties } from "@/server/shared/sql.type";
import { hashPassword, verifyPassword } from "@server/shared/hash.utils";
import { generateJWT } from "@server/shared/jwt.utils";
import { getBody } from "@server/shared/request.utils";
import { badRequest, ok } from "@server/shared/response.utils";
import type { BunRequest } from "bun";
import { findUserByEmail, insertUser } from "./auth.repository";
import type { CredentialsRequest } from "./credentials-request.type";
import type { UserTokenResponse } from "./user-token-response.type";
const DEFAULT_ROLE_ID = 1;

export const authRoutes = {
	POST: async (request: BunRequest<"/api/auth/:action">) =>
		await authController(request, request.params.action),
};

const authController = async (
	request: Request,
	action: string,
): Promise<Response> => {
	const credentials = (await getBody(request)) as CredentialsRequest;
	if (action === "login") return await postLogin(credentials);
	if (action === "register") return await postRegister(credentials);
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
	const user = await insertUser(userToInsert as Omit<User, EntityProperties>);

	const userToken = createUserToken(user.id);
	return ok<UserTokenResponse>(userToken);
};

const createUserToken = (userId: number): UserTokenResponse => {
	const jwtData: JwtData = { userId };
	const token = generateJWT(jwtData);
	return { userId, token };
};
