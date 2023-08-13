import JRequest from './JRequest.js';
import { buildUrl } from './JRequest.js';

export default class MastodonApi {

  /**
   * @param {string} server
   * @param {string} handle
   * @param {string|undefined} [bearerToken]
   */
  static getAccountInfo(server, handle, bearerToken) {
    return JRequest.request('GET',
      `https://${server}/api/v1/accounts/lookup?acct=${handle}`,
      {},
      getAppropriateHeaders(bearerToken)
    )
  }


  /**
   * docs: https://docs.joinmastodon.org/methods/accounts/#verify_credentials
   * request: GET /api/v1/accounts/verify_credentials HTTP/1.1
   * @param {string} server
   * @param {string|undefined} [bearerToken]
   */
  static verifyCredentials(server, bearerToken) {
    return JRequest.request('GET',
      `https://${server}/api/v1/accounts/verify_credentials`,
      {},
      getAppropriateHeaders(bearerToken)
    )
  }

  // TODO: update docs: requires plain read permission
  /**
   * docs: https://docs.joinmastodon.org/methods/apps/#verify_credentials
   * request: GET https://mastodon.example/api/v1/apps/verify_credentials HTTP/1.1
   * @param {string} server
   * @param {string} clientId
   * @param {string|undefined} [bearerToken]
   */
  static verifyAppCredentials(server, clientId, bearerToken) {
    return JRequest.request('GET',
      buildUrl(`https://${server}/api/v1/apps/verify_credentials`, {
        client_id: clientId,
      }),
      {},
      getAppropriateHeaders(bearerToken)
    )
  }


  /**
   * docs: https://docs.joinmastodon.org/methods/accounts/#statuses
   * request: GET https://mastodon.example/api/v1/accounts/:id/statuses HTTP/1.1
   * @param {string} server
   * @param {string} accountId
   * @param {string} fromTootId
   * @param {string|undefined} [bearerToken]
   */
  static requestStatusses(server, accountId, fromTootId, bearerToken) {
    const querryParams = { exclude_reblogs: true, limit: 100 }
    if (fromTootId) { querryParams.max_id = fromTootId }

    return JRequest.request('GET',
      buildUrl(`https://${server}/api/v1/accounts/${accountId}/statuses`, querryParams),
      {},
      getAppropriateHeaders(bearerToken)
    )
  }

  /**
     * docs: https://docs.joinmastodon.org/methods/apps/#create
     * request: POST https://mastodon.example/api/v1/apps HTTP/1.1
     * @param {string} name
     * @param {string} server
     * @param {string} redirectUrl
     */
  static requestNewApiApp(name, server, redirectUrl) {
    return JRequest.post(buildUrl(
      `https://${server}/api/v1/apps`, {
        client_name: name,
        redirect_uris: redirectUrl,
        scopes: getScopes(),
      }))
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
    window.location.href = buildUrl(`https://${server}/oauth/authorize`, {
      response_type: "code",
      client_id: clientId,
      redirect_uri: redirectUrl, // document.location.href
      // "force_login": false,
      scope: getScopes(),
    }).toString()
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
    return JRequest.post(buildUrl(`https://${server}/oauth/token`, {
      grant_type: 'authorization_code',
      code: code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUrl,
    }))
  }

  /**
   * docs: https://docs.joinmastodon.org/methods/statuses/#favourite
   * request: POST https://mastodon.example/api/v1/statuses/:id/favourite HTTP/1.1
   * @param {string} server
   * @param {string} bearerToken
   * @param {string} tootId
   */
  static favorite(server, bearerToken, tootId) {
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
