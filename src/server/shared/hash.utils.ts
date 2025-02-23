/**
 * Hashes a password
 * @param password - The password to hash
 * @returns The hashed password
 */
export function hashPassword(password: string): Promise<string> {
	return Bun.password.hash(password);
}

/**
 * Verifies a password against a hashed password
 * @param password - The password to verify
 * @param hash - The hashed password
 * @returns True if the password is correct, false otherwise
 */
export function verifyPassword(
	password: string,
	hash: string,
): Promise<boolean> {
	return Bun.password.verify(password, hash);
}
