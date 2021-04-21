(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("express"), require("express-favicon"), require("path"));
	else if(typeof define === 'function' && define.amd)
		define(["express", "express-favicon", "path"], factory);
	else if(typeof exports === 'object')
		exports["hyperbox-js"] = factory(require("express"), require("express-favicon"), require("path"));
	else
		root["hyperbox-js"] = factory(root["express"], root["express-favicon"], root["path"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__391__, __WEBPACK_EXTERNAL_MODULE__880__, __WEBPACK_EXTERNAL_MODULE__549__) {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 391:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__391__;

/***/ }),

/***/ 880:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__880__;

/***/ }),

/***/ 549:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__549__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Box": () => (/* reexport */ Box),
  "BoxCluster": () => (/* reexport */ BoxCluster),
  "HyperBoxCore": () => (/* reexport */ HyperBoxCore),
  "startBoxServer": () => (/* reexport */ startBoxServer)
});

;// CONCATENATED MODULE: ./src/box-utils.ts
/**
 * @author Alessandro Alberga
 * @description Box utils.
 */
class BoxUtils {
    static CheckBoxRequirements(box) {
        var _a;
        if (!(box === null || box === void 0 ? void 0 : box._BoxConfig))
            throw new Error('HyperBox-JS: Must set _BoxConfig on box');
        if (!((_a = box === null || box === void 0 ? void 0 : box._BoxConfig) === null || _a === void 0 ? void 0 : _a.name))
            throw new Error('HyperBox-JS: Must set _BoxConfig name on box');
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
        return BoxUtils.BuildPrefixedFunctionName('set', variableName);
    }
    /**
     * Build the geter name for a variable name.
     *
     * @param { String } variableName variable name.
     */
    static BuildGetterName(variableName) {
        return BoxUtils.BuildPrefixedFunctionName('get', variableName);
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
            return `${firstChar}${value.substr(1, value.length)}`;
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
                console.log('request args', request.readyState, request.status);
                if (request.readyState === 4 && request.status === 200) {
                    resolve(JSON.parse(request.response));
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
      console.log(box)
      if (box._pid) {
        // Then refresh!
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
            const boxInterface = box.constructor._BoxInterface;
            if (boxInterface === null || boxInterface === void 0 ? void 0 : boxInterface.Inputs)
                BoxUtils.BuildBoxGettersAndSetters(box, boxInterface.Inputs);
            if (boxInterface === null || boxInterface === void 0 ? void 0 : boxInterface.Vars)
                BoxUtils.BuildBoxGettersAndSetters(box, boxInterface.Vars);
            if (boxInterface === null || boxInterface === void 0 ? void 0 : boxInterface.Outputs)
                BoxUtils.BuildBoxOutputs(box, boxInterface.Outputs);
        }
    }
    static BuildBoxGettersAndSetters(box, inputsObject) {
        const inputsWithStockProperties = Object.assign({ _parentBoxId: null }, inputsObject);
        Object.keys(inputsWithStockProperties).forEach(interfaceProp => {
            const setterName = BoxUtils.BuildSetterName(interfaceProp);
            const getterName = BoxUtils.BuildGetterName(interfaceProp);
            box[setterName] = (value) => {
                box[interfaceProp] = value;
                console.log('aa set new prop: ', interfaceProp, value)
                box.detectBoxChanges();
            };
            box[getterName] = () => box[interfaceProp];
            if (inputsWithStockProperties[interfaceProp] !== null &&
                typeof inputsWithStockProperties[interfaceProp] !== 'undefined') {
                // If there is a value, set it (apply defaults...)
                box[interfaceProp] = inputsWithStockProperties[interfaceProp];
            }
        });
    }
    static BuildBoxOutputs(box, outputsObject) {
        Object.keys(outputsObject).forEach(interfaceProp => {
            const newBoxOutputEvent = new CustomEvent(`(${interfaceProp})`, { detail: box });
            const eventBoxName = `_event_${interfaceProp}`;
            box[eventBoxName] = newBoxOutputEvent;
            // Add the dispatch function.
            box[BoxUtils.BuildPrefixedFunctionName('dispatch', interfaceProp)] = (...args) => {
                box.dispatchEvent(box[eventBoxName]);
            };
            // Add the listen function.
            let setCallback = () => { };
            box[BoxUtils.BuildPrefixedFunctionName('add', `${interfaceProp}Listener`)] = (callback) => {
                setCallback = callback;
                box.addEventListener(`(${interfaceProp})`, setCallback, false);
            };
            // Add the remove listener function.
            box[BoxUtils.BuildPrefixedFunctionName('remove', `${interfaceProp}Listener`)] = () => {
                box.removeEventListener(`(${interfaceProp})`, setCallback);
            };
        });
    }
    /**
     * Build the standard variables that go on boxes.
     *
     * @param { any } box box.
     */
    static BuildBoxStandardVariables(box) {
        const contextPath = `SharedBoxCore.loadedBoxes.get('${box._name}').get('${box._boxId}')`;
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
                        // NOTE: add extra logic here that somethow watches [] vars!
                        const setterName = BoxUtils.BuildSetterName(trimmedName);
                        if (typeof box[setterName] === 'function') {
                            box[trimmedName] = boxAttribute.value;
                        }
                    }
                    else if (BoxUtils.IsOutputProperty(attributeName) && boxInterface.Outputs && boxInterface.Outputs[trimmedName]) {
                        // Add the listener.
                        const functionName = BoxUtils.GetFunctionNameFromFunctionCallString(attributeValue);
                        const parentBox = box.getParentBox();
                        box.addEventListener(attributeName, (ev) => parentBox[functionName](ev));
                    }
                    else {
                        if (attributeName === "_pid") box.pid === boxAttribute.value;
                        // Is normal stirng or number input property.
                        const setterName = BoxUtils.BuildSetterName(attributeName);
                        if (typeof box[setterName] === 'function') {
                            box[attributeName] = boxAttribute.value;
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
            return (propertyName.length > 2 &&
                propertyName[0] === '[' &&
                propertyName[propertyName.length - 1] === ']');
        }
    }
    static GetFunctionNameFromFunctionCallString(functionCallString) {
        return functionCallString;
    }
    /**
     * Check if a property name is an output.
     *
     * @param { String } propertyName property name.
     */
    static IsOutputProperty(propertyName) {
        if (propertyName && propertyName.length) {
            return (propertyName.length > 2 &&
                propertyName[0] === '(' &&
                propertyName[propertyName.length - 1] === ')');
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
            returnString = returnString.slice(1, (propertyName.length - 1));
        }
        return returnString;
    }
}
/**
 * Check if a value value is null or empty.
 *
 * @param { String } str the string to preform null or empty check on.
 */
BoxUtils.IsNullOrEmpty = (value) => {
    if (typeof value === 'string') {
        return !value.length;
    }
    if (typeof value === 'object') {
        return !Object.keys(value || {}).length;
    }
    return true;
};

;// CONCATENATED MODULE: ./src/hyperbox-core.ts
var _a;

let classImp = () => null;
/**
 * @author Alessandro Alberga
 * @description Box CORE.
 */
if (typeof document !== 'undefined') {
    classImp = (_a = class HyperBoxCore {
            /**
             * Set the box registry. Must be called before init.
             *
             * @param { Map } registry registry map.
             */
            static SetBoxRegistry(registry) {
                if (registry) {
                    this.BoxRegistry = registry;
                }
                else {
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
                    HyperBoxCore.LoadedBoxes.set(boxConfig.name, new Map());
                }
                HyperBoxCore.LoadedBoxes.get(boxConfig.name).set(box._boxId, box);
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
        },
        _a.LoadedBoxes = new Map(),
        _a.BoxRegistry = new Map(),
        /**
         * Kick off the boxes...
         */
        _a.Init = () => {
            // Add the root box.
            document.getElementById('root').innerHTML = '<main-box></main-box>';
        },
        /**
         * Creates our boxes.
         *
         * @param { any } boxName name of box.
         */
        _a.BoxInstanceFactory = (boxClassName) => {
            const boxCapitalisedName = BoxUtils.CapitalizeFirstLetter(boxClassName);
            const instance = new (_a.BoxRegistry.get(boxCapitalisedName))();
            return instance;
        },
        /**
         * Create the box container element.
         *
         * @param { any } box box.
         */
        _a.CreateBoxContainer = (box) => {
            const boxConfig = box.constructor._BoxConfig;
            const boxContainer = document.createElement('div');
            boxContainer.setAttribute('id', box._boxId);
            boxContainer.setAttribute('class', boxConfig.name);
            return boxContainer;
        },
        /**
         * Add a box to the DOM.
         *
         * @param { any } box the box to add to the DOM.
         * @param { String } parentBoxId parents box id.
         */
        _a.AddBoxToDOM = (box, parentBoxId) => {
            const boxParent = document.getElementById(parentBoxId);
            const boxConfig = box.constructor._BoxConfig;
            const newBoxId = _a.GetNewBoxId(boxConfig);
            box._boxId = newBoxId;
            box._name = boxConfig.name;
            // Add box to loaded boxes.
            BoxUtils.CheckBoxRequirements(box);
            _a.AddBoxToLoadedBoxes(box);
            BoxUtils.BuildBoxInterfaces(box);
            BoxUtils.BuildBoxStandardVariables(box);
            // Setup the box container.
            const boxContainer = _a.CreateBoxContainer(box);
            // Set retaining values.
            box._container = boxContainer;
            // Setup the initial markup and add box to parent!
            BoxUtils.DisplayBox(box);
            if (parentBoxId) {
                // Only add to DOM if a parentBoxId provided...
                if (boxParent) {
                    boxParent.appendChild(boxContainer);
                }
                else {
                    throw new Error(`BoxJS: Cannot add box to null parent. "${parentBoxId}"`);
                }
            }
            // Allow the box to detect for changes.
            box.detectBoxChanges = () => BoxUtils.DisplayBox(box);
            // Run the displayed hook if present.
            if (typeof box.boxOnDisplayed === 'function') {
                box.boxOnDisplayed();
            }
            box._init = true;
            return box;
        },
        /**
         * Add a box.
         *
         * @param {*} name
         * @param {*} parentBoxId
         */
        _a.MakeBox = (className, parentBoxId) => {
            const box = _a.BoxInstanceFactory(className);
            box._className = className;
            box._parentBoxId = parentBoxId;
            return _a.AddBoxToDOM(box, parentBoxId);
        },
        _a);
}
const HyperBoxCore = classImp;

;// CONCATENATED MODULE: ./src/box.ts


const HtmlClass = ((typeof document !== 'undefined') ?
    HTMLElement :
    class FakeHtmlElement {
    });
/**
 * @author Alessandro Alberga
 * @description Describes the base structure of a box.
 */
class Box extends HtmlClass {
    constructor() {
        super(...arguments);
        this.detectBoxChanges = () => BoxUtils.DisplayBox(this);
    }
    /**
     * Initialise our special box!
     */
    connectedCallback() {
        const boxConfig = this.constructor._BoxConfig;
        this._boxId = HyperBoxCore.GetNewBoxId(boxConfig);
        this.id = this._boxId;
        this._name = boxConfig.name;
        BoxUtils.CheckBoxRequirements(this.constructor);
        BoxUtils.BuildBoxStandardVariables(this);
        BoxUtils.BuildBoxInterfaces(this);
        BoxUtils.DisplayBox(this);
        if (typeof this.boxOnDisplayed === 'function')
            this.boxOnDisplayed();
        HyperBoxCore.AddBoxToLoadedBoxes(this);
        this._init = true;
    }
    /**
     * Get the parent box from the parentBoxId set.
     */
    getParentBox() {
        return document.getElementById(this._parentBoxId);
    }
    /**
     * Allows any box to terminate itself.
     */
    terminateSelf() {
        this._container.remove();
        if (typeof this.boxOnDestroyed === 'function')
            this.boxOnDestroyed();
    }
    /**
     * Get box element by id.
     *
     * @param { Number } id box id.
     */
    getBoxElementById(id) {
        const element = document.getElementById(`${this._boxId}-${id}`);
        return element;
    }
    /**
     * Box disconnected callback.
     */
    disconnectedCallback() {
        if (typeof this.boxOnDestroyed === 'function')
            this.boxOnDestroyed();
    }
}

;// CONCATENATED MODULE: ./src/box-cluster/box-cluster.ts
let box_cluster_classImp = () => null;
/**
 * @author Alessandro Alberga
 * @description Hyperbox BoxNode class.
 */
if (typeof window !== 'undefined') {
    box_cluster_classImp = class BoxCluster {
        constructor(boxes) {
            this.initBox = (boxClass) => {
                if (boxClass._BoxConfig) {
                    const { _BoxConfig: boxConfig } = boxClass;
                    if (boxConfig) {
                        window.customElements.define(boxConfig.name, boxClass);
                        console.log(`HyperBox-JS: Defined: "${boxConfig.name}"`);
                    }
                }
                else {
                    throw new Error(`HyperBox-JS: _BoxConfig not present on: "${boxClass}"`);
                }
            };
            if (boxes && boxes.length) {
                boxes.forEach(this.initBox);
            }
        }
    };
}
const BoxCluster = box_cluster_classImp;

;// CONCATENATED MODULE: ./src/logging/console-colours.ts
const consoleColours = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",
    FgBlack: "\x1b[30m",
    FgRed: "\x1b[31m",
    FgGreen: "\x1b[32m",
    FgYellow: "\x1b[33m",
    FgBlue: "\x1b[34m",
    FgMagenta: "\x1b[35m",
    FgCyan: "\x1b[36m",
    FgWhite: "\x1b[37m",
    BgBlack: "\x1b[40m",
    BgRed: "\x1b[41m",
    BgGreen: "\x1b[42m",
    BgYellow: "\x1b[43m",
    BgBlue: "\x1b[44m",
    BgMagenta: "\x1b[45m",
    BgCyan: "\x1b[46m",
    BgWhite: "\x1b[47m"
};

;// CONCATENATED MODULE: ./src/logging/log-utils.ts

let exportUtils = {
    logGreen: (str) => null,
    logYellow: (str) => null,
    logBlue: (str) => null,
    logLoader: () => ((() => {
        return () => null;
    })())
};
if (typeof process !== 'undefined') {
    exportUtils = {
        logGreen: (str) => console.log(`${consoleColours.FgGreen}${str}${consoleColours.Reset}`),
        logYellow: (str) => console.log(`${consoleColours.FgYellow}${str}${consoleColours.Reset}`),
        logBlue: (str) => console.log(`${consoleColours.FgCyan}${str}${consoleColours.Reset}`),
        logLoader: () => ((() => {
            const p = ['/', '-', '\\', '|'];
            let x = 0;
            const interval = setInterval(() => {
                process.stdout.write("\r" + consoleColours.FgBlue + p[x++] + `${consoleColours.Reset} `);
                x &= (p.length - 1);
            }, 250);
            const clearLine = () => process.stdout.write("\r");
            return () => {
                clearInterval(interval);
                clearLine();
            };
        })())
    };
}
const LoggingUtils = exportUtils;

;// CONCATENATED MODULE: ./src/start-box-server.ts

let startBoxServer = (dir) => { };
if ( true && typeof process !== 'undefined') {
    const express = __webpack_require__(391);
    const favicon = __webpack_require__(880);
    const path = __webpack_require__(549);
    const port = process.env.PORT || 2021;
    startBoxServer = (dir) => {
        const app = express();
        const pubDir = dir + '/public';
        const distDir = dir + '/dist';
        LoggingUtils.logBlue('HyperBox: starting up application...');
        const clearLoader = LoggingUtils.logLoader();
        app.use(favicon(pubDir + '/favicon.ico'));
        app.use(express.static(distDir)); // send the user to index html page inspite of the url
        app.get('*', (req, res) => {
            res.sendFile(path.resolve(distDir, 'index.html'));
        });
        app.listen(port, () => {
            clearLoader();
            LoggingUtils.logGreen(`HyperBox: application running on port ${port} 🚀`);
        });
    };
}


;// CONCATENATED MODULE: ./src/index.ts






})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oeXBlcmJveC1qcy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vaHlwZXJib3gtanMvZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImV4cHJlc3NcIixcImNvbW1vbmpzMlwiOlwiZXhwcmVzc1wiLFwiYW1kXCI6XCJleHByZXNzXCIsXCJyb290XCI6XCJleHByZXNzXCJ9Iiwid2VicGFjazovL2h5cGVyYm94LWpzL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJleHByZXNzLWZhdmljb25cIixcImNvbW1vbmpzMlwiOlwiZXhwcmVzcy1mYXZpY29uXCIsXCJhbWRcIjpcImV4cHJlc3MtZmF2aWNvblwiLFwicm9vdFwiOlwiZXhwcmVzcy1mYXZpY29uXCJ9Iiwid2VicGFjazovL2h5cGVyYm94LWpzL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJwYXRoXCIsXCJjb21tb25qczJcIjpcInBhdGhcIixcImFtZFwiOlwicGF0aFwiLFwicm9vdFwiOlwicGF0aFwifSIsIndlYnBhY2s6Ly9oeXBlcmJveC1qcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9oeXBlcmJveC1qcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vaHlwZXJib3gtanMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9oeXBlcmJveC1qcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2h5cGVyYm94LWpzLy4vc3JjL2JveC11dGlscy50cyIsIndlYnBhY2s6Ly9oeXBlcmJveC1qcy8uL3NyYy9oeXBlcmJveC1jb3JlLnRzIiwid2VicGFjazovL2h5cGVyYm94LWpzLy4vc3JjL2JveC50cyIsIndlYnBhY2s6Ly9oeXBlcmJveC1qcy8uL3NyYy9ib3gtY2x1c3Rlci9ib3gtY2x1c3Rlci50cyIsIndlYnBhY2s6Ly9oeXBlcmJveC1qcy8uL3NyYy9sb2dnaW5nL2NvbnNvbGUtY29sb3Vycy50cyIsIndlYnBhY2s6Ly9oeXBlcmJveC1qcy8uL3NyYy9sb2dnaW5nL2xvZy11dGlscy50cyIsIndlYnBhY2s6Ly9oeXBlcmJveC1qcy8uL3NyYy9zdGFydC1ib3gtc2VydmVyLnRzIiwid2VicGFjazovL2h5cGVyYm94LWpzLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPOzs7Ozs7O0FDVkEsa0Q7Ozs7Ozs7QUNBQSxrRDs7Ozs7OztBQ0FBLGtEOzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKQTs7O0dBR0c7QUFDSSxNQUFNLFFBQVE7SUFpQm5CLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxHQUFROztRQUNsQyxJQUFJLENBQUMsSUFBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLFVBQVU7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7UUFDakYsSUFBSSxDQUFDLFVBQUcsYUFBSCxHQUFHLHVCQUFILEdBQUcsQ0FBRSxVQUFVLDBDQUFFLElBQUk7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7SUFDOUYsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFDLHlCQUF5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LEVBQUU7UUFDNUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDMUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsdURBQXNEO1FBQ3ZGLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ3hCLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUNwRCxDQUFDLENBQUMsQ0FBQztRQUNILEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtZQUNwQixXQUFXLEVBQUU7WUFDYixxQkFBcUIsQ0FBQyx5Q0FBeUMsSUFBSSxLQUFLLENBQUMsQ0FBQztRQUM1RSxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQUV3Qjs7O0FDNUJIO0FBQ1U7QUFDVTtBQUNQO0FBQ1giLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJleHByZXNzXCIpLCByZXF1aXJlKFwiZXhwcmVzcy1mYXZpY29uXCIpLCByZXF1aXJlKFwicGF0aFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJleHByZXNzXCIsIFwiZXhwcmVzcy1mYXZpY29uXCIsIFwicGF0aFwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJoeXBlcmJveC1qc1wiXSA9IGZhY3RvcnkocmVxdWlyZShcImV4cHJlc3NcIiksIHJlcXVpcmUoXCJleHByZXNzLWZhdmljb25cIiksIHJlcXVpcmUoXCJwYXRoXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJoeXBlcmJveC1qc1wiXSA9IGZhY3Rvcnkocm9vdFtcImV4cHJlc3NcIl0sIHJvb3RbXCJleHByZXNzLWZhdmljb25cIl0sIHJvb3RbXCJwYXRoXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzM5MV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX184ODBfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fNTQ5X18pIHtcbnJldHVybiAiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzM5MV9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fODgwX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX181NDlfXzsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEJveEludGVyZmFjZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbi8qKlxuICogQGF1dGhvciBBbGVzc2FuZHJvIEFsYmVyZ2FcbiAqIEBkZXNjcmlwdGlvbiBCb3ggdXRpbHMuXG4gKi9cbmV4cG9ydCBjbGFzcyBCb3hVdGlscyB7XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgdmFsdWUgdmFsdWUgaXMgbnVsbCBvciBlbXB0eS5cbiAgICpcbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gc3RyIHRoZSBzdHJpbmcgdG8gcHJlZm9ybSBudWxsIG9yIGVtcHR5IGNoZWNrIG9uLiBcbiAgICovXG4gIHN0YXRpYyBJc051bGxPckVtcHR5ID0gKHZhbHVlKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiAhdmFsdWUubGVuZ3RoXG4gICAgfVxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm4gIU9iamVjdC5rZXlzKHZhbHVlIHx8IHt9KS5sZW5ndGhcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzdGF0aWMgQ2hlY2tCb3hSZXF1aXJlbWVudHMoYm94OiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoIWJveD8uX0JveENvbmZpZykgdGhyb3cgbmV3IEVycm9yKCdIeXBlckJveC1KUzogTXVzdCBzZXQgX0JveENvbmZpZyBvbiBib3gnKTtcbiAgICBpZiAoIWJveD8uX0JveENvbmZpZz8ubmFtZSkgdGhyb3cgbmV3IEVycm9yKCdIeXBlckJveC1KUzogTXVzdCBzZXQgX0JveENvbmZpZyBuYW1lIG9uIGJveCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEJ1aWxkIGEgZnVuY3Rpb24gbmFtZSB0aGF0IHVzZXMgYSBjZXJ0YWluIHByZWZpeC5cbiAgICpcbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gcHJlZml4IHByZWZpeCBzdHJpbmcgZS5nLiAnZ2V0J1xuICAgKiBAcGFyYW0geyBTdHJpbmcgfSB2YXJpYWJsZU5hbWUgdmFyaWFibGUgbmFtZSBlLmcuICduYW1lJ1xuICAgKi9cbiAgc3RhdGljIEJ1aWxkUHJlZml4ZWRGdW5jdGlvbk5hbWUocHJlZml4LCB2YXJpYWJsZU5hbWUpIHtcbiAgICBsZXQgcmV0dXJuTmFtZSA9IEJveFV0aWxzLkNhcGl0YWxpemVGaXJzdExldHRlcih2YXJpYWJsZU5hbWUpO1xuICAgIHJldHVybk5hbWUgPSBgJHtwcmVmaXh9JHtyZXR1cm5OYW1lfWA7XG4gICAgcmV0dXJuIHJldHVybk5hbWU7XG4gIH1cblxuICAvKipcbiAgICogQnVpbGQgdGhlIHNldHRlciBuYW1lIGZvciBhIHZhcmlhYmxlIG5hbWUuXG4gICAqXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IHZhcmlhYmxlTmFtZSB2YXJpYWJsZSBuYW1lLlxuICAgKi9cbiAgc3RhdGljIEJ1aWxkU2V0dGVyTmFtZSh2YXJpYWJsZU5hbWUpIHtcbiAgICByZXR1cm4gQm94VXRpbHMuQnVpbGRQcmVmaXhlZEZ1bmN0aW9uTmFtZSgnc2V0JywgdmFyaWFibGVOYW1lKVxuICB9XG5cbiAgLyoqXG4gICAqIEJ1aWxkIHRoZSBnZXRlciBuYW1lIGZvciBhIHZhcmlhYmxlIG5hbWUuXG4gICAqXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IHZhcmlhYmxlTmFtZSB2YXJpYWJsZSBuYW1lLlxuICAgKi9cbiAgc3RhdGljIEJ1aWxkR2V0dGVyTmFtZSh2YXJpYWJsZU5hbWUpIHtcbiAgICByZXR1cm4gQm94VXRpbHMuQnVpbGRQcmVmaXhlZEZ1bmN0aW9uTmFtZSgnZ2V0JywgdmFyaWFibGVOYW1lKVxuICB9XG5cbiAgLyoqXG4gICAqIENhcGl0YWxpc2UgdGhlIGZpcnN0IGxldHRlciBpbiBhIHN0cmluZy5cbiAgICpcbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gdmFsdWUgc3RyaW5nIHZhbHVlLlxuICAgKiBAcmV0dXJucyB7IFN0cmluZyB9IENhcGl0YWxpc2VkIHN0cmluZy5cbiAgICovXG4gIHN0YXRpYyBDYXBpdGFsaXplRmlyc3RMZXR0ZXIodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgJiYgdmFsdWUubGVuZ3RoKSB7XG4gICAgICBjb25zdCBmaXJzdENoYXIgPSB2YWx1ZVswXS50b1VwcGVyQ2FzZSgpO1xuICAgICAgcmV0dXJuIGAke2ZpcnN0Q2hhcn0ke3ZhbHVlLnN1YnN0cigxLCB2YWx1ZS5sZW5ndGgpfWBcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIExvYWQgSlNPTi5cbiAgICpcbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gcGF0aCBqc29uIHBhdGguXG4gICAqIEByZXR1cm5zIHsgUHJvbWlzZTxhbnk+IH0gUHJvbWlzZSBvZiBKU09OIG9iamVjdC5cbiAgICovXG4gIHN0YXRpYyBMb2FkSlNPTihwYXRoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICByZXF1ZXN0Lm92ZXJyaWRlTWltZVR5cGUoJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgIHJlcXVlc3Qub3BlbignR0VUJywgcGF0aCwgdHJ1ZSk7XG4gICAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3JlcXVlc3QgYXJncycsIHJlcXVlc3QucmVhZHlTdGF0ZSwgcmVxdWVzdC5zdGF0dXMpXG4gICAgICAgIGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgPT09IDQgJiYgcmVxdWVzdC5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlKSlcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJlcXVlc3Quc2VuZChudWxsKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZnRlciBhIGNoYW5nZSBpcyBuZWVkZWQsIHJlLXVzZSB0aGUgYm94IGRpc3BsYXkgZnVuY3Rpb24gdG8gcmUtc2V0IGlubmVyIGh0bWwuXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gYm94IFxuICAgKi9cbiAgc3RhdGljIERpc3BsYXlCb3goYm94KSB7XG4gICAgaWYgKGJveCAmJiB0eXBlb2YgYm94LmRpc3BsYXkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIEFsbG93cyBjaGFuZ2UgZGV0ZWN0aW9uIHRvIGhhcHBlbiBib3R0b20gdXAgaWYgYSBwcmVudCB3YXMgc2V0LlxuICAgICAgaWYgKGJveC5fcGFyZW50Qm94KSB7XG4gICAgICAgIGJveC5fcGFyZW50Qm94LmRldGVjdEJveENoYW5nZXMoKTtcbiAgICAgIH1cbiAgICAgIEJveFV0aWxzLkxvYWRET01BdHRyaWJ1dGVzKGJveCk7XG4gICAgICBjb25zdCBuZXdNYXJrdXAgPSBib3guZGlzcGxheShib3gpO1xuICAgICAgYm94LmlubmVySFRNTCA9IG5ld01hcmt1cDtcbiAgICAgIGlmIChib3guX2luaXQgJiYgdHlwZW9mIGJveC5ib3hPblJlZGlzcGxheWVkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGJveC5ib3hPblJlZGlzcGxheWVkKClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQnVpbGQgYm94IGludGVyZmFjZXMgKHNldHRlcnMgYW5kIGdldHRlcnMpIGlmIF9Cb3hJbnRlcmZhY2UgcHJlc2VudC5cbiAgICpcbiAgICogQHBhcmFtIHsgYW55IH0gYm94IGJveC4gXG4gICAqL1xuICBzdGF0aWMgQnVpbGRCb3hJbnRlcmZhY2VzKGJveCkge1xuICAgIGlmIChib3gpIHtcbiAgICAgIGNvbnN0IGJveEludGVyZmFjZTogQm94SW50ZXJmYWNlID0gYm94LmNvbnN0cnVjdG9yLl9Cb3hJbnRlcmZhY2U7XG4gICAgICBpZiAoYm94SW50ZXJmYWNlPy5JbnB1dHMpIEJveFV0aWxzLkJ1aWxkQm94R2V0dGVyc0FuZFNldHRlcnMoYm94LCBib3hJbnRlcmZhY2UuSW5wdXRzKTtcbiAgICAgIGlmIChib3hJbnRlcmZhY2U/LlZhcnMpIEJveFV0aWxzLkJ1aWxkQm94R2V0dGVyc0FuZFNldHRlcnMoYm94LCBib3hJbnRlcmZhY2UuVmFycyk7XG4gICAgICBpZiAoYm94SW50ZXJmYWNlPy5PdXRwdXRzKSBCb3hVdGlscy5CdWlsZEJveE91dHB1dHMoYm94LCBib3hJbnRlcmZhY2UuT3V0cHV0cyk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIEJ1aWxkQm94R2V0dGVyc0FuZFNldHRlcnMoYm94LCBpbnB1dHNPYmplY3Q6IHtba2V5OiBzdHJpbmddOiBhbnl9KSB7XG4gICAgY29uc3QgaW5wdXRzV2l0aFN0b2NrUHJvcGVydGllcyA9IHtcbiAgICAgIF9wYXJlbnRCb3hJZDogbnVsbCxcbiAgICAgIC4uLmlucHV0c09iamVjdCxcbiAgICB9XG4gICAgT2JqZWN0LmtleXMoaW5wdXRzV2l0aFN0b2NrUHJvcGVydGllcykuZm9yRWFjaChpbnRlcmZhY2VQcm9wID0+IHtcbiAgICAgIGNvbnN0IHNldHRlck5hbWUgPSBCb3hVdGlscy5CdWlsZFNldHRlck5hbWUoaW50ZXJmYWNlUHJvcCk7XG4gICAgICBjb25zdCBnZXR0ZXJOYW1lID0gQm94VXRpbHMuQnVpbGRHZXR0ZXJOYW1lKGludGVyZmFjZVByb3ApO1xuICAgICAgYm94W3NldHRlck5hbWVdID0gKHZhbHVlKSA9PiB7XG4gICAgICAgIGJveFtpbnRlcmZhY2VQcm9wXSA9IHZhbHVlO1xuICAgICAgICBib3guZGV0ZWN0Qm94Q2hhbmdlcygpO1xuICAgICAgfVxuICAgICAgYm94W2dldHRlck5hbWVdID0gKCkgPT4gYm94W2ludGVyZmFjZVByb3BdO1xuICAgICAgaWYgKFxuICAgICAgICBpbnB1dHNXaXRoU3RvY2tQcm9wZXJ0aWVzW2ludGVyZmFjZVByb3BdICE9PSBudWxsICYmIFxuICAgICAgICB0eXBlb2YgaW5wdXRzV2l0aFN0b2NrUHJvcGVydGllc1tpbnRlcmZhY2VQcm9wXSAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICkge1xuICAgICAgICAvLyBJZiB0aGVyZSBpcyBhIHZhbHVlLCBzZXQgaXQgKGFwcGx5IGRlZmF1bHRzLi4uKVxuICAgICAgICBib3hbaW50ZXJmYWNlUHJvcF0gPSBpbnB1dHNXaXRoU3RvY2tQcm9wZXJ0aWVzW2ludGVyZmFjZVByb3BdO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIEJ1aWxkQm94T3V0cHV0cyhib3gsIG91dHB1dHNPYmplY3Q6IHtba2V5OiBzdHJpbmddOiBhbnl9KSB7XG4gICAgT2JqZWN0LmtleXMob3V0cHV0c09iamVjdCkuZm9yRWFjaChpbnRlcmZhY2VQcm9wID0+IHtcbiAgICAgIGNvbnN0IG5ld0JveE91dHB1dEV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KGAoJHtpbnRlcmZhY2VQcm9wfSlgLCB7IGRldGFpbDogYm94IH0pO1xuICAgICAgY29uc3QgZXZlbnRCb3hOYW1lID0gYF9ldmVudF8ke2ludGVyZmFjZVByb3B9YDtcbiAgICAgIGJveFtldmVudEJveE5hbWVdID0gbmV3Qm94T3V0cHV0RXZlbnQ7XG4gICAgICAvLyBBZGQgdGhlIGRpc3BhdGNoIGZ1bmN0aW9uLlxuICAgICAgYm94W0JveFV0aWxzLkJ1aWxkUHJlZml4ZWRGdW5jdGlvbk5hbWUoJ2Rpc3BhdGNoJywgaW50ZXJmYWNlUHJvcCldID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgYm94LmRpc3BhdGNoRXZlbnQoYm94W2V2ZW50Qm94TmFtZV0pXG4gICAgICB9XG4gICAgICAvLyBBZGQgdGhlIGxpc3RlbiBmdW5jdGlvbi5cbiAgICAgIGxldCBzZXRDYWxsYmFjayA9ICgpID0+IHt9O1xuICAgICAgYm94W0JveFV0aWxzLkJ1aWxkUHJlZml4ZWRGdW5jdGlvbk5hbWUoJ2FkZCcsIGAke2ludGVyZmFjZVByb3B9TGlzdGVuZXJgKV0gPSAoY2FsbGJhY2spID0+IHtcbiAgICAgICAgc2V0Q2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoYCgke2ludGVyZmFjZVByb3B9KWAsIHNldENhbGxiYWNrLCBmYWxzZSk7XG4gICAgICB9XG4gICAgICAvLyBBZGQgdGhlIHJlbW92ZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAgICAgIGJveFtCb3hVdGlscy5CdWlsZFByZWZpeGVkRnVuY3Rpb25OYW1lKCdyZW1vdmUnLCBgJHtpbnRlcmZhY2VQcm9wfUxpc3RlbmVyYCldID0gKCkgPT4ge1xuICAgICAgICBib3gucmVtb3ZlRXZlbnRMaXN0ZW5lcihgKCR7aW50ZXJmYWNlUHJvcH0pYCwgc2V0Q2FsbGJhY2spO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEJ1aWxkIHRoZSBzdGFuZGFyZCB2YXJpYWJsZXMgdGhhdCBnbyBvbiBib3hlcy5cbiAgICpcbiAgICogQHBhcmFtIHsgYW55IH0gYm94IGJveC4gXG4gICAqL1xuICBzdGF0aWMgQnVpbGRCb3hTdGFuZGFyZFZhcmlhYmxlcyhib3gpIHtcbiAgICBjb25zdCBjb250ZXh0UGF0aCA9IGBTaGFyZWRCb3hDb3JlLmxvYWRlZEJveGVzLmdldCgnJHtib3guX25hbWV9JykuZ2V0KCcke2JveC5fYm94SWR9JylgXG4gICAgYm94Ll9jb250ZXh0ID0gY29udGV4dFBhdGg7XG4gIH1cblxuICAvKipcbiAgICogTG9hZCBhdHRyaWJ1dGVzIGZyb20gdGhlIERPTSBpZiB0aGV5IGhhdmUgYmVlbiBzcGVjaWZpZWQgaW4gdGhlIF9Cb3hJbnRlcmZhY2UhXG4gICAqIFxuICAgKiBAcGFyYW0geyBhbnkgfSBib3ggYm94LlxuICAgKi9cbiAgc3RhdGljIExvYWRET01BdHRyaWJ1dGVzKGJveCkge1xuICAgIGlmIChib3guYXR0cmlidXRlcykge1xuICAgICAgY29uc3QgYm94SW50ZXJmYWNlID0gYm94LmNvbnN0cnVjdG9yLl9Cb3hJbnRlcmZhY2U7XG4gICAgICBpZiAoYm94SW50ZXJmYWNlKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm94LmF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBib3hBdHRyaWJ1dGUgPSBib3guYXR0cmlidXRlcy5pdGVtKGkpO1xuICAgICAgICAgIGNvbnN0IHsgbmFtZTogYXR0cmlidXRlTmFtZSwgdmFsdWU6IGF0dHJpYnV0ZVZhbHVlIH0gPSBib3hBdHRyaWJ1dGU7XG4gICAgICAgICAgY29uc3QgdHJpbW1lZE5hbWUgPSBCb3hVdGlscy5UcmltRmlyc3RBbmRMYXN0Q2hhcihhdHRyaWJ1dGVOYW1lKTtcbiAgICAgICAgICBpZiAoQm94VXRpbHMuSXNWYXJpYWJsZUlucHV0UHJvcGVydHkoYXR0cmlidXRlTmFtZSkgJiYgYm94SW50ZXJmYWNlLklucHV0cyAmJiBib3hJbnRlcmZhY2UuSW5wdXRzW3RyaW1tZWROYW1lXSkge1xuICAgICAgICAgICAgLy8gTk9URTogYWRkIGV4dHJhIGxvZ2ljIGhlcmUgdGhhdCBzb21ldGhvdyB3YXRjaGVzIFtdIHZhcnMhXG4gICAgICAgICAgICBjb25zdCBzZXR0ZXJOYW1lID0gQm94VXRpbHMuQnVpbGRTZXR0ZXJOYW1lKHRyaW1tZWROYW1lKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYm94W3NldHRlck5hbWVdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgIGJveFt0cmltbWVkTmFtZV0gPSBib3hBdHRyaWJ1dGUudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChCb3hVdGlscy5Jc091dHB1dFByb3BlcnR5KGF0dHJpYnV0ZU5hbWUpICYmIGJveEludGVyZmFjZS5PdXRwdXRzICYmIGJveEludGVyZmFjZS5PdXRwdXRzW3RyaW1tZWROYW1lXSkge1xuICAgICAgICAgICAgLy8gQWRkIHRoZSBsaXN0ZW5lci5cbiAgICAgICAgICAgIGNvbnN0IGZ1bmN0aW9uTmFtZSA9IEJveFV0aWxzLkdldEZ1bmN0aW9uTmFtZUZyb21GdW5jdGlvbkNhbGxTdHJpbmcoYXR0cmlidXRlVmFsdWUpO1xuICAgICAgICAgICAgY29uc3QgcGFyZW50Qm94ID0gYm94LmdldFBhcmVudEJveCgpO1xuICAgICAgICAgICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoYXR0cmlidXRlTmFtZSwgKGV2KSA9PiBwYXJlbnRCb3hbZnVuY3Rpb25OYW1lXShldikpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIElzIG5vcm1hbCBzdGlybmcgb3IgbnVtYmVyIGlucHV0IHByb3BlcnR5LlxuICAgICAgICAgICAgY29uc3Qgc2V0dGVyTmFtZSA9IEJveFV0aWxzLkJ1aWxkU2V0dGVyTmFtZShhdHRyaWJ1dGVOYW1lKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYm94W3NldHRlck5hbWVdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgIGJveFthdHRyaWJ1dGVOYW1lXSA9IGJveEF0dHJpYnV0ZS52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIHByb3BlcnR5IG5hbWUgaXMgYW4gaW5wdXQuXG4gICAqXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IHByb3BlcnR5TmFtZSBwcm9wZXJ0eSBuYW1lLlxuICAgKi9cbiAgc3RhdGljIElzVmFyaWFibGVJbnB1dFByb3BlcnR5KHByb3BlcnR5TmFtZSkge1xuICAgIGlmIChwcm9wZXJ0eU5hbWUgJiYgcHJvcGVydHlOYW1lLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgcHJvcGVydHlOYW1lLmxlbmd0aCA+IDIgJiZcbiAgICAgICAgcHJvcGVydHlOYW1lWzBdID09PSAnWycgJiZcbiAgICAgICAgcHJvcGVydHlOYW1lW3Byb3BlcnR5TmFtZS5sZW5ndGggLSAxXSA9PT0gJ10nXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIEdldEZ1bmN0aW9uTmFtZUZyb21GdW5jdGlvbkNhbGxTdHJpbmcoZnVuY3Rpb25DYWxsU3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZnVuY3Rpb25DYWxsU3RyaW5nO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgcHJvcGVydHkgbmFtZSBpcyBhbiBvdXRwdXQuXG4gICAqXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IHByb3BlcnR5TmFtZSBwcm9wZXJ0eSBuYW1lLlxuICAgKi9cbiAgc3RhdGljIElzT3V0cHV0UHJvcGVydHkocHJvcGVydHlOYW1lKSB7XG4gICAgaWYgKHByb3BlcnR5TmFtZSAmJiBwcm9wZXJ0eU5hbWUubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBwcm9wZXJ0eU5hbWUubGVuZ3RoID4gMiAmJlxuICAgICAgICBwcm9wZXJ0eU5hbWVbMF0gPT09ICcoJyAmJlxuICAgICAgICBwcm9wZXJ0eU5hbWVbcHJvcGVydHlOYW1lLmxlbmd0aCAtIDFdID09PSAnKSdcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIHRoZSBmaXJzdCBhbmQgbGFzdCBjaGFyIG9mIGEgc3RyaW5nLlxuICAgKlxuICAgKiBAcGFyYW0geyBTdGlybmcgfSBwcm9wZXJ0eU5hbWUgcHJvcGVydHkgbmFtZS5cbiAgICovXG4gIHN0YXRpYyBUcmltRmlyc3RBbmRMYXN0Q2hhcihwcm9wZXJ0eU5hbWUpIHtcbiAgICBsZXQgcmV0dXJuU3RyaW5nID0gcHJvcGVydHlOYW1lO1xuICAgIGlmIChwcm9wZXJ0eU5hbWUgJiYgcHJvcGVydHlOYW1lLmxlbmd0aCA+IDIpIHtcbiAgICAgIHJldHVyblN0cmluZyA9IHJldHVyblN0cmluZy5zbGljZSgxLCAocHJvcGVydHlOYW1lLmxlbmd0aCAtIDEpKVxuICAgIH1cbiAgICByZXR1cm4gcmV0dXJuU3RyaW5nO1xuICB9XG59XG4iLCJpbXBvcnQgeyBCb3hVdGlscyB9IGZyb20gJy4vYm94LXV0aWxzJztcblxubGV0IGNsYXNzSW1wOiBhbnkgPSAoKSA9PiBudWxsO1xuXG4vKipcbiAqIEBhdXRob3IgQWxlc3NhbmRybyBBbGJlcmdhXG4gKiBAZGVzY3JpcHRpb24gQm94IENPUkUuXG4gKi9cbmlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gIGNsYXNzSW1wID0gY2xhc3MgSHlwZXJCb3hDb3JlIHtcblxuICAgIHN0YXRpYyBMb2FkZWRCb3hlcyA9IG5ldyBNYXAoKTtcblxuICAgIHN0YXRpYyBCb3hSZWdpc3RyeSA9IG5ldyBNYXAoKTtcblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgYm94IHJlZ2lzdHJ5LiBNdXN0IGJlIGNhbGxlZCBiZWZvcmUgaW5pdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7IE1hcCB9IHJlZ2lzdHJ5IHJlZ2lzdHJ5IG1hcC5cbiAgICAgKi9cbiAgICBzdGF0aWMgU2V0Qm94UmVnaXN0cnkocmVnaXN0cnkpIHtcbiAgICAgIGlmIChyZWdpc3RyeSkge1xuICAgICAgICB0aGlzLkJveFJlZ2lzdHJ5ID0gcmVnaXN0cnk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JveEpzOiBGYXRhbCwgbm8gYm94IHJlZ2lzdHJ5IHNwZWNpZmllZC4nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICogQWRkIGJveCB0byB0aGUgbG9hZGVkIGJveGVzLlxuICAgKlxuICAgKiBAcGFyYW0geyBhbnkgfSBib3ggYm94XG4gICAqL1xuICBzdGF0aWMgQWRkQm94VG9Mb2FkZWRCb3hlcyhib3gpIHtcbiAgICBjb25zdCBib3hDb25maWcgPSBib3guY29uc3RydWN0b3IuX0JveENvbmZpZztcbiAgICBjb25zdCBib3hTdG9yZSA9IEh5cGVyQm94Q29yZS5Mb2FkZWRCb3hlcy5nZXQoYm94Q29uZmlnLm5hbWUpO1xuICAgIGlmICghYm94U3RvcmUpIHtcbiAgICAgIEh5cGVyQm94Q29yZS5Mb2FkZWRCb3hlcy5zZXQoXG4gICAgICAgIGJveENvbmZpZy5uYW1lLCBcbiAgICAgICAgbmV3IE1hcCgpXG4gICAgICApXG4gICAgfVxuICAgIEh5cGVyQm94Q29yZS5Mb2FkZWRCb3hlcy5nZXQoYm94Q29uZmlnLm5hbWUpLnNldChib3guX2JveElkLCBib3gpO1xuICB9XG5cbiAgICAvKipcbiAgICAgKiBLaWNrIG9mZiB0aGUgYm94ZXMuLi5cbiAgICAgKi9cbiAgICBzdGF0aWMgSW5pdCA9ICgpID0+IHtcbiAgICAgIC8vIEFkZCB0aGUgcm9vdCBib3guXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpLmlubmVySFRNTCA9ICc8bWFpbi1ib3g+PC9tYWluLWJveD4nXG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgb3VyIGJveGVzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHsgYW55IH0gYm94TmFtZSBuYW1lIG9mIGJveC5cbiAgICAgKi9cbiAgICBzdGF0aWMgQm94SW5zdGFuY2VGYWN0b3J5ID0gKGJveENsYXNzTmFtZSkgPT4ge1xuICAgICAgY29uc3QgYm94Q2FwaXRhbGlzZWROYW1lID0gQm94VXRpbHMuQ2FwaXRhbGl6ZUZpcnN0TGV0dGVyKGJveENsYXNzTmFtZSk7XG4gICAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyAoSHlwZXJCb3hDb3JlLkJveFJlZ2lzdHJ5LmdldChib3hDYXBpdGFsaXNlZE5hbWUpKSgpXG4gICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIENyZWF0ZSB0aGUgYm94IGNvbnRhaW5lciBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHsgYW55IH0gYm94IGJveC5cbiAgICAgKi9cbiAgICBzdGF0aWMgQ3JlYXRlQm94Q29udGFpbmVyID0gKGJveCkgPT4ge1xuICAgICAgY29uc3QgYm94Q29uZmlnID0gYm94LmNvbnN0cnVjdG9yLl9Cb3hDb25maWc7XG4gICAgICBjb25zdCBib3hDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGJveENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgYm94Ll9ib3hJZCk7XG4gICAgICBib3hDb250YWluZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsIGJveENvbmZpZy5uYW1lKTtcbiAgICAgIHJldHVybiBib3hDb250YWluZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGFrZSBib3ggY29uZmlnIGFuZCByZXR1cm4gdGhlIG5ldyBib3ggaWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0geyBhbnkgfSBib3hDb25maWcgYm94IGNvbmZpZy5cbiAgICAgKi9cbiAgICBzdGF0aWMgR2V0TmV3Qm94SWQoYm94Q29uZmlnKSB7XG4gICAgICBsZXQgYm94Q291bnQgPSAwO1xuICAgICAgaWYgKEh5cGVyQm94Q29yZS5Mb2FkZWRCb3hlcy5nZXQoYm94Q29uZmlnLm5hbWUpKSB7XG4gICAgICAgIGJveENvdW50ID0gSHlwZXJCb3hDb3JlLkxvYWRlZEJveGVzLmdldChib3hDb25maWcubmFtZSkuc2l6ZTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGJveElkID0gYCR7Ym94Q29uZmlnLm5hbWV9LSR7Ym94Q291bnR9YDtcbiAgICAgIHJldHVybiBib3hJZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYSBib3ggdG8gdGhlIERPTS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7IGFueSB9IGJveCB0aGUgYm94IHRvIGFkZCB0byB0aGUgRE9NLlxuICAgICAqIEBwYXJhbSB7IFN0cmluZyB9IHBhcmVudEJveElkIHBhcmVudHMgYm94IGlkLlxuICAgICAqL1xuICAgIHN0YXRpYyBBZGRCb3hUb0RPTSA9IChib3gsIHBhcmVudEJveElkKSA9PiB7XG4gICAgICBjb25zdCBib3hQYXJlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJlbnRCb3hJZCk7XG4gICAgICBjb25zdCBib3hDb25maWcgPSBib3guY29uc3RydWN0b3IuX0JveENvbmZpZztcbiAgICAgIGNvbnN0IG5ld0JveElkID0gSHlwZXJCb3hDb3JlLkdldE5ld0JveElkKGJveENvbmZpZyk7XG4gICAgICBib3guX2JveElkID0gbmV3Qm94SWQ7XG4gICAgICBib3guX25hbWUgPSBib3hDb25maWcubmFtZTtcbiAgICAgIC8vIEFkZCBib3ggdG8gbG9hZGVkIGJveGVzLlxuICAgICAgQm94VXRpbHMuQ2hlY2tCb3hSZXF1aXJlbWVudHMoYm94KTtcbiAgICAgIEh5cGVyQm94Q29yZS5BZGRCb3hUb0xvYWRlZEJveGVzKGJveCk7XG4gICAgICBCb3hVdGlscy5CdWlsZEJveEludGVyZmFjZXMoYm94KTtcbiAgICAgIEJveFV0aWxzLkJ1aWxkQm94U3RhbmRhcmRWYXJpYWJsZXMoYm94KTtcbiAgICAgIC8vIFNldHVwIHRoZSBib3ggY29udGFpbmVyLlxuICAgICAgY29uc3QgYm94Q29udGFpbmVyID0gSHlwZXJCb3hDb3JlLkNyZWF0ZUJveENvbnRhaW5lcihib3gpXG4gICAgICAvLyBTZXQgcmV0YWluaW5nIHZhbHVlcy5cbiAgICAgIGJveC5fY29udGFpbmVyID0gYm94Q29udGFpbmVyO1xuICAgICAgLy8gU2V0dXAgdGhlIGluaXRpYWwgbWFya3VwIGFuZCBhZGQgYm94IHRvIHBhcmVudCFcbiAgICAgIEJveFV0aWxzLkRpc3BsYXlCb3goYm94KTtcbiAgICAgIGlmIChwYXJlbnRCb3hJZCkge1xuICAgICAgICAvLyBPbmx5IGFkZCB0byBET00gaWYgYSBwYXJlbnRCb3hJZCBwcm92aWRlZC4uLlxuICAgICAgICBpZiAoYm94UGFyZW50KSB7XG4gICAgICAgICAgYm94UGFyZW50LmFwcGVuZENoaWxkKGJveENvbnRhaW5lcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBCb3hKUzogQ2Fubm90IGFkZCBib3ggdG8gbnVsbCBwYXJlbnQuIFwiJHtwYXJlbnRCb3hJZH1cImApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBBbGxvdyB0aGUgYm94IHRvIGRldGVjdCBmb3IgY2hhbmdlcy5cbiAgICAgIGJveC5kZXRlY3RCb3hDaGFuZ2VzID0gKCkgPT4gQm94VXRpbHMuRGlzcGxheUJveChib3gpXG4gICAgICAvLyBSdW4gdGhlIGRpc3BsYXllZCBob29rIGlmIHByZXNlbnQuXG4gICAgICBpZiAodHlwZW9mIGJveC5ib3hPbkRpc3BsYXllZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBib3guYm94T25EaXNwbGF5ZWQoKTtcbiAgICAgIH1cbiAgICAgIGJveC5faW5pdCA9IHRydWU7XG4gICAgICByZXR1cm4gYm94O1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBBZGQgYSBib3guXG4gICAgICpcbiAgICAgKiBAcGFyYW0geyp9IG5hbWUgXG4gICAgICogQHBhcmFtIHsqfSBwYXJlbnRCb3hJZCBcbiAgICAgKi9cbiAgICBzdGF0aWMgTWFrZUJveCA9IChjbGFzc05hbWUsIHBhcmVudEJveElkKSA9PiB7XG4gICAgICBjb25zdCBib3ggPSBIeXBlckJveENvcmUuQm94SW5zdGFuY2VGYWN0b3J5KGNsYXNzTmFtZSk7XG4gICAgICBib3guX2NsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgICAgIGJveC5fcGFyZW50Qm94SWQgPSBwYXJlbnRCb3hJZDtcbiAgICAgIHJldHVybiBIeXBlckJveENvcmUuQWRkQm94VG9ET00oYm94LCBwYXJlbnRCb3hJZCk7ICBcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IEh5cGVyQm94Q29yZSA9IGNsYXNzSW1wOyIsImltcG9ydCB7IEJveFV0aWxzIH0gZnJvbSAnLi9ib3gtdXRpbHMnO1xuaW1wb3J0IHsgSHlwZXJCb3hDb3JlIH0gZnJvbSAnLi9oeXBlcmJveC1jb3JlJztcbmltcG9ydCB7IEJveEludGVyZmFjZSwgQm94Q29uZmlnIH0gZnJvbSAnLi90eXBlcyc7XG5cbmNvbnN0IEh0bWxDbGFzczogYW55ID0gKFxuICAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykgPyBcbiAgSFRNTEVsZW1lbnQgOiBcbiAgY2xhc3MgRmFrZUh0bWxFbGVtZW50IHt9XG4pO1xuXG4vKipcbiAqIEBhdXRob3IgQWxlc3NhbmRybyBBbGJlcmdhXG4gKiBAZGVzY3JpcHRpb24gRGVzY3JpYmVzIHRoZSBiYXNlIHN0cnVjdHVyZSBvZiBhIGJveC5cbiAqL1xuZXhwb3J0IGNsYXNzIEJveCBleHRlbmRzIEh0bWxDbGFzcyB7XG4gIHByb3RlY3RlZCBfYm94SWQ/OiBzdHJpbmc7XG4gIHByb3RlY3RlZCBfbmFtZT86IHN0cmluZztcbiAgcHJvdGVjdGVkIF9pbml0PzogYm9vbGVhbjtcbiAgcHJvdGVjdGVkIF9jb250YWluZXI/OiBIVE1MRWxlbWVudDtcbiAgcHJvdGVjdGVkIF9wYXJlbnRCb3hJZD86IHN0cmluZztcbiAgcHJvdGVjdGVkIF9jb250ZXh0PzogYW55O1xuICBwdWJsaWMgZGlzcGxheTogKGNvbnRleHQ6IGFueSkgPT4gc3RyaW5nO1xuICBzdGF0aWMgX0JveENvbmZpZz86IEJveENvbmZpZztcbiAgc3RhdGljIF9Cb3hJbnRlcmZhY2U6IEJveEludGVyZmFjZTtcblxuICBwcm90ZWN0ZWQgZGV0ZWN0Qm94Q2hhbmdlcyA9ICgpID0+IEJveFV0aWxzLkRpc3BsYXlCb3godGhpcyk7XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpc2Ugb3VyIHNwZWNpYWwgYm94IVxuICAgKi9cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3QgYm94Q29uZmlnID0gKHRoaXMuY29uc3RydWN0b3IgYXMgYW55KS5fQm94Q29uZmlnO1xuICAgIHRoaXMuX2JveElkID0gSHlwZXJCb3hDb3JlLkdldE5ld0JveElkKGJveENvbmZpZyk7XG4gICAgdGhpcy5pZCA9IHRoaXMuX2JveElkO1xuICAgIHRoaXMuX25hbWUgPSBib3hDb25maWcubmFtZVxuICAgIEJveFV0aWxzLkNoZWNrQm94UmVxdWlyZW1lbnRzKHRoaXMuY29uc3RydWN0b3IpO1xuICAgIEJveFV0aWxzLkJ1aWxkQm94U3RhbmRhcmRWYXJpYWJsZXModGhpcyk7XG4gICAgQm94VXRpbHMuQnVpbGRCb3hJbnRlcmZhY2VzKHRoaXMpO1xuICAgIEJveFV0aWxzLkRpc3BsYXlCb3godGhpcylcbiAgICBpZiAodHlwZW9mIHRoaXMuYm94T25EaXNwbGF5ZWQgPT09ICdmdW5jdGlvbicpIHRoaXMuYm94T25EaXNwbGF5ZWQoKTtcbiAgICBIeXBlckJveENvcmUuQWRkQm94VG9Mb2FkZWRCb3hlcyh0aGlzKTtcbiAgICB0aGlzLl9pbml0ID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHBhcmVudCBib3ggZnJvbSB0aGUgcGFyZW50Qm94SWQgc2V0LlxuICAgKi9cbiAgZ2V0UGFyZW50Qm94KCkge1xuICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLl9wYXJlbnRCb3hJZCk7XG4gIH1cblxuICAvKipcbiAgICogQWxsb3dzIGFueSBib3ggdG8gdGVybWluYXRlIGl0c2VsZi5cbiAgICovXG4gIHRlcm1pbmF0ZVNlbGYoKSB7XG4gICAgdGhpcy5fY29udGFpbmVyLnJlbW92ZSgpO1xuICAgIGlmICh0eXBlb2YgdGhpcy5ib3hPbkRlc3Ryb3llZCA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5ib3hPbkRlc3Ryb3llZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBib3ggZWxlbWVudCBieSBpZC5cbiAgICpcbiAgICogQHBhcmFtIHsgTnVtYmVyIH0gaWQgYm94IGlkLiBcbiAgICovXG4gIGdldEJveEVsZW1lbnRCeUlkKGlkKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3RoaXMuX2JveElkfS0ke2lkfWApXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogQm94IGRpc2Nvbm5lY3RlZCBjYWxsYmFjay5cbiAgICovXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5ib3hPbkRlc3Ryb3llZCA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5ib3hPbkRlc3Ryb3llZCgpO1xuICB9XG59IiwibGV0IGNsYXNzSW1wOiBhbnkgPSAoKSA9PiBudWxsO1xuXG4vKipcbiAqIEBhdXRob3IgQWxlc3NhbmRybyBBbGJlcmdhXG4gKiBAZGVzY3JpcHRpb24gSHlwZXJib3ggQm94Tm9kZSBjbGFzcy5cbiAqL1xuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gIGNsYXNzSW1wID0gY2xhc3MgQm94Q2x1c3RlciB7XG4gICAgY29uc3RydWN0b3IoYm94ZXMpIHtcbiAgICAgIGlmIChib3hlcyAmJiBib3hlcy5sZW5ndGgpIHtcbiAgICAgICAgYm94ZXMuZm9yRWFjaCh0aGlzLmluaXRCb3gpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGluaXRCb3ggPSAoYm94Q2xhc3MpID0+IHtcbiAgICAgIGlmIChib3hDbGFzcy5fQm94Q29uZmlnKSB7XG4gICAgICAgIGNvbnN0IHsgX0JveENvbmZpZzogYm94Q29uZmlnIH0gPSBib3hDbGFzcztcbiAgICAgICAgaWYgKGJveENvbmZpZykge1xuICAgICAgICAgIHdpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoYm94Q29uZmlnLm5hbWUsIGJveENsYXNzKVxuICAgICAgICAgIGNvbnNvbGUubG9nKGBIeXBlckJveC1KUzogRGVmaW5lZDogXCIke2JveENvbmZpZy5uYW1lfVwiYClcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBIeXBlckJveC1KUzogX0JveENvbmZpZyBub3QgcHJlc2VudCBvbjogXCIke2JveENsYXNzfVwiYClcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IEJveENsdXN0ZXIgPSBjbGFzc0ltcDtcbiIsImV4cG9ydCBjb25zdCBjb25zb2xlQ29sb3VycyA9IHtcbiAgUmVzZXQ6IFwiXFx4MWJbMG1cIixcbiAgQnJpZ2h0OiBcIlxceDFiWzFtXCIsXG4gIERpbTogXCJcXHgxYlsybVwiLFxuICBVbmRlcnNjb3JlOiBcIlxceDFiWzRtXCIsXG4gIEJsaW5rOiBcIlxceDFiWzVtXCIsXG4gIFJldmVyc2U6IFwiXFx4MWJbN21cIixcbiAgSGlkZGVuOiBcIlxceDFiWzhtXCIsXG5cbiAgRmdCbGFjazogXCJcXHgxYlszMG1cIixcbiAgRmdSZWQ6IFwiXFx4MWJbMzFtXCIsXG4gIEZnR3JlZW46IFwiXFx4MWJbMzJtXCIsXG4gIEZnWWVsbG93OiBcIlxceDFiWzMzbVwiLFxuICBGZ0JsdWU6IFwiXFx4MWJbMzRtXCIsXG4gIEZnTWFnZW50YTogXCJcXHgxYlszNW1cIixcbiAgRmdDeWFuOiBcIlxceDFiWzM2bVwiLFxuICBGZ1doaXRlOiBcIlxceDFiWzM3bVwiLFxuXG4gIEJnQmxhY2s6IFwiXFx4MWJbNDBtXCIsXG4gIEJnUmVkOiBcIlxceDFiWzQxbVwiLFxuICBCZ0dyZWVuOiBcIlxceDFiWzQybVwiLFxuICBCZ1llbGxvdzogXCJcXHgxYls0M21cIixcbiAgQmdCbHVlOiBcIlxceDFiWzQ0bVwiLFxuICBCZ01hZ2VudGE6IFwiXFx4MWJbNDVtXCIsXG4gIEJnQ3lhbjogXCJcXHgxYls0Nm1cIixcbiAgQmdXaGl0ZTogXCJcXHgxYls0N21cIlxufSIsImltcG9ydCB7IGNvbnNvbGVDb2xvdXJzIH0gZnJvbSAnLi9jb25zb2xlLWNvbG91cnMnO1xuXG5sZXQgZXhwb3J0VXRpbHMgPSB7XG4gIGxvZ0dyZWVuOiAoc3RyKSA9PiBudWxsLFxuICBsb2dZZWxsb3c6IChzdHIpID0+IG51bGwsXG4gIGxvZ0JsdWU6IChzdHIpID0+IG51bGwsXG4gIGxvZ0xvYWRlcjogKCkgPT4gKCgoKSA9PiB7XG4gICAgcmV0dXJuICgpID0+IG51bGw7XG4gIH0pKClcbiAgKVxufTtcblxuaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJykge1xuICBleHBvcnRVdGlscyA9IHtcbiAgICBsb2dHcmVlbjogKHN0cikgPT4gY29uc29sZS5sb2coYCR7Y29uc29sZUNvbG91cnMuRmdHcmVlbn0ke3N0cn0ke2NvbnNvbGVDb2xvdXJzLlJlc2V0fWApLFxuICAgIGxvZ1llbGxvdzogKHN0cikgPT4gY29uc29sZS5sb2coYCR7Y29uc29sZUNvbG91cnMuRmdZZWxsb3d9JHtzdHJ9JHtjb25zb2xlQ29sb3Vycy5SZXNldH1gKSxcbiAgICBsb2dCbHVlOiAoc3RyKSA9PiBjb25zb2xlLmxvZyhgJHtjb25zb2xlQ29sb3Vycy5GZ0N5YW59JHtzdHJ9JHtjb25zb2xlQ29sb3Vycy5SZXNldH1gKSxcbiAgICBsb2dMb2FkZXI6ICgpID0+ICgoKCkgPT4ge1xuICAgICAgY29uc3QgcCA9IFsnLycsICctJywgJ1xcXFwnLCAnfCddO1xuICAgICAgbGV0IHggPSAwO1xuICAgICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKFwiXFxyXCIgKyBjb25zb2xlQ29sb3Vycy5GZ0JsdWUgKyBwW3grK10gKyBgJHtjb25zb2xlQ29sb3Vycy5SZXNldH0gYCk7XG4gICAgICAgIHggJj0gKHAubGVuZ3RoIC0gMSk7XG4gICAgICB9LCAyNTApO1xuICAgICAgY29uc3QgY2xlYXJMaW5lID0gKCkgPT4gcHJvY2Vzcy5zdGRvdXQud3JpdGUoXCJcXHJcIik7XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgY2xlYXJMaW5lKCk7XG4gICAgICB9XG4gICAgfSkoKVxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgTG9nZ2luZ1V0aWxzID0gZXhwb3J0VXRpbHM7IiwiaW1wb3J0IHsgTG9nZ2luZ1V0aWxzIH0gZnJvbSAnLi9sb2dnaW5nL2xvZy11dGlscyc7XG5cbmxldCBzdGFydEJveFNlcnZlciA9IChkaXIpID0+IHt9XG5cbmlmICh0eXBlb2YgcmVxdWlyZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnKSB7XG4gIGNvbnN0IGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XG4gIGNvbnN0IGZhdmljb24gPSByZXF1aXJlKCdleHByZXNzLWZhdmljb24nKTtcbiAgY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbiAgY29uc3QgcG9ydCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgMjAyMTtcbiAgXG4gIHN0YXJ0Qm94U2VydmVyID0gKGRpcikgPT4ge1xuICAgIGNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbiAgICBjb25zdCBwdWJEaXIgPSBkaXIgKyAnL3B1YmxpYydcbiAgICBjb25zdCBkaXN0RGlyID0gZGlyICsgJy9kaXN0J1xuICAgIExvZ2dpbmdVdGlscy5sb2dCbHVlKCdIeXBlckJveDogc3RhcnRpbmcgdXAgYXBwbGljYXRpb24uLi4nKVxuICAgIGNvbnN0IGNsZWFyTG9hZGVyID0gTG9nZ2luZ1V0aWxzLmxvZ0xvYWRlcigpXG4gICAgYXBwLnVzZShmYXZpY29uKHB1YkRpciArICcvZmF2aWNvbi5pY28nKSk7XG4gICAgYXBwLnVzZShleHByZXNzLnN0YXRpYyhkaXN0RGlyKSk7Ly8gc2VuZCB0aGUgdXNlciB0byBpbmRleCBodG1sIHBhZ2UgaW5zcGl0ZSBvZiB0aGUgdXJsXG4gICAgYXBwLmdldCgnKicsIChyZXEsIHJlcykgPT4ge1xuICAgICAgcmVzLnNlbmRGaWxlKHBhdGgucmVzb2x2ZShkaXN0RGlyLCAnaW5kZXguaHRtbCcpKTtcbiAgICB9KTtcbiAgICBhcHAubGlzdGVuKHBvcnQsICgpID0+IHtcbiAgICAgIGNsZWFyTG9hZGVyKClcbiAgICAgIExvZ2dpbmdVdGlscy5sb2dHcmVlbihgSHlwZXJCb3g6IGFwcGxpY2F0aW9uIHJ1bm5pbmcgb24gcG9ydCAke3BvcnR9IPCfmoBgKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgeyBzdGFydEJveFNlcnZlciB9XG5cbiIsImV4cG9ydCAqIGZyb20gJy4vYm94JztcbmV4cG9ydCAqIGZyb20gJy4vaHlwZXJib3gtY29yZSc7XG5leHBvcnQgKiBmcm9tICcuL2JveC1jbHVzdGVyL2JveC1jbHVzdGVyJztcbmV4cG9ydCAqIGZyb20gJy4vc3RhcnQtYm94LXNlcnZlcic7XG5leHBvcnQgKiBmcm9tICcuL3R5cGVzJztcbiJdLCJzb3VyY2VSb290IjoiIn0=