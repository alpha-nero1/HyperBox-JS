import { Box } from '../../box.js';
import { HyperBoxCore } from '../../hyperbox-core';

/**
 * @author Alessandro Alberga
 * @description Dialog box implementation.
 */
export class DialogBox extends Box {

  static _BoxConfig = {
    name: 'DialogBox',
    styleSheetPath: './box-core/core-boxes/dialog/dialog.box.css'
  }

  static _BoxInterface = {
    Inputs: {
      _dialogContext: {}
    }
  }

  private innerBox?: Box;

  private _dialogContext?: any;

  constructor() {
    super();
  }

  /**
   * Insert the dialog inner box.
   *
   * @param { String } boxClassName box class name
   * @param { any } argumentsObject args object.
   * @param { function } onSuccess sucess callback.
   * @param { function } onError error callback
   */
  insertDialogInnerBox(boxClassName, argumentsObject, onSuccess, onError) {
    // We can make our dynamic box by calling make and chaining it with set parent call.
    this.innerBox = HyperBoxCore.MakeBox(boxClassName, this._boxId);
    (this as any).set_dialogContext({ ...argumentsObject });
    (this.innerBox as any)._dialogContext = {
      closeOnSuccess: (...args) => {
        this.innerBox.terminateSelf();
        this.terminateSelf();
        onSuccess(args);
      },
      closeOnError: (...args) => {
        this.innerBox.terminateSelf();
        this.terminateSelf();
        onError(args);
      },
      arguments: {
        ...argumentsObject
      }
    }
    if (typeof (this.innerBox as any).boxOnNavigatedTo === 'function') {
      (this.innerBox as any).boxOnNavigatedTo();
    }
  }

  /**
   * Getter for cancel button.
   */
  getCancelButton() {
    if (this._dialogContext.cancelButtonText) {
      return `
      <button 
        class="margin-right-8"
        onclick="${this._context}.innerBox._dialogContext.closeOnSuccess(false)"
      >
        ${this._dialogContext.cancelButtonText}
      </button>
      `;
    }
    return '';
  }

  /**
   * Getter for accept button.
   */
  getAcceptButton() {
    if (this._dialogContext.acceptButtonText) {
      return `
      <button 
        onclick="${this._context}.innerBox._dialogContext.closeOnSuccess(true)"
      >
        ${this._dialogContext.acceptButtonText}
      </button>
      `;
    }
    return '';
  }

  /**
   * Getter for title.
   */
  getTitle() {
    if (this._dialogContext.title) {
      return `<h2>${this._dialogContext.title}<h2>`
    }
    return '';
  }

  /**
   * Getter for the inner box.
   */
  getInnerBox() {
    if (this.innerBox) {
      return this.innerBox.display(this.innerBox);
    }
    return '';
  }

  /**
   * Underlay was clicked handler.
   */
  underlayOnClicked() {
    if (this.innerBox && this._dialogContext.closeable) {
      (this.innerBox as any)._dialogContext.closeOnSuccess(true)
    }
  }

  display = () => {
    return `
      <div class="dialog-underlay" onclick="${this._context}.underlayOnClicked()">
        <div class="dialog-container">
          <div>
            <div class="dialog-header">
              ${this.getTitle()}
            </div>
            <div id="${this._boxId}-container">
              <!-- Box is inserted here... -->
              ${this.getInnerBox()}
            </div>
          </div>
          <div class="dialog-footer">
            ${this.getCancelButton()}
            ${this.getAcceptButton()}
          </div>
        </div>
      </div>
    `;
  }
}