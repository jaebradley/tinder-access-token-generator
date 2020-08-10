import axios from 'axios';

/**
 * Copied directly from https://github.com/fbessez/Tinder/blob/8bf8612e93702844b640fb2d79b2918238d376e9/phone_auth_token.py
 */

// This function will return a login request code in the HTTP response and a code via SMS
// Both these values need to be exchanged for api and refresh tokens
export function requestCodes({ phoneNumber, locale = 'en_US' }) {
  return axios.post(
    'https://graph.accountkit.com/v1.2/start_login',
    null,
    {
      params: {
        locale,
        phone_number: phoneNumber,
        access_token: 'AA|464891386855067|d1891abb4b0bcdfa0580d9b839f4a522',
        credentials_type: 'phone_number',
        fb_app_events_enabled: 1,
        fields: 'privacy_policy,terms_of_service',
        response_type: 'token',
        sdk: 'ios',
      },
    },
  ).then(
    response => response.data,
  ).then(({
    expires_in_sec: secondsToExpiration,
    login_request_code: loginRequestCode,
    min_resend_interval_sec: minimumSecondsBeforeResend,
    status,
  }) => ({
    secondsToExpiration,
    loginRequestCode,
    minimumSecondsBeforeResend,
    status,
  }));
}

export async function exchangeCodes({
  phoneNumber,
  loginCode,
  smsCode,
  locale = 'en_US',
}) {
  const loginConfirmationResponse = await axios.post(
    'https://graph.accountkit.com/v1.2/confirm_login',
    null,
    {
      params: {
        phone_number: phoneNumber,
        login_request_code: loginCode,
        confirmation_code: smsCode,
        locale,
        access_token: 'AA|464891386855067|d1891abb4b0bcdfa0580d9b839f4a522',
        credentials_type: 'phone_number',
        fb_app_events_enabled: 1,
        fields: 'privacy_policy,terms_of_service',
        response_type: 'token',
        sdk: 'ios',
      },
      headers: { 'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_5 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) Mobile/15D60 AKiOSSDK/4.29.0' },
    },
  );

  const {
    data: loginConfirmationData,
  } = loginConfirmationResponse;
  const {
    access_id: accessId,
    access_token: accessToken,
  } = loginConfirmationData;

  const apiTokenResponse = await axios.post(
    'https://api.gotinder.com/v2/auth/login/accountkit',
    {
      token: accessToken,
      id: accessId,
      client_version: '9.0.1',
    },
    {
      headers: {
        'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_5 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) Mobile/15D60 AKiOSSDK/4.29.0',
        'Content-Type': 'application/json',
      },
    },
  );

  const {
    data: apiTokenData,
  } = apiTokenResponse;

  const {
    data,
  } = apiTokenData;

  const {
    api_token: apiToken,
    refresh_token: refreshToken,
  } = data;

  return {
    apiToken,
    refreshToken,
  };
}
