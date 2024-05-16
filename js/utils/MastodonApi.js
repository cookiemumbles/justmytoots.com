import JRequest from './JRequest.js';
import { buildUrl } from './JRequest.js';
import LoggerLive from './LoggerLive.js';
import MastodonAuth from './MastodonAuth.js';
import UrlCall from './UrlCall.js';

export default class MastodonApi {

  /** @param {string|undefined} [bearerToken] */
  constructor(
    bearerToken = "",
    httpRequest = new XMLHttpRequest(),
    providedLogger = new LoggerLive()
  ) {
    this.bearerToken = bearerToken
    this.httpRequest = httpRequest
    this.logger = providedLogger
  }

  /**
   * @param {string} server
   * @param {string} handle
   */
  getAccountInfo(server, handle) {
    return new UrlCall(`https://${server}/api/v1/accounts/lookup`, this.httpRequest, this.logger)
      .withParams({ acct: handle })
      .addJsonDataHeader()
      .addHeader('Authorization', 'Bearer ' + this.bearerToken)
      .get()
  }

  /** @deprecated Replace with class method. */
  static getAccountInfo(server, handle, bearerToken) {
    return new MastodonApi(bearerToken).getAccountInfo(server, handle)
  }


  /**
   * docs: https://docs.joinmastodon.org/methods/accounts/#verify_credentials
   * request: GET /api/v1/accounts/verify_credentials HTTP/1.1
   *
   * @param {string} server
   */
  verifyCredentials(server) {
    return new UrlCall(`https://${server}/api/v1/accounts/verify_credentials`, this.httpRequest, this.logger)
      .addJsonDataHeader()
      .addHeader('Authorization', 'Bearer ' + this.bearerToken)
      .get()
  }

  /** @deprecated Replace with class method. */
  static verifyCredentials(server, bearerToken) {
    return new MastodonApi(bearerToken).verifyCredentials(server)
  }

  /**
   * docs: https://docs.joinmastodon.org/methods/apps/#verify_credentials
   * request: GET https://mastodon.example/api/v1/apps/verify_credentials HTTP/1.1
   *
   * @param {string} server
   * @param {string} clientId
   */
  verifyAppCredentials(server, clientId) {
    return new UrlCall(`https://${server}/api/v1/apps/verify_credentials`, this.httpRequest, this.logger)
      .addJsonDataHeader()
      .addHeader('Authorization', 'Bearer ' + this.bearerToken)
      .withParams({client_id: clientId})
      .get()
  }

  /** @deprecated Replace with class method. */
  static verifyAppCredentials(server, clientId, bearerToken) {
    return new MastodonApi(bearerToken).verifyAppCredentials(server, clientId)
  }

  /**
   * docs: https://docs.joinmastodon.org/methods/accounts/#statuses
   * request: GET https://mastodon.example/api/v1/accounts/:id/statuses HTTP/1.1
   *
   * @param {string} server
   * @param {string} accountId
   * @param {string} fromTootId
   */
  requestStatusses(server, accountId, fromTootId) {
    const querryParams = { exclude_reblogs: true, limit: 100 }
    if (fromTootId) { querryParams.max_id = fromTootId }

    return new UrlCall(`https://${server}/api/v1/accounts/${accountId}/statuses`, this.httpRequest, this.logger)
      .addJsonDataHeader()
      .addHeader('Authorization', 'Bearer ' + this.bearerToken)
      .withParams(querryParams)
      .get()
  }


  /** @deprecated Replace with class method. */
  static requestStatusses(server, accountId, fromTootId, bearerToken) {
    return new MastodonApi(bearerToken).requestStatusses(server, accountId, fromTootId)
  }


  /** @deprecated Replace with class method. */
  static requestNewApiApp(name, server, redirectUrl) {
    return new MastodonAuth().requestNewApiApp(name, server, redirectUrl)
  }

  /**
   * docs: https://docs.joinmastodon.org/methods/oauth/#authorize
   * request: GET https://mastodon.example/oauth/authorize HTTP/1.1
   *
   * @param {string} server
   * @param {string} [clientId]
   * @param {string} [redirectUrl]
   */
  static requestLoginPage(server, clientId, redirectUrl) {
    window.location.href =  new MastodonAuth().getLoginPageUrl(server, clientId, redirectUrl)
  }

  /**
   * docs: https://docs.joinmastodon.org/methods/oauth/#token
   * request: POST https://mastodon.example/oauth/token HTTP/1.1
   * @param {string} server
   * @param {string} code
   * @param {string} clientId
   * @param {string} clientSecret
   * @param {string} redirectUrl
   */
  static requestBearerToken(server, code, clientId, clientSecret, redirectUrl) {
    return new MastodonAuth().requestBearerToken(server, code, clientId, clientSecret, redirectUrl)
  }

  /**
   * docs: https://docs.joinmastodon.org/methods/statuses/#favourite
   * request: POST https://mastodon.example/api/v1/statuses/:id/favourite HTTP/1.1
   * @param {string} server
   * @param {string} bearerToken
   * @param {string} tootId
   */
  static favorite(server, bearerToken, tootId) {
    return new UrlCall(`https://${server}/api/v1/accounts/${accountId}/statuses`)
      .addJsonDataHeader()
      .addHeader('Authorization', 'Bearer ' + bearerToken)
      .withParams(querryParams)
      .get()
    return JRequest.request('POST',
      `https://${server}/api/v1/statuses/${tootId}/favourite`,
      {},
      getAppropriateHeaders(bearerToken)
    )
  }

  /**
   * docs: https://docs.joinmastodon.org/methods/statuses/#unfavourite
   * request: POST https://mastodon.example/api/v1/statuses/:id/favourite HTTP/1.1
   * @param {string} server
   * @param {string} bearerToken
   * @param {string} tootId
   */
  static unfavorite(server, bearerToken, tootId) {
    return JRequest.request('POST',
      `https://${server}/api/v1/statuses/${tootId}/unfavourite`,
      {}, 
      getAppropriateHeaders(bearerToken)
    )
  }

  /**
   * docs: https://docs.joinmastodon.org/methods/statuses/#boost
   * request: POST https://mastodon.example/api/v1/statuses/:id/reblog HTTP/1.1
   * @param {string} server
   * @param {string} bearerToken
   * @param {string} tootId
   */
  static boost(server, bearerToken, tootId) {
    return JRequest.request('POST',
      `https://${server}/api/v1/statuses/${tootId}/reblog`,
      {}, 
      getAppropriateHeaders(bearerToken)
    )
  }

  /**
   * docs: https://docs.joinmastodon.org/methods/statuses/#unreblog
   * request: POST https://mastodon.example/api/v1/statuses/:id/unreblog HTTP/1.1
   * @param {string} server
   * @param {string} bearerToken
   * @param {string} tootId
   */
  static unboost(server, bearerToken, tootId) {
    return JRequest.request('POST',
      `https://${server}/api/v1/statuses/${tootId}/unreblog`,
      {}, 
      getAppropriateHeaders(bearerToken)
    )
  }
}

/**
 * @param {string} bearerToken
 */
function getAppropriateHeaders(bearerToken) {
  const requestHeaders = { 'Content-Type': 'application/json;charset=UTF-8' }
  if (bearerToken) {
    requestHeaders['Authorization'] = 'Bearer ' + bearerToken
  }
  return requestHeaders
}

function getScopes() {
  // wuold need plain read to verify app credentials
  return "write:favourites write:statuses read:statuses read:accounts"
}
