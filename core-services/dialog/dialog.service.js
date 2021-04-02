/**
 * @author Alessandro Alberga
 * @description Dialog service.
 */
class DialogService {

  /**
   * Open a diaolg.
   *
   * @param { String } boxClassName class name.
   * @param { any } arguments arguments object.
   */
  openDialog(boxClassName, argumentsObject) {
    return new Promise((resolve, reject) => {
      const newDialogBox = SharedBoxCore.makeBox('DialogBox', 'root')
      newDialogBox.insertDialogInnerBox(
        boxClassName, 
        argumentsObject,
        resolve,
        reject
      )
    })
  }
}
