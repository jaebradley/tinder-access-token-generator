import { generateToken } from '.';

jest.setTimeout(10000);

describe('#generateToken', () => {
  it('generates token', async () => {
    const {
      apiToken,
      refreshToken,
    } = await generateToken({
      facebookEmailAddress: process.env.FACEBOOK_EMAIL_ADDRESS,
      facebookPassword: process.env.FACEBOOK_PASSWORD,
    });
    expect(apiToken).toBeDefined();
    expect(apiToken.length).toBeGreaterThan(0);
    expect(refreshToken).toBeDefined();
    expect(refreshToken.length).toBeGreaterThan(0);
  });
});
