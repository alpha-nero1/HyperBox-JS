import { BoxUtils } from './box-utils';

let classImp: any = () => null;

/**
 * @author Alessandro Alberga
 * @description Box CORE.
 */
if (typeof document !== 'undefined') {
  classImp = class HyperBoxCore {

    static LoadedBoxes = new Map();

    static BoxRegistry = new Map();

    /**
     * Set the box registry. Must be called before init.
     *
     * @param { Map } registry registry map.
     */
    static SetBoxRegistry(registry) {
      if (registry) {
        this.BoxRegistry = registry;
      } else {
        throw new Error('BoxJs: Fatal, no box registry specified.');
      }
    }

    /**
   * Add box to the loaded boxes.
   *
   * @param { any } box box
   */
  static AddBoxToLoadedBoxes(box) {
    const boxConfig = box.constructor._BoxConfig;
    const boxStore = HyperBoxCore.LoadedBoxes.get(boxConfig.name);
    if (!boxStore) {
      HyperBoxCore.LoadedBoxes.set(
        boxConfig.name, 
        new Map()
      )
    }
    HyperBoxCore.LoadedBoxes.get(boxConfig.name).set(box._boxId, box);
  }

    /**
     * Kick off the boxes...
     */
    static Init = () => {
      // Add the root box.
      document.getElementById('root').innerHTML = '<main-box></main-box>'
    }
    
    /**
     * Creates our boxes.
     *
     * @param { any } boxName name of box.
     */
    static BoxInstanceFactory = (boxClassName) => {
      const boxCapitalisedName = BoxUtils.CapitalizeFirstLetter(boxClassName);
      const instance = new (HyperBoxCore.BoxRegistry.get(boxCapitalisedName))()
      return instance;
    }
    
    /**
     * Create the box container element.
     *
     * @param { any } box box.
     */
    static CreateBoxContainer = (box) => {
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
    static GetNewBoxId(boxConfig) {
      let boxCount = 0;
      if (HyperBoxCore.LoadedBoxes.get(boxConfig.name)) {
        boxCount = HyperBoxCore.LoadedBoxes.get(boxConfig.name).size;
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
    static AddBoxToDOM = (box, parentBoxId) => {
      const boxParent = document.getElementById(parentBoxId);
      const boxConfig = box.constructor._BoxConfig;
      const newBoxId = HyperBoxCore.GetNewBoxId(boxConfig);
      box._boxId = newBoxId;
      box._name = boxConfig.name;
      // Add box to loaded boxes.
      BoxUtils.CheckBoxRequirements(box);
      HyperBoxCore.AddBoxToLoadedBoxes(box);
      BoxUtils.BuildBoxInterfaces(box);
      BoxUtils.BuildBoxStandardVariables(box);
      // Setup the box container.
      const boxContainer = HyperBoxCore.CreateBoxContainer(box)
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
    static MakeBox = (className, parentBoxId) => {
      const box = HyperBoxCore.BoxInstanceFactory(className);
      box._className = className;
      box._parentBoxId = parentBoxId;
      return HyperBoxCore.AddBoxToDOM(box, parentBoxId);  
    }
  }
}

export const HyperBoxCore = classImp;