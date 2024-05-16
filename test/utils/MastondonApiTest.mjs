import { expect } from 'chai'
import MastodonApi from '../../js/utils/MastodonApi.js';
import StubLogger from '../StubLogger.mjs';
import StubHttpRequest from '../StubHttpRequest.mjs';


describe('MastodonApi', () => {

  it("should get account info", async () => {
    const httpRequest = new StubHttpRequest()

    // @ts-ignore
    new MastodonApi("token", httpRequest, new StubLogger())
      .getAccountInfo("ohai.social", "cookie_mumbles")

    expect(httpRequest.requestMethod).to.equal('GET')
    expect(httpRequest.requestHeaders['Authorization']).to.equal('Bearer token')
    expect(httpRequest.url).to.equal('https://ohai.social/api/v1/accounts/lookup?acct=cookie_mumbles')
  })

  it("should verify credentials", async () => {
    const httpRequest = new StubHttpRequest()

    // @ts-ignore
    new MastodonApi("token", httpRequest, new StubLogger())
      .verifyCredentials("ohai.social")

    expect(httpRequest.requestMethod).to.equal('GET')
    expect(httpRequest.requestHeaders['Authorization']).to.equal('Bearer token')
    expect(httpRequest.url).to.equal('https://ohai.social/api/v1/accounts/verify_credentials')
  })


  it("should verify app credentials", async () => {
    const httpRequest = new StubHttpRequest()

    // @ts-ignore
    new MastodonApi("token", httpRequest, new StubLogger())
      .verifyAppCredentials("ohai.social", "-clientid-")

    expect(httpRequest.requestMethod).to.equal('GET')
    expect(httpRequest.requestHeaders['Authorization']).to.equal('Bearer token')
    expect(httpRequest.url).to.equal('https://ohai.social/api/v1/apps/verify_credentials?client_id=-clientid-')
  })


  it("should request statuses", async () => {
    const httpRequest = new StubHttpRequest()

    // @ts-ignore
    new MastodonApi("token", httpRequest, new StubLogger())
      .requestStatusses("ohai.social", "_accountid_", "_frommtootid_")

    expect(httpRequest.requestMethod).to.equal('GET')
    expect(httpRequest.requestHeaders['Authorization']).to.equal('Bearer token')
    expect(httpRequest.url).to.equal('https://ohai.social/api/v1/accounts/_accountid_/statuses?exclude_reblogs=true&limit=100&max_id=_frommtootid_')
  })



})
