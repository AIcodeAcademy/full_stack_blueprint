# Git rules

## Initialize repo if not yet done

- Add a `.gitignore` file for the current tech stack

## Git commits

- Add any pending changes
- Generate a message with the summary of changes
- Using conventional commits for messages
- Be explicit and detailed about the changes

## Git release

- Create or update a `CHANGELOG.md` file with messages from commits since last release
- Update version in `package.json` using semantic versioning
- Document the changes following docs guidelines
- Create a _tag_ for the release using semantic versioning
- Do not push any change, keep your work at local repository
