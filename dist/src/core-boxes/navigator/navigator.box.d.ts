import { Box } from '../../box';
import { NavRoutes } from './types/nav-route.interface';
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
    protected _routes: NavRoutes;
    protected _activeRoute?: string;
    get innerBox(): Box;
    /**
     * Connect the navigator to the parent box.
     */
    boxOnDisplayed: () => void;
    setRoutes(routes: NavRoutes): void;
    cleanupOldBox(): void;
    addArgumentsToCurrentBox(argumentsObject: any): void;
    setCurrentBox(box: typeof Box): void;
    gotoRoute(route: string, argumentsObject: any): void;
    private dispatchNavigatorOnLoaded;
}
