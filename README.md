# Tinder Access Token Generator

[![Greenkeeper badge](https://badges.greenkeeper.io/jaebradley/tinder-access-token-generator.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/jaebradley/tinder-access-token-generator.svg?branch=master)](https://travis-ci.org/jaebradley/tinder-access-token-generator)
[![npm](https://img.shields.io/npm/dt/tinder-access-token-generator.svg)](https://www.npmjs.com/package/tinder-access-token-generator)
[![npm](https://img.shields.io/npm/v/tinder-access-token-generator.svg)](https://www.npmjs.com/package/tinder-access-token-generator)

An `npm` package for use in `Node` that generates access tokens for the Tinder API using Facebook credentials.

This library does the following

1. Uses [`puppeteer`](https://github.com/GoogleChrome/puppeteer) to effectively go through the login flow via headless browser
2. Goes through Tinder confirmation flow - intercepts authentication response and parses access token
3. Uses access token from Facebook to identify associated Facebook ID
4. Using both access token from Facebook and Facebook ID, makes request to Tinder's authentication endpoint to return API access token

## API

### `generateToken`

Generate an access token given a Facebook email address and Facebook password.

This access token can be used to make Tinder API requests.

```javascript
import generateToken from 'tinder-access-token-generator';

const accessToken = await generateToken({
  facebookEmailAddress: 'myfacebookemail@address.com',
  facebookPassword: 'myfacebookpassword',
});
```

## Local Development

After cloning the repository, use `nvm` / `npm` to install dependencies.

To run all tests, execute `npm run test`.

To only run integration tests, execute `npm run integration-test`.

In order to execute local integration tests successfully, you'll need to specify `FACEBOOK_EMAIL_ADDRESS`, `FACEBOOK_PASSWORD`, and `EXPECTED_FACEBOOK_USER_ID` environment variables in a `.env` file

To build the production bundle, execute `npm run build`.

### Git Hooks

This project uses [`husky`](https://github.com/typicode/husky) to maintain git hooks.

- `pre-commit` - run `eslint`
- `commit-msg` - run commit message linting

### Commit Linting

This project uses [`semantic-release`](https://github.com/semantic-release/semantic-release) and [`commitlint`](https://github.com/conventional-changelog/commitlint) (specifically the [Angular commit convention](https://gist.github.com/stephenparish/9941e89d80e2bc58a153)) to automatically enforce semantic versioning.
