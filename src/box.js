import { BoxUtils } from './box-utils';
import { HyperBoxCore } from './hyperbox-core';
import { HyperBoxInnerCore } from './hyperbox-inner-core';

let classImp = () => null;
/**
 * @author Alessandro Alberga
 * @description Describes the base structure of a box.
 */
if (typeof HTMLElement === 'function') {
  classImp = class Box extends HTMLElement {

    constructor() {
      super();
    }
  
    /**
     * Initialise our special box!
     */
    connectedCallback() {
      const boxConfig = this.constructor._BoxConfig;
      this._boxId = HyperBoxCore.GetNewBoxId(boxConfig);
      this.id = this._boxId;
      this._name = boxConfig.name
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
      return HyperBoxInnerCore.Document.getElementById(this._parentBoxId);
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
      const element = HyperBoxInnerCore.Document.getElementById(`${this._boxId}-${id}`)
      return element;
    }
  
    /**
     * Box disconnected callback.
     */
    disconnectedCallback() {
      if (typeof this.boxOnDestroyed === 'function') this.boxOnDestroyed();
    }
  }
}

export const Box = classImp;