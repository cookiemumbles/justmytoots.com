
/**
 * Simple wrapper for the 'document' variable to allow stub replacement in tests
 * @implements {WindowWrapper}
 */
export default class WindowWrapperImpl {
  location = window.location
  history = window.history
}
