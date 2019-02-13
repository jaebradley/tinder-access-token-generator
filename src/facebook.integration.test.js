import dotenv from 'dotenv';

import {
  generateAccessToken,
  getId,
} from './facebook';

dotenv.config();

jest.setTimeout(10000);

describe('#generateAccessToken', () => {
  it('generates a defined access token', async () => {
    const accessToken = await generateAccessToken({
      emailAddress: process.env.FACEBOOK_EMAIL_ADDRESS,
      password: process.env.FACEBOOK_PASSWORD,
    });
    expect(accessToken).toBeDefined();
    expect(accessToken.length).toBeGreaterThan(0);
  });
});

describe('#getId', () => {
  it('gets Facebook ID for authenticated user', async () => {
    const accessToken = await generateAccessToken({
      emailAddress: process.env.FACEBOOK_EMAIL_ADDRESS,
      password: process.env.FACEBOOK_PASSWORD,
    });
    const id = await getId({ accessToken });
    expect(id).toBe(process.env.EXPECTED_FACEBOOK_USER_ID);
  });
});
