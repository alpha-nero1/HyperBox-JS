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
            // Allows change detection to happen bottom up if a prent was set.
            if (box._parentBox) {
                box._parentBox.detectBoxChanges();
            }
            BoxUtils.LoadDOMAttributes(box);
            const newMarkup = box.display(box);
            box.innerHTML = newMarkup;
            if (box._init && typeof box.boxOnRedisplayed === 'function') {
                box.boxOnRedisplayed();
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

;// CONCATENATED MODULE: ./src/box-loader.ts
var _a;
let classImp = () => null;
/**
 * @author Alessandro Alberga
 * @description Box loader class.
 */
if (typeof document !== 'undefined') {
    classImp = (_a = class BoxLoader {
        },
        /**
         * Load stylesheet.
         *
         * @param { String } path sheet path.
         */
        _a.LoadStylesheet = (path) => {
            const link = document.createElement('link');
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.href = path;
            document.head.appendChild(link);
        },
        _a);
}
const BoxLoader = classImp;

;// CONCATENATED MODULE: ./src/hyperbox-core.ts
var hyperbox_core_a;


let hyperbox_core_classImp = () => null;
/**
 * @author Alessandro Alberga
 * @description Box CORE.
 */
if (typeof document !== 'undefined') {
    hyperbox_core_classImp = (hyperbox_core_a = class HyperBoxCore {
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
        hyperbox_core_a.LoadedBoxes = new Map(),
        hyperbox_core_a.BoxRegistry = new Map(),
        /**
         * Kick off the boxes...
         */
        hyperbox_core_a.Init = () => {
            // Add the root box.
            document.getElementById('root').innerHTML = '<main-box></main-box>';
        },
        /**
         * Creates our boxes.
         *
         * @param { any } boxName name of box.
         */
        hyperbox_core_a.BoxInstanceFactory = (boxClassName) => {
            const boxCapitalisedName = BoxUtils.CapitalizeFirstLetter(boxClassName);
            const instance = new (hyperbox_core_a.BoxRegistry.get(boxCapitalisedName))();
            return instance;
        },
        /**
         * Create the box container element.
         *
         * @param { any } box box.
         */
        hyperbox_core_a.CreateBoxContainer = (box) => {
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
        hyperbox_core_a.AddBoxToDOM = (box, parentBoxId) => {
            const boxParent = document.getElementById(parentBoxId);
            const boxConfig = box.constructor._BoxConfig;
            const newBoxId = hyperbox_core_a.GetNewBoxId(boxConfig);
            box._boxId = newBoxId;
            box._name = boxConfig.name;
            // Add box to loaded boxes.
            BoxUtils.CheckBoxRequirements(box);
            hyperbox_core_a.AddBoxToLoadedBoxes(box);
            BoxUtils.BuildBoxInterfaces(box);
            BoxUtils.BuildBoxStandardVariables(box);
            // Setup styles.
            if (boxConfig.styleSheetPath) {
                BoxLoader.LoadStylesheet(boxConfig.styleSheetPath);
            }
            // Setup the box container.
            const boxContainer = hyperbox_core_a.CreateBoxContainer(box);
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
        hyperbox_core_a.MakeBox = (className, parentBoxId) => {
            const box = hyperbox_core_a.BoxInstanceFactory(className);
            box._className = className;
            box._parentBoxId = parentBoxId;
            return hyperbox_core_a.AddBoxToDOM(box, parentBoxId);
        },
        hyperbox_core_a);
}
const HyperBoxCore = hyperbox_core_classImp;

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
        BoxUtils.CheckBoxRequirements(this);
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
                        if (boxConfig.styleSheetPath)
                            BoxLoader.LoadStylesheet(boxConfig.styleSheetPath);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oeXBlcmJveC1qcy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vaHlwZXJib3gtanMvZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImV4cHJlc3NcIixcImNvbW1vbmpzMlwiOlwiZXhwcmVzc1wiLFwiYW1kXCI6XCJleHByZXNzXCIsXCJyb290XCI6XCJleHByZXNzXCJ9Iiwid2VicGFjazovL2h5cGVyYm94LWpzL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJleHByZXNzLWZhdmljb25cIixcImNvbW1vbmpzMlwiOlwiZXhwcmVzcy1mYXZpY29uXCIsXCJhbWRcIjpcImV4cHJlc3MtZmF2aWNvblwiLFwicm9vdFwiOlwiZXhwcmVzcy1mYXZpY29uXCJ9Iiwid2VicGFjazovL2h5cGVyYm94LWpzL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJwYXRoXCIsXCJjb21tb25qczJcIjpcInBhdGhcIixcImFtZFwiOlwicGF0aFwiLFwicm9vdFwiOlwicGF0aFwifSIsIndlYnBhY2s6Ly9oeXBlcmJveC1qcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9oeXBlcmJveC1qcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vaHlwZXJib3gtanMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9oeXBlcmJveC1qcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2h5cGVyYm94LWpzLy4vc3JjL2JveC11dGlscy50cyIsIndlYnBhY2s6Ly9oeXBlcmJveC1qcy8uL3NyYy9ib3gtbG9hZGVyLnRzIiwid2VicGFjazovL2h5cGVyYm94LWpzLy4vc3JjL2h5cGVyYm94LWNvcmUudHMiLCJ3ZWJwYWNrOi8vaHlwZXJib3gtanMvLi9zcmMvYm94LnRzIiwid2VicGFjazovL2h5cGVyYm94LWpzLy4vc3JjL2JveC1jbHVzdGVyL2JveC1jbHVzdGVyLnRzIiwid2VicGFjazovL2h5cGVyYm94LWpzLy4vc3JjL2xvZ2dpbmcvY29uc29sZS1jb2xvdXJzLnRzIiwid2VicGFjazovL2h5cGVyYm94LWpzLy4vc3JjL2xvZ2dpbmcvbG9nLXV0aWxzLnRzIiwid2VicGFjazovL2h5cGVyYm94LWpzLy4vc3JjL3N0YXJ0LWJveC1zZXJ2ZXIudHMiLCJ3ZWJwYWNrOi8vaHlwZXJib3gtanMvLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87Ozs7Ozs7QUNWQSxrRDs7Ozs7OztBQ0FBLGtEOzs7Ozs7O0FDQUEsa0Q7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0hBOzs7R0FHRztBQUNJLE1BQU0sUUFBUTtJQWlCbkIsTUFBTSxDQUFDLG9CQUFvQixDQUFDLEdBQVE7O1FBQ2xDLElBQUksQ0FBQyxJQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsVUFBVTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMseUNBQXlDLENBQUMsQ0FBQztRQUNqRixJQUFJLENBQUMsVUFBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLFVBQVUsMENBQUUsSUFBSTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsOENBQThDLENBQUMsQ0FBQztJ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SUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUNwRCxDQUFDLENBQUMsQ0FBQztRQUNILEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtZQUNwQixXQUFXLEVBQUU7WUFDYixxQkFBcUIsQ0FBQyx5Q0FBeUMsSUFBSSxLQUFLLENBQUMsQ0FBQztRQUM1RSxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQUV3Qjs7O0FDNUJIO0FBQ1U7QUFDVTtBQUNQO0FBQ1giLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJleHByZXNzXCIpLCByZXF1aXJlKFwiZXhwcmVzcy1mYXZpY29uXCIpLCByZXF1aXJlKFwicGF0aFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJleHByZXNzXCIsIFwiZXhwcmVzcy1mYXZpY29uXCIsIFwicGF0aFwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJoeXBlcmJveC1qc1wiXSA9IGZhY3RvcnkocmVxdWlyZShcImV4cHJlc3NcIiksIHJlcXVpcmUoXCJleHByZXNzLWZhdmljb25cIiksIHJlcXVpcmUoXCJwYXRoXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJoeXBlcmJveC1qc1wiXSA9IGZhY3Rvcnkocm9vdFtcImV4cHJlc3NcIl0sIHJvb3RbXCJleHByZXNzLWZhdmljb25cIl0sIHJvb3RbXCJwYXRoXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzM5MV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX184ODBfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fNTQ5X18pIHtcbnJldHVybiAiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzM5MV9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fODgwX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX181NDlfXzsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEJveCB9IGZyb20gXCIuL2JveFwiO1xyXG5pbXBvcnQgeyBCb3hJbnRlcmZhY2UgfSBmcm9tIFwiLi90eXBlc1wiO1xyXG5cclxuLyoqXHJcbiAqIEBhdXRob3IgQWxlc3NhbmRybyBBbGJlcmdhXHJcbiAqIEBkZXNjcmlwdGlvbiBCb3ggdXRpbHMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQm94VXRpbHMge1xyXG5cclxuICAvKipcclxuICAgKiBDaGVjayBpZiBhIHZhbHVlIHZhbHVlIGlzIG51bGwgb3IgZW1wdHkuXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBTdHJpbmcgfSBzdHIgdGhlIHN0cmluZyB0byBwcmVmb3JtIG51bGwgb3IgZW1wdHkgY2hlY2sgb24uIFxyXG4gICAqL1xyXG4gIHN0YXRpYyBJc051bGxPckVtcHR5ID0gKHZhbHVlKSA9PiB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICByZXR1cm4gIXZhbHVlLmxlbmd0aFxyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgcmV0dXJuICFPYmplY3Qua2V5cyh2YWx1ZSB8fCB7fSkubGVuZ3RoXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBDaGVja0JveFJlcXVpcmVtZW50cyhib3g6IEJveCk6IHZvaWQge1xyXG4gICAgaWYgKCFib3g/Ll9Cb3hDb25maWcpIHRocm93IG5ldyBFcnJvcignSHlwZXJCb3gtSlM6IE11c3Qgc2V0IF9Cb3hDb25maWcgb24gYm94Jyk7XHJcbiAgICBpZiAoIWJveD8uX0JveENvbmZpZz8ubmFtZSkgdGhyb3cgbmV3IEVycm9yKCdIeXBlckJveC1KUzogTXVzdCBzZXQgX0JveENvbmZpZyBuYW1lIG9uIGJveCcpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQnVpbGQgYSBmdW5jdGlvbiBuYW1lIHRoYXQgdXNlcyBhIGNlcnRhaW4gcHJlZml4LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gcHJlZml4IHByZWZpeCBzdHJpbmcgZS5nLiAnZ2V0J1xyXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IHZhcmlhYmxlTmFtZSB2YXJpYWJsZSBuYW1lIGUuZy4gJ25hbWUnXHJcbiAgICovXHJcbiAgc3RhdGljIEJ1aWxkUHJlZml4ZWRGdW5jdGlvbk5hbWUocHJlZml4LCB2YXJpYWJsZU5hbWUpIHtcclxuICAgIGxldCByZXR1cm5OYW1lID0gQm94VXRpbHMuQ2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHZhcmlhYmxlTmFtZSk7XHJcbiAgICByZXR1cm5OYW1lID0gYCR7cHJlZml4fSR7cmV0dXJuTmFtZX1gO1xyXG4gICAgcmV0dXJuIHJldHVybk5hbWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBCdWlsZCB0aGUgc2V0dGVyIG5hbWUgZm9yIGEgdmFyaWFibGUgbmFtZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IHZhcmlhYmxlTmFtZSB2YXJpYWJsZSBuYW1lLlxyXG4gICAqL1xyXG4gIHN0YXRpYyBCdWlsZFNldHRlck5hbWUodmFyaWFibGVOYW1lKSB7XHJcbiAgICByZXR1cm4gQm94VXRpbHMuQnVpbGRQcmVmaXhlZEZ1bmN0aW9uTmFtZSgnc2V0JywgdmFyaWFibGVOYW1lKVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQnVpbGQgdGhlIGdldGVyIG5hbWUgZm9yIGEgdmFyaWFibGUgbmFtZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IHZhcmlhYmxlTmFtZSB2YXJpYWJsZSBuYW1lLlxyXG4gICAqL1xyXG4gIHN0YXRpYyBCdWlsZEdldHRlck5hbWUodmFyaWFibGVOYW1lKSB7XHJcbiAgICByZXR1cm4gQm94VXRpbHMuQnVpbGRQcmVmaXhlZEZ1bmN0aW9uTmFtZSgnZ2V0JywgdmFyaWFibGVOYW1lKVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FwaXRhbGlzZSB0aGUgZmlyc3QgbGV0dGVyIGluIGEgc3RyaW5nLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gdmFsdWUgc3RyaW5nIHZhbHVlLlxyXG4gICAqIEByZXR1cm5zIHsgU3RyaW5nIH0gQ2FwaXRhbGlzZWQgc3RyaW5nLlxyXG4gICAqL1xyXG4gIHN0YXRpYyBDYXBpdGFsaXplRmlyc3RMZXR0ZXIodmFsdWUpIHtcclxuICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS5sZW5ndGgpIHtcclxuICAgICAgY29uc3QgZmlyc3RDaGFyID0gdmFsdWVbMF0udG9VcHBlckNhc2UoKTtcclxuICAgICAgcmV0dXJuIGAke2ZpcnN0Q2hhcn0ke3ZhbHVlLnN1YnN0cigxLCB2YWx1ZS5sZW5ndGgpfWBcclxuICAgIH1cclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIExvYWQgSlNPTi5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IHBhdGgganNvbiBwYXRoLlxyXG4gICAqIEByZXR1cm5zIHsgUHJvbWlzZTxhbnk+IH0gUHJvbWlzZSBvZiBKU09OIG9iamVjdC5cclxuICAgKi9cclxuICBzdGF0aWMgTG9hZEpTT04ocGF0aCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgcmVxdWVzdC5vdmVycmlkZU1pbWVUeXBlKCdhcHBsaWNhdGlvbi9qc29uJyk7XHJcbiAgICAgIHJlcXVlc3Qub3BlbignR0VUJywgcGF0aCwgdHJ1ZSk7XHJcbiAgICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdyZXF1ZXN0IGFyZ3MnLCByZXF1ZXN0LnJlYWR5U3RhdGUsIHJlcXVlc3Quc3RhdHVzKVxyXG4gICAgICAgIGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgPT09IDQgJiYgcmVxdWVzdC5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2UpKVxyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgICAgcmVxdWVzdC5zZW5kKG51bGwpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZnRlciBhIGNoYW5nZSBpcyBuZWVkZWQsIHJlLXVzZSB0aGUgYm94IGRpc3BsYXkgZnVuY3Rpb24gdG8gcmUtc2V0IGlubmVyIGh0bWwuXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyp9IGJveCBcclxuICAgKi9cclxuICBzdGF0aWMgRGlzcGxheUJveChib3gpIHtcclxuICAgIGlmIChib3ggJiYgdHlwZW9mIGJveC5kaXNwbGF5ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIC8vIEFsbG93cyBjaGFuZ2UgZGV0ZWN0aW9uIHRvIGhhcHBlbiBib3R0b20gdXAgaWYgYSBwcmVudCB3YXMgc2V0LlxyXG4gICAgICBpZiAoYm94Ll9wYXJlbnRCb3gpIHtcclxuICAgICAgICBib3guX3BhcmVudEJveC5kZXRlY3RCb3hDaGFuZ2VzKCk7XHJcbiAgICAgIH1cclxuICAgICAgQm94VXRpbHMuTG9hZERPTUF0dHJpYnV0ZXMoYm94KTtcclxuICAgICAgY29uc3QgbmV3TWFya3VwID0gYm94LmRpc3BsYXkoYm94KTtcclxuICAgICAgYm94LmlubmVySFRNTCA9IG5ld01hcmt1cDtcclxuICAgICAgaWYgKGJveC5faW5pdCAmJiB0eXBlb2YgYm94LmJveE9uUmVkaXNwbGF5ZWQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICBib3guYm94T25SZWRpc3BsYXllZCgpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEJ1aWxkIGJveCBpbnRlcmZhY2VzIChzZXR0ZXJzIGFuZCBnZXR0ZXJzKSBpZiBfQm94SW50ZXJmYWNlIHByZXNlbnQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBhbnkgfSBib3ggYm94LiBcclxuICAgKi9cclxuICBzdGF0aWMgQnVpbGRCb3hJbnRlcmZhY2VzKGJveCkge1xyXG4gICAgaWYgKGJveCkge1xyXG4gICAgICBjb25zdCBib3hJbnRlcmZhY2U6IEJveEludGVyZmFjZSA9IGJveC5jb25zdHJ1Y3Rvci5fQm94SW50ZXJmYWNlO1xyXG4gICAgICBpZiAoYm94SW50ZXJmYWNlPy5JbnB1dHMpIEJveFV0aWxzLkJ1aWxkQm94R2V0dGVyc0FuZFNldHRlcnMoYm94LCBib3hJbnRlcmZhY2UuSW5wdXRzKTtcclxuICAgICAgaWYgKGJveEludGVyZmFjZT8uVmFycykgQm94VXRpbHMuQnVpbGRCb3hHZXR0ZXJzQW5kU2V0dGVycyhib3gsIGJveEludGVyZmFjZS5WYXJzKTtcclxuICAgICAgaWYgKGJveEludGVyZmFjZT8uT3V0cHV0cykgQm94VXRpbHMuQnVpbGRCb3hPdXRwdXRzKGJveCwgYm94SW50ZXJmYWNlLk91dHB1dHMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIEJ1aWxkQm94R2V0dGVyc0FuZFNldHRlcnMoYm94LCBpbnB1dHNPYmplY3Q6IHtba2V5OiBzdHJpbmddOiBhbnl9KSB7XHJcbiAgICBjb25zdCBpbnB1dHNXaXRoU3RvY2tQcm9wZXJ0aWVzID0ge1xyXG4gICAgICBfcGFyZW50Qm94SWQ6IG51bGwsXHJcbiAgICAgIC4uLmlucHV0c09iamVjdCxcclxuICAgIH1cclxuICAgIE9iamVjdC5rZXlzKGlucHV0c1dpdGhTdG9ja1Byb3BlcnRpZXMpLmZvckVhY2goaW50ZXJmYWNlUHJvcCA9PiB7XHJcbiAgICAgIGNvbnN0IHNldHRlck5hbWUgPSBCb3hVdGlscy5CdWlsZFNldHRlck5hbWUoaW50ZXJmYWNlUHJvcCk7XHJcbiAgICAgIGNvbnN0IGdldHRlck5hbWUgPSBCb3hVdGlscy5CdWlsZEdldHRlck5hbWUoaW50ZXJmYWNlUHJvcCk7XHJcbiAgICAgIGJveFtzZXR0ZXJOYW1lXSA9ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgIGJveFtpbnRlcmZhY2VQcm9wXSA9IHZhbHVlO1xyXG4gICAgICAgIGJveC5kZXRlY3RCb3hDaGFuZ2VzKCk7XHJcbiAgICAgIH1cclxuICAgICAgYm94W2dldHRlck5hbWVdID0gKCkgPT4gYm94W2ludGVyZmFjZVByb3BdO1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgaW5wdXRzV2l0aFN0b2NrUHJvcGVydGllc1tpbnRlcmZhY2VQcm9wXSAhPT0gbnVsbCAmJiBcclxuICAgICAgICB0eXBlb2YgaW5wdXRzV2l0aFN0b2NrUHJvcGVydGllc1tpbnRlcmZhY2VQcm9wXSAhPT0gJ3VuZGVmaW5lZCdcclxuICAgICAgKSB7XHJcbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgYSB2YWx1ZSwgc2V0IGl0IChhcHBseSBkZWZhdWx0cy4uLilcclxuICAgICAgICBib3hbaW50ZXJmYWNlUHJvcF0gPSBpbnB1dHNXaXRoU3RvY2tQcm9wZXJ0aWVzW2ludGVyZmFjZVByb3BdO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBCdWlsZEJveE91dHB1dHMoYm94LCBvdXRwdXRzT2JqZWN0OiB7W2tleTogc3RyaW5nXTogYW55fSkge1xyXG4gICAgT2JqZWN0LmtleXMob3V0cHV0c09iamVjdCkuZm9yRWFjaChpbnRlcmZhY2VQcm9wID0+IHtcclxuICAgICAgY29uc3QgbmV3Qm94T3V0cHV0RXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoYCgke2ludGVyZmFjZVByb3B9KWAsIHsgZGV0YWlsOiBib3ggfSk7XHJcbiAgICAgIGNvbnN0IGV2ZW50Qm94TmFtZSA9IGBfZXZlbnRfJHtpbnRlcmZhY2VQcm9wfWA7XHJcbiAgICAgIGJveFtldmVudEJveE5hbWVdID0gbmV3Qm94T3V0cHV0RXZlbnQ7XHJcbiAgICAgIC8vIEFkZCB0aGUgZGlzcGF0Y2ggZnVuY3Rpb24uXHJcbiAgICAgIGJveFtCb3hVdGlscy5CdWlsZFByZWZpeGVkRnVuY3Rpb25OYW1lKCdkaXNwYXRjaCcsIGludGVyZmFjZVByb3ApXSA9ICguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgYm94LmRpc3BhdGNoRXZlbnQoYm94W2V2ZW50Qm94TmFtZV0pXHJcbiAgICAgIH1cclxuICAgICAgLy8gQWRkIHRoZSBsaXN0ZW4gZnVuY3Rpb24uXHJcbiAgICAgIGxldCBzZXRDYWxsYmFjayA9ICgpID0+IHt9O1xyXG4gICAgICBib3hbQm94VXRpbHMuQnVpbGRQcmVmaXhlZEZ1bmN0aW9uTmFtZSgnYWRkJywgYCR7aW50ZXJmYWNlUHJvcH1MaXN0ZW5lcmApXSA9IChjYWxsYmFjaykgPT4ge1xyXG4gICAgICAgIHNldENhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICAgICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoYCgke2ludGVyZmFjZVByb3B9KWAsIHNldENhbGxiYWNrLCBmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gQWRkIHRoZSByZW1vdmUgbGlzdGVuZXIgZnVuY3Rpb24uXHJcbiAgICAgIGJveFtCb3hVdGlscy5CdWlsZFByZWZpeGVkRnVuY3Rpb25OYW1lKCdyZW1vdmUnLCBgJHtpbnRlcmZhY2VQcm9wfUxpc3RlbmVyYCldID0gKCkgPT4ge1xyXG4gICAgICAgIGJveC5yZW1vdmVFdmVudExpc3RlbmVyKGAoJHtpbnRlcmZhY2VQcm9wfSlgLCBzZXRDYWxsYmFjayk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQnVpbGQgdGhlIHN0YW5kYXJkIHZhcmlhYmxlcyB0aGF0IGdvIG9uIGJveGVzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgYW55IH0gYm94IGJveC4gXHJcbiAgICovXHJcbiAgc3RhdGljIEJ1aWxkQm94U3RhbmRhcmRWYXJpYWJsZXMoYm94KSB7XHJcbiAgICBjb25zdCBjb250ZXh0UGF0aCA9IGBTaGFyZWRCb3hDb3JlLmxvYWRlZEJveGVzLmdldCgnJHtib3guX25hbWV9JykuZ2V0KCcke2JveC5fYm94SWR9JylgXHJcbiAgICBib3guX2NvbnRleHQgPSBjb250ZXh0UGF0aDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIExvYWQgYXR0cmlidXRlcyBmcm9tIHRoZSBET00gaWYgdGhleSBoYXZlIGJlZW4gc3BlY2lmaWVkIGluIHRoZSBfQm94SW50ZXJmYWNlIVxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7IGFueSB9IGJveCBib3guXHJcbiAgICovXHJcbiAgc3RhdGljIExvYWRET01BdHRyaWJ1dGVzKGJveCkge1xyXG4gICAgaWYgKGJveC5hdHRyaWJ1dGVzKSB7XHJcbiAgICAgIGNvbnN0IGJveEludGVyZmFjZSA9IGJveC5jb25zdHJ1Y3Rvci5fQm94SW50ZXJmYWNlO1xyXG4gICAgICBpZiAoYm94SW50ZXJmYWNlKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBib3guYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgY29uc3QgYm94QXR0cmlidXRlID0gYm94LmF0dHJpYnV0ZXMuaXRlbShpKTtcclxuICAgICAgICAgIGNvbnN0IHsgbmFtZTogYXR0cmlidXRlTmFtZSwgdmFsdWU6IGF0dHJpYnV0ZVZhbHVlIH0gPSBib3hBdHRyaWJ1dGU7XHJcbiAgICAgICAgICBjb25zdCB0cmltbWVkTmFtZSA9IEJveFV0aWxzLlRyaW1GaXJzdEFuZExhc3RDaGFyKGF0dHJpYnV0ZU5hbWUpO1xyXG4gICAgICAgICAgaWYgKEJveFV0aWxzLklzVmFyaWFibGVJbnB1dFByb3BlcnR5KGF0dHJpYnV0ZU5hbWUpICYmIGJveEludGVyZmFjZS5JbnB1dHMgJiYgYm94SW50ZXJmYWNlLklucHV0c1t0cmltbWVkTmFtZV0pIHtcclxuICAgICAgICAgICAgLy8gTk9URTogYWRkIGV4dHJhIGxvZ2ljIGhlcmUgdGhhdCBzb21ldGhvdyB3YXRjaGVzIFtdIHZhcnMhXHJcbiAgICAgICAgICAgIGNvbnN0IHNldHRlck5hbWUgPSBCb3hVdGlscy5CdWlsZFNldHRlck5hbWUodHJpbW1lZE5hbWUpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGJveFtzZXR0ZXJOYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgIGJveFt0cmltbWVkTmFtZV0gPSBib3hBdHRyaWJ1dGUudmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAoQm94VXRpbHMuSXNPdXRwdXRQcm9wZXJ0eShhdHRyaWJ1dGVOYW1lKSAmJiBib3hJbnRlcmZhY2UuT3V0cHV0cyAmJiBib3hJbnRlcmZhY2UuT3V0cHV0c1t0cmltbWVkTmFtZV0pIHtcclxuICAgICAgICAgICAgLy8gQWRkIHRoZSBsaXN0ZW5lci5cclxuICAgICAgICAgICAgY29uc3QgZnVuY3Rpb25OYW1lID0gQm94VXRpbHMuR2V0RnVuY3Rpb25OYW1lRnJvbUZ1bmN0aW9uQ2FsbFN0cmluZyhhdHRyaWJ1dGVWYWx1ZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudEJveCA9IGJveC5nZXRQYXJlbnRCb3goKTtcclxuICAgICAgICAgICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoYXR0cmlidXRlTmFtZSwgKGV2KSA9PiBwYXJlbnRCb3hbZnVuY3Rpb25OYW1lXShldikpXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBJcyBub3JtYWwgc3Rpcm5nIG9yIG51bWJlciBpbnB1dCBwcm9wZXJ0eS5cclxuICAgICAgICAgICAgY29uc3Qgc2V0dGVyTmFtZSA9IEJveFV0aWxzLkJ1aWxkU2V0dGVyTmFtZShhdHRyaWJ1dGVOYW1lKTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBib3hbc2V0dGVyTmFtZV0gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICBib3hbYXR0cmlidXRlTmFtZV0gPSBib3hBdHRyaWJ1dGUudmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVjayBpZiBhIHByb3BlcnR5IG5hbWUgaXMgYW4gaW5wdXQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBTdHJpbmcgfSBwcm9wZXJ0eU5hbWUgcHJvcGVydHkgbmFtZS5cclxuICAgKi9cclxuICBzdGF0aWMgSXNWYXJpYWJsZUlucHV0UHJvcGVydHkocHJvcGVydHlOYW1lKSB7XHJcbiAgICBpZiAocHJvcGVydHlOYW1lICYmIHByb3BlcnR5TmFtZS5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICBwcm9wZXJ0eU5hbWUubGVuZ3RoID4gMiAmJlxyXG4gICAgICAgIHByb3BlcnR5TmFtZVswXSA9PT0gJ1snICYmXHJcbiAgICAgICAgcHJvcGVydHlOYW1lW3Byb3BlcnR5TmFtZS5sZW5ndGggLSAxXSA9PT0gJ10nXHJcbiAgICAgIClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBHZXRGdW5jdGlvbk5hbWVGcm9tRnVuY3Rpb25DYWxsU3RyaW5nKGZ1bmN0aW9uQ2FsbFN0cmluZyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb25DYWxsU3RyaW5nO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgaWYgYSBwcm9wZXJ0eSBuYW1lIGlzIGFuIG91dHB1dC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IHByb3BlcnR5TmFtZSBwcm9wZXJ0eSBuYW1lLlxyXG4gICAqL1xyXG4gIHN0YXRpYyBJc091dHB1dFByb3BlcnR5KHByb3BlcnR5TmFtZSkge1xyXG4gICAgaWYgKHByb3BlcnR5TmFtZSAmJiBwcm9wZXJ0eU5hbWUubGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgcHJvcGVydHlOYW1lLmxlbmd0aCA+IDIgJiZcclxuICAgICAgICBwcm9wZXJ0eU5hbWVbMF0gPT09ICcoJyAmJlxyXG4gICAgICAgIHByb3BlcnR5TmFtZVtwcm9wZXJ0eU5hbWUubGVuZ3RoIC0gMV0gPT09ICcpJ1xyXG4gICAgICApXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgdGhlIGZpcnN0IGFuZCBsYXN0IGNoYXIgb2YgYSBzdHJpbmcuXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBTdGlybmcgfSBwcm9wZXJ0eU5hbWUgcHJvcGVydHkgbmFtZS5cclxuICAgKi9cclxuICBzdGF0aWMgVHJpbUZpcnN0QW5kTGFzdENoYXIocHJvcGVydHlOYW1lKSB7XHJcbiAgICBsZXQgcmV0dXJuU3RyaW5nID0gcHJvcGVydHlOYW1lO1xyXG4gICAgaWYgKHByb3BlcnR5TmFtZSAmJiBwcm9wZXJ0eU5hbWUubGVuZ3RoID4gMikge1xyXG4gICAgICByZXR1cm5TdHJpbmcgPSByZXR1cm5TdHJpbmcuc2xpY2UoMSwgKHByb3BlcnR5TmFtZS5sZW5ndGggLSAxKSlcclxuICAgIH1cclxuICAgIHJldHVybiByZXR1cm5TdHJpbmc7XHJcbiAgfVxyXG59XHJcbiIsImxldCBjbGFzc0ltcDogYW55ID0gKCkgPT4gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBAYXV0aG9yIEFsZXNzYW5kcm8gQWxiZXJnYVxyXG4gKiBAZGVzY3JpcHRpb24gQm94IGxvYWRlciBjbGFzcy5cclxuICovXHJcbmlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgY2xhc3NJbXAgPSBjbGFzcyBCb3hMb2FkZXIge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZCBzdHlsZXNoZWV0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7IFN0cmluZyB9IHBhdGggc2hlZXQgcGF0aC5cclxuICAgICAqL1xyXG4gICAgc3RhdGljIExvYWRTdHlsZXNoZWV0ID0gKHBhdGgpID0+IHtcclxuICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcclxuICAgICAgbGluay50eXBlID0gJ3RleHQvY3NzJztcclxuICAgICAgbGluay5yZWwgPSAnc3R5bGVzaGVldCc7XHJcbiAgICAgIGxpbmsuaHJlZiA9IHBhdGg7XHJcbiAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobGluayk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgQm94TG9hZGVyID0gY2xhc3NJbXA7IiwiaW1wb3J0IHsgQm94TG9hZGVyIH0gZnJvbSAnLi9ib3gtbG9hZGVyJztcclxuaW1wb3J0IHsgQm94VXRpbHMgfSBmcm9tICcuL2JveC11dGlscyc7XHJcblxyXG5sZXQgY2xhc3NJbXA6IGFueSA9ICgpID0+IG51bGw7XHJcblxyXG4vKipcclxuICogQGF1dGhvciBBbGVzc2FuZHJvIEFsYmVyZ2FcclxuICogQGRlc2NyaXB0aW9uIEJveCBDT1JFLlxyXG4gKi9cclxuaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICBjbGFzc0ltcCA9IGNsYXNzIEh5cGVyQm94Q29yZSB7XHJcblxyXG4gICAgc3RhdGljIExvYWRlZEJveGVzID0gbmV3IE1hcCgpO1xyXG5cclxuICAgIHN0YXRpYyBCb3hSZWdpc3RyeSA9IG5ldyBNYXAoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgYm94IHJlZ2lzdHJ5LiBNdXN0IGJlIGNhbGxlZCBiZWZvcmUgaW5pdC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyBNYXAgfSByZWdpc3RyeSByZWdpc3RyeSBtYXAuXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBTZXRCb3hSZWdpc3RyeShyZWdpc3RyeSkge1xyXG4gICAgICBpZiAocmVnaXN0cnkpIHtcclxuICAgICAgICB0aGlzLkJveFJlZ2lzdHJ5ID0gcmVnaXN0cnk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCb3hKczogRmF0YWwsIG5vIGJveCByZWdpc3RyeSBzcGVjaWZpZWQuJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgKiBBZGQgYm94IHRvIHRoZSBsb2FkZWQgYm94ZXMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBhbnkgfSBib3ggYm94XHJcbiAgICovXHJcbiAgc3RhdGljIEFkZEJveFRvTG9hZGVkQm94ZXMoYm94KSB7XHJcbiAgICBjb25zdCBib3hDb25maWcgPSBib3guY29uc3RydWN0b3IuX0JveENvbmZpZztcclxuICAgIGNvbnN0IGJveFN0b3JlID0gSHlwZXJCb3hDb3JlLkxvYWRlZEJveGVzLmdldChib3hDb25maWcubmFtZSk7XHJcbiAgICBpZiAoIWJveFN0b3JlKSB7XHJcbiAgICAgIEh5cGVyQm94Q29yZS5Mb2FkZWRCb3hlcy5zZXQoXHJcbiAgICAgICAgYm94Q29uZmlnLm5hbWUsIFxyXG4gICAgICAgIG5ldyBNYXAoKVxyXG4gICAgICApXHJcbiAgICB9XHJcbiAgICBIeXBlckJveENvcmUuTG9hZGVkQm94ZXMuZ2V0KGJveENvbmZpZy5uYW1lKS5zZXQoYm94Ll9ib3hJZCwgYm94KTtcclxuICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBLaWNrIG9mZiB0aGUgYm94ZXMuLi5cclxuICAgICAqL1xyXG4gICAgc3RhdGljIEluaXQgPSAoKSA9PiB7XHJcbiAgICAgIC8vIEFkZCB0aGUgcm9vdCBib3guXHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JykuaW5uZXJIVE1MID0gJzxtYWluLWJveD48L21haW4tYm94PidcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIG91ciBib3hlcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyBhbnkgfSBib3hOYW1lIG5hbWUgb2YgYm94LlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgQm94SW5zdGFuY2VGYWN0b3J5ID0gKGJveENsYXNzTmFtZSkgPT4ge1xyXG4gICAgICBjb25zdCBib3hDYXBpdGFsaXNlZE5hbWUgPSBCb3hVdGlscy5DYXBpdGFsaXplRmlyc3RMZXR0ZXIoYm94Q2xhc3NOYW1lKTtcclxuICAgICAgY29uc3QgaW5zdGFuY2UgPSBuZXcgKEh5cGVyQm94Q29yZS5Cb3hSZWdpc3RyeS5nZXQoYm94Q2FwaXRhbGlzZWROYW1lKSkoKVxyXG4gICAgICByZXR1cm4gaW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIHRoZSBib3ggY29udGFpbmVyIGVsZW1lbnQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsgYW55IH0gYm94IGJveC5cclxuICAgICAqL1xyXG4gICAgc3RhdGljIENyZWF0ZUJveENvbnRhaW5lciA9IChib3gpID0+IHtcclxuICAgICAgY29uc3QgYm94Q29uZmlnID0gYm94LmNvbnN0cnVjdG9yLl9Cb3hDb25maWc7XHJcbiAgICAgIGNvbnN0IGJveENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICBib3hDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsIGJveC5fYm94SWQpO1xyXG4gICAgICBib3hDb250YWluZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsIGJveENvbmZpZy5uYW1lKTtcclxuICAgICAgcmV0dXJuIGJveENvbnRhaW5lcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRha2UgYm94IGNvbmZpZyBhbmQgcmV0dXJuIHRoZSBuZXcgYm94IGlkLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7IGFueSB9IGJveENvbmZpZyBib3ggY29uZmlnLlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgR2V0TmV3Qm94SWQoYm94Q29uZmlnKSB7XHJcbiAgICAgIGxldCBib3hDb3VudCA9IDA7XHJcbiAgICAgIGlmIChIeXBlckJveENvcmUuTG9hZGVkQm94ZXMuZ2V0KGJveENvbmZpZy5uYW1lKSkge1xyXG4gICAgICAgIGJveENvdW50ID0gSHlwZXJCb3hDb3JlLkxvYWRlZEJveGVzLmdldChib3hDb25maWcubmFtZSkuc2l6ZTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBib3hJZCA9IGAke2JveENvbmZpZy5uYW1lfS0ke2JveENvdW50fWA7XHJcbiAgICAgIHJldHVybiBib3hJZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBhIGJveCB0byB0aGUgRE9NLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7IGFueSB9IGJveCB0aGUgYm94IHRvIGFkZCB0byB0aGUgRE9NLlxyXG4gICAgICogQHBhcmFtIHsgU3RyaW5nIH0gcGFyZW50Qm94SWQgcGFyZW50cyBib3ggaWQuXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBBZGRCb3hUb0RPTSA9IChib3gsIHBhcmVudEJveElkKSA9PiB7XHJcbiAgICAgIGNvbnN0IGJveFBhcmVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBhcmVudEJveElkKTtcclxuICAgICAgY29uc3QgYm94Q29uZmlnID0gYm94LmNvbnN0cnVjdG9yLl9Cb3hDb25maWc7XHJcbiAgICAgIGNvbnN0IG5ld0JveElkID0gSHlwZXJCb3hDb3JlLkdldE5ld0JveElkKGJveENvbmZpZyk7XHJcbiAgICAgIGJveC5fYm94SWQgPSBuZXdCb3hJZDtcclxuICAgICAgYm94Ll9uYW1lID0gYm94Q29uZmlnLm5hbWU7XHJcbiAgICAgIC8vIEFkZCBib3ggdG8gbG9hZGVkIGJveGVzLlxyXG4gICAgICBCb3hVdGlscy5DaGVja0JveFJlcXVpcmVtZW50cyhib3gpO1xyXG4gICAgICBIeXBlckJveENvcmUuQWRkQm94VG9Mb2FkZWRCb3hlcyhib3gpO1xyXG4gICAgICBCb3hVdGlscy5CdWlsZEJveEludGVyZmFjZXMoYm94KTtcclxuICAgICAgQm94VXRpbHMuQnVpbGRCb3hTdGFuZGFyZFZhcmlhYmxlcyhib3gpO1xyXG4gICAgICAvLyBTZXR1cCBzdHlsZXMuXHJcbiAgICAgIGlmIChib3hDb25maWcuc3R5bGVTaGVldFBhdGgpIHtcclxuICAgICAgICBCb3hMb2FkZXIuTG9hZFN0eWxlc2hlZXQoYm94Q29uZmlnLnN0eWxlU2hlZXRQYXRoKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBTZXR1cCB0aGUgYm94IGNvbnRhaW5lci5cclxuICAgICAgY29uc3QgYm94Q29udGFpbmVyID0gSHlwZXJCb3hDb3JlLkNyZWF0ZUJveENvbnRhaW5lcihib3gpXHJcbiAgICAgIC8vIFNldCByZXRhaW5pbmcgdmFsdWVzLlxyXG4gICAgICBib3guX2NvbnRhaW5lciA9IGJveENvbnRhaW5lcjtcclxuICAgICAgLy8gU2V0dXAgdGhlIGluaXRpYWwgbWFya3VwIGFuZCBhZGQgYm94IHRvIHBhcmVudCFcclxuICAgICAgQm94VXRpbHMuRGlzcGxheUJveChib3gpO1xyXG4gICAgICBpZiAocGFyZW50Qm94SWQpIHtcclxuICAgICAgICAvLyBPbmx5IGFkZCB0byBET00gaWYgYSBwYXJlbnRCb3hJZCBwcm92aWRlZC4uLlxyXG4gICAgICAgIGlmIChib3hQYXJlbnQpIHtcclxuICAgICAgICAgIGJveFBhcmVudC5hcHBlbmRDaGlsZChib3hDb250YWluZXIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEJveEpTOiBDYW5ub3QgYWRkIGJveCB0byBudWxsIHBhcmVudC4gXCIke3BhcmVudEJveElkfVwiYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIC8vIEFsbG93IHRoZSBib3ggdG8gZGV0ZWN0IGZvciBjaGFuZ2VzLlxyXG4gICAgICBib3guZGV0ZWN0Qm94Q2hhbmdlcyA9ICgpID0+IEJveFV0aWxzLkRpc3BsYXlCb3goYm94KVxyXG4gICAgICAvLyBSdW4gdGhlIGRpc3BsYXllZCBob29rIGlmIHByZXNlbnQuXHJcbiAgICAgIGlmICh0eXBlb2YgYm94LmJveE9uRGlzcGxheWVkID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgYm94LmJveE9uRGlzcGxheWVkKCk7XHJcbiAgICAgIH1cclxuICAgICAgYm94Ll9pbml0ID0gdHJ1ZTtcclxuICAgICAgcmV0dXJuIGJveDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgYSBib3guXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHsqfSBuYW1lIFxyXG4gICAgICogQHBhcmFtIHsqfSBwYXJlbnRCb3hJZCBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIE1ha2VCb3ggPSAoY2xhc3NOYW1lLCBwYXJlbnRCb3hJZCkgPT4ge1xyXG4gICAgICBjb25zdCBib3ggPSBIeXBlckJveENvcmUuQm94SW5zdGFuY2VGYWN0b3J5KGNsYXNzTmFtZSk7XHJcbiAgICAgIGJveC5fY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xyXG4gICAgICBib3guX3BhcmVudEJveElkID0gcGFyZW50Qm94SWQ7XHJcbiAgICAgIHJldHVybiBIeXBlckJveENvcmUuQWRkQm94VG9ET00oYm94LCBwYXJlbnRCb3hJZCk7ICBcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBIeXBlckJveENvcmUgPSBjbGFzc0ltcDsiLCJpbXBvcnQgeyBCb3hVdGlscyB9IGZyb20gJy4vYm94LXV0aWxzJztcclxuaW1wb3J0IHsgSHlwZXJCb3hDb3JlIH0gZnJvbSAnLi9oeXBlcmJveC1jb3JlJztcclxuaW1wb3J0IHsgQm94SW50ZXJmYWNlLCBCb3hDb25maWcgfSBmcm9tICcuL3R5cGVzJztcclxuXHJcbmNvbnN0IEh0bWxDbGFzczogYW55ID0gKFxyXG4gICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSA/IFxyXG4gIEhUTUxFbGVtZW50IDogXHJcbiAgY2xhc3MgRmFrZUh0bWxFbGVtZW50IHt9XHJcbik7XHJcblxyXG4vKipcclxuICogQGF1dGhvciBBbGVzc2FuZHJvIEFsYmVyZ2FcclxuICogQGRlc2NyaXB0aW9uIERlc2NyaWJlcyB0aGUgYmFzZSBzdHJ1Y3R1cmUgb2YgYSBib3guXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQm94IGV4dGVuZHMgSHRtbENsYXNzIHtcclxuICBwcm90ZWN0ZWQgX2JveElkPzogc3RyaW5nO1xyXG4gIHByb3RlY3RlZCBfbmFtZT86IHN0cmluZztcclxuICBwcm90ZWN0ZWQgX2luaXQ/OiBib29sZWFuO1xyXG4gIHByb3RlY3RlZCBfY29udGFpbmVyPzogSFRNTEVsZW1lbnQ7XHJcbiAgcHJvdGVjdGVkIF9wYXJlbnRCb3hJZD86IHN0cmluZztcclxuICBwcm90ZWN0ZWQgX2NvbnRleHQ/OiBhbnk7XHJcbiAgcHJvdGVjdGVkIGJveE9uRGlzcGxheWVkOiAoKSA9PiB2b2lkO1xyXG4gIHByb3RlY3RlZCBib3hPbkRlc3Ryb3llZDogKCkgPT4gdm9pZDtcclxuICBwdWJsaWMgZGlzcGxheTogKGNvbnRleHQ6IGFueSkgPT4gc3RyaW5nO1xyXG4gIHN0YXRpYyBfQm94Q29uZmlnPzogQm94Q29uZmlnO1xyXG4gIHN0YXRpYyBfQm94SW50ZXJmYWNlOiBCb3hJbnRlcmZhY2U7XHJcblxyXG4gIHByb3RlY3RlZCBkZXRlY3RCb3hDaGFuZ2VzID0gKCkgPT4gQm94VXRpbHMuRGlzcGxheUJveCh0aGlzKTtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbGlzZSBvdXIgc3BlY2lhbCBib3ghXHJcbiAgICovXHJcbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XHJcbiAgICBjb25zdCBib3hDb25maWcgPSAodGhpcy5jb25zdHJ1Y3RvciBhcyBhbnkpLl9Cb3hDb25maWc7XHJcbiAgICB0aGlzLl9ib3hJZCA9IEh5cGVyQm94Q29yZS5HZXROZXdCb3hJZChib3hDb25maWcpO1xyXG4gICAgdGhpcy5pZCA9IHRoaXMuX2JveElkO1xyXG4gICAgdGhpcy5fbmFtZSA9IGJveENvbmZpZy5uYW1lXHJcbiAgICBCb3hVdGlscy5DaGVja0JveFJlcXVpcmVtZW50cyh0aGlzKTtcclxuICAgIEJveFV0aWxzLkJ1aWxkQm94U3RhbmRhcmRWYXJpYWJsZXModGhpcyk7XHJcbiAgICBCb3hVdGlscy5CdWlsZEJveEludGVyZmFjZXModGhpcyk7XHJcbiAgICBCb3hVdGlscy5EaXNwbGF5Qm94KHRoaXMpXHJcbiAgICBpZiAodHlwZW9mIHRoaXMuYm94T25EaXNwbGF5ZWQgPT09ICdmdW5jdGlvbicpIHRoaXMuYm94T25EaXNwbGF5ZWQoKTtcclxuICAgIEh5cGVyQm94Q29yZS5BZGRCb3hUb0xvYWRlZEJveGVzKHRoaXMpO1xyXG4gICAgdGhpcy5faW5pdCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIHBhcmVudCBib3ggZnJvbSB0aGUgcGFyZW50Qm94SWQgc2V0LlxyXG4gICAqL1xyXG4gIGdldFBhcmVudEJveCgpIHtcclxuICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLl9wYXJlbnRCb3hJZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBbGxvd3MgYW55IGJveCB0byB0ZXJtaW5hdGUgaXRzZWxmLlxyXG4gICAqL1xyXG4gIHRlcm1pbmF0ZVNlbGYoKSB7XHJcbiAgICB0aGlzLl9jb250YWluZXIucmVtb3ZlKCk7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMuYm94T25EZXN0cm95ZWQgPT09ICdmdW5jdGlvbicpIHRoaXMuYm94T25EZXN0cm95ZWQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBib3ggZWxlbWVudCBieSBpZC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IE51bWJlciB9IGlkIGJveCBpZC4gXHJcbiAgICovXHJcbiAgZ2V0Qm94RWxlbWVudEJ5SWQoaWQpIHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHt0aGlzLl9ib3hJZH0tJHtpZH1gKVxyXG4gICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBCb3ggZGlzY29ubmVjdGVkIGNhbGxiYWNrLlxyXG4gICAqL1xyXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLmJveE9uRGVzdHJveWVkID09PSAnZnVuY3Rpb24nKSB0aGlzLmJveE9uRGVzdHJveWVkKCk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHsgQm94TG9hZGVyIH0gZnJvbSAnLi4vYm94LWxvYWRlcic7XHJcblxyXG5sZXQgY2xhc3NJbXA6IGFueSA9ICgpID0+IG51bGw7XHJcblxyXG4vKipcclxuICogQGF1dGhvciBBbGVzc2FuZHJvIEFsYmVyZ2FcclxuICogQGRlc2NyaXB0aW9uIEh5cGVyYm94IEJveE5vZGUgY2xhc3MuXHJcbiAqL1xyXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICBjbGFzc0ltcCA9IGNsYXNzIEJveENsdXN0ZXIge1xyXG4gICAgY29uc3RydWN0b3IoYm94ZXMpIHtcclxuICAgICAgaWYgKGJveGVzICYmIGJveGVzLmxlbmd0aCkge1xyXG4gICAgICAgIGJveGVzLmZvckVhY2godGhpcy5pbml0Qm94KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluaXRCb3ggPSAoYm94Q2xhc3MpID0+IHtcclxuICAgICAgaWYgKGJveENsYXNzLl9Cb3hDb25maWcpIHtcclxuICAgICAgICBjb25zdCB7IF9Cb3hDb25maWc6IGJveENvbmZpZyB9ID0gYm94Q2xhc3M7XHJcbiAgICAgICAgaWYgKGJveENvbmZpZykge1xyXG4gICAgICAgICAgaWYgKGJveENvbmZpZy5zdHlsZVNoZWV0UGF0aCkgQm94TG9hZGVyLkxvYWRTdHlsZXNoZWV0KGJveENvbmZpZy5zdHlsZVNoZWV0UGF0aCk7XHJcbiAgICAgICAgICB3aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKGJveENvbmZpZy5uYW1lLCBib3hDbGFzcylcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGBIeXBlckJveC1KUzogRGVmaW5lZDogXCIke2JveENvbmZpZy5uYW1lfVwiYClcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBIeXBlckJveC1KUzogX0JveENvbmZpZyBub3QgcHJlc2VudCBvbjogXCIke2JveENsYXNzfVwiYClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IEJveENsdXN0ZXIgPSBjbGFzc0ltcDtcclxuIiwiZXhwb3J0IGNvbnN0IGNvbnNvbGVDb2xvdXJzID0ge1xyXG4gIFJlc2V0OiBcIlxceDFiWzBtXCIsXHJcbiAgQnJpZ2h0OiBcIlxceDFiWzFtXCIsXHJcbiAgRGltOiBcIlxceDFiWzJtXCIsXHJcbiAgVW5kZXJzY29yZTogXCJcXHgxYls0bVwiLFxyXG4gIEJsaW5rOiBcIlxceDFiWzVtXCIsXHJcbiAgUmV2ZXJzZTogXCJcXHgxYls3bVwiLFxyXG4gIEhpZGRlbjogXCJcXHgxYls4bVwiLFxyXG5cclxuICBGZ0JsYWNrOiBcIlxceDFiWzMwbVwiLFxyXG4gIEZnUmVkOiBcIlxceDFiWzMxbVwiLFxyXG4gIEZnR3JlZW46IFwiXFx4MWJbMzJtXCIsXHJcbiAgRmdZZWxsb3c6IFwiXFx4MWJbMzNtXCIsXHJcbiAgRmdCbHVlOiBcIlxceDFiWzM0bVwiLFxyXG4gIEZnTWFnZW50YTogXCJcXHgxYlszNW1cIixcclxuICBGZ0N5YW46IFwiXFx4MWJbMzZtXCIsXHJcbiAgRmdXaGl0ZTogXCJcXHgxYlszN21cIixcclxuXHJcbiAgQmdCbGFjazogXCJcXHgxYls0MG1cIixcclxuICBCZ1JlZDogXCJcXHgxYls0MW1cIixcclxuICBCZ0dyZWVuOiBcIlxceDFiWzQybVwiLFxyXG4gIEJnWWVsbG93OiBcIlxceDFiWzQzbVwiLFxyXG4gIEJnQmx1ZTogXCJcXHgxYls0NG1cIixcclxuICBCZ01hZ2VudGE6IFwiXFx4MWJbNDVtXCIsXHJcbiAgQmdDeWFuOiBcIlxceDFiWzQ2bVwiLFxyXG4gIEJnV2hpdGU6IFwiXFx4MWJbNDdtXCJcclxufSIsImltcG9ydCB7IGNvbnNvbGVDb2xvdXJzIH0gZnJvbSAnLi9jb25zb2xlLWNvbG91cnMnO1xyXG5cclxubGV0IGV4cG9ydFV0aWxzID0ge1xyXG4gIGxvZ0dyZWVuOiAoc3RyKSA9PiBudWxsLFxyXG4gIGxvZ1llbGxvdzogKHN0cikgPT4gbnVsbCxcclxuICBsb2dCbHVlOiAoc3RyKSA9PiBudWxsLFxyXG4gIGxvZ0xvYWRlcjogKCkgPT4gKCgoKSA9PiB7XHJcbiAgICByZXR1cm4gKCkgPT4gbnVsbDtcclxuICB9KSgpXHJcbiAgKVxyXG59O1xyXG5cclxuaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJykge1xyXG4gIGV4cG9ydFV0aWxzID0ge1xyXG4gICAgbG9nR3JlZW46IChzdHIpID0+IGNvbnNvbGUubG9nKGAke2NvbnNvbGVDb2xvdXJzLkZnR3JlZW59JHtzdHJ9JHtjb25zb2xlQ29sb3Vycy5SZXNldH1gKSxcclxuICAgIGxvZ1llbGxvdzogKHN0cikgPT4gY29uc29sZS5sb2coYCR7Y29uc29sZUNvbG91cnMuRmdZZWxsb3d9JHtzdHJ9JHtjb25zb2xlQ29sb3Vycy5SZXNldH1gKSxcclxuICAgIGxvZ0JsdWU6IChzdHIpID0+IGNvbnNvbGUubG9nKGAke2NvbnNvbGVDb2xvdXJzLkZnQ3lhbn0ke3N0cn0ke2NvbnNvbGVDb2xvdXJzLlJlc2V0fWApLFxyXG4gICAgbG9nTG9hZGVyOiAoKSA9PiAoKCgpID0+IHtcclxuICAgICAgY29uc3QgcCA9IFsnLycsICctJywgJ1xcXFwnLCAnfCddO1xyXG4gICAgICBsZXQgeCA9IDA7XHJcbiAgICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKFwiXFxyXCIgKyBjb25zb2xlQ29sb3Vycy5GZ0JsdWUgKyBwW3grK10gKyBgJHtjb25zb2xlQ29sb3Vycy5SZXNldH0gYCk7XHJcbiAgICAgICAgeCAmPSAocC5sZW5ndGggLSAxKTtcclxuICAgICAgfSwgMjUwKTtcclxuICAgICAgY29uc3QgY2xlYXJMaW5lID0gKCkgPT4gcHJvY2Vzcy5zdGRvdXQud3JpdGUoXCJcXHJcIik7XHJcbiAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XHJcbiAgICAgICAgY2xlYXJMaW5lKCk7XHJcbiAgICAgIH1cclxuICAgIH0pKClcclxuICAgIClcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBMb2dnaW5nVXRpbHMgPSBleHBvcnRVdGlsczsiLCJpbXBvcnQgeyBMb2dnaW5nVXRpbHMgfSBmcm9tICcuL2xvZ2dpbmcvbG9nLXV0aWxzJztcclxuXHJcbmxldCBzdGFydEJveFNlcnZlciA9IChkaXIpID0+IHt9XHJcblxyXG5pZiAodHlwZW9mIHJlcXVpcmUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJykge1xyXG4gIGNvbnN0IGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XHJcbiAgY29uc3QgZmF2aWNvbiA9IHJlcXVpcmUoJ2V4cHJlc3MtZmF2aWNvbicpO1xyXG4gIGNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XHJcbiAgY29uc3QgcG9ydCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgMjAyMTtcclxuICBcclxuICBzdGFydEJveFNlcnZlciA9IChkaXIpID0+IHtcclxuICAgIGNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcclxuICAgIGNvbnN0IHB1YkRpciA9IGRpciArICcvcHVibGljJ1xyXG4gICAgY29uc3QgZGlzdERpciA9IGRpciArICcvZGlzdCdcclxuICAgIExvZ2dpbmdVdGlscy5sb2dCbHVlKCdIeXBlckJveDogc3RhcnRpbmcgdXAgYXBwbGljYXRpb24uLi4nKVxyXG4gICAgY29uc3QgY2xlYXJMb2FkZXIgPSBMb2dnaW5nVXRpbHMubG9nTG9hZGVyKClcclxuICAgIGFwcC51c2UoZmF2aWNvbihwdWJEaXIgKyAnL2Zhdmljb24uaWNvJykpO1xyXG4gICAgYXBwLnVzZShleHByZXNzLnN0YXRpYyhkaXN0RGlyKSk7Ly8gc2VuZCB0aGUgdXNlciB0byBpbmRleCBodG1sIHBhZ2UgaW5zcGl0ZSBvZiB0aGUgdXJsXHJcbiAgICBhcHAuZ2V0KCcqJywgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICAgIHJlcy5zZW5kRmlsZShwYXRoLnJlc29sdmUoZGlzdERpciwgJ2luZGV4Lmh0bWwnKSk7XHJcbiAgICB9KTtcclxuICAgIGFwcC5saXN0ZW4ocG9ydCwgKCkgPT4ge1xyXG4gICAgICBjbGVhckxvYWRlcigpXHJcbiAgICAgIExvZ2dpbmdVdGlscy5sb2dHcmVlbihgSHlwZXJCb3g6IGFwcGxpY2F0aW9uIHJ1bm5pbmcgb24gcG9ydCAke3BvcnR9IPCfmoBgKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHsgc3RhcnRCb3hTZXJ2ZXIgfVxyXG5cclxuIiwiZXhwb3J0ICogZnJvbSAnLi9ib3gnO1xyXG5leHBvcnQgKiBmcm9tICcuL2h5cGVyYm94LWNvcmUnO1xyXG5leHBvcnQgKiBmcm9tICcuL2JveC1jbHVzdGVyL2JveC1jbHVzdGVyJztcclxuZXhwb3J0ICogZnJvbSAnLi9zdGFydC1ib3gtc2VydmVyJztcclxuZXhwb3J0ICogZnJvbSAnLi90eXBlcyc7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=