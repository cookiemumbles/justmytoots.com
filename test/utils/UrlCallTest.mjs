import { expect } from 'chai'
import UrlCall from '../../js/utils/UrlCall.js';
import StubLogger from '../StubLogger.mjs';
import StubHttpRequest from '../StubHttpRequest.mjs';

describe('UrlCall', () => {

  it("should set url", () => {
    const httpRequest = new StubHttpRequest()

    // @ts-ignore
    const urlCall = new UrlCall("https://some.url", httpRequest, new StubLogger())

    expect(urlCall.url).to.equal("https://some.url")
  })


  it("should set request method", () => {
    const httpRequest = new StubHttpRequest()
    // @ts-ignore
    let urlCall = new UrlCall("https://some.url", httpRequest, new StubLogger())

    urlCall.get()
    expect(httpRequest.url).to.equal("https://some.url")
    expect(httpRequest.requestMethod).to.equal("GET")

    urlCall.post()
    expect(httpRequest.url).to.equal("https://some.url")
    expect(httpRequest.requestMethod).to.equal("POST")

    urlCall.put()
    expect(httpRequest.url).to.equal("https://some.url")
    expect(httpRequest.requestMethod).to.equal("PUT")

    urlCall.delete()
    expect(httpRequest.url).to.equal("https://some.url")
    expect(httpRequest.requestMethod).to.equal("DELETE")
  })


  it("should set request headers", () => {
    const httpRequest = new StubHttpRequest()

    // @ts-ignore
    new UrlCall("https://some.url", httpRequest, new StubLogger())
      .addJsonDataHeader()
      .addHeader("Authorization", "Bearer <token>")
      .post()

    expect(httpRequest.requestHeaders['Content-Type']).to.equal('application/json;charset=UTF-8')
    expect(httpRequest.requestHeaders['Authorization']).to.equal("Bearer <token>")
  })

  it("should set request data", async () => {
    const httpRequest = new StubHttpRequest()

    // @ts-ignore
    const urlCall = new UrlCall("https://some.url", httpRequest, new StubLogger())
      .withData({ key:'value' })

    const result =  urlCall.post()
    httpRequest.onload()
    await result
    expect(httpRequest.sentData).to.equal('{"key":"value"}')
  })

  it("should allow querry params", () => {
    const httpRequest = new StubHttpRequest()

    // @ts-ignore
    const urlCall = new UrlCall("https://some.url", httpRequest, new StubLogger())
      .withParams({someData: "data"})

    expect(urlCall.url).to.equal("https://some.url/?someData=data")
  })

  it('should handle success responses correctly', async () => {
    // given
    const httpRequest = new StubHttpRequest()
    // @ts-ignore
    const urlCall = new UrlCall("https://some.url", httpRequest, new StubLogger())

    // when
    httpRequest.status = 200
    httpRequest.response = "SUCCESS"
    const run = urlCall.post()
    httpRequest.onload()

    // then
    const result = await run
    expect(result).to.equal("SUCCESS");
  })

  it('should handle error responses correctly', async () => {
    // given
    const httpRequest = new StubHttpRequest()
    // @ts-ignore
    const urlCall = new UrlCall("https://some.url", httpRequest, new StubLogger())

    // when
    httpRequest.status = 404
    httpRequest.statusText = "This action is not allowed"
    httpRequest.response = "Not Allowed"
    const run = urlCall.post()
    httpRequest.onload()

    // then
    try {
      await run
      throw new Error("Should not succeed")
    } catch (error) {
      expect(error.httpCode).to.equal(404)
      expect(error.statusText).to.equal("This action is not allowed")
      expect(error.response).to.equal("Not Allowed")
      expect(error.requestUrl).to.equal("https://some.url")
    }
  })

  it('should handle connection errors correctly', async () => {
    // given
    const httpRequest = new StubHttpRequest()
    // @ts-ignore
    const urlCall = new UrlCall("https://some.url", httpRequest, new StubLogger())

    // when
    const run = urlCall.post()
    httpRequest.onerror()

    // then
    try {
      await run
      throw new Error("Should not succeed")
    } catch (error) {
      expect(error.message).to.equal("Unable to connect to server.")
    }
  })

  it('should handle timeouts', async () => {
    // given
    const httpRequest = new StubHttpRequest()
    // @ts-ignore
    const urlCall = new UrlCall("https://some.url", httpRequest, new StubLogger())

    // when
    const run = urlCall.post()
    httpRequest.ontimeout()

    // then
    try {
      await run
      throw new Error("Should not succeed")
    } catch (error) {
      expect(error.message).to.equal("Connection to server timed out.")
    }
  })

})
