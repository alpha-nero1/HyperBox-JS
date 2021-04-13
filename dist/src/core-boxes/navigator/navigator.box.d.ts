import { Box } from '../../box';
/**
 * @author Alessandro Alberga
 * @description Navigator box.
 */
export declare class NavigatorBox extends Box {
    static _BoxConfig: {
        name: string;
    };
    static _BoxInterface: {
        Outputs: {
            navigatorOnLoaded: any;
        };
    };
    protected _routes: any;
    protected _loadedRoutes: Map<any, any>;
    protected _currentBox?: Box;
    constructor();
    /**
     * Connect the navigator to the parent box.
     */
    boxOnDisplayed: () => void;
    /**
     * Set the routes.
     *
     * @param { [key]: { boxClassName } } routes routes object.
     */
    setRoutes(routes: any, routeOptions: any): void;
    /**
     * Cleanup an old box.
     */
    cleanupOldBox(): void;
    /**
     * Add arguments to current box.
     *
     * @param { any } argumentsObject arguments object.
     */
    addArgumentsToCurrentBox(argumentsObject: any): void;
    /**
     * Get the rendered current box.
     */
    getCurrentBox(): string;
    /**
     * Setter for the current box.
     *
     * @param { any } box box.
     */
    setCurrentBox(box: any): void;
    /**
     * Go to a route.
     *
     * @param { String } routeName
     * @param  { any } argumentsObject route arguments.
     */
    gotoRoute(routeName: any, argumentsObject: any): void;
    private dispatchNavigatorOnLoaded;
    display: () => string;
}
