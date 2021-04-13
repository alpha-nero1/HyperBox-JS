import { HyperBoxCore } from '../../hyperbox-core';

/**
 * @author Alessandro Alberga
 * @description Dialog service.
 */
export class DialogService {

  /**
   * Open a diaolg.
   *
   * @param { String } boxClassName class name.
   * @param { any } arguments arguments object.
   */
  openDialog(boxClassName, argumentsObject) {
    return new Promise((resolve, reject) => {
      const newDialogBox = HyperBoxCore.MakeBox('DialogBox', 'root')
      newDialogBox.insertDialogInnerBox(
        boxClassName, 
        argumentsObject,
        resolve,
        reject
      )
    })
  }
}
