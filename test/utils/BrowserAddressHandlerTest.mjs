import { expect } from 'chai'
import BrowserAddressHandler from '../../js/utils/BrowserAddressHandler.js'
import WindowWrapperStub from './WindowWrapperStub.js';

describe('BrowserAddressHandlerTest', () => {

  it('should support basic reading and writing', () => {
    const window = new WindowWrapperStub();
    window.setLocation("https://justmytoots.com/@cookie_mumbles@ohai.social")
    const addressHandler = new BrowserAddressHandler(window);

    const result = addressHandler.getUserHandleData()

    expect(result.handle).to.equal("@cookie_mumbles@ohai.social",)
    expect(result.userName).to.equal("cookie_mumbles")
    expect(result.server).to.equal("ohai.social")
  })

  it('should get user handle', () => {
    // given
    const window = new WindowWrapperStub();

    // when
    window.setLocation("https://justmytoots.com/@cookie_mumbles@ohai.social")
    let handle = new BrowserAddressHandler(window).getUserHandle()
    // then
    expect(handle).to.equal("@cookie_mumbles@ohai.social",)

    // when
    window.setLocation("https://justmytoots.com/cookie_mumbles@ohai.social")
    handle = new BrowserAddressHandler(window).getUserHandle()
    // then
    expect(handle).to.equal("@cookie_mumbles@ohai.social",)

    // when
    window.setLocation("https://localhost:8080?acct=cookie_mumbles@ohai.social")
    handle = new BrowserAddressHandler(window).getUserHandle()
    // then
    expect(handle).to.equal("@cookie_mumbles@ohai.social")

    // when
    window.setLocation("https://localhost:8080")
    let getFn = () => { new BrowserAddressHandler(window).getUserHandle() }
    // then
    expect(getFn).to.throw()

    // when
    window.setLocation("https://localhost:8080/cookie_mumbles")
    getFn = () => { new BrowserAddressHandler(window).getUserHandle() }
    // then
    expect(getFn).to.throw()

    // when
    window.setLocation("https://localhost:8080/cookie_mumbles/ohai.social")
    getFn = () => { new BrowserAddressHandler(window).getUserHandle() }
    // then
    expect(getFn).to.throw()
  })
})
