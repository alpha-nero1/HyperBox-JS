/**
 * @author Alessandro Alberga
 * @description http service.
 */
export class HttpService {

  constructor() { }

  /**
   * Get the request uri.
   *
   * @param { String } uri uri.
   * @param {*} opts options.
   */
  getRequestUri(uri, opts) {
    if (opts && opts.useHerokuCorsAnywhere) {
      return `https://cors-anywhere.herokuapp.com/${uri}`
    }
    return uri;
  }

  /**
   * Request function.
   * 
   * @param type request type.
   * @param uri request opts.
   *
   * @returns { Promise<any> } JSON parsed result.
   */
  request(type, uri, opts) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open(type, this.getRequestUri(uri, opts), true)
      if (opts) {
        if (opts.headers) {
          if (opts.requestHeadersObject && typeof opts.requestHeadersObject === 'object') {
            Object.entries(requestHeadersObject).forEach(header => {
              request.setRequestHeader(header[0], header[1])
            })
          }
        }
      }
      request.onreadystatechange = () => {
        if (request.readyState === XMLHttpRequest.DONE) {
          const { status } = request;
          if (status === 0 || (status >= 200 && status < 400)) {
            resolve(JSON.parse(request.response))
          }
        }
      }
      request.onerror = reject;
      request.send()
    });
  }
}
