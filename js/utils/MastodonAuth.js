import LoggerLive from './LoggerLive.js';
import { buildUrl } from './JRequest.js';
import { UrlCallFactory } from './UrlCallFactory.js';

export default class MastodonAuth {
  /** @param {Logger} [providedLogger=new LoggerLive()]  */
  constructor(
    providedLogger = new LoggerLive(),
    urlCallFactory = new UrlCallFactory()
  ) {
    this.logger = providedLogger
    this.urlCallFactory = urlCallFactory
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
    return this.urlCallFactory.build()
      .withUrl(`https://${server}/api/v1/apps`)
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
    return this.urlCallFactory.build()
      .withUrl(`https://${server}/oauth/token`)
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
