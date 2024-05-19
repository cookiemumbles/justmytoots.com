import { UrlCallFactory } from "../../js/utils/UrlCallFactory.js";
import { StubUrlCall } from "../StubUrlCall.mjs";

/** @implements UrlCallFactory */
export class UrlCallStubFactory extends UrlCallFactory {

  constructor() {
    super(null, null)
  }

  build() {
    this.lastBuilt = new StubUrlCall();
    return this.lastBuilt
  }
}


