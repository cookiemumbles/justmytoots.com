import { expect } from 'chai'
import MastodonAuth from '../../js/utils/MastodonAuth.js';
import StubLogger from '../StubLogger.mjs';
import StubHttpRequest from '../StubHttpRequest.mjs';
import { UrlCallStubFactory } from './UrlCallStubFactory.js';


describe('MastodonAuth', () => {


  it("should request new api key for an app", async () => {
    const urlCallFactory = new UrlCallStubFactory()

    // @ts-ignore
    new MastodonAuth(new StubLogger(), urlCallFactory)
      .requestNewApiApp("AppName", "ohai.social", "https://redirect/url")

    const urlCall = urlCallFactory.lastBuilt
    expect(urlCall.requestMethod).to.equal('POST')
    expect(urlCall.url).to.equal('https://ohai.social/api/v1/apps?client_name=AppName&redirect_uris=https%3A%2F%2Fredirect%2Furl&scopes=write%3Afavourites+write%3Astatuses+read%3Astatuses+read%3Aaccounts')
  })


  it("should build login page url", async () => {

    const resultUrl = new MastodonAuth(new StubLogger(), new UrlCallStubFactory())
      .getLoginPageUrl("ohai.social", "_my_app_id_", "https://redirect/url")

    expect(resultUrl).to.equal('https://ohai.social/oauth/authorize?response_type=code&client_id=_my_app_id_&redirect_uri=https%3A%2F%2Fredirect%2Furl&scope=write%3Afavourites+write%3Astatuses+read%3Astatuses+read%3Aaccounts')
  })


  it("should request token", async () => {
    const urlCallFactory = new UrlCallStubFactory()

    // @ts-ignore
    new MastodonAuth(new StubLogger(), urlCallFactory)
      .requestBearerToken("ohai.social", "_code_", "_clientid_", "_client_secret_", "https://redirect/url")

    const urlCall = urlCallFactory.lastBuilt
    expect(urlCall.requestMethod).to.equal('POST')
    expect(urlCall.url).to.equal('https://ohai.social/oauth/token?grant_type=authorization_code&code=_code_&client_id=_clientid_&client_secret=_client_secret_&redirect_uri=https%3A%2F%2Fredirect%2Furl')
  })

})
