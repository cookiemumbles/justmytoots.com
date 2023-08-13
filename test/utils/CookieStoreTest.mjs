import chai from 'chai'
import CookieStore from '../../js/utils/CookieStore.js';
import StubLogger from './StubLogger.mjs';
import "../../js/utils/Logger.js";
import DocumentWrapperStub from './DocumentWrapperStub.mjs';

describe('CookieStore', () => {

  it('should support basic reading and writing', () => {
    // given
    let stubDocument = new DocumentWrapperStub()
    let logger = new StubLogger()
    let cookieStore = new CookieStore(stubDocument, logger)

    // then
    chai.assert.isEmpty(cookieStore.getData())

    // when
    cookieStore.setData({data:"yes"})
    // then
    chai.expect(cookieStore.getData()).to.deep.equal({data:"yes"})

    // when
    cookieStore.reset()
    chai.assert.isEmpty(cookieStore.getData())
  });

  it('should support appending', () => {
    // given
    let stubDocument = new DocumentWrapperStub()
    let logger = new StubLogger()
    let cookieStore = new CookieStore(stubDocument, logger)

    // when
    cookieStore.setData({data:"yes"})
    cookieStore.appendData({otherdata:4})

    // then
    chai.expect(cookieStore.getData()).to.deep.equal({data:"yes", otherdata: 4})
  });

});
