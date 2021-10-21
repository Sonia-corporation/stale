# Contributing

## First step

### Install the dependencies

Run `npm i` to install the dependencies.  
It will also create the Git hooks with Husky if you Git version is recent enough.

Install the Git hooks to lint the code when creating commits.  
Run `npm run install-git-hooks`.

Run `npm run start` to start the local development server.

## Git

### Alias

This project uses an alias to push automatically with the upstream option set.  
The configuration of the alias is a [local one](.gitconfig).

This alias is used by the `cz` script to automatically push on the remote with a dynamic branch name.

**Troubleshooting:**

If the command `push-upstream` does not exists, you can link it to your git:  
Run `git config --local include.path ../.gitconfig`.

**_Note:_**

The error should be something like:

`git: 'push-upstream' is not a git command. See 'git --help'.`

## Commit Message Guidelines

We have very precise rules over how our git commit messages can be formatted.  
This leads to **more readable messages** that are easy to follow when looking through the **project history**.

### Commit Message Format

Each commit message consists of a **header**, a **body** and a **footer**.  
The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **type** and the **subject** are mandatory.  
All the other stuff is optional.

Any line of the commit message cannot be longer 144 characters!  
This allows the message to be easier to read on GitHub as well as in various git tools.

### Revert

If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit.  
In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type

Must be one of the following:

- **feat** : A new feature
- **fix** : A bug fix
- **style** : Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf** : A code change that improves performance
- **test** : Adding missing tests or correcting existing tests
- **build** : Changes that affect the build system, CI configuration or external dependencies
- **docs** : Changes that affect the documentation
- **chore** : Anything else

### Scope

The scope could be anything specifying place of the commit change.  
For example `datepicker`, `dialog`, `app`, etc.

### Subject

The subject contains succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize first letter
- no dot (.) at the end

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".  
The body should include the motivation for the change and contrast this with previous behaviour.

### Footer

The footer should contain any information about **Breaking Changes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines.  
The rest of the commit message is then used for this.
