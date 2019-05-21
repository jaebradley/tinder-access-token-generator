# Tinder Access Token Generator

[![Build Status](https://travis-ci.org/jaebradley/tinder-access-token-generator.svg?branch=master)](https://travis-ci.org/jaebradley/tinder-access-token-generator)
[![npm](https://img.shields.io/npm/dt/tinder-access-token-generator.svg)](https://www.npmjs.com/package/tinder-access-token-generator)
[![npm](https://img.shields.io/npm/v/tinder-access-token-generator.svg)](https://www.npmjs.com/package/tinder-access-token-generator)

An `npm` package for use in `Node` that generates access tokens for the Tinder API using Facebook credentials or SMS-based login.

This library does the following when logging through via Facebook

1. Uses [`puppeteer`](https://github.com/GoogleChrome/puppeteer) to effectively go through the login flow via headless browser
2. Goes through Tinder confirmation flow - intercepts authentication response and parses access token
3. Using the Facebook access token, makes a request to Tinder's authentication endpoint to return an API access token and a refresh token

## API

### `generateToken`

Generate access and refresh tokens given a Facebook email address and Facebook password.

This access token can be used to make Tinder API requests, while the refresh token can be used later to generate updated access and refresh tokens.

```javascript
import { generateToken } from 'tinder-access-token-generator';

const {
  apiToken,
  refreshToken,
} = await generateToken({
  facebookEmailAddress: 'myfacebookemail@address.com',
  facebookPassword: 'myfacebookpassword',
});
```

### `refreshCredentials`

Refresh an access token and refresh token given a previous access token and refresh token.

Given a single session (across both web and mobile clients) this method will return the existing access token and refresh token pair.

However, given multiple sessions, when a single session signs out, all access tokens are invalidated and must be refreshed.

Use this method to refresh the credentials for existing sessions.

However, this method will **not** work when a single session exists (and is subsequently logged out of). In such a case, you'll need to call `generateToken`.

```javascript
import { generateToken, refreshCredentials } from 'tinder-access-token-generator';

// Generate credentials
const {
  apiToken,
  refreshToken,
} = await generateToken({
  facebookEmailAddress: 'myfacebookemail@address.com',
  facebookPassword: 'myfacebookpassword',
});

// Some time passes...

// Generate updated credentials
const {
  apiToken: updatedApiToken,
  refreshToken: updatedRefreshToken,
} = await refreshCredentials({ apiToken, refreshToken });
```

### `requestSMSCodes`

Generate two codes, one via the `HTTP` response and the other via `SMS`.

Both of these codes will be used later when exchanged for api and refresh tokens.

There's an optional `locale` query parameter that is by default set to `en_US` but can be changed to modify the language of the `SMS` message.

```javascript
import { requestSMSCodes } from 'tinder-access-token-generator';

const {
  loginRequestCode,
} = await requestSMSCodes({
  phoneNumber: '+12345678910',
});
```

### `exchangeSMSCodes`

Generates api and refresh tokens using the `loginRequestCode` response value from `requestSMSCodes` and the code sent via `SMS`.

```javascript
import { exchangeSMSCodes } from 'tinder-access-token-generator';

const {
  apiToken,
  refreshToken,
} = await exchangeSMSCodes({
  phoneNumber: '+12345678910',
  loginCode: 'value from requestSMSCodes response',
  smsCode: 'value sent via SMS',
})
```

## Local Development

After cloning the repository, use `nvm` / `npm` to install dependencies.

To run all tests, execute `npm run test`.

To only run integration tests, execute `npm run integration-test`.

In order to execute local integration tests successfully, you'll need to specify `FACEBOOK_EMAIL_ADDRESS`, and `FACEBOOK_PASSWORD` environment variables in a `.env` file

To build the production bundle, execute `npm run build`.

### Git Hooks

This project uses [`husky`](https://github.com/typicode/husky) to maintain git hooks.

- `pre-commit` - run `eslint`
- `commit-msg` - run commit message linting

### Commit Linting

This project uses [`semantic-release`](https://github.com/semantic-release/semantic-release) and [`commitlint`](https://github.com/conventional-changelog/commitlint) (specifically the [Angular commit convention](https://gist.github.com/stephenparish/9941e89d80e2bc58a153)) to automatically enforce semantic versioning.
