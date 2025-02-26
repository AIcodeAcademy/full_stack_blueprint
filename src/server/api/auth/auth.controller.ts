import type { User } from "@/server/domain/user.type";
import type { JwtData } from "@/server/shared/jwt-data.type";
import type { Raw } from "@/server/shared/sql.type";
import { generateJWT } from "@server/shared/jwt.utils";
import { guardGetBody } from "@server/shared/request.utils";
import { badRequest, ok } from "@server/shared/response.utils";
import type { BunRequest } from "bun";
import { insertUser, selectUserByCredentials } from "./auth.repository";
import type { CredentialsRequest } from "./credentials-request.type";
import type { UserTokenResponse } from "./user-token-response.type";
const DEFAULT_ROLE_ID = 1;

/**
 * Routes controller for /api/auth/:action
 * - POST: Login or register
 * @description Object that wires the request to the correct controller
 */
export const authRoutes = {
	POST: async (request: BunRequest<"/api/auth/:action">) =>
		await authController(request, request.params.action),
};

const authController = async (
	request: Request,
	action: string,
): Promise<Response> => {
	const credentials = (await guardGetBody(request)) as CredentialsRequest;
	if (action === "login") return await postLogin(credentials);
	if (action === "register") return await postRegister(credentials);
	return badRequest("Invalid endpoint");
};

const postLogin = async (
	credentials: CredentialsRequest,
): Promise<Response> => {
	const userId = await selectUserByCredentials(credentials);
	const userToken = createUserToken(userId);

	return ok<UserTokenResponse>(userToken);
};

const postRegister = async (
	credentials: CredentialsRequest,
): Promise<Response> => {
	const rawUser: Raw<User> = {
		...credentials,
		role_id: DEFAULT_ROLE_ID,
	};
	const userId = await insertUser(rawUser);
	const userToken = createUserToken(userId);

	return ok<UserTokenResponse>(userToken);
};

const createUserToken = (userId: number): UserTokenResponse => {
	const jwtData: JwtData = { userId };
	const token = generateJWT(jwtData);
	return { userId, token };
};
