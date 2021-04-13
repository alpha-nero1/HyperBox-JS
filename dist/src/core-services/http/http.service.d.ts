/**
 * @author Alessandro Alberga
 * @description http service.
 */
export declare class HttpService {
    constructor();
    /**
     * Get the request uri.
     *
     * @param { String } uri uri.
     * @param {*} opts options.
     */
    getRequestUri(uri: any, opts: any): any;
    /**
     * Request function.
     *
     * @param type request type.
     * @param uri request opts.
     *
     * @returns { Promise<any> } JSON parsed result.
     */
    request(type: any, uri: any, opts: any): Promise<unknown>;
}
