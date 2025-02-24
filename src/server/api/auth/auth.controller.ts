import type { User } from "@/server/domain/user.type";
import type { JwtData } from "@/server/shared/jwt-data.type";
import type { Raw } from "@/server/shared/sql.type";
import { generateJWT } from "@server/shared/jwt.utils";
import { getBody } from "@server/shared/request.utils";
import { badRequest, ok } from "@server/shared/response.utils";
import type { BunRequest } from "bun";
import { insertUser, selectUserByEmailAndPassword } from "./auth.repository";
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
	const userId = await selectUserByEmailAndPassword(
		credentials.email,
		credentials.password,
	);
	const userToken = createUserToken(userId);
	return ok(userToken);
};

const postRegister = async (
	credentials: CredentialsRequest,
): Promise<Response> => {
	const userToInsert: Raw<User> = {
		...credentials,
		roleId: DEFAULT_ROLE_ID,
	};
	const userId = await insertUser(userToInsert);
	const userToken = createUserToken(userId);
	return ok<UserTokenResponse>(userToken);
};

const createUserToken = (userId: number): UserTokenResponse => {
	const jwtData: JwtData = { userId };
	const token = generateJWT(jwtData);
	return { userId, token };
};
