let classImp = () => null;

/**
 * @author Alessandro Alberga
 * @description Box loader class.
 */
if (typeof document !== 'undefined') {
  classImp = class BoxLoader {

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
}

export const BoxLoader = classImp;