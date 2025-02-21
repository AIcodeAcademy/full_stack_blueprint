Follow @server-resource.mdc rules to generate the scaffolding for an `auth` resource, with its controller and repository. 
It must have `login` and `register` POST endpoints.
Create the types needed at `src/server/domain`
Then, go ahead and hash the passwords using @hash.utils.ts 
Return a @user-token.type.ts using @jwt.utils.ts to generate the token