import { Box } from '../../box';
import { HyperBoxCore } from '../../hyperbox-core';

/**
 * @author Alessandro Alberga
 * @description Navigator box.
 */
export class NavigatorBox extends Box {

  static _BoxConfig = {
    name: 'NavigatorBox'
  }

  static _BoxInterface = {
    Outputs: {
      navigatorOnLoaded: null
    }
  }

  protected _routes: any;
  protected _loadedRoutes = new Map();
  protected _currentBox?: Box;

  constructor() { 
    super();
  }

  /**
   * Connect the navigator to the parent box.
   */
  boxOnDisplayed = () => {
    this.dispatchNavigatorOnLoaded();
  }

  /**
   * Set the routes.
   *
   * @param { [key]: { boxClassName } } routes routes object.
   */
  setRoutes(routes, routeOptions) {
    this._routes = routes;
    if (routeOptions) {
      if (routeOptions.savesRouteState) {
        this._loadedRoutes = new Map();
      }
    }
  }

  /**
   * Cleanup an old box.
   */
  cleanupOldBox() {
    if (this._currentBox) {
      if (typeof (this._currentBox as any).boxOnDestroyed === 'function') {
        (this._currentBox as any).boxOnDestroyed();
      }
      this.setCurrentBox(null);
    }
  }

  /**
   * Add arguments to current box.
   *
   * @param { any } argumentsObject arguments object.
   */
  addArgumentsToCurrentBox(argumentsObject) {
    if (
      this._currentBox && 
      argumentsObject && 
      typeof argumentsObject === 'object'
    ) {
      (this._currentBox as any)._routeContext = argumentsObject;
    }
    (this._currentBox as any).detectBoxChanges();
  }

  /**
   * Get the rendered current box.
   */
  getCurrentBox() {
    if (this._currentBox) {
      return this._currentBox.display(this._currentBox);
    }
    return '';
  }

  /**
   * Setter for the current box.
   *
   * @param { any } box box. 
   */
  setCurrentBox(box) {
    this._currentBox = box;
    this.innerHTML = this.getCurrentBox();
  }

  /**
   * Go to a route.
   *
   * @param { String } routeName 
   * @param  { any } argumentsObject route arguments.
   */
  gotoRoute(routeName, argumentsObject) {
    const route = this._routes[routeName]
    console.log('aa this navigator id', this._boxId)
    if (route) {
      this.cleanupOldBox()
      const { boxClassName } = route;
      let boxToGoto;
      if (this._loadedRoutes && this._loadedRoutes.get(routeName)) {
        boxToGoto = this._loadedRoutes.get(routeName);
      } else {
        boxToGoto = HyperBoxCore.MakeBox(boxClassName, this._boxId);
        if (this._loadedRoutes) {
          this._loadedRoutes.set(routeName, boxToGoto)
        }
      }
      // Go to the new route.
      this.setCurrentBox(boxToGoto);
      // Set the args.
      this.addArgumentsToCurrentBox(argumentsObject);
      if (typeof (this._currentBox as any).boxOnNavigatedTo === 'function') {
        (this._currentBox as any).boxOnNavigatedTo();
      }
    } else {
      throw new Error(`BoxJS: Could not find route "${routeName}"`);
    }
  }

  private dispatchNavigatorOnLoaded = () => null;

  display = () => `${this.getCurrentBox()}`;
}