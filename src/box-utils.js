import { HyperBoxCore } from './hyperbox-core';

/**
 * @author Alessandro Alberga
 * @description Box utils.
 */
export class BoxUtils {

  /**
   * Check if a value value is null or empty.
   *
   * @param { String } str the string to preform null or empty check on. 
   */
  static IsNullOrEmpty = (value) => {
    if (typeof value === 'string') {
      return !value.length
    }
    if (typeof value === 'object') {
      return !Object.keys(value || {}).length
    }
    return true;
  }

  /**
   * Build a function name that uses a certain prefix.
   *
   * @param { String } prefix prefix string e.g. 'get'
   * @param { String } variableName variable name e.g. 'name'
   */
  static BuildPrefixedFunctionName(prefix, variableName) {
    let returnName = BoxUtils.CapitalizeFirstLetter(variableName);
    returnName = `${prefix}${returnName}`;
    return returnName;
  }

  /**
   * Build the setter name for a variable name.
   *
   * @param { String } variableName variable name.
   */
  static BuildSetterName(variableName) {
    return BoxUtils.BuildPrefixedFunctionName('set', variableName)
  }

  /**
   * Build the geter name for a variable name.
   *
   * @param { String } variableName variable name.
   */
  static BuildGetterName(variableName) {
    return BoxUtils.BuildPrefixedFunctionName('get', variableName)
  }

  /**
   * Capitalise the first letter in a string.
   *
   * @param { String } value string value.
   * @returns { String } Capitalised string.
   */
  static CapitalizeFirstLetter(value) {
    if (value && value.length) {
      const firstChar = value[0].toUpperCase();
      return `${firstChar}${value.substr(1, value.length)}`
    }
    return value;
  }

  /**
   * Load JSON.
   *
   * @param { String } path json path.
   * @returns { Promise<any> } Promise of JSON object.
   */
  static LoadJSON(path) {
    return new Promise((resolve) => {
      const request = new XMLHttpRequest();
      request.overrideMimeType('application/json');
      request.open('GET', path, true);
      request.onreadystatechange = () => {
        console.log('request args', request.readyState, request.status)
        if (request.readyState === 4 && request.status === 200) {
          resolve(JSON.parse(request.response))
        }
      };
      request.send(null);
    });
  }

  /**
   * After a change is needed, re-use the box display function to re-set inner html.
   *
   * @param {*} box 
   */
  static DisplayBox(box) {
    if (box && typeof box.display === 'function') {
      // Allows change detection to happen bottom up if a prent was set.
      if (box._parentBox) {
        box._parentBox.detectBoxChanges();
      }
      BoxUtils.LoadDOMAttributes(box);
      const newMarkup = box.display(box);
      box.innerHTML = newMarkup;
      if (box._init && typeof box.boxOnRedisplayed === 'function') {
        box.boxOnRedisplayed()
      }
    }
  }

  /**
   * Build box interfaces (setters and getters) if _BoxInterface present.
   *
   * @param { any } box box. 
   */
  static BuildBoxInterfaces(box) {
    if (box) {
      const boxInterface = box.constructor._BoxInterface;
      if (boxInterface) {
        BoxUtils.BuildBoxInputs(box, boxInterface.Inputs || {});
        if (boxInterface.Outputs) {
          BoxUtils.BuildBoxOutputs(box, boxInterface.Outputs);
        }
      }
    }
  }

  /**
   * Build box inputs for a box.
   *
   * @param { any } inputsObject inputs object from _BoxInterface
   */
  static BuildBoxInputs(box, inputsObject) {
    const inputsWithStockProperties = {
      _parentBoxId: null,
      ...inputsObject,
    }
    Object.keys(inputsWithStockProperties).forEach(interfaceProp => {
      const setterName = BoxUtils.BuildSetterName(interfaceProp);
      const getterName = BoxUtils.BuildGetterName(interfaceProp);
      box[setterName] = (value) => {
        box[interfaceProp] = value;
        box.detectBoxChanges();
      }
      box[getterName] = () => {
        return box[interfaceProp];
      }
      if (
        inputsWithStockProperties[interfaceProp] !== null && 
        typeof inputsWithStockProperties[interfaceProp] !== 'undefined'
      ) {
        // If there is a value, set it (apply defaults...)
        box[interfaceProp] = inputsWithStockProperties[interfaceProp];
      }
    });
  }

