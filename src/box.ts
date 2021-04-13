import { BoxUtils } from './box-utils';
import { HyperBoxCore } from './hyperbox-core';

const HtmlClass: any = (
  (typeof document !== 'undefined') ? 
  HTMLElement : 
  class FakeHtmlElement {}
);

/**
 * @author Alessandro Alberga
 * @description Describes the base structure of a box.
 */
export class Box extends HtmlClass {
  protected _boxId?: string;
  protected _name?: string;
  protected _init?: boolean;
  protected _container?: HTMLElement;
  protected _parentBoxId?: string;
  protected _context?: any;
  protected boxOnDisplayed: () => void;
  protected boxOnDestroyed: () => void;
  public display: (context: any) => string;

  protected detectBoxChanges = () => BoxUtils.DisplayBox(this);

  /**
   * Initialise our special box!
   */
  connectedCallback() {
    const boxConfig = (this.constructor as any)._BoxConfig;
    this._boxId = HyperBoxCore.GetNewBoxId(boxConfig);
    this.id = this._boxId;
    this._name = boxConfig.name
    BoxUtils.BuildBoxStandardVariables(this);
    BoxUtils.BuildBoxInterfaces(this);
    BoxUtils.DisplayBox(this)
    if (typeof this.boxOnDisplayed === 'function') this.boxOnDisplayed();
    HyperBoxCore.AddBoxToLoadedBoxes(this);
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