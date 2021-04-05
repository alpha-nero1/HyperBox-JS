/**
 * @author Alessandro Alberga
 * @description Describes the base structure of a box.
 */
class Box extends HTMLElement {

  constructor() {
    super();
  }

  /**
   * Initialise our special box!
   */
  connectedCallback() {
    const boxConfig = this.constructor._BoxConfig;
    this._boxId = SharedBoxCore.getNewBoxId(boxConfig);
    this.id = this._boxId;
    this._name = boxConfig.name
    if (boxConfig.styleSheetPath) {
      BoxLoader.LoadStylesheet(boxConfig.styleSheetPath);
    }
    BoxUtils.BuildBoxStandardVariables(this);
    BoxUtils.BuildBoxInterfaces(this);
    BoxUtils.DisplayBox(this)
    this.detectBoxChanges = () => BoxUtils.DisplayBox(this)
    if (typeof this.boxOnDisplayed === 'function') this.boxOnDisplayed();
    BoxUtils.AddBoxToLoadedBoxes(this);
    this._init = true;
  }

  /**
   * Get the parent box from the parentBoxId set.
   */
  getParentBox() {
    return document.getElementById(this._parentBoxId);
  }

  /**
   * Allows any box to terminate itself.
   */
  terminateSelf() {
    this._container.remove();
    if (typeof this.boxOnDestroyed === 'function') this.boxOnDestroyed();
  }

  /**
   * Get box element by id.
   *
   * @param { Number } id box id. 
   */
  getBoxElementById(id) {
    const element = document.getElementById(`${this._boxId}-${id}`)
    return element;
  }

  /**
   * Box disconnected callback.
   */
  disconnectedCallback() {
    if (typeof this.boxOnDestroyed === 'function') this.boxOnDestroyed();
  }
}

module.exports = { Box }