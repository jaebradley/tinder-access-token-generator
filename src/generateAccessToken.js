import puppeteer from 'puppeteer';

const TINDER_OAUTH_URL = 'https://www.facebook.com/v2.8/dialog/oauth?app_id=464891386855067&channel_url=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter%2Fr%2Fd_vbiawPdxB.js%3Fversion%3D44%23cb%3Df213b0a5a606e94%26domain%3Dtinder.com%26origin%3Dhttps%253A%252F%252Ftinder.com%252Ff14b12c5d35c01c%26relation%3Dopener&client_id=464891386855067&display=popup&domain=tinder.com&e2e=%7B%7D&fallback_redirect_uri=200ee73f-9eb7-9632-4fdb-432ed0c670fa&locale=en_US&origin=1&redirect_uri=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter%2Fr%2Fd_vbiawPdxB.js%3Fversion%3D44%23cb%3Df20cfec000032b4%26domain%3Dtinder.com%26origin%3Dhttps%253A%252F%252Ftinder.com%252Ff14b12c5d35c01c%26relation%3Dopener%26frame%3Df2cc4d71cc96f9&response_type=token%2Csigned_request&scope=user_birthday%2Cuser_photos%2Cemail%2Cuser_friends%2Cuser_likes&sdk=joey&version=v2.8&ret=login';
const EMAIL_ID = 'input[name="email"]';
const PASSWORD_ID = 'input[name="pass"]';
const LOGIN_ID = 'input[name="login"]';

async function generateAccessToken({ emailAddress, password }) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(TINDER_OAUTH_URL);

  await page.click(EMAIL_ID);
  await page.keyboard.type(emailAddress);

  await page.click(PASSWORD_ID);
  await page.keyboard.type(password);

  const [
    response,
  ] = await Promise.all([
    page.waitForResponse(resp => resp.url().includes('/dialog/oauth')),
    page.click(LOGIN_ID),
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
  ]);

  const responseText = await response.text();
  const tokenParameter = 'access_token=';
  const startIndexOfAccessToken = responseText.indexOf(tokenParameter) + tokenParameter.length;
  const endIndexOfAccessToken = responseText.indexOf('&', startIndexOfAccessToken);
  await browser.close();
  return responseText.substring(startIndexOfAccessToken, endIndexOfAccessToken);
}

export default generateAccessToken;
