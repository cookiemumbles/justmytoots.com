import { expect } from 'chai'
import MastodonApi from '../../js/utils/MastodonApi.js';
import StubLogger from '../StubLogger.mjs';
import { UrlCallStubFactory } from './UrlCallStubFactory.js';


describe('MastodonApi', () => {

  it("should get account info", async () => {
    const urlCallFactory = new UrlCallStubFactory()

    // @ts-ignore
    new MastodonApi("ohai.social", "token", new StubLogger(), urlCallFactory)
      .getAccountInfo("cookie_mumbles")

    const urlCall = urlCallFactory.lastBuilt
    expect(urlCall.requestMethod).to.equal('GET')
    expect(urlCall.requestHeaders['Authorization']).to.equal('Bearer token')
    expect(urlCall.url).to.equal('https://ohai.social/api/v1/accounts/lookup?acct=cookie_mumbles')
  })

  it("should verify credentials", async () => {
    const urlCallFactory = new UrlCallStubFactory()

    // @ts-ignore
    new MastodonApi("ohai.social", "token", new StubLogger(), urlCallFactory)
      .verifyCredentials()

    const urlCall = urlCallFactory.lastBuilt
    expect(urlCall.requestMethod).to.equal('GET')
    expect(urlCall.requestHeaders['Authorization']).to.equal('Bearer token')
    expect(urlCall.url).to.equal('https://ohai.social/api/v1/accounts/verify_credentials')
  })


  it("should verify app credentials", async () => {
    const urlCallFactory = new UrlCallStubFactory()

    // @ts-ignore
    new MastodonApi("ohai.social", "token", new StubLogger(), urlCallFactory)
      .verifyAppCredentials("-clientid-")

    const urlCall = urlCallFactory.lastBuilt
    expect(urlCall.requestMethod).to.equal('GET')
    expect(urlCall.requestHeaders['Authorization']).to.equal('Bearer token')
    expect(urlCall.url).to.equal('https://ohai.social/api/v1/apps/verify_credentials?client_id=-clientid-')
  })


  it("should request statuses", async () => {
    const urlCallFactory = new UrlCallStubFactory()

    // @ts-ignore
    new MastodonApi("ohai.social", "token", new StubLogger(), urlCallFactory)
      .requestStatusses("_accountid_", "_frommtootid_")

    const urlCall = urlCallFactory.lastBuilt
    expect(urlCall.requestMethod).to.equal('GET')
    expect(urlCall.requestHeaders['Authorization']).to.equal('Bearer token')
    expect(urlCall.url).to.equal('https://ohai.social/api/v1/accounts/_accountid_/statuses?exclude_reblogs=true&limit=100&max_id=_frommtootid_')
  })


  it("should favorite", async () => {
    const urlCallFactory = new UrlCallStubFactory()

    // @ts-ignore
    new MastodonApi("ohai.social", "token", new StubLogger(), urlCallFactory)
      .favorite("_tootid_")

    const urlCall = urlCallFactory.lastBuilt
    expect(urlCall.requestMethod).to.equal('POST')
    expect(urlCall.requestHeaders['Authorization']).to.equal('Bearer token')
    expect(urlCall.url).to.equal('https://ohai.social/api/v1/statuses/_tootid_/favourite')
  })


  it("should unfavorite", async () => {
    const urlCallFactory = new UrlCallStubFactory()

    // @ts-ignore
    new MastodonApi("ohai.social", "token", new StubLogger(), urlCallFactory)
      .unfavorite("_tootid_")

    const urlCall = urlCallFactory.lastBuilt
    expect(urlCall.requestMethod).to.equal('POST')
    expect(urlCall.requestHeaders['Authorization']).to.equal('Bearer token')
    expect(urlCall.url).to.equal('https://ohai.social/api/v1/statuses/_tootid_/unfavourite')
  })

  it("should boost", async () => {
    const urlCallFactory = new UrlCallStubFactory()

    // @ts-ignore
    new MastodonApi("ohai.social", "token", new StubLogger(), urlCallFactory)
      .boost("_tootid_")

    const urlCall = urlCallFactory.lastBuilt
    expect(urlCall.requestMethod).to.equal('POST')
    expect(urlCall.requestHeaders['Authorization']).to.equal('Bearer token')
    expect(urlCall.url).to.equal('https://ohai.social/api/v1/statuses/_tootid_/reblog')
  })

  it("should unboost", async () => {
    const urlCallFactory = new UrlCallStubFactory()

    // @ts-ignore
    new MastodonApi("ohai.social", "token", new StubLogger(), urlCallFactory)
      .unboost("_tootid_")

    const urlCall = urlCallFactory.lastBuilt
    expect(urlCall.requestMethod).to.equal('POST')
    expect(urlCall.requestHeaders['Authorization']).to.equal('Bearer token')
    expect(urlCall.url).to.equal('https://ohai.social/api/v1/statuses/_tootid_/unreblog')
  })

})
