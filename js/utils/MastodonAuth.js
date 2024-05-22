import LoggerImpl from './LoggerImpl.js';
import { buildUrl } from './JRequest.js';
import { UrlCallFactory } from './UrlCallFactory.js';

export default class MastodonAuth {

  /** 
   * @param {string} [server]
   * @param {Logger} [providedLogger=new LoggerImpl()]
   */
  constructor(
    server = "",
    providedLogger = new LoggerImpl(),
    urlCallFactory = new UrlCallFactory()
  ) {
    this.server = server
    this.logger = providedLogger
    this.urlCallFactory = urlCallFactory
  }

  /**
   * docs: https://docs.joinmastodon.org/methods/apps/#create
   * request: POST https://mastodon.example/api/v1/apps HTTP/1.1
   *
   * @param {string} name
   * @param {string} redirectUrl
   */
  requestNewApiApp(name, redirectUrl) {
    return this.urlCallFactory.build()
      .withUrl(`https://${this.server}/api/v1/apps`)
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
   * @param {string} [clientId]
   * @param {string} [redirectUrl]
   */
  getLoginPageUrl(clientId, redirectUrl) {
    return buildUrl(`https://${this.server}/oauth/authorize`, {
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
   * @param {string} code
   * @param {string} clientId
   * @param {string} clientSecret
   * @param {string} redirectUrl
   */
  requestBearerToken(code, clientId, clientSecret, redirectUrl) {
    return this.urlCallFactory.build()
      .withUrl(`https://${this.server}/oauth/token`)
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
