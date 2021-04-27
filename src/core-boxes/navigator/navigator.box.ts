import { Box } from '../../box';
import { safeExec } from '../../utils/safe-exec';
import { NavRouteItem, NavRoutes } from './types/nav-route.interface';

/**
 * @author Alessandro Alberga
 * @description Navigator box.
 */
export class NavigatorBox extends Box {

  static _BoxConfig = {
    name: 'navigator-box'
  }

  static _BoxInterface = {
    Outputs: {
      navigatorOnLoaded: null
    }
  }

  protected _routes: NavRoutes;
  protected _activeRoute?: string;

  get innerBox(): Box {
    if (!this.children?.length) return null;
    return this.children[0] as Box;
  }

  /**
   * Connect the navigator to the parent box.
   */
  boxOnDisplayed = () => {
    this.dispatchNavigatorOnLoaded();
  }

  setRoutes(routes: NavRoutes) {
    this._routes = routes;
  }

  cleanupOldBox() { this.innerBox?.terminateSelf(); }

  addArgumentsToCurrentBox(argumentsObject) {
    if (!argumentsObject || !this.innerBox) return;
    (this.innerBox as any)._routeContext = argumentsObject;
    safeExec(this.innerBox?.detectBoxChanges);
  }

  setCurrentBox(box: typeof Box) {
    const { _BoxConfig: config } = box;
    if (!config?.name) throw new Error('HyperBox-JS: Tried to set a route box without a _BoxConfig name');
    this.innerHTML = `<${config.name}></${config.name}>`
  }

  gotoRoute(route: string, argumentsObject) {
    const routeEntry: NavRouteItem = this._routes[route]
    if (!route) throw new Error(`BoxJS: Could not find route "${route}"`);
    this.cleanupOldBox()
    this._activeRoute = route;
    const { box } = routeEntry;
    // Go to the new route.
    this.setCurrentBox(box);
    this.addEventListener( 'DOMNodeInserted', function ( event ) {
      if (event.target.parentNode.id == this.id) {
        //direct descendant
        // Set the args.
        this.addArgumentsToCurrentBox(argumentsObject);
        safeExec(this.innerBox.onNaviagatedTo);    
      };
    }, false );
    
  }

  private dispatchNavigatorOnLoaded = () => {

  };
}