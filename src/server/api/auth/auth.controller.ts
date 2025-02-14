import type { Credentials } from "@server/domain/credentials.type";
import type { JwtData } from "@server/domain/jwt-data.type";
import type { UserToken } from "@server/domain/user-token.type";
import { hashPassword, verifyPassword } from "@server/shared/hash.utils";
import { generateJWT } from "@server/shared/jwt.utils";
import { getBody } from "@server/shared/request.utils";
import { badRequest, ok, unauthorized } from "@server/shared/response.utils";
import { createUser, findUserByEmail } from "./auth.repository";

export const auth = async (request: Request): Promise<Response> => {
	console.group("🔐 Auth Request");
	console.log("Method:", request.method);
	console.log("Path:", new URL(request.url).pathname);

	if (request.method !== "POST") {
		console.warn("Invalid method:", request.method);
		console.groupEnd();
		return badRequest("Method not allowed");
	}

	try {
		const credentials = (await getBody(request)) as Credentials;
		console.log("Email:", credentials.email);

		const url = new URL(request.url);
		const path = url.pathname;

		let response: Response;
		if (path === "/api/auth/login") {
			response = await login(credentials);
		} else if (path === "/api/auth/register") {
			response = await register(credentials);
		} else {
			console.warn("Invalid endpoint:", path);
			response = badRequest("Invalid endpoint");
		}

		console.log("Response status:", response.status);
		console.groupEnd();
		return response;
	} catch (error) {
		console.error("Auth error:", error);
		console.groupEnd();
		return badRequest(String(error));
	}
};

const generateUserToken = (userId: number): UserToken => {
	console.log("Generating token for user:", userId);
	const jwtData: JwtData = { userId };
	const token = generateJWT(jwtData);
	return { userId, token };
};

const login = async (credentials: Credentials): Promise<Response> => {
	console.group("🔑 Login attempt");
	console.log("Email:", credentials.email);

	const user = await findUserByEmail(credentials.email);
	if (!user) {
		console.warn("User not found:", credentials.email);
		console.groupEnd();
		return unauthorized("Invalid credentials");
	}

	const isValidPassword = await verifyPassword(
		credentials.password,
		user.password,
	);
	if (!isValidPassword) {
		console.warn("Invalid password for user:", credentials.email);
		console.groupEnd();
		return unauthorized("Invalid credentials");
	}

	console.log("Login successful for user:", user.id);
	const userToken = generateUserToken(user.id);
	console.groupEnd();
	return ok(userToken);
};

const register = async (credentials: Credentials): Promise<Response> => {
	console.group("📝 Registration attempt");
	console.log("Email:", credentials.email);

	const existingUser = await findUserByEmail(credentials.email);
	if (existingUser) {
		console.warn("Email already registered:", credentials.email);
		console.groupEnd();
		return badRequest("Email already registered");
	}

	const hashedPassword = await hashPassword(credentials.password);
	const user = await createUser(credentials.email, hashedPassword);
	console.log("User created:", user.id);

	const userToken = generateUserToken(user.id);
	console.log("Registration successful");
	console.groupEnd();
	return ok(userToken);
};
