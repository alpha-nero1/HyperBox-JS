import { HyperBoxInnerCore } from './hyperbox-inner-core';

/**
 * @author Alessandro Alberga
 * @description Box loader class.
 */
export class BoxLoader {

  /**
   * Load stylesheet.
   *
   * @param { String } path sheet path.
   */
  static LoadStylesheet = (path) => {
    const link = HyperBoxInnerCore.Document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = path;
    HyperBoxInnerCore.Document.head.appendChild(link);
  }
}
