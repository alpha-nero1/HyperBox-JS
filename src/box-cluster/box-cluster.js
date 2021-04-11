import { HyperBoxInnerCore } from '../hyperbox-inner-core';
import { BoxLoader } from '../box-loader';

/**
 * @author Alessandro Alberga
 * @description Hyperbox BoxNode class.
 */
export class BoxCluster {
  constructor(boxes) {
    if (boxes && boxes.length) {
      boxes.forEach(this.initBox);
    }
  }

  initBox = (boxClass) => {
    if (boxClass._BoxConfig) {
      const { _BoxConfig: boxConfig } = boxClass;
      if (boxConfig) {
        if (boxConfig.styleSheetPath) BoxLoader.LoadStylesheet(boxConfig.styleSheetPath);
        HyperBoxInnerCore.Window.customElements.define(boxConfig.name, boxClass)
        console.log(`HyperBox-JS: Defined: "${boxConfig.name}"`)
      }
    } else {
      throw new Error(`HyperBox-JS: _BoxConfig not present on: "${boxClass}"`)
    }
  }
}