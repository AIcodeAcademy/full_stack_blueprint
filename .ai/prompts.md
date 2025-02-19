```text
Follow @server-resource.mdc rules to generate the scaffolding for an `auth` resource, with its controller and repository. It must have `login` and `register` POST endpoints. Use the @server/domain types and the @server/shared utils. 
```

```text
go ahead and hash the passwords using @hash.utils.ts 
```

```text
return a @user-token.type.ts using @jwt.utils.ts to generate the token
```

```text   
now, go down to the client, add an auth page that allows user to login or register by consuming the new endpoints. Follow @client-page.mdc rules to create the page, the presenter component and the resource. Create also the types needed at @client/domain 
```

```text
add the page to the navigation, in the @navigation.utils.ts file and a link in the header at @header.component.ts
```
