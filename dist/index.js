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
        const inputsWithStockProperties = Object.assign({ _parentBoxId: null }, inputsObject);
        Object.keys(inputsWithStockProperties).forEach(interfaceProp => {
            const setterName = BoxUtils.BuildSetterName(interfaceProp);
            const getterName = BoxUtils.BuildGetterName(interfaceProp);
            box[setterName] = (value) => {
                box[interfaceProp] = value;
                box.detectBoxChanges();
            };
            box[getterName] = () => {
                return box[interfaceProp];
            };
            if (inputsWithStockProperties[interfaceProp] !== null &&
                typeof inputsWithStockProperties[interfaceProp] !== 'undefined') {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oeXBlcmJveC1qcy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vaHlwZXJib3gtanMvZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImV4cHJlc3NcIixcImNvbW1vbmpzMlwiOlwiZXhwcmVzc1wiLFwiYW1kXCI6XCJleHByZXNzXCIsXCJyb290XCI6XCJleHByZXNzXCJ9Iiwid2VicGFjazovL2h5cGVyYm94LWpzL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJleHByZXNzLWZhdmljb25cIixcImNvbW1vbmpzMlwiOlwiZXhwcmVzcy1mYXZpY29uXCIsXCJhbWRcIjpcImV4cHJlc3MtZmF2aWNvblwiLFwicm9vdFwiOlwiZXhwcmVzcy1mYXZpY29uXCJ9Iiwid2VicGFjazovL2h5cGVyYm94LWpzL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJwYXRoXCIsXCJjb21tb25qczJcIjpcInBhdGhcIixcImFtZFwiOlwicGF0aFwiLFwicm9vdFwiOlwicGF0aFwifSIsIndlYnBhY2s6Ly9oeXBlcmJveC1qcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9oeXBlcmJveC1qcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vaHlwZXJib3gtanMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9oeXBlcmJveC1qcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2h5cGVyYm94LWpzLy4vc3JjL2JveC11dGlscy50cyIsIndlYnBhY2s6Ly9oeXBlcmJveC1qcy8uL3NyYy9ib3gtbG9hZGVyLnRzIiwid2VicGFjazovL2h5cGVyYm94LWpzLy4vc3JjL2h5cGVyYm94LWNvcmUudHMiLCJ3ZWJwYWNrOi8vaHlwZXJib3gtanMvLi9zcmMvYm94LnRzIiwid2VicGFjazovL2h5cGVyYm94LWpzLy4vc3JjL2JveC1jbHVzdGVyL2JveC1jbHVzdGVyLnRzIiwid2VicGFjazovL2h5cGVyYm94LWpzLy4vc3JjL2xvZ2dpbmcvY29uc29sZS1jb2xvdXJzLnRzIiwid2VicGFjazovL2h5cGVyYm94LWpzLy4vc3JjL2xvZ2dpbmcvbG9nLXV0aWxzLnRzIiwid2VicGFjazovL2h5cGVyYm94LWpzLy4vc3JjL3N0YXJ0LWJveC1zZXJ2ZXIudHMiLCJ3ZWJwYWNrOi8vaHlwZXJib3gtanMvLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87Ozs7Ozs7QUNWQSxrRDs7Ozs7OztBQ0FBLGtEOzs7Ozs7O0FDQUEsa0Q7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05BOzs7R0FHRztBQUNJLE1BQU0sUUFBUTtJQWlCbkI7Ozs7O09BS0c7SUFDSCxNQUFNLENBQUMseUJBQXlCLENBQUMsTUFBTSxFQUFFLFlBQVk7UUFDbkQsSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLHFCQUFxQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzlELFVBQVUsR0FBRyxHQUFHLE1BQU0sR0FBRyxVQUFVLEVBQUUsQ0FBQztRQUN0QyxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxlQUFlLENBQUMsWUFB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SUFDN0IsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO0lBRXRDLGNBQWMsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ3ZCLE1BQU0sR0FBRyxHQUFHLE9BQU8sRUFBRSxDQUFDO1FBQ3RCLE1BQU0sTUFBTSxHQUFHLEdBQUcsR0FBRyxTQUFTO1FBQzlCLE1BQU0sT0FBTyxHQUFHLEdBQUcsR0FBRyxPQUFPO1FBQzdCLG9CQUFvQixDQUFDLHNDQUFzQyxDQUFDO1FBQzVELE1BQU0sV0FBVyxHQUFHLHNCQUFzQixFQUFFO1FBQzVDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBQzFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLHVEQUFzRDtRQUN2RixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUN4QixHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFDcEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7WUFDcEIsV0FBVyxFQUFFO1lBQ2IscUJBQXFCLENBQUMseUNBQXlDLElBQUksS0FBSyxDQUFDLENBQUM7UUFDNUUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFFd0I7OztBQzVCSDtBQUNVO0FBQ1U7QUFDUDtBQUNYIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiZXhwcmVzc1wiKSwgcmVxdWlyZShcImV4cHJlc3MtZmF2aWNvblwiKSwgcmVxdWlyZShcInBhdGhcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wiZXhwcmVzc1wiLCBcImV4cHJlc3MtZmF2aWNvblwiLCBcInBhdGhcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiaHlwZXJib3gtanNcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJleHByZXNzXCIpLCByZXF1aXJlKFwiZXhwcmVzcy1mYXZpY29uXCIpLCByZXF1aXJlKFwicGF0aFwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiaHlwZXJib3gtanNcIl0gPSBmYWN0b3J5KHJvb3RbXCJleHByZXNzXCJdLCByb290W1wiZXhwcmVzcy1mYXZpY29uXCJdLCByb290W1wicGF0aFwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18zOTFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fODgwX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzU0OV9fKSB7XG5yZXR1cm4gIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18zOTFfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzg4MF9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fNTQ5X187IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKipcbiAqIEBhdXRob3IgQWxlc3NhbmRybyBBbGJlcmdhXG4gKiBAZGVzY3JpcHRpb24gQm94IHV0aWxzLlxuICovXG5leHBvcnQgY2xhc3MgQm94VXRpbHMge1xuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIHZhbHVlIHZhbHVlIGlzIG51bGwgb3IgZW1wdHkuXG4gICAqXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IHN0ciB0aGUgc3RyaW5nIHRvIHByZWZvcm0gbnVsbCBvciBlbXB0eSBjaGVjayBvbi4gXG4gICAqL1xuICBzdGF0aWMgSXNOdWxsT3JFbXB0eSA9ICh2YWx1ZSkgPT4ge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gIXZhbHVlLmxlbmd0aFxuICAgIH1cbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuICFPYmplY3Qua2V5cyh2YWx1ZSB8fCB7fSkubGVuZ3RoXG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEJ1aWxkIGEgZnVuY3Rpb24gbmFtZSB0aGF0IHVzZXMgYSBjZXJ0YWluIHByZWZpeC5cbiAgICpcbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gcHJlZml4IHByZWZpeCBzdHJpbmcgZS5nLiAnZ2V0J1xuICAgKiBAcGFyYW0geyBTdHJpbmcgfSB2YXJpYWJsZU5hbWUgdmFyaWFibGUgbmFtZSBlLmcuICduYW1lJ1xuICAgKi9cbiAgc3RhdGljIEJ1aWxkUHJlZml4ZWRGdW5jdGlvbk5hbWUocHJlZml4LCB2YXJpYWJsZU5hbWUpIHtcbiAgICBsZXQgcmV0dXJuTmFtZSA9IEJveFV0aWxzLkNhcGl0YWxpemVGaXJzdExldHRlcih2YXJpYWJsZU5hbWUpO1xuICAgIHJldHVybk5hbWUgPSBgJHtwcmVmaXh9JHtyZXR1cm5OYW1lfWA7XG4gICAgcmV0dXJuIHJldHVybk5hbWU7XG4gIH1cblxuICAvKipcbiAgICogQnVpbGQgdGhlIHNldHRlciBuYW1lIGZvciBhIHZhcmlhYmxlIG5hbWUuXG4gICAqXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IHZhcmlhYmxlTmFtZSB2YXJpYWJsZSBuYW1lLlxuICAgKi9cbiAgc3RhdGljIEJ1aWxkU2V0dGVyTmFtZSh2YXJpYWJsZU5hbWUpIHtcbiAgICByZXR1cm4gQm94VXRpbHMuQnVpbGRQcmVmaXhlZEZ1bmN0aW9uTmFtZSgnc2V0JywgdmFyaWFibGVOYW1lKVxuICB9XG5cbiAgLyoqXG4gICAqIEJ1aWxkIHRoZSBnZXRlciBuYW1lIGZvciBhIHZhcmlhYmxlIG5hbWUuXG4gICAqXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IHZhcmlhYmxlTmFtZSB2YXJpYWJsZSBuYW1lLlxuICAgKi9cbiAgc3RhdGljIEJ1aWxkR2V0dGVyTmFtZSh2YXJpYWJsZU5hbWUpIHtcbiAgICByZXR1cm4gQm94VXRpbHMuQnVpbGRQcmVmaXhlZEZ1bmN0aW9uTmFtZSgnZ2V0JywgdmFyaWFibGVOYW1lKVxuICB9XG5cbiAgLyoqXG4gICAqIENhcGl0YWxpc2UgdGhlIGZpcnN0IGxldHRlciBpbiBhIHN0cmluZy5cbiAgICpcbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gdmFsdWUgc3RyaW5nIHZhbHVlLlxuICAgKiBAcmV0dXJucyB7IFN0cmluZyB9IENhcGl0YWxpc2VkIHN0cmluZy5cbiAgICovXG4gIHN0YXRpYyBDYXBpdGFsaXplRmlyc3RMZXR0ZXIodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgJiYgdmFsdWUubGVuZ3RoKSB7XG4gICAgICBjb25zdCBmaXJzdENoYXIgPSB2YWx1ZVswXS50b1VwcGVyQ2FzZSgpO1xuICAgICAgcmV0dXJuIGAke2ZpcnN0Q2hhcn0ke3ZhbHVlLnN1YnN0cigxLCB2YWx1ZS5sZW5ndGgpfWBcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIExvYWQgSlNPTi5cbiAgICpcbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gcGF0aCBqc29uIHBhdGguXG4gICAqIEByZXR1cm5zIHsgUHJvbWlzZTxhbnk+IH0gUHJvbWlzZSBvZiBKU09OIG9iamVjdC5cbiAgICovXG4gIHN0YXRpYyBMb2FkSlNPTihwYXRoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICByZXF1ZXN0Lm92ZXJyaWRlTWltZVR5cGUoJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgIHJlcXVlc3Qub3BlbignR0VUJywgcGF0aCwgdHJ1ZSk7XG4gICAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3JlcXVlc3QgYXJncycsIHJlcXVlc3QucmVhZHlTdGF0ZSwgcmVxdWVzdC5zdGF0dXMpXG4gICAgICAgIGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgPT09IDQgJiYgcmVxdWVzdC5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlKSlcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJlcXVlc3Quc2VuZChudWxsKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZnRlciBhIGNoYW5nZSBpcyBuZWVkZWQsIHJlLXVzZSB0aGUgYm94IGRpc3BsYXkgZnVuY3Rpb24gdG8gcmUtc2V0IGlubmVyIGh0bWwuXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gYm94IFxuICAgKi9cbiAgc3RhdGljIERpc3BsYXlCb3goYm94KSB7XG4gICAgaWYgKGJveCAmJiB0eXBlb2YgYm94LmRpc3BsYXkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIEFsbG93cyBjaGFuZ2UgZGV0ZWN0aW9uIHRvIGhhcHBlbiBib3R0b20gdXAgaWYgYSBwcmVudCB3YXMgc2V0LlxuICAgICAgaWYgKGJveC5fcGFyZW50Qm94KSB7XG4gICAgICAgIGJveC5fcGFyZW50Qm94LmRldGVjdEJveENoYW5nZXMoKTtcbiAgICAgIH1cbiAgICAgIEJveFV0aWxzLkxvYWRET01BdHRyaWJ1dGVzKGJveCk7XG4gICAgICBjb25zdCBuZXdNYXJrdXAgPSBib3guZGlzcGxheShib3gpO1xuICAgICAgYm94LmlubmVySFRNTCA9IG5ld01hcmt1cDtcbiAgICAgIGlmIChib3guX2luaXQgJiYgdHlwZW9mIGJveC5ib3hPblJlZGlzcGxheWVkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGJveC5ib3hPblJlZGlzcGxheWVkKClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQnVpbGQgYm94IGludGVyZmFjZXMgKHNldHRlcnMgYW5kIGdldHRlcnMpIGlmIF9Cb3hJbnRlcmZhY2UgcHJlc2VudC5cbiAgICpcbiAgICogQHBhcmFtIHsgYW55IH0gYm94IGJveC4gXG4gICAqL1xuICBzdGF0aWMgQnVpbGRCb3hJbnRlcmZhY2VzKGJveCkge1xuICAgIGlmIChib3gpIHtcbiAgICAgIGNvbnN0IGJveEludGVyZmFjZSA9IGJveC5jb25zdHJ1Y3Rvci5fQm94SW50ZXJmYWNlO1xuICAgICAgaWYgKGJveEludGVyZmFjZSkge1xuICAgICAgICBCb3hVdGlscy5CdWlsZEJveElucHV0cyhib3gsIGJveEludGVyZmFjZS5JbnB1dHMgfHwge30pO1xuICAgICAgICBpZiAoYm94SW50ZXJmYWNlLk91dHB1dHMpIHtcbiAgICAgICAgICBCb3hVdGlscy5CdWlsZEJveE91dHB1dHMoYm94LCBib3hJbnRlcmZhY2UuT3V0cHV0cyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQnVpbGQgYm94IGlucHV0cyBmb3IgYSBib3guXG4gICAqXG4gICAqIEBwYXJhbSB7IGFueSB9IGlucHV0c09iamVjdCBpbnB1dHMgb2JqZWN0IGZyb20gX0JveEludGVyZmFjZVxuICAgKi9cbiAgc3RhdGljIEJ1aWxkQm94SW5wdXRzKGJveCwgaW5wdXRzT2JqZWN0KSB7XG4gICAgY29uc3QgaW5wdXRzV2l0aFN0b2NrUHJvcGVydGllcyA9IHtcbiAgICAgIF9wYXJlbnRCb3hJZDogbnVsbCxcbiAgICAgIC4uLmlucHV0c09iamVjdCxcbiAgICB9XG4gICAgT2JqZWN0LmtleXMoaW5wdXRzV2l0aFN0b2NrUHJvcGVydGllcykuZm9yRWFjaChpbnRlcmZhY2VQcm9wID0+IHtcbiAgICAgIGNvbnN0IHNldHRlck5hbWUgPSBCb3hVdGlscy5CdWlsZFNldHRlck5hbWUoaW50ZXJmYWNlUHJvcCk7XG4gICAgICBjb25zdCBnZXR0ZXJOYW1lID0gQm94VXRpbHMuQnVpbGRHZXR0ZXJOYW1lKGludGVyZmFjZVByb3ApO1xuICAgICAgYm94W3NldHRlck5hbWVdID0gKHZhbHVlKSA9PiB7XG4gICAgICAgIGJveFtpbnRlcmZhY2VQcm9wXSA9IHZhbHVlO1xuICAgICAgICBib3guZGV0ZWN0Qm94Q2hhbmdlcygpO1xuICAgICAgfVxuICAgICAgYm94W2dldHRlck5hbWVdID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gYm94W2ludGVyZmFjZVByb3BdO1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICBpbnB1dHNXaXRoU3RvY2tQcm9wZXJ0aWVzW2ludGVyZmFjZVByb3BdICE9PSBudWxsICYmIFxuICAgICAgICB0eXBlb2YgaW5wdXRzV2l0aFN0b2NrUHJvcGVydGllc1tpbnRlcmZhY2VQcm9wXSAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICkge1xuICAgICAgICAvLyBJZiB0aGVyZSBpcyBhIHZhbHVlLCBzZXQgaXQgKGFwcGx5IGRlZmF1bHRzLi4uKVxuICAgICAgICBib3hbaW50ZXJmYWNlUHJvcF0gPSBpbnB1dHNXaXRoU3RvY2tQcm9wZXJ0aWVzW2ludGVyZmFjZVByb3BdO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEJ1aWxkIG91dHB1dCBldmVudHMgZm9yIGEgYm94LlxuICAgKlxuICAgKiBAcGFyYW0geyBhbnkgfSBpbnB1dHNPYmplY3QgXG4gICAqL1xuICBzdGF0aWMgQnVpbGRCb3hPdXRwdXRzKGJveCwgb3V0cHV0c09iamVjdCkge1xuICAgIE9iamVjdC5rZXlzKG91dHB1dHNPYmplY3QpLmZvckVhY2goaW50ZXJmYWNlUHJvcCA9PiB7XG4gICAgICBjb25zdCBuZXdCb3hPdXRwdXRFdmVudCA9IG5ldyBDdXN0b21FdmVudChgKCR7aW50ZXJmYWNlUHJvcH0pYCwgeyBkZXRhaWw6IGJveCB9KTtcbiAgICAgIGNvbnN0IGV2ZW50Qm94TmFtZSA9IGBfZXZlbnRfJHtpbnRlcmZhY2VQcm9wfWA7XG4gICAgICBib3hbZXZlbnRCb3hOYW1lXSA9IG5ld0JveE91dHB1dEV2ZW50O1xuICAgICAgLy8gQWRkIHRoZSBkaXNwYXRjaCBmdW5jdGlvbi5cbiAgICAgIGJveFtCb3hVdGlscy5CdWlsZFByZWZpeGVkRnVuY3Rpb25OYW1lKCdkaXNwYXRjaCcsIGludGVyZmFjZVByb3ApXSA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgIGJveC5kaXNwYXRjaEV2ZW50KGJveFtldmVudEJveE5hbWVdKVxuICAgICAgfVxuICAgICAgLy8gQWRkIHRoZSBsaXN0ZW4gZnVuY3Rpb24uXG4gICAgICBsZXQgc2V0Q2FsbGJhY2sgPSAoKSA9PiB7fTtcbiAgICAgIGJveFtCb3hVdGlscy5CdWlsZFByZWZpeGVkRnVuY3Rpb25OYW1lKCdhZGQnLCBgJHtpbnRlcmZhY2VQcm9wfUxpc3RlbmVyYCldID0gKGNhbGxiYWNrKSA9PiB7XG4gICAgICAgIHNldENhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIGJveC5hZGRFdmVudExpc3RlbmVyKGAoJHtpbnRlcmZhY2VQcm9wfSlgLCBzZXRDYWxsYmFjaywgZmFsc2UpO1xuICAgICAgfVxuICAgICAgLy8gQWRkIHRoZSByZW1vdmUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gICAgICBib3hbQm94VXRpbHMuQnVpbGRQcmVmaXhlZEZ1bmN0aW9uTmFtZSgncmVtb3ZlJywgYCR7aW50ZXJmYWNlUHJvcH1MaXN0ZW5lcmApXSA9ICgpID0+IHtcbiAgICAgICAgYm94LnJlbW92ZUV2ZW50TGlzdGVuZXIoYCgke2ludGVyZmFjZVByb3B9KWAsIHNldENhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCdWlsZCB0aGUgc3RhbmRhcmQgdmFyaWFibGVzIHRoYXQgZ28gb24gYm94ZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7IGFueSB9IGJveCBib3guIFxuICAgKi9cbiAgc3RhdGljIEJ1aWxkQm94U3RhbmRhcmRWYXJpYWJsZXMoYm94KSB7XG4gICAgY29uc3QgY29udGV4dFBhdGggPSBgU2hhcmVkQm94Q29yZS5sb2FkZWRCb3hlcy5nZXQoJyR7Ym94Ll9uYW1lfScpLmdldCgnJHtib3guX2JveElkfScpYFxuICAgIGJveC5fY29udGV4dCA9IGNvbnRleHRQYXRoO1xuICB9XG5cbiAgLyoqXG4gICAqIExvYWQgYXR0cmlidXRlcyBmcm9tIHRoZSBET00gaWYgdGhleSBoYXZlIGJlZW4gc3BlY2lmaWVkIGluIHRoZSBfQm94SW50ZXJmYWNlIVxuICAgKiBcbiAgICogQHBhcmFtIHsgYW55IH0gYm94IGJveC5cbiAgICovXG4gIHN0YXRpYyBMb2FkRE9NQXR0cmlidXRlcyhib3gpIHtcbiAgICBpZiAoYm94LmF0dHJpYnV0ZXMpIHtcbiAgICAgIGNvbnN0IGJveEludGVyZmFjZSA9IGJveC5jb25zdHJ1Y3Rvci5fQm94SW50ZXJmYWNlO1xuICAgICAgaWYgKGJveEludGVyZmFjZSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJveC5hdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgYm94QXR0cmlidXRlID0gYm94LmF0dHJpYnV0ZXMuaXRlbShpKTtcbiAgICAgICAgICBjb25zdCB7IG5hbWU6IGF0dHJpYnV0ZU5hbWUsIHZhbHVlOiBhdHRyaWJ1dGVWYWx1ZSB9ID0gYm94QXR0cmlidXRlO1xuICAgICAgICAgIGNvbnN0IHRyaW1tZWROYW1lID0gQm94VXRpbHMuVHJpbUZpcnN0QW5kTGFzdENoYXIoYXR0cmlidXRlTmFtZSk7XG4gICAgICAgICAgaWYgKEJveFV0aWxzLklzVmFyaWFibGVJbnB1dFByb3BlcnR5KGF0dHJpYnV0ZU5hbWUpICYmIGJveEludGVyZmFjZS5JbnB1dHMgJiYgYm94SW50ZXJmYWNlLklucHV0c1t0cmltbWVkTmFtZV0pIHtcbiAgICAgICAgICAgIC8vIE5PVEU6IGFkZCBleHRyYSBsb2dpYyBoZXJlIHRoYXQgc29tZXRob3cgd2F0Y2hlcyBbXSB2YXJzIVxuICAgICAgICAgICAgY29uc3Qgc2V0dGVyTmFtZSA9IEJveFV0aWxzLkJ1aWxkU2V0dGVyTmFtZSh0cmltbWVkTmFtZSk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGJveFtzZXR0ZXJOYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICBib3hbdHJpbW1lZE5hbWVdID0gYm94QXR0cmlidXRlLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoQm94VXRpbHMuSXNPdXRwdXRQcm9wZXJ0eShhdHRyaWJ1dGVOYW1lKSAmJiBib3hJbnRlcmZhY2UuT3V0cHV0cyAmJiBib3hJbnRlcmZhY2UuT3V0cHV0c1t0cmltbWVkTmFtZV0pIHtcbiAgICAgICAgICAgIC8vIEFkZCB0aGUgbGlzdGVuZXIuXG4gICAgICAgICAgICBjb25zdCBmdW5jdGlvbk5hbWUgPSBCb3hVdGlscy5HZXRGdW5jdGlvbk5hbWVGcm9tRnVuY3Rpb25DYWxsU3RyaW5nKGF0dHJpYnV0ZVZhbHVlKTtcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudEJveCA9IGJveC5nZXRQYXJlbnRCb3goKTtcbiAgICAgICAgICAgIGJveC5hZGRFdmVudExpc3RlbmVyKGF0dHJpYnV0ZU5hbWUsIChldikgPT4gcGFyZW50Qm94W2Z1bmN0aW9uTmFtZV0oZXYpKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBJcyBub3JtYWwgc3Rpcm5nIG9yIG51bWJlciBpbnB1dCBwcm9wZXJ0eS5cbiAgICAgICAgICAgIGNvbnN0IHNldHRlck5hbWUgPSBCb3hVdGlscy5CdWlsZFNldHRlck5hbWUoYXR0cmlidXRlTmFtZSk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGJveFtzZXR0ZXJOYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICBib3hbYXR0cmlidXRlTmFtZV0gPSBib3hBdHRyaWJ1dGUudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgYSBwcm9wZXJ0eSBuYW1lIGlzIGFuIGlucHV0LlxuICAgKlxuICAgKiBAcGFyYW0geyBTdHJpbmcgfSBwcm9wZXJ0eU5hbWUgcHJvcGVydHkgbmFtZS5cbiAgICovXG4gIHN0YXRpYyBJc1ZhcmlhYmxlSW5wdXRQcm9wZXJ0eShwcm9wZXJ0eU5hbWUpIHtcbiAgICBpZiAocHJvcGVydHlOYW1lICYmIHByb3BlcnR5TmFtZS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIHByb3BlcnR5TmFtZS5sZW5ndGggPiAyICYmXG4gICAgICAgIHByb3BlcnR5TmFtZVswXSA9PT0gJ1snICYmXG4gICAgICAgIHByb3BlcnR5TmFtZVtwcm9wZXJ0eU5hbWUubGVuZ3RoIC0gMV0gPT09ICddJ1xuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBHZXRGdW5jdGlvbk5hbWVGcm9tRnVuY3Rpb25DYWxsU3RyaW5nKGZ1bmN0aW9uQ2FsbFN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uQ2FsbFN0cmluZztcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIHByb3BlcnR5IG5hbWUgaXMgYW4gb3V0cHV0LlxuICAgKlxuICAgKiBAcGFyYW0geyBTdHJpbmcgfSBwcm9wZXJ0eU5hbWUgcHJvcGVydHkgbmFtZS5cbiAgICovXG4gIHN0YXRpYyBJc091dHB1dFByb3BlcnR5KHByb3BlcnR5TmFtZSkge1xuICAgIGlmIChwcm9wZXJ0eU5hbWUgJiYgcHJvcGVydHlOYW1lLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgcHJvcGVydHlOYW1lLmxlbmd0aCA+IDIgJiZcbiAgICAgICAgcHJvcGVydHlOYW1lWzBdID09PSAnKCcgJiZcbiAgICAgICAgcHJvcGVydHlOYW1lW3Byb3BlcnR5TmFtZS5sZW5ndGggLSAxXSA9PT0gJyknXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSB0aGUgZmlyc3QgYW5kIGxhc3QgY2hhciBvZiBhIHN0cmluZy5cbiAgICpcbiAgICogQHBhcmFtIHsgU3Rpcm5nIH0gcHJvcGVydHlOYW1lIHByb3BlcnR5IG5hbWUuXG4gICAqL1xuICBzdGF0aWMgVHJpbUZpcnN0QW5kTGFzdENoYXIocHJvcGVydHlOYW1lKSB7XG4gICAgbGV0IHJldHVyblN0cmluZyA9IHByb3BlcnR5TmFtZTtcbiAgICBpZiAocHJvcGVydHlOYW1lICYmIHByb3BlcnR5TmFtZS5sZW5ndGggPiAyKSB7XG4gICAgICByZXR1cm5TdHJpbmcgPSByZXR1cm5TdHJpbmcuc2xpY2UoMSwgKHByb3BlcnR5TmFtZS5sZW5ndGggLSAxKSlcbiAgICB9XG4gICAgcmV0dXJuIHJldHVyblN0cmluZztcbiAgfVxufVxuIiwibGV0IGNsYXNzSW1wOiBhbnkgPSAoKSA9PiBudWxsO1xuXG4vKipcbiAqIEBhdXRob3IgQWxlc3NhbmRybyBBbGJlcmdhXG4gKiBAZGVzY3JpcHRpb24gQm94IGxvYWRlciBjbGFzcy5cbiAqL1xuaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgY2xhc3NJbXAgPSBjbGFzcyBCb3hMb2FkZXIge1xuXG4gICAgLyoqXG4gICAgICogTG9hZCBzdHlsZXNoZWV0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHsgU3RyaW5nIH0gcGF0aCBzaGVldCBwYXRoLlxuICAgICAqL1xuICAgIHN0YXRpYyBMb2FkU3R5bGVzaGVldCA9IChwYXRoKSA9PiB7XG4gICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgICAgbGluay50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgICAgbGluay5ocmVmID0gcGF0aDtcbiAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBCb3hMb2FkZXIgPSBjbGFzc0ltcDsiLCJpbXBvcnQgeyBCb3hMb2FkZXIgfSBmcm9tICcuL2JveC1sb2FkZXInO1xuaW1wb3J0IHsgQm94VXRpbHMgfSBmcm9tICcuL2JveC11dGlscyc7XG5cbmxldCBjbGFzc0ltcDogYW55ID0gKCkgPT4gbnVsbDtcblxuLyoqXG4gKiBAYXV0aG9yIEFsZXNzYW5kcm8gQWxiZXJnYVxuICogQGRlc2NyaXB0aW9uIEJveCBDT1JFLlxuICovXG5pZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xuICBjbGFzc0ltcCA9IGNsYXNzIEh5cGVyQm94Q29yZSB7XG5cbiAgICBzdGF0aWMgTG9hZGVkQm94ZXMgPSBuZXcgTWFwKCk7XG5cbiAgICBzdGF0aWMgQm94UmVnaXN0cnkgPSBuZXcgTWFwKCk7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGJveCByZWdpc3RyeS4gTXVzdCBiZSBjYWxsZWQgYmVmb3JlIGluaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0geyBNYXAgfSByZWdpc3RyeSByZWdpc3RyeSBtYXAuXG4gICAgICovXG4gICAgc3RhdGljIFNldEJveFJlZ2lzdHJ5KHJlZ2lzdHJ5KSB7XG4gICAgICBpZiAocmVnaXN0cnkpIHtcbiAgICAgICAgdGhpcy5Cb3hSZWdpc3RyeSA9IHJlZ2lzdHJ5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCb3hKczogRmF0YWwsIG5vIGJveCByZWdpc3RyeSBzcGVjaWZpZWQuJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAqIEFkZCBib3ggdG8gdGhlIGxvYWRlZCBib3hlcy5cbiAgICpcbiAgICogQHBhcmFtIHsgYW55IH0gYm94IGJveFxuICAgKi9cbiAgc3RhdGljIEFkZEJveFRvTG9hZGVkQm94ZXMoYm94KSB7XG4gICAgY29uc3QgYm94Q29uZmlnID0gYm94LmNvbnN0cnVjdG9yLl9Cb3hDb25maWc7XG4gICAgY29uc3QgYm94U3RvcmUgPSBIeXBlckJveENvcmUuTG9hZGVkQm94ZXMuZ2V0KGJveENvbmZpZy5uYW1lKTtcbiAgICBpZiAoIWJveFN0b3JlKSB7XG4gICAgICBIeXBlckJveENvcmUuTG9hZGVkQm94ZXMuc2V0KFxuICAgICAgICBib3hDb25maWcubmFtZSwgXG4gICAgICAgIG5ldyBNYXAoKVxuICAgICAgKVxuICAgIH1cbiAgICBIeXBlckJveENvcmUuTG9hZGVkQm94ZXMuZ2V0KGJveENvbmZpZy5uYW1lKS5zZXQoYm94Ll9ib3hJZCwgYm94KTtcbiAgfVxuXG4gICAgLyoqXG4gICAgICogS2ljayBvZmYgdGhlIGJveGVzLi4uXG4gICAgICovXG4gICAgc3RhdGljIEluaXQgPSAoKSA9PiB7XG4gICAgICAvLyBBZGQgdGhlIHJvb3QgYm94LlxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKS5pbm5lckhUTUwgPSAnPG1haW4tYm94PjwvbWFpbi1ib3g+J1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIG91ciBib3hlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7IGFueSB9IGJveE5hbWUgbmFtZSBvZiBib3guXG4gICAgICovXG4gICAgc3RhdGljIEJveEluc3RhbmNlRmFjdG9yeSA9IChib3hDbGFzc05hbWUpID0+IHtcbiAgICAgIGNvbnN0IGJveENhcGl0YWxpc2VkTmFtZSA9IEJveFV0aWxzLkNhcGl0YWxpemVGaXJzdExldHRlcihib3hDbGFzc05hbWUpO1xuICAgICAgY29uc3QgaW5zdGFuY2UgPSBuZXcgKEh5cGVyQm94Q29yZS5Cb3hSZWdpc3RyeS5nZXQoYm94Q2FwaXRhbGlzZWROYW1lKSkoKVxuICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgdGhlIGJveCBjb250YWluZXIgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7IGFueSB9IGJveCBib3guXG4gICAgICovXG4gICAgc3RhdGljIENyZWF0ZUJveENvbnRhaW5lciA9IChib3gpID0+IHtcbiAgICAgIGNvbnN0IGJveENvbmZpZyA9IGJveC5jb25zdHJ1Y3Rvci5fQm94Q29uZmlnO1xuICAgICAgY29uc3QgYm94Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBib3hDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsIGJveC5fYm94SWQpO1xuICAgICAgYm94Q29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBib3hDb25maWcubmFtZSk7XG4gICAgICByZXR1cm4gYm94Q29udGFpbmVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRha2UgYm94IGNvbmZpZyBhbmQgcmV0dXJuIHRoZSBuZXcgYm94IGlkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHsgYW55IH0gYm94Q29uZmlnIGJveCBjb25maWcuXG4gICAgICovXG4gICAgc3RhdGljIEdldE5ld0JveElkKGJveENvbmZpZykge1xuICAgICAgbGV0IGJveENvdW50ID0gMDtcbiAgICAgIGlmIChIeXBlckJveENvcmUuTG9hZGVkQm94ZXMuZ2V0KGJveENvbmZpZy5uYW1lKSkge1xuICAgICAgICBib3hDb3VudCA9IEh5cGVyQm94Q29yZS5Mb2FkZWRCb3hlcy5nZXQoYm94Q29uZmlnLm5hbWUpLnNpemU7XG4gICAgICB9XG4gICAgICBjb25zdCBib3hJZCA9IGAke2JveENvbmZpZy5uYW1lfS0ke2JveENvdW50fWA7XG4gICAgICByZXR1cm4gYm94SWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGEgYm94IHRvIHRoZSBET00uXG4gICAgICpcbiAgICAgKiBAcGFyYW0geyBhbnkgfSBib3ggdGhlIGJveCB0byBhZGQgdG8gdGhlIERPTS5cbiAgICAgKiBAcGFyYW0geyBTdHJpbmcgfSBwYXJlbnRCb3hJZCBwYXJlbnRzIGJveCBpZC5cbiAgICAgKi9cbiAgICBzdGF0aWMgQWRkQm94VG9ET00gPSAoYm94LCBwYXJlbnRCb3hJZCkgPT4ge1xuICAgICAgY29uc3QgYm94UGFyZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyZW50Qm94SWQpO1xuICAgICAgY29uc3QgYm94Q29uZmlnID0gYm94LmNvbnN0cnVjdG9yLl9Cb3hDb25maWc7XG4gICAgICBjb25zdCBuZXdCb3hJZCA9IEh5cGVyQm94Q29yZS5HZXROZXdCb3hJZChib3hDb25maWcpO1xuICAgICAgYm94Ll9ib3hJZCA9IG5ld0JveElkO1xuICAgICAgYm94Ll9uYW1lID0gYm94Q29uZmlnLm5hbWU7XG4gICAgICAvLyBBZGQgYm94IHRvIGxvYWRlZCBib3hlcy5cbiAgICAgIEh5cGVyQm94Q29yZS5BZGRCb3hUb0xvYWRlZEJveGVzKGJveCk7XG4gICAgICBCb3hVdGlscy5CdWlsZEJveEludGVyZmFjZXMoYm94KTtcbiAgICAgIEJveFV0aWxzLkJ1aWxkQm94U3RhbmRhcmRWYXJpYWJsZXMoYm94KTtcbiAgICAgIC8vIFNldHVwIHN0eWxlcy5cbiAgICAgIGlmIChib3hDb25maWcuc3R5bGVTaGVldFBhdGgpIHtcbiAgICAgICAgQm94TG9hZGVyLkxvYWRTdHlsZXNoZWV0KGJveENvbmZpZy5zdHlsZVNoZWV0UGF0aCk7XG4gICAgICB9XG4gICAgICAvLyBTZXR1cCB0aGUgYm94IGNvbnRhaW5lci5cbiAgICAgIGNvbnN0IGJveENvbnRhaW5lciA9IEh5cGVyQm94Q29yZS5DcmVhdGVCb3hDb250YWluZXIoYm94KVxuICAgICAgLy8gU2V0IHJldGFpbmluZyB2YWx1ZXMuXG4gICAgICBib3guX2NvbnRhaW5lciA9IGJveENvbnRhaW5lcjtcbiAgICAgIC8vIFNldHVwIHRoZSBpbml0aWFsIG1hcmt1cCBhbmQgYWRkIGJveCB0byBwYXJlbnQhXG4gICAgICBCb3hVdGlscy5EaXNwbGF5Qm94KGJveCk7XG4gICAgICBpZiAocGFyZW50Qm94SWQpIHtcbiAgICAgICAgLy8gT25seSBhZGQgdG8gRE9NIGlmIGEgcGFyZW50Qm94SWQgcHJvdmlkZWQuLi5cbiAgICAgICAgaWYgKGJveFBhcmVudCkge1xuICAgICAgICAgIGJveFBhcmVudC5hcHBlbmRDaGlsZChib3hDb250YWluZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQm94SlM6IENhbm5vdCBhZGQgYm94IHRvIG51bGwgcGFyZW50LiBcIiR7cGFyZW50Qm94SWR9XCJgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gQWxsb3cgdGhlIGJveCB0byBkZXRlY3QgZm9yIGNoYW5nZXMuXG4gICAgICBib3guZGV0ZWN0Qm94Q2hhbmdlcyA9ICgpID0+IEJveFV0aWxzLkRpc3BsYXlCb3goYm94KVxuICAgICAgLy8gUnVuIHRoZSBkaXNwbGF5ZWQgaG9vayBpZiBwcmVzZW50LlxuICAgICAgaWYgKHR5cGVvZiBib3guYm94T25EaXNwbGF5ZWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgYm94LmJveE9uRGlzcGxheWVkKCk7XG4gICAgICB9XG4gICAgICBib3guX2luaXQgPSB0cnVlO1xuICAgICAgcmV0dXJuIGJveDtcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICogQWRkIGEgYm94LlxuICAgICAqXG4gICAgICogQHBhcmFtIHsqfSBuYW1lIFxuICAgICAqIEBwYXJhbSB7Kn0gcGFyZW50Qm94SWQgXG4gICAgICovXG4gICAgc3RhdGljIE1ha2VCb3ggPSAoY2xhc3NOYW1lLCBwYXJlbnRCb3hJZCkgPT4ge1xuICAgICAgY29uc3QgYm94ID0gSHlwZXJCb3hDb3JlLkJveEluc3RhbmNlRmFjdG9yeShjbGFzc05hbWUpO1xuICAgICAgYm94Ll9jbGFzc05hbWUgPSBjbGFzc05hbWU7XG4gICAgICBib3guX3BhcmVudEJveElkID0gcGFyZW50Qm94SWQ7XG4gICAgICByZXR1cm4gSHlwZXJCb3hDb3JlLkFkZEJveFRvRE9NKGJveCwgcGFyZW50Qm94SWQpOyAgXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBIeXBlckJveENvcmUgPSBjbGFzc0ltcDsiLCJpbXBvcnQgeyBCb3hVdGlscyB9IGZyb20gJy4vYm94LXV0aWxzJztcbmltcG9ydCB7IEh5cGVyQm94Q29yZSB9IGZyb20gJy4vaHlwZXJib3gtY29yZSc7XG5cbmNvbnN0IEh0bWxDbGFzczogYW55ID0gKFxuICAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykgPyBcbiAgSFRNTEVsZW1lbnQgOiBcbiAgY2xhc3MgRmFrZUh0bWxFbGVtZW50IHt9XG4pO1xuXG4vKipcbiAqIEBhdXRob3IgQWxlc3NhbmRybyBBbGJlcmdhXG4gKiBAZGVzY3JpcHRpb24gRGVzY3JpYmVzIHRoZSBiYXNlIHN0cnVjdHVyZSBvZiBhIGJveC5cbiAqL1xuZXhwb3J0IGNsYXNzIEJveCBleHRlbmRzIEh0bWxDbGFzcyB7XG4gIHByb3RlY3RlZCBfYm94SWQ/OiBzdHJpbmc7XG4gIHByb3RlY3RlZCBfbmFtZT86IHN0cmluZztcbiAgcHJvdGVjdGVkIF9pbml0PzogYm9vbGVhbjtcbiAgcHJvdGVjdGVkIF9jb250YWluZXI/OiBIVE1MRWxlbWVudDtcbiAgcHJvdGVjdGVkIF9wYXJlbnRCb3hJZD86IHN0cmluZztcbiAgcHJvdGVjdGVkIF9jb250ZXh0PzogYW55O1xuICBwcm90ZWN0ZWQgYm94T25EaXNwbGF5ZWQ6ICgpID0+IHZvaWQ7XG4gIHByb3RlY3RlZCBib3hPbkRlc3Ryb3llZDogKCkgPT4gdm9pZDtcbiAgcHVibGljIGRpc3BsYXk6IChjb250ZXh0OiBhbnkpID0+IHN0cmluZztcblxuICBwcm90ZWN0ZWQgZGV0ZWN0Qm94Q2hhbmdlcyA9ICgpID0+IEJveFV0aWxzLkRpc3BsYXlCb3godGhpcyk7XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpc2Ugb3VyIHNwZWNpYWwgYm94IVxuICAgKi9cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc3QgYm94Q29uZmlnID0gKHRoaXMuY29uc3RydWN0b3IgYXMgYW55KS5fQm94Q29uZmlnO1xuICAgIHRoaXMuX2JveElkID0gSHlwZXJCb3hDb3JlLkdldE5ld0JveElkKGJveENvbmZpZyk7XG4gICAgdGhpcy5pZCA9IHRoaXMuX2JveElkO1xuICAgIHRoaXMuX25hbWUgPSBib3hDb25maWcubmFtZVxuICAgIEJveFV0aWxzLkJ1aWxkQm94U3RhbmRhcmRWYXJpYWJsZXModGhpcyk7XG4gICAgQm94VXRpbHMuQnVpbGRCb3hJbnRlcmZhY2VzKHRoaXMpO1xuICAgIEJveFV0aWxzLkRpc3BsYXlCb3godGhpcylcbiAgICBpZiAodHlwZW9mIHRoaXMuYm94T25EaXNwbGF5ZWQgPT09ICdmdW5jdGlvbicpIHRoaXMuYm94T25EaXNwbGF5ZWQoKTtcbiAgICBIeXBlckJveENvcmUuQWRkQm94VG9Mb2FkZWRCb3hlcyh0aGlzKTtcbiAgICB0aGlzLl9pbml0ID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHBhcmVudCBib3ggZnJvbSB0aGUgcGFyZW50Qm94SWQgc2V0LlxuICAgKi9cbiAgZ2V0UGFyZW50Qm94KCkge1xuICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLl9wYXJlbnRCb3hJZCk7XG4gIH1cblxuICAvKipcbiAgICogQWxsb3dzIGFueSBib3ggdG8gdGVybWluYXRlIGl0c2VsZi5cbiAgICovXG4gIHRlcm1pbmF0ZVNlbGYoKSB7XG4gICAgdGhpcy5fY29udGFpbmVyLnJlbW92ZSgpO1xuICAgIGlmICh0eXBlb2YgdGhpcy5ib3hPbkRlc3Ryb3llZCA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5ib3hPbkRlc3Ryb3llZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBib3ggZWxlbWVudCBieSBpZC5cbiAgICpcbiAgICogQHBhcmFtIHsgTnVtYmVyIH0gaWQgYm94IGlkLiBcbiAgICovXG4gIGdldEJveEVsZW1lbnRCeUlkKGlkKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3RoaXMuX2JveElkfS0ke2lkfWApXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogQm94IGRpc2Nvbm5lY3RlZCBjYWxsYmFjay5cbiAgICovXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5ib3hPbkRlc3Ryb3llZCA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5ib3hPbkRlc3Ryb3llZCgpO1xuICB9XG59IiwiaW1wb3J0IHsgQm94TG9hZGVyIH0gZnJvbSAnLi4vYm94LWxvYWRlcic7XG5cbmxldCBjbGFzc0ltcDogYW55ID0gKCkgPT4gbnVsbDtcblxuLyoqXG4gKiBAYXV0aG9yIEFsZXNzYW5kcm8gQWxiZXJnYVxuICogQGRlc2NyaXB0aW9uIEh5cGVyYm94IEJveE5vZGUgY2xhc3MuXG4gKi9cbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICBjbGFzc0ltcCA9IGNsYXNzIEJveENsdXN0ZXIge1xuICAgIGNvbnN0cnVjdG9yKGJveGVzKSB7XG4gICAgICBpZiAoYm94ZXMgJiYgYm94ZXMubGVuZ3RoKSB7XG4gICAgICAgIGJveGVzLmZvckVhY2godGhpcy5pbml0Qm94KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0Qm94ID0gKGJveENsYXNzKSA9PiB7XG4gICAgICBpZiAoYm94Q2xhc3MuX0JveENvbmZpZykge1xuICAgICAgICBjb25zdCB7IF9Cb3hDb25maWc6IGJveENvbmZpZyB9ID0gYm94Q2xhc3M7XG4gICAgICAgIGlmIChib3hDb25maWcpIHtcbiAgICAgICAgICBpZiAoYm94Q29uZmlnLnN0eWxlU2hlZXRQYXRoKSBCb3hMb2FkZXIuTG9hZFN0eWxlc2hlZXQoYm94Q29uZmlnLnN0eWxlU2hlZXRQYXRoKTtcbiAgICAgICAgICB3aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKGJveENvbmZpZy5uYW1lLCBib3hDbGFzcylcbiAgICAgICAgICBjb25zb2xlLmxvZyhgSHlwZXJCb3gtSlM6IERlZmluZWQ6IFwiJHtib3hDb25maWcubmFtZX1cImApXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSHlwZXJCb3gtSlM6IF9Cb3hDb25maWcgbm90IHByZXNlbnQgb246IFwiJHtib3hDbGFzc31cImApXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBCb3hDbHVzdGVyID0gY2xhc3NJbXA7XG4iLCJleHBvcnQgY29uc3QgY29uc29sZUNvbG91cnMgPSB7XG4gIFJlc2V0OiBcIlxceDFiWzBtXCIsXG4gIEJyaWdodDogXCJcXHgxYlsxbVwiLFxuICBEaW06IFwiXFx4MWJbMm1cIixcbiAgVW5kZXJzY29yZTogXCJcXHgxYls0bVwiLFxuICBCbGluazogXCJcXHgxYls1bVwiLFxuICBSZXZlcnNlOiBcIlxceDFiWzdtXCIsXG4gIEhpZGRlbjogXCJcXHgxYls4bVwiLFxuXG4gIEZnQmxhY2s6IFwiXFx4MWJbMzBtXCIsXG4gIEZnUmVkOiBcIlxceDFiWzMxbVwiLFxuICBGZ0dyZWVuOiBcIlxceDFiWzMybVwiLFxuICBGZ1llbGxvdzogXCJcXHgxYlszM21cIixcbiAgRmdCbHVlOiBcIlxceDFiWzM0bVwiLFxuICBGZ01hZ2VudGE6IFwiXFx4MWJbMzVtXCIsXG4gIEZnQ3lhbjogXCJcXHgxYlszNm1cIixcbiAgRmdXaGl0ZTogXCJcXHgxYlszN21cIixcblxuICBCZ0JsYWNrOiBcIlxceDFiWzQwbVwiLFxuICBCZ1JlZDogXCJcXHgxYls0MW1cIixcbiAgQmdHcmVlbjogXCJcXHgxYls0Mm1cIixcbiAgQmdZZWxsb3c6IFwiXFx4MWJbNDNtXCIsXG4gIEJnQmx1ZTogXCJcXHgxYls0NG1cIixcbiAgQmdNYWdlbnRhOiBcIlxceDFiWzQ1bVwiLFxuICBCZ0N5YW46IFwiXFx4MWJbNDZtXCIsXG4gIEJnV2hpdGU6IFwiXFx4MWJbNDdtXCJcbn0iLCJpbXBvcnQgeyBjb25zb2xlQ29sb3VycyB9IGZyb20gJy4vY29uc29sZS1jb2xvdXJzJztcblxubGV0IGV4cG9ydFV0aWxzID0ge1xuICBsb2dHcmVlbjogKHN0cikgPT4gbnVsbCxcbiAgbG9nWWVsbG93OiAoc3RyKSA9PiBudWxsLFxuICBsb2dCbHVlOiAoc3RyKSA9PiBudWxsLFxuICBsb2dMb2FkZXI6ICgpID0+ICgoKCkgPT4ge1xuICAgIHJldHVybiAoKSA9PiBudWxsO1xuICB9KSgpXG4gIClcbn07XG5cbmlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgZXhwb3J0VXRpbHMgPSB7XG4gICAgbG9nR3JlZW46IChzdHIpID0+IGNvbnNvbGUubG9nKGAke2NvbnNvbGVDb2xvdXJzLkZnR3JlZW59JHtzdHJ9JHtjb25zb2xlQ29sb3Vycy5SZXNldH1gKSxcbiAgICBsb2dZZWxsb3c6IChzdHIpID0+IGNvbnNvbGUubG9nKGAke2NvbnNvbGVDb2xvdXJzLkZnWWVsbG93fSR7c3RyfSR7Y29uc29sZUNvbG91cnMuUmVzZXR9YCksXG4gICAgbG9nQmx1ZTogKHN0cikgPT4gY29uc29sZS5sb2coYCR7Y29uc29sZUNvbG91cnMuRmdDeWFufSR7c3RyfSR7Y29uc29sZUNvbG91cnMuUmVzZXR9YCksXG4gICAgbG9nTG9hZGVyOiAoKSA9PiAoKCgpID0+IHtcbiAgICAgIGNvbnN0IHAgPSBbJy8nLCAnLScsICdcXFxcJywgJ3wnXTtcbiAgICAgIGxldCB4ID0gMDtcbiAgICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShcIlxcclwiICsgY29uc29sZUNvbG91cnMuRmdCbHVlICsgcFt4KytdICsgYCR7Y29uc29sZUNvbG91cnMuUmVzZXR9IGApO1xuICAgICAgICB4ICY9IChwLmxlbmd0aCAtIDEpO1xuICAgICAgfSwgMjUwKTtcbiAgICAgIGNvbnN0IGNsZWFyTGluZSA9ICgpID0+IHByb2Nlc3Muc3Rkb3V0LndyaXRlKFwiXFxyXCIpO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgIGNsZWFyTGluZSgpO1xuICAgICAgfVxuICAgIH0pKClcbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IExvZ2dpbmdVdGlscyA9IGV4cG9ydFV0aWxzOyIsImltcG9ydCB7IExvZ2dpbmdVdGlscyB9IGZyb20gJy4vbG9nZ2luZy9sb2ctdXRpbHMnO1xuXG5sZXQgc3RhcnRCb3hTZXJ2ZXIgPSAoZGlyKSA9PiB7fVxuXG5pZiAodHlwZW9mIHJlcXVpcmUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJykge1xuICBjb25zdCBleHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpO1xuICBjb25zdCBmYXZpY29uID0gcmVxdWlyZSgnZXhwcmVzcy1mYXZpY29uJyk7XG4gIGNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG4gIGNvbnN0IHBvcnQgPSBwcm9jZXNzLmVudi5QT1JUIHx8IDIwMjE7XG4gIFxuICBzdGFydEJveFNlcnZlciA9IChkaXIpID0+IHtcbiAgICBjb25zdCBhcHAgPSBleHByZXNzKCk7XG4gICAgY29uc3QgcHViRGlyID0gZGlyICsgJy9wdWJsaWMnXG4gICAgY29uc3QgZGlzdERpciA9IGRpciArICcvZGlzdCdcbiAgICBMb2dnaW5nVXRpbHMubG9nQmx1ZSgnSHlwZXJCb3g6IHN0YXJ0aW5nIHVwIGFwcGxpY2F0aW9uLi4uJylcbiAgICBjb25zdCBjbGVhckxvYWRlciA9IExvZ2dpbmdVdGlscy5sb2dMb2FkZXIoKVxuICAgIGFwcC51c2UoZmF2aWNvbihwdWJEaXIgKyAnL2Zhdmljb24uaWNvJykpO1xuICAgIGFwcC51c2UoZXhwcmVzcy5zdGF0aWMoZGlzdERpcikpOy8vIHNlbmQgdGhlIHVzZXIgdG8gaW5kZXggaHRtbCBwYWdlIGluc3BpdGUgb2YgdGhlIHVybFxuICAgIGFwcC5nZXQoJyonLCAocmVxLCByZXMpID0+IHtcbiAgICAgIHJlcy5zZW5kRmlsZShwYXRoLnJlc29sdmUoZGlzdERpciwgJ2luZGV4Lmh0bWwnKSk7XG4gICAgfSk7XG4gICAgYXBwLmxpc3Rlbihwb3J0LCAoKSA9PiB7XG4gICAgICBjbGVhckxvYWRlcigpXG4gICAgICBMb2dnaW5nVXRpbHMubG9nR3JlZW4oYEh5cGVyQm94OiBhcHBsaWNhdGlvbiBydW5uaW5nIG9uIHBvcnQgJHtwb3J0fSDwn5qAYCk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IHsgc3RhcnRCb3hTZXJ2ZXIgfVxuXG4iLCJleHBvcnQgKiBmcm9tICcuL2JveCc7XG5leHBvcnQgKiBmcm9tICcuL2h5cGVyYm94LWNvcmUnO1xuZXhwb3J0ICogZnJvbSAnLi9ib3gtY2x1c3Rlci9ib3gtY2x1c3Rlcic7XG5leHBvcnQgKiBmcm9tICcuL3N0YXJ0LWJveC1zZXJ2ZXInO1xuZXhwb3J0ICogZnJvbSAnLi90eXBlcyc7XG4iXSwic291cmNlUm9vdCI6IiJ9