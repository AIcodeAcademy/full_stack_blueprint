# CHANGELOG

All notable changes to this project will be documented here.

## [0.0.1] - 2025-02-01

### Added
- chore(scaffolding): add placeholder index.ts files for future folder structure
  - Added index.ts scaffolding files to the following directories:
    src/client,
    src/client/app,
    src/client/app/route_1,
    src/index.ts,
    src/client/domain,
    src/client/app/route_n,
    src/client/shared,
    src/server,
    src/server/api,
    src/server/api/resource_1,
    src/server/api/resource_n,
    src/server/domain,
    src/server/shared 

## [0.1.0] - 2025-02-19

- feat(auth): implement user authentication system
  - Add login and registration endpoints
  - Create user table with email/password
  - Implement JWT token generation and validation
  - Add client-side auth form component
  - Add password hashing with Bun.password
  - Add SQL utilities for database operations
