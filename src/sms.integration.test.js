import dotenv from 'dotenv';

import {
  requestCodes,
  exchangeCodes,
} from './sms';

dotenv.config();

jest.setTimeout(10000);

describe('#requestCodes', () => {
  xit('requests code via SMS', async () => {
    const { loginRequestCode } = await requestCodes({
      phoneNumber: process.env.PHONE_NUMBER,
    });
    expect(loginRequestCode).toBeDefined();
    expect(loginRequestCode.length).toBeGreaterThan(0);
  });
});

describe('#exchangeCodes', () => {
  xit('requests code via SMS', async () => {
    const { apiToken, refreshToken } = await exchangeCodes({
      phoneNumber: process.env.PHONE_NUMBER,
      loginCode: 'copy this from previous test',
      smsCode: 'copy this from phone',
    });
    expect(apiToken).toBeDefined();
    expect(apiToken.length).toBeGreaterThan(0);
    expect(refreshToken).toBeDefined();
    expect(refreshToken.length).toBeGreaterThan(0);
  });
});
