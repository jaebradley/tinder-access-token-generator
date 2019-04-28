import dotenv from 'dotenv';

import generateAccessToken from './generateAccessToken';

dotenv.config();

jest.setTimeout(10000);

describe('#generateAccessToken', () => {
  xit('generates a defined access token', async () => {
    const accessToken = await generateAccessToken({
      emailAddress: process.env.FACEBOOK_EMAIL_ADDRESS,
      password: process.env.FACEBOOK_PASSWORD,
    });
    expect(accessToken).toBeDefined();
    expect(accessToken.length).toBeGreaterThan(0);
  });
});