  /**
   * Build output events for a box.
   *
   * @param { any } inputsObject 
   */
  static BuildBoxOutputs(box, outputsObject) {
    Object.keys(outputsObject).forEach(interfaceProp => {
      const newBoxOutputEvent = new CustomEvent(`(${interfaceProp})`, { detail: box });
      const eventBoxName = `_event_${interfaceProp}`;
      box[eventBoxName] = newBoxOutputEvent;
      // Add the dispatch function.
      box[BoxUtils.BuildPrefixedFunctionName('dispatch', interfaceProp)] = (...args) => {
        box.dispatchEvent(box[eventBoxName])
      }
      // Add the listen function.
      box[BoxUtils.BuildPrefixedFunctionName('add', `${interfaceProp}Listener`)] = (callback) => {
        box.addEventListener(`(${interfaceProp})`, callback, false);
      }
      // Add the remove listener function.
      box[BoxUtils.BuildPrefixedFunctionName('remove', `${interfaceProp}Listener`)] = () => {
        box.removeEventListener(`(${interfaceProp})`, callback);
      }
    });
  }

  /**
   * Build the standard variables that go on boxes.
   *
   * @param { any } box box. 
   */
  static BuildBoxStandardVariables(box) {
    const contextPath = `SharedBoxCore.loadedBoxes.get('${box._name}').get('${box._boxId}')`
    box._context = contextPath;
  }

  /**
   * Load attributes from the DOM if they have been specified in the _BoxInterface!
   * 
   * @param { any } box box.
   */
  static LoadDOMAttributes(box) {
    if (box.attributes) {
      const boxInterface = box.constructor._BoxInterface;
      if (boxInterface) {
        for (let i = 0; i < box.attributes.length; i++) {
          const boxAttribute = box.attributes.item(i);
          const { name: attributeName, value: attributeValue } = boxAttribute;
          const trimmedName = BoxUtils.TrimFirstAndLastChar(attributeName);
          if (BoxUtils.IsVariableInputProperty(attributeName) && boxInterface.Inputs && boxInterface.Inputs[trimmedName]) {
            console.log('aa name', trimmedName)
            // NOTE: add extra logic here that somethow watches [] vars!
            const setterName = BoxUtils.BuildSetterName(trimmedName);
            if (typeof box[setterName] === 'function') {
              box[trimmedName] = boxAttribute.value;
            }
          } else if (BoxUtils.IsOutputProperty(attributeName) && boxInterface.Outputs && boxInterface.Outputs[trimmedName]) {
            // Add the listener.
            const functionName = BoxUtils.GetFunctionNameFromFunctionCallString(attributeValue);
            const parentBox = box.getParentBox();
            box.addEventListener(attributeName, (ev) => parentBox[functionName](ev))
          } else {
            // Is normal stirng or number input property.
            const setterName = BoxUtils.BuildSetterName(attributeName);
            console.log('aa found setter!', box[setterName])
            if (typeof box[setterName] === 'function') {
              box[attributeName] = boxAttribute.value;
              console.log('aa value set!', box[attributeName])
            }
          }
        }
      }
    }

  }

  /**
   * Check if a property name is an input.
   *
   * @param { String } propertyName property name.
   */
  static IsVariableInputProperty(propertyName) {
    if (propertyName && propertyName.length) {
      return (
        propertyName.length > 2 &&
        propertyName[0] === '[' &&
        propertyName[propertyName.length - 1] === ']'
      )
    }
  }

  static GetFunctionNameFromFunctionCallString(functionCallString) {

  }

  /**
   * Check if a property name is an output.
   *
   * @param { String } propertyName property name.
   */
  static IsOutputProperty(propertyName) {
    if (propertyName && propertyName.length) {
      return (
        propertyName.length > 2 &&
        propertyName[0] === '(' &&
        propertyName[propertyName.length - 1] === ')'
      )
    }
  }

  /**
   * Remove the first and last char of a string.
   *
   * @param { Stirng } propertyName property name.
   */
  static TrimFirstAndLastChar(propertyName) {
    let returnString = propertyName;
    if (propertyName && propertyName.length > 2) {
      returnString = returnString.slice(1, (propertyName.length - 1))
    }
    return returnString;
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
}
