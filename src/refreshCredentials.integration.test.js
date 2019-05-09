import axios from 'axios';

import generateToken, { refreshCredentials } from '.';

jest.setTimeout(20000);

describe('#refreshCredentials', () => {
  it('generates new tokens after a session is logged out', async (done) => {
    // Create two sessions / logins
    const {
      apiToken: firstApiToken,
      refreshToken: firstRefreshToken,
    } = await generateToken({
      facebookEmailAddress: process.env.FACEBOOK_EMAIL_ADDRESS,
      facebookPassword: process.env.FACEBOOK_PASSWORD,
    });

    const {
      apiToken: secondApiToken,
      refreshToken: secondRefreshToken,
    } = await generateToken({
      facebookEmailAddress: process.env.FACEBOOK_EMAIL_ADDRESS,
      facebookPassword: process.env.FACEBOOK_PASSWORD,
    });

    // Logout from first session to invalidate old token
    await axios.post(
      'https://api.gotinder.com/v2/auth/logout',
      {
        refresh_token: firstRefreshToken,
      },
      {
        headers: {
          'X-Auth-Token': firstApiToken,
        },
      },
    );

    try {
      await axios.get(
        'https://api.gotinder.com/profile',
        {
          headers: {
            'X-Auth-Token': firstApiToken,
          },
        },
      );
      done.fail('The profile request using first session access token should not succeed as user should have been logged out');
    } catch (e) {
      expect(e.response.status).toEqual(401);
    }

    try {
      await axios.get(
        'https://api.gotinder.com/profile',
        {
          headers: {
            'X-Auth-Token': secondApiToken,
          },
        },
      );
      done.fail('The profile request using second session access token should not succeed as user logout should have invalidated access token');
    } catch (e) {
      expect(e.response.status).toEqual(401);
    }

    // Get refresh tokens for second API token
    const {
      apiToken: thirdApiToken,
      refreshToken: thirdRefreshToken,
    } = await refreshCredentials({ apiToken: secondApiToken, refreshToken: secondRefreshToken });

    expect(thirdApiToken).toBeDefined();
    expect(thirdApiToken.length).toBeGreaterThan(0);
    expect(thirdRefreshToken).toBeDefined();
    expect(thirdRefreshToken.length).toBeGreaterThan(0);
    expect(thirdApiToken).not.toEqual(secondApiToken);
    expect(thirdApiToken).not.toEqual(secondRefreshToken);

    await axios.get(
      'https://api.gotinder.com/profile',
      {
        headers: {
          'X-Auth-Token': thirdApiToken,
        },
      },
    );

    done();
  });
});
