const document = () => null;
const window = () => null;

export class BoxInnerCore {
  static Document = (document || (() => null));

  static Window = (window || (() => null));

  static LoadDOM = (window, document) => {
    BoxInnerCore.Window = window;
    BoxInnerCore.Document = document;
  }
}
