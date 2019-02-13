import axios from 'axios';

import {
  generateAccessToken,
  getId,
} from './facebook';

export default async function generateToken({
  facebookEmailAddress,
  facebookPassword,
}) {
  const facebookAccessToken = await generateAccessToken({
    emailAddress: facebookEmailAddress,
    password: facebookPassword,
  });
  const facebookId = await getId({ accessToken: facebookAccessToken });

  const response = await axios.post(
    'https://api.gotinder.com/auth',
    {
      facebook_id: facebookId,
      facebook_token: facebookAccessToken,
    },
  );

  return response.data.token;
}
