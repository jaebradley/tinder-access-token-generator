import axios from 'axios';
import puppeteer from 'puppeteer';

const TINDER_OAUTH_URL = 'https://www.facebook.com/v2.6/dialog/oauth?redirect_uri=fb464891386855067%3A%2F%2Fauthorize%2F&display=touch&state=%7B%22challenge%22%3A%22IUUkEUqIGud332lfu%252BMJhxL4Wlc%253D%22%2C%220_auth_logger_id%22%3A%2230F06532-A1B9-4B10-BB28-B29956C71AB1%22%2C%22com.facebook.sdk_client_state%22%3Atrue%2C%223_method%22%3A%22sfvc_auth%22%7D&scope=user_birthday%2Cuser_photos%2Cuser_education_history%2Cemail%2Cuser_relationship_details%2Cuser_friends%2Cuser_work_history%2Cuser_likes&response_type=token%2Csigned_request&default_audience=friends&return_scopes=true&auth_type=rerequest&client_id=464891386855067&ret=login&sdk=ios&logger_id=30F06532-A1B9-4B10-BB28-B29956C71AB1&ext=1470840777&hash=AeZqkIcf-NEW6vBd';
const EMAIL_ID = '#email';
const PASSWORD_ID = '#pass';
const LOGIN_ID = '#loginbutton';
const CONFIRM_SELECTOR = 'button[name="__CONFIRM__"]';

async function generateAccessToken({ emailAddress, password }) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(TINDER_OAUTH_URL);

  await page.click(EMAIL_ID);
  await page.keyboard.type(emailAddress);

  await page.click(PASSWORD_ID);
  await page.keyboard.type(password);

  await Promise.all([
    page.waitForNavigation(),
    page.click(LOGIN_ID),
  ]);

  await page.waitForSelector(CONFIRM_SELECTOR);
  await page.click(CONFIRM_SELECTOR);
  const response = await page.waitForResponse(resp => resp.url().endsWith('/dialog/oauth/confirm'));
  const responseText = await response.text();
  const tokenParameter = 'access_token=';
  const startIndexOfAccessToken = responseText.indexOf(tokenParameter) + tokenParameter.length;
  const endIndexOfAccessToken = responseText.indexOf('&', startIndexOfAccessToken);
  await browser.close();
  return responseText.substring(startIndexOfAccessToken, endIndexOfAccessToken);
}

async function getId({ accessToken }) {
  const response = await axios.get('https://graph.facebook.com/me', { params: { access_token: accessToken } });
  return response.data.id;
}


export {
  generateAccessToken,
  getId,
};
