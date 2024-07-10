import { expect } from 'chai'
import WindowWrapperStub from './WindowWrapperStub.js'

describe('WindowWrapperStubTest', () => {

  it('should set full url correctly', () => {
    const window = new WindowWrapperStub();
    window.setLocation("https://justmytoots.com:8080/foo/bar?q=baz#bang")

    expect(window.location.href).to.equal("https://justmytoots.com:8080/foo/bar?q=baz#bang")
    expect(window.location.protocol).to.equal("https:")
    expect(window.location.host).to.equal("justmytoots.com:8080")
    expect(window.location.origin).to.equal("https://justmytoots.com:8080")
    expect(window.location.hostname).to.equal("justmytoots.com")
    expect(window.location.port).to.equal("8080")
    expect(window.location.pathname).to.equal("/foo/bar")
    expect(window.location.search).to.equal("?q=baz")
    expect(window.location.hash).to.equal("#bang")
  })

  it('should set url without port correctly', () => {
    const window = new WindowWrapperStub();
    window.setLocation("https://justmytoots.com/foo/bar?q=baz#bang")

    expect(window.location.href).to.equal("https://justmytoots.com/foo/bar?q=baz#bang")
    expect(window.location.protocol).to.equal("https:")
    expect(window.location.host).to.equal("justmytoots.com")
    expect(window.location.origin).to.equal("https://justmytoots.com")
    expect(window.location.hostname).to.equal("justmytoots.com")
    expect(window.location.port).to.equal("")
    expect(window.location.pathname).to.equal("/foo/bar")
    expect(window.location.search).to.equal("?q=baz")
    expect(window.location.hash).to.equal("#bang")
  })

  it('should set url without hash correctly', () => {
    const window = new WindowWrapperStub();
    window.setLocation("https://justmytoots.com/foo/bar?q=baz")

    expect(window.location.href).to.equal("https://justmytoots.com/foo/bar?q=baz")
    expect(window.location.protocol).to.equal("https:")
    expect(window.location.host).to.equal("justmytoots.com")
    expect(window.location.origin).to.equal("https://justmytoots.com")
    expect(window.location.hostname).to.equal("justmytoots.com")
    expect(window.location.port).to.equal("")
    expect(window.location.pathname).to.equal("/foo/bar")
    expect(window.location.search).to.equal("?q=baz")
    expect(window.location.hash).to.equal("")
  })

  it('should set url without search correctly', () => {
    const window = new WindowWrapperStub();
    window.setLocation("https://justmytoots.com/foo/bar#bang")

    expect(window.location.href).to.equal("https://justmytoots.com/foo/bar#bang")
    expect(window.location.protocol).to.equal("https:")
    expect(window.location.host).to.equal("justmytoots.com")
    expect(window.location.origin).to.equal("https://justmytoots.com")
    expect(window.location.hostname).to.equal("justmytoots.com")
    expect(window.location.port).to.equal("")
    expect(window.location.pathname).to.equal("/foo/bar")
    expect(window.location.search).to.equal("")
    expect(window.location.hash).to.equal("#bang")
  })

  it('should set url without search or bang correctly', () => {
    const window = new WindowWrapperStub();
    window.setLocation("https://justmytoots.com/foo/bar")

    expect(window.location.href).to.equal("https://justmytoots.com/foo/bar")
    expect(window.location.protocol).to.equal("https:")
    expect(window.location.host).to.equal("justmytoots.com")
    expect(window.location.origin).to.equal("https://justmytoots.com")
    expect(window.location.hostname).to.equal("justmytoots.com")
    expect(window.location.port).to.equal("")
    expect(window.location.pathname).to.equal("/foo/bar")
    expect(window.location.search).to.equal("")
    expect(window.location.hash).to.equal("")
  })

  it('should set url without pathname', () => {
    const window = new WindowWrapperStub();
    window.setLocation("https://justmytoots.com?q=foo")

    expect(window.location.href).to.equal("https://justmytoots.com?q=foo")
    expect(window.location.protocol).to.equal("https:")
    expect(window.location.host).to.equal("justmytoots.com")
    expect(window.location.origin).to.equal("https://justmytoots.com")
    expect(window.location.hostname).to.equal("justmytoots.com")
    expect(window.location.port).to.equal("")
    expect(window.location.pathname).to.equal("")
    expect(window.location.search).to.equal("?q=foo")
    expect(window.location.hash).to.equal("")
  })

  it('should set url without anything', () => {
    const window = new WindowWrapperStub();
    window.setLocation("https://justmytoots.com")

    expect(window.location.href).to.equal("https://justmytoots.com")
    expect(window.location.protocol).to.equal("https:")
    expect(window.location.host).to.equal("justmytoots.com")
    expect(window.location.origin).to.equal("https://justmytoots.com")
    expect(window.location.hostname).to.equal("justmytoots.com")
    expect(window.location.port).to.equal("")
    expect(window.location.pathname).to.equal("")
    expect(window.location.search).to.equal("")
    expect(window.location.hash).to.equal("")
  })


})
