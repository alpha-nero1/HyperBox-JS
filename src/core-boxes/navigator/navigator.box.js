import { Box } from '../../box';

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

  constructor() { 
    super();
  }

  /**
   * Connect the navigator to the parent box.
   */
  boxOnDisplayed = () => {
    console.log('aa nav box', this)
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
    if (this.currentBox) {
      if (typeof this.currentBox.boxOnDestroyed === 'function') {
        this.currentBox.boxOnDestroyed();
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
      this.currentBox && 
      argumentsObject && 
      typeof argumentsObject === 'object'
    ) {
      this.currentBox._routeContext = argumentsObject;
    }
    this.currentBox.detectBoxChanges();
  }

  /**
   * Get the rendered current box.
   */
  getCurrentBox() {
    if (this.currentBox) {
      return this.currentBox.display(this.currentBox);
    }
    return '';
  }

  /**
   * Setter for the current box.
   *
   * @param { any } box box. 
   */
  setCurrentBox(box) {
    this.currentBox = box;
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
        boxToGoto = SharedBoxCore.makeBox(boxClassName, this._boxId);
        if (this._loadedRoutes) {
          this._loadedRoutes.set(routeName, boxToGoto)
        }
      }
      // Go to the new route.
      this.setCurrentBox(boxToGoto);
      // Set the args.
      this.addArgumentsToCurrentBox(argumentsObject);
      if (typeof this.currentBox.boxOnNavigatedTo === 'function') {
        this.currentBox.boxOnNavigatedTo();
      }
    } else {
      throw new Error(`BoxJS: Could not find route "${routeName}"`);
    }
  }

  display = () => `${this.getCurrentBox()}`;
}