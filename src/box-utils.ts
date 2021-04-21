import { BoxInterface } from "./types";

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

  static CheckBoxRequirements(box: any): void {
    if (!box?._BoxConfig) throw new Error('HyperBox-JS: Must set _BoxConfig on box');
    if (!box?._BoxConfig?.name) throw new Error('HyperBox-JS: Must set _BoxConfig name on box');
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
      BoxUtils.LoadDOMAttributes(box);
      const newMarkup = box.display(box);
      box.innerHTML = newMarkup;
      if (box._pid) {
        // Then refresh! Bravo! 👌
        const parent = document.getElementById(box._pid);
        parent.replaceChild(box, parent);
      }
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
      const boxInterface: BoxInterface = box.constructor._BoxInterface;
      if (boxInterface?.Inputs) BoxUtils.BuildBoxGettersAndSetters(box, boxInterface.Inputs);
      if (boxInterface?.Vars) BoxUtils.BuildBoxGettersAndSetters(box, boxInterface.Vars);
      if (boxInterface?.Outputs) BoxUtils.BuildBoxOutputs(box, boxInterface.Outputs);
    }
  }

  static BuildBoxGettersAndSetters(box, inputsObject: {[key: string]: any}) {
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
      box[getterName] = () => box[interfaceProp];
      if (
        inputsWithStockProperties[interfaceProp] !== null && 
        typeof inputsWithStockProperties[interfaceProp] !== 'undefined'
      ) {
        // If there is a value, set it (apply defaults...)
        box[interfaceProp] = inputsWithStockProperties[interfaceProp];
      }
    });
  }

  static BuildBoxOutputs(box, outputsObject: {[key: string]: any}) {
    Object.keys(outputsObject).forEach(interfaceProp => {
      const newBoxOutputEvent = new CustomEvent(`(${interfaceProp})`, { detail: box });
      const eventBoxName = `_event_${interfaceProp}`;
      box[eventBoxName] = newBoxOutputEvent;
      // Add the dispatch function.
      box[BoxUtils.BuildPrefixedFunctionName('dispatch', interfaceProp)] = (...args) => {
        box.dispatchEvent(box[eventBoxName])
      }
      // Add the listen function.
      let setCallback = () => {};
      box[BoxUtils.BuildPrefixedFunctionName('add', `${interfaceProp}Listener`)] = (callback) => {
        setCallback = callback;
        box.addEventListener(`(${interfaceProp})`, setCallback, false);
      }
      // Add the remove listener function.
      box[BoxUtils.BuildPrefixedFunctionName('remove', `${interfaceProp}Listener`)] = () => {
        box.removeEventListener(`(${interfaceProp})`, setCallback);
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
          BoxUtils.LoadAttributeOntoBox(box, boxAttribute)
        }
      }
    }
  }

  static LoadAttributeOntoBox(box, boxAttribute) {
    const boxInterface = box.constructor._BoxInterface;
    const { name: attributeName, value: attributeValue } = boxAttribute;
    if (BoxUtils.IsVariableInputProperty(attributeName) && boxInterface?.Inputs[attributeName]) {
      const setterName = BoxUtils.BuildSetterName(attributeName);
      if (typeof box[setterName] === 'function') {
        box[attributeName] = boxAttribute.value;
      }
    } else if (BoxUtils.IsOutputProperty(attributeName) && boxInterface?.Outputs[attributeName]) {
      // Add the listener.
      const functionName = BoxUtils.GetFunctionNameFromFunctionCallString(attributeValue);
      const parentBox = box.getParentBox();
      box.addEventListener(attributeName, (ev) => parentBox[functionName](ev))
    } else {
      if (attributeName === "_pid") box.pid === boxAttribute.value;
      // Is normal stirng or number input property.
      const setterName = BoxUtils.BuildSetterName(attributeName);
      if (typeof box[setterName] === 'function') {
        box[attributeName] = boxAttribute.value;
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

  static GetFunctionNameFromFunctionCallString(functionCallString): string {
    return functionCallString;
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
}
