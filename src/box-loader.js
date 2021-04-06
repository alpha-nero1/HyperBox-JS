/**
 * @author Alessandro Alberga
 * @description Box loader class.
 */
export class BoxLoader {

  /**
   * Load a script onto our DOM.
   *
   * @param { String } path script path.
   */
  static LoadScript = (path, onComplete) => {
    // const tag = document.createElement('script');
    // tag.setAttribute('src', path);
    // tag.async = false;
    // document.body.appendChild(tag);
    // tag.addEventListener('load', onComplete);
  }
  
  /**
   * Load stylesheet.
   *
   * @param { String } path sheet path.
   */
  static LoadStylesheet = (path) => {
    // const link = document.createElement('link');
    // link.type = 'text/css';
    // link.rel = 'stylesheet';
    // link.href = path;
    // document.head.appendChild(link);
  }
  
  /**
   * Load a box by name.
   *
   * @param { String } boxName box name.
   */
  static LoadBoxByName = (boxName) => {
    // const boxPath = `./app/${boxName}/${boxName}.box.js`
    // BoxLoader.LoadScript(boxPath);
  }
}
