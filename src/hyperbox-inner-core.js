const document = () => null;
const window = () => null;

export class HyperBoxInnerCore {
  static Document = (document || (() => null));

  static Window = (window || (() => null));

  static LoadDOM = (window, document) => {
    HyperBoxInnerCore.Window = window;
    HyperBoxInnerCore.Document = document;
  }
}
