/**
 * @author Alessandro Alberga
 * @description Box CORE.
 */
class BoxCore {
  constructor() {
    this.loadedBoxes = new Map();
  }

  /**
   * Set the box registry. Must be called before init.
   *
   * @param { Map } registry registry map.
   */
  setBoxRegistry(registry) {
    if (registry) {
      this.boxRegistry = registry;
    } else {
      throw new Error('BoxJs: Fatal, no box registry specified.');
    }
  }

  /**
   * Kick off the boxes...
   */
  init = () => {
    // Build the elements registry.
    this.buildBoxesCustomElementRegistry()
    // Add the root box.
    document.getElementById('root').innerHTML = '<box-main title="SILLy" randomValue="Hello there general!"></box-main>'
  }

  /**
   * Crawl the box registry and builds all of the custom elements.
   */
  buildBoxesCustomElementRegistry() {
    this.boxRegistry.forEach(boxClass => {
      if (boxClass._BoxConfig) {
        const { _BoxConfig: boxConfig } = boxClass;
        if (boxConfig) {
          customElements.define(boxConfig.name, boxClass)
          console.log(`BoxJS: Defined: "${boxConfig.name}"`)
        } 
      } else {
        throw new Error(`BoxJS: _BoxConfig not present on: "${boxClass}"`)
      }
    })
  }
  
  /**
   * Creates our boxes.
   *
   * @param { any } boxName name of box.
   */
  boxInstanceFactory = (boxClassName) => {
    const boxCapitalisedName = BoxUtils.CapitalizeFirstLetter(boxClassName);
    const instance = new (this.boxRegistry.get(boxCapitalisedName))()
    return instance;
  }
  
  /**
   * Create the box container element.
   *
   * @param { any } box box.
   */
  createBoxContainer = (box) => {
    const boxConfig = box.constructor._BoxConfig;
    const boxContainer = document.createElement('div');
    boxContainer.setAttribute('id', box._boxId);
    boxContainer.setAttribute('class', boxConfig.name);
    return boxContainer;
  }

  /**
   * Take box config and return the new box id.
   *
   * @param { any } boxConfig box config.
   */
  getNewBoxId(boxConfig) {
    let boxCount = 0;
    if (this.loadedBoxes.get(boxConfig.name)) {
      boxCount = this.loadedBoxes.get(boxConfig.name).size;
    }
    const boxId = `${boxConfig.name}-${boxCount}`;
    return boxId;
  }

  /**
   * Add a box to the DOM.
   *
   * @param { any } box the box to add to the DOM.
   * @param { String } parentBoxId parents box id.
   */
  addBoxToDOM = (box, parentBoxId) => {
    const boxParent = document.getElementById(parentBoxId);
    const boxConfig = box.constructor._BoxConfig;
    const newBoxId = this.getNewBoxId(boxConfig);
    box._boxId = newBoxId;
    box._name = boxConfig.name;
    // Add box to loaded boxes.
    BoxUtils.AddBoxToLoadedBoxes(box);
    BoxUtils.BuildBoxInterfaces(box);
    BoxUtils.BuildBoxStandardVariables(box);
    // Setup styles.
    if (boxConfig.styleSheetPath) {
      BoxLoader.LoadStylesheet(boxConfig.styleSheetPath);
    }
    // Setup the box container.
    const boxContainer = this.createBoxContainer(box)
    // Set retaining values.
    box._container = boxContainer;
    // Setup the initial markup and add box to parent!
    BoxUtils.DisplayBox(box);
    if (parentBoxId) {
      // Only add to DOM if a parentBoxId provided...
      if (boxParent) {
        boxParent.appendChild(boxContainer);
      } else {
        throw new Error(`BoxJS: Cannot add box to null parent. "${parentBoxId}"`);
      }
    }
    // Allow the box to detect for changes.
    box.detectBoxChanges = () => BoxUtils.DisplayBox(box)
    // Run the displayed hook if present.
    if (typeof box.boxOnDisplayed === 'function') {
      box.boxOnDisplayed();
    }
    box._init = true;
    return box;
  }
  
  /**
   * Add a box.
   *
   * @param {*} name 
   * @param {*} parentBoxId 
   */
  makeBox = (className, parentBoxId) => {
    const box = this.boxInstanceFactory(className);
    box._className = className;
    box._parentBoxId = parentBoxId;
    return this.addBoxToDOM(box, parentBoxId);  
  }
}


const SharedBoxCore = new BoxCore();
console.log('BoxJs: Setup SharedBoxCore')
const SharedBoxCoreAPI = new BoxCoreAPI();
console.log('BoxJs: Setup SharedBoxCoreAPI')
SharedBoxCore.setBoxRegistry(new Map([
  ['MainBox', MainBox],
  ['DialogBox', DialogBox],
  ['AnimationBox', AnimationBox],
  ['NavigatorBox', NavigatorBox],
  ['DummyDialogBox', DummyDialogBox],
  ['DataFetcherBox', DataFetcherBox]
]));
SharedBoxCore.init();