import LoggerImpl from './LoggerImpl.js';
import MastodonAuth from './MastodonAuth.js';
import { UrlCallFactory } from './UrlCallFactory.js';

export default class MastodonApi {

  /**
   * @param {string} [server]
   * @param {string} [bearerToken]
   * */
  constructor(
    server = "",
    bearerToken = "",
    providedLogger = new LoggerImpl(),
    urlCallFactory = new UrlCallFactory()
  ) {
    this.server = server
    this.bearerToken = bearerToken
    this.logger = providedLogger
    this.urlCallFactory = urlCallFactory
  }

  /** @param {string} handle */
  getAccountInfo(handle) {
    return this.urlCallFactory.build()
      .withUrl(`https://${this.server}/api/v1/accounts/lookup`)
      .withParams({ acct: handle })
      .addJsonDataHeader()
      .addHeader('Authorization', 'Bearer ' + this.bearerToken)
      .get()
  }

  /** @deprecated Replace with class method. */
  static getAccountInfo(server, handle, bearerToken) {
    return new MastodonApi(server, bearerToken).getAccountInfo(handle)
  }


  /**
   * docs: https://docs.joinmastodon.org/methods/accounts/#verify_credentials
   * request: GET /api/v1/accounts/verify_credentials HTTP/1.1
   */
  verifyCredentials() {
    return this.urlCallFactory.build()
      .withUrl(`https://${this.server}/api/v1/accounts/verify_credentials`)
      .addJsonDataHeader()
      .addHeader('Authorization', 'Bearer ' + this.bearerToken)
      .get()
  }

  /** @deprecated Replace with class method. */
  static verifyCredentials(server, bearerToken) {
    return new MastodonApi(server, bearerToken).verifyCredentials()
  }

  /**
   * docs: https://docs.joinmastodon.org/methods/apps/#verify_credentials
   * request: GET https://mastodon.example/api/v1/apps/verify_credentials HTTP/1.1
   *
   * @param {string} clientId
   */
  verifyAppCredentials(clientId) {
    return this.urlCallFactory.build()
      .withUrl(`https://${this.server}/api/v1/apps/verify_credentials`)
      .addJsonDataHeader()
      .addHeader('Authorization', 'Bearer ' + this.bearerToken)
      .withParams({client_id: clientId})
      .get()
  }

  /** @deprecated Replace with class method. */
  static verifyAppCredentials(server, clientId, bearerToken) {
    return new MastodonApi(server, bearerToken).verifyAppCredentials(clientId)
  }

  /**
   * docs: https://docs.joinmastodon.org/methods/accounts/#statuses
   * request: GET https://mastodon.example/api/v1/accounts/:id/statuses HTTP/1.1
   *
   * @param {string} accountId
   * @param {string} fromTootId
   */
  requestStatusses(accountId, fromTootId) {
    const querryParams = { exclude_reblogs: true, limit: 100 }
    if (fromTootId) { querryParams.max_id = fromTootId }

    return this.urlCallFactory.build()
      .withUrl(`https://${this.server}/api/v1/accounts/${accountId}/statuses`)
      .addJsonDataHeader()
      .addHeader('Authorization', 'Bearer ' + this.bearerToken)
      .withParams(querryParams)
      .get()
  }


  /** @deprecated Replace with class method. */
  static requestStatusses(server, accountId, fromTootId, bearerToken) {
    return new MastodonApi(server, bearerToken).requestStatusses(accountId, fromTootId)
  }


  /** @deprecated Replace with class method. */
  static requestNewApiApp(name, server, redirectUrl) {
    return new MastodonAuth(server).requestNewApiApp(name, redirectUrl)
  }

  /** @deprecated Replace with class method. */
  static requestLoginPage(server, clientId, redirectUrl) {
    window.location.href =  new MastodonAuth(server).getLoginPageUrl(clientId, redirectUrl)
  }

  /** @deprecated Replace with class method. */
  static requestBearerToken(server, code, clientId, clientSecret, redirectUrl) {
    return new MastodonAuth(server).requestBearerToken(code, clientId, clientSecret, redirectUrl)
  }

  /**
   * docs: https://docs.joinmastodon.org/methods/statuses/#favourite
   * request: POST https://mastodon.example/api/v1/statuses/:id/favourite HTTP/1.1
   * @param {string} tootId
   */
  favorite(tootId) {
    return this.urlCallFactory.build()
      .withUrl(`https://${this.server}/api/v1/statuses/${tootId}/favourite`)
      .addJsonDataHeader()
      .addHeader('Authorization', 'Bearer ' + this.bearerToken)
      .post()
  }

  /** @deprecated Replace with class method. */
  static favorite(server, bearerToken, tootId) {
    return new MastodonApi(server, bearerToken).favorite(tootId)
  }

  /**
   * docs: https://docs.joinmastodon.org/methods/statuses/#unfavourite
   * request: POST https://mastodon.example/api/v1/statuses/:id/favourite HTTP/1.1
   * @param {string} tootId
   */
  unfavorite(tootId) {
    return this.urlCallFactory.build()
      .withUrl(`https://${this.server}/api/v1/statuses/${tootId}/unfavourite`)
      .addJsonDataHeader()
      .addHeader('Authorization', 'Bearer ' + this.bearerToken)
      .post()
  }

  /** @deprecated Replace with class method. */
  static unfavorite(server, bearerToken, tootId) {
    return new MastodonApi(server, bearerToken).unfavorite(tootId)
  }

  /**
   * docs: https://docs.joinmastodon.org/methods/statuses/#boost
   * request: POST https://mastodon.example/api/v1/statuses/:id/reblog HTTP/1.1
   * @param {string} server
   * @param {string} tootId
   */
  boost(tootId) {
    return this.urlCallFactory.build()
      .withUrl(`https://${this.server}/api/v1/statuses/${tootId}/reblog`)
      .addJsonDataHeader()
      .addHeader('Authorization', 'Bearer ' + this.bearerToken)
      .post()
  }

  /** @deprecated Replace with class method. */
  static boost(server, bearerToken, tootId) {
    return new MastodonApi(server, bearerToken).boost(tootId)
  }

  /**
   * docs: https://docs.joinmastodon.org/methods/statuses/#unreblog
   * request: POST https://mastodon.example/api/v1/statuses/:id/unreblog HTTP/1.1
   * @param {string} tootId
   */
  unboost(tootId) {
    return this.urlCallFactory.build()
      .withUrl(`https://${this.server}/api/v1/statuses/${tootId}/unreblog`)
      .addJsonDataHeader()
      .addHeader('Authorization', 'Bearer ' + this.bearerToken)
      .post()
  }

  /** @deprecated Replace with class method. */
  static unboost(server, bearerToken, tootId) {
    return new MastodonApi(server, bearerToken).unboost(tootId)
  }
}
