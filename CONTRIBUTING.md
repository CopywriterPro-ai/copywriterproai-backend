# Contributing

Thanks for your interest in contributing to CopywriterProAI! We welcome and appreciate your contributions. To report bugs, create a [GitHub issue](https://github.com/CopywriterPro-ai/copywriterproai-backend/issues/new/choose).

## Contribution Guide

### 1. Fork the Official Repository

Fork the [CopywriterProAI backend repository](https://github.com/CopywriterPro-ai/copywriterproai-backend) into your own account. Clone your forked repository into your local environment.

```shell
git clone git@github.com:<YOUR-USERNAME>/copywriterproai-backend.git
```
2. Configure Git
Set the official repository as your upstream to synchronize with the latest updates in the official repository. Add the original repository as upstream.

```shell
cd copywriterproai-backend
git remote add upstream git@github.com:CopywriterPro-ai/copywriterproai-backend.git
```
Verify that the remote is set.

```shell

git remote -v
```
You should see both origin and upstream in the output.

3. Synchronize with Official Repository
Synchronize the latest commit with the official repository before coding.

```shell

git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```
### 4. Create a New Branch and Open a Pull Request

After you finish your implementation, open the forked repository. The source branch is your new branch, and the target branch is the `CopywriterPro-ai/copywriterproai-backend` `main` branch. Then a PR should appear in [CopywriterProAI Backend PRs](https://github.com/CopywriterPro-ai/copywriterproai-backend/pulls).

The CopywriterProAI team will review your code.

## PR Rules

### 1. Pull Request Title

As described [here](https://github.com/commitizen/conventional-commit-types/blob/master/index.json), a valid PR title should begin with one of the following prefixes:

- `feat`: A new feature
- `fix`: A bug fix
- `doc`: Documentation only changes
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `style`: A refactoring that improves code style
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `ci`: Changes to CI configuration files and scripts (example scopes: `.github`, `ci` (Buildkite))
- `chore`: Other changes that don't modify src or test files
- `revert`: Reverts a previous commit

For example, a PR title could be:
- `refactor: modify package path`
- `feat(backend): add new API endpoint`, where `(backend)` means that this PR mainly focuses on the backend component.

You may also check out previous PRs in the [PR list](https://github.com/CopywriterPro-ai/copywriterproai-backend/pulls).

As described [here](https://github.com/CopywriterPro-ai/copywriterproai-backend/labels), we create several labels. Every PR should be tagged with the corresponding labels.

### 2. Pull Request Description

- If your PR is small (such as a typo fix), you can keep it brief.
- If it is large and you have changed a lot, it's better to write more details.
