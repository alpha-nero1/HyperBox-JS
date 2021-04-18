let classImp: any = () => null;

/**
 * @author Alessandro Alberga
 * @description Hyperbox BoxNode class.
 */
if (typeof window !== 'undefined') {
  classImp = class BoxCluster {
    constructor(boxes) {
      if (boxes && boxes.length) {
        boxes.forEach(this.initBox);
      }
    }

    initBox = (boxClass) => {
      if (boxClass._BoxConfig) {
        const { _BoxConfig: boxConfig } = boxClass;
        if (boxConfig) {
          window.customElements.define(boxConfig.name, boxClass)
          console.log(`HyperBox-JS: Defined: "${boxConfig.name}"`)
        }
      } else {
        throw new Error(`HyperBox-JS: _BoxConfig not present on: "${boxClass}"`)
      }
    }
  }
}

export const BoxCluster = classImp;
