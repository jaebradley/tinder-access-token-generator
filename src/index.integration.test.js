import generateToken from '.';

jest.setTimeout(10000);

describe('#generateToken', () => {
  it('generates token', async () => {
    const accessToken = await generateToken({
      facebookEmailAddress: process.env.FACEBOOK_EMAIL_ADDRESS,
      facebookPassword: process.env.FACEBOOK_PASSWORD,
    });
    expect(accessToken).toBeDefined();
    expect(accessToken.length).toBeGreaterThan(0);
  });
});
