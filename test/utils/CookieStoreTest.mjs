import { assert, expect } from 'chai'
import CookieStore from '../../js/utils/CookieStore.js';
import LoggerStub from '../LoggerStub.mjs';
import "../../js/utils/Logger.js";
import DocumentWrapperStub from '../DocumentWrapperStub.mjs';

describe('CookieStore', () => {

  it('should support basic reading and writing', () => {
    // given
    const stubDocument = new DocumentWrapperStub()
    const logger = new LoggerStub()
    const cookieStore = new CookieStore(stubDocument, logger)

    // then
    assert.isEmpty(cookieStore.getData())

    // when
    cookieStore.setData({data:"yes"})
    // then
    expect(cookieStore.getData()).to.deep.equal({data:"yes"})

    // when
    cookieStore.reset()
    assert.isEmpty(cookieStore.getData())
  });

  it('should support appending', () => {
    // given
    const stubDocument = new DocumentWrapperStub()
    const logger = new LoggerStub()
    const cookieStore = new CookieStore(stubDocument, logger)

    // when
    cookieStore.setData({data:"yes"})
    cookieStore.appendData({otherdata:4})

    // then
    expect(cookieStore.getData()).to.deep.equal({data:"yes", otherdata: 4})
  });

});
