import LoggerLive from './LoggerLive.js';
import UrlCall from './UrlCall.js';
import { buildUrl } from './JRequest.js';

export default class MastodonAuth {
  constructor(
    httpRequest = new XMLHttpRequest(),
    providedLogger = new LoggerLive()
  ) {
    this.httpRequest = httpRequest
    this.logger = providedLogger
  }

  /**
   * docs: https://docs.joinmastodon.org/methods/apps/#create
   * request: POST https://mastodon.example/api/v1/apps HTTP/1.1
   *
   * @param {string} name
   * @param {string} server
   * @param {string} redirectUrl
   */
  requestNewApiApp(name, server, redirectUrl) {
    return new UrlCall(`https://${server}/api/v1/apps`, this.httpRequest, this.logger)
      .withParams({
        client_name: name,
        redirect_uris: redirectUrl,
        scopes: getScopes(),
      })
      .post()
  }

  /**
   * docs: https://docs.joinmastodon.org/methods/oauth/#authorize
   * request: GET https://mastodon.example/oauth/authorize HTTP/1.1
   *
   * @param {string} server
   * @param {string} [clientId]
   * @param {string} [redirectUrl]
   */
  getLoginPageUrl(server, clientId, redirectUrl) {
    return buildUrl(`https://${server}/oauth/authorize`, {
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
  requestBearerToken(server, code, clientId, clientSecret, redirectUrl) {
    return new UrlCall(`https://${server}/oauth/token`, this.httpRequest, this.logger)
      .withParams({
        grant_type: 'authorization_code',
        code: code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUrl,
      })
      .post()
  }

}

function getScopes() {
  // wuold need plain read to verify app credentials
  return "write:favourites write:statuses read:statuses read:accounts"
}
