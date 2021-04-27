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
  "DialogBox": () => (/* reexport */ DialogBox),
  "HyperBoxCore": () => (/* reexport */ HyperBoxCore),
  "NavigatorBox": () => (/* reexport */ NavigatorBox),
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
            if (box._pid) {
                // Then refresh! Bravo! 👌
                const parent = document.getElementById(box._pid);
                parent.replaceChild(box, parent);
            }
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
                    BoxUtils.LoadAttributeOntoBox(box, boxAttribute);
                }
            }
        }
    }
    static LoadAttributeOntoBox(box, boxAttribute) {
        const boxInterface = box.constructor._BoxInterface;
        const { name: attributeName, value: attributeValue } = boxAttribute;
        if (BoxUtils.IsVariableInputProperty(attributeName) && (boxInterface === null || boxInterface === void 0 ? void 0 : boxInterface.Inputs[attributeName])) {
            const setterName = BoxUtils.BuildSetterName(attributeName);
            if (typeof box[setterName] === 'function') {
                box[attributeName] = boxAttribute.value;
            }
        }
        else if (BoxUtils.IsOutputProperty(attributeName) && (boxInterface === null || boxInterface === void 0 ? void 0 : boxInterface.Outputs[attributeName])) {
            // Add the listener.
            const functionName = BoxUtils.GetFunctionNameFromFunctionCallString(attributeValue);
            const parentBox = box.getParentBox();
            box.addEventListener(attributeName, (ev) => parentBox[functionName](ev));
        }
        else {
            if (attributeName === "_pid")
                box.pid === boxAttribute.value;
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
        if (!this.id)
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
        this.remove();
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


;// CONCATENATED MODULE: ./src/utils/safe-exec.ts
// If what was sent in was a function then execute it.
const safeExec = (func, ...args) => {
    if (func && typeof func === 'function') {
        func(...args);
    }
};

;// CONCATENATED MODULE: ./src/core-boxes/navigator/navigator.box.ts


/**
 * @author Alessandro Alberga
 * @description Navigator box.
 */
class NavigatorBox extends Box {
    constructor() {
        super(...arguments);
        /**
         * Connect the navigator to the parent box.
         */
        this.boxOnDisplayed = () => {
            this.dispatchNavigatorOnLoaded();
        };
        this.dispatchNavigatorOnLoaded = () => {
        };
    }
    get innerBox() {
        var _a;
        if (!((_a = this.children) === null || _a === void 0 ? void 0 : _a.length))
            return null;
        return this.children[0];
    }
    setRoutes(routes) {
        this._routes = routes;
    }
    cleanupOldBox() { var _a; (_a = this.innerBox) === null || _a === void 0 ? void 0 : _a.terminateSelf(); }
    addArgumentsToCurrentBox(argumentsObject) {
        var _a;
        if (!argumentsObject || !this.innerBox)
            return;
        this.innerBox._routeContext = argumentsObject;
        safeExec((_a = this.innerBox) === null || _a === void 0 ? void 0 : _a.detectBoxChanges);
    }
    setCurrentBox(box) {
        const { _BoxConfig: config } = box;
        if (!(config === null || config === void 0 ? void 0 : config.name))
            throw new Error('HyperBox-JS: Tried to set a route box without a _BoxConfig name');
        this.innerHTML = `<${config.name}></${config.name}>`;
    }
    gotoRoute(route, argumentsObject) {
        const routeEntry = this._routes[route];
        if (!route)
            throw new Error(`BoxJS: Could not find route "${route}"`);
        this.cleanupOldBox();
        this._activeRoute = route;
        const { box } = routeEntry;
        // Go to the new route.
        this.setCurrentBox(box);
        this.addEventListener('DOMNodeInserted', function (event) {
            if (event.target.parentNode.id == this.id) {
                //direct descendant
                // Set the args.
                this.addArgumentsToCurrentBox(argumentsObject);
                safeExec(this.innerBox.onNaviagatedTo);
            }
            ;
        }, false);
    }
}
NavigatorBox._BoxConfig = {
    name: 'navigator-box'
};
NavigatorBox._BoxInterface = {
    Outputs: {
        navigatorOnLoaded: null
    }
};

;// CONCATENATED MODULE: ./src/core-boxes/dialog/dialog.box.ts

/**
 * @author Alessandro Alberga
 * @description Dialog box implementation.
 */
class DialogBox extends Box {
    constructor() {
        super();
        this.display = () => {
            return `
      <div class="dialog-underlay" onclick="${this._context}.underlayOnClicked()">
        <div class="dialog-container">
          <div>
            <div class="dialog-header">
              ${this.getTitle()}
            </div>
            <div id="${this._boxId}-container">
              <!-- Box is inserted here... -->
              ${this.getInnerBox()}
            </div>
          </div>
          <div class="dialog-footer">
            ${this.getCancelButton()}
            ${this.getAcceptButton()}
          </div>
        </div>
      </div>
    `;
        };
    }
    /**
     * Insert the dialog inner box.
     *
     * @param { String } boxClassName box class name
     * @param { any } argumentsObject args object.
     * @param { function } onSuccess sucess callback.
     * @param { function } onError error callback
     */
    insertDialogInnerBox(boxClassName, argumentsObject, onSuccess, onError) {
        // We can make our dynamic box by calling make and chaining it with set parent call.
        this.innerHTML = `<${boxClassName}></${boxClassName}>`;
        this.set_dialogContext(Object.assign({}, argumentsObject));
        this.innerBox._dialogContext = {
            closeOnSuccess: (...args) => {
                this.innerBox.terminateSelf();
                this.terminateSelf();
                onSuccess(args);
            },
            closeOnError: (...args) => {
                this.innerBox.terminateSelf();
                this.terminateSelf();
                onError(args);
            },
            arguments: Object.assign({}, argumentsObject)
        };
        if (typeof this.innerBox.boxOnNavigatedTo === 'function') {
            this.innerBox.boxOnNavigatedTo();
        }
    }
    /**
     * Getter for cancel button.
     */
    getCancelButton() {
        if (this._dialogContext.cancelButtonText) {
            return `
      <button 
        class="margin-right-8"
        onclick="${this._context}.innerBox._dialogContext.closeOnSuccess(false)"
      >
        ${this._dialogContext.cancelButtonText}
      </button>
      `;
        }
        return '';
    }
    /**
     * Getter for accept button.
     */
    getAcceptButton() {
        if (this._dialogContext.acceptButtonText) {
            return `
      <button 
        onclick="${this._context}.innerBox._dialogContext.closeOnSuccess(true)"
      >
        ${this._dialogContext.acceptButtonText}
      </button>
      `;
        }
        return '';
    }
    /**
     * Getter for title.
     */
    getTitle() {
        if (this._dialogContext.title) {
            return `<h2>${this._dialogContext.title}<h2>`;
        }
        return '';
    }
    /**
     * Getter for the inner box.
     */
    getInnerBox() {
        if (this.innerBox) {
            return this.innerBox.display(this.innerBox);
        }
        return '';
    }
    /**
     * Underlay was clicked handler.
     */
    underlayOnClicked() {
        if (this.innerBox && this._dialogContext.closeable) {
            this.innerBox._dialogContext.closeOnSuccess(true);
        }
    }
}
DialogBox._BoxConfig = {
    name: 'dialog-box',
    styleSheetPath: './box-core/core-boxes/dialog/dialog.box.css'
};
DialogBox._BoxInterface = {
    Inputs: {
        _dialogContext: {}
    }
};

;// CONCATENATED MODULE: ./src/core-boxes/index.ts




;// CONCATENATED MODULE: ./src/index.ts







})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oeXBlcmJveC1qcy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vaHlwZXJib3gtanMvZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImV4cHJlc3NcIixcImNvbW1vbmpzMlwiOlwiZXhwcmVzc1wiLFwiYW1kXCI6XCJleHByZXNzXCIsXCJyb290XCI6XCJleHByZXNzXCJ9Iiwid2VicGFjazovL2h5cGVyYm94LWpzL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJleHByZXNzLWZhdmljb25cIixcImNvbW1vbmpzMlwiOlwiZXhwcmVzcy1mYXZpY29uXCIsXCJhbWRcIjpcImV4cHJlc3MtZmF2aWNvblwiLFwicm9vdFwiOlwiZXhwcmVzcy1mYXZpY29uXCJ9Iiwid2VicGFjazovL2h5cGVyYm94LWpzL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJwYXRoXCIsXCJjb21tb25qczJcIjpcInBhdGhcIixcImFtZFwiOlwicGF0aFwiLFwicm9vdFwiOlwicGF0aFwifSIsIndlYnBhY2s6Ly9oeXBlcmJveC1qcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9oeXBlcmJveC1qcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vaHlwZXJib3gtanMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9oeXBlcmJveC1qcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2h5cGVyYm94LWpzLy4vc3JjL2JveC11dGlscy50cyIsIndlYnBhY2s6Ly9oeXBlcmJveC1qcy8uL3NyYy9oeXBlcmJveC1jb3JlLnRzIiwid2VicGFjazovL2h5cGVyYm94LWpzLy4vc3JjL2JveC50cyIsIndlYnBhY2s6Ly9oeXBlcmJveC1qcy8uL3NyYy9ib3gtY2x1c3Rlci9ib3gtY2x1c3Rlci50cyIsIndlYnBhY2s6Ly9oeXBlcmJveC1qcy8uL3NyYy9sb2dnaW5nL2NvbnNvbGUtY29sb3Vycy50cyIsIndlYnBhY2s6Ly9oeXBlcmJveC1qcy8uL3NyYy9sb2dnaW5nL2xvZy11dGlscy50cyIsIndlYnBhY2s6Ly9oeXBlcmJveC1qcy8uL3NyYy9zdGFydC1ib3gtc2VydmVyLnRzIiwid2VicGFjazovL2h5cGVyYm94LWpzLy4vc3JjL3V0aWxzL3NhZmUtZXhlYy50cyIsIndlYnBhY2s6Ly9oeXBlcmJveC1qcy8uL3NyYy9jb3JlLWJveGVzL25hdmlnYXRvci9uYXZpZ2F0b3IuYm94LnRzIiwid2VicGFjazovL2h5cGVyYm94LWpzLy4vc3JjL2NvcmUtYm94ZXMvZGlhbG9nL2RpYWxvZy5ib3gudHMiLCJ3ZWJwYWNrOi8vaHlwZXJib3gtanMvLi9zcmMvY29yZS1ib3hlcy9pbmRleC50cyIsIndlYnBhY2s6Ly9oeXBlcmJveC1qcy8uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7OztBQ1ZBLGtEOzs7Ozs7O0FDQUEsa0Q7Ozs7Ozs7QUNBQSxrRDs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKQTs7O0dBR0c7QUFDSSxNQUFNLFFBQVE7SUFpQm5CLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxHQUFROztRQUNsQyxJQUFJLENB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O0FBN0dNLG9CQUFVLEdBQUc7SUFDbEIsSUFBSSxFQUFFLFlBQVk7SUFDbEIsY0FBYyxFQUFFLDZDQUE2QztDQUM5RDtBQUVNLHVCQUFhLEdBQUc7SUFDckIsTUFBTSxFQUFFO1FBQ04sY0FBYyxFQUFFLEVBQUU7S0FDbkI7Q0FDRjs7O0FDakJ1QztBQUNOO0FBQ2tCOzs7QUNGaEM7QUFDVTtBQUNVO0FBQ1A7QUFDTjtBQUNMIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiZXhwcmVzc1wiKSwgcmVxdWlyZShcImV4cHJlc3MtZmF2aWNvblwiKSwgcmVxdWlyZShcInBhdGhcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wiZXhwcmVzc1wiLCBcImV4cHJlc3MtZmF2aWNvblwiLCBcInBhdGhcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiaHlwZXJib3gtanNcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJleHByZXNzXCIpLCByZXF1aXJlKFwiZXhwcmVzcy1mYXZpY29uXCIpLCByZXF1aXJlKFwicGF0aFwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiaHlwZXJib3gtanNcIl0gPSBmYWN0b3J5KHJvb3RbXCJleHByZXNzXCJdLCByb290W1wiZXhwcmVzcy1mYXZpY29uXCJdLCByb290W1wicGF0aFwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18zOTFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fODgwX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzU0OV9fKSB7XG5yZXR1cm4gIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18zOTFfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzg4MF9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fNTQ5X187IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBCb3hJbnRlcmZhY2UgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG4vKipcbiAqIEBhdXRob3IgQWxlc3NhbmRybyBBbGJlcmdhXG4gKiBAZGVzY3JpcHRpb24gQm94IHV0aWxzLlxuICovXG5leHBvcnQgY2xhc3MgQm94VXRpbHMge1xuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIHZhbHVlIHZhbHVlIGlzIG51bGwgb3IgZW1wdHkuXG4gICAqXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IHN0ciB0aGUgc3RyaW5nIHRvIHByZWZvcm0gbnVsbCBvciBlbXB0eSBjaGVjayBvbi4gXG4gICAqL1xuICBzdGF0aWMgSXNOdWxsT3JFbXB0eSA9ICh2YWx1ZSkgPT4ge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gIXZhbHVlLmxlbmd0aFxuICAgIH1cbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuICFPYmplY3Qua2V5cyh2YWx1ZSB8fCB7fSkubGVuZ3RoXG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgc3RhdGljIENoZWNrQm94UmVxdWlyZW1lbnRzKGJveDogYW55KTogdm9pZCB7XG4gICAgaWYgKCFib3g/Ll9Cb3hDb25maWcpIHRocm93IG5ldyBFcnJvcignSHlwZXJCb3gtSlM6IE11c3Qgc2V0IF9Cb3hDb25maWcgb24gYm94Jyk7XG4gICAgaWYgKCFib3g/Ll9Cb3hDb25maWc/Lm5hbWUpIHRocm93IG5ldyBFcnJvcignSHlwZXJCb3gtSlM6IE11c3Qgc2V0IF9Cb3hDb25maWcgbmFtZSBvbiBib3gnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCdWlsZCBhIGZ1bmN0aW9uIG5hbWUgdGhhdCB1c2VzIGEgY2VydGFpbiBwcmVmaXguXG4gICAqXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IHByZWZpeCBwcmVmaXggc3RyaW5nIGUuZy4gJ2dldCdcbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gdmFyaWFibGVOYW1lIHZhcmlhYmxlIG5hbWUgZS5nLiAnbmFtZSdcbiAgICovXG4gIHN0YXRpYyBCdWlsZFByZWZpeGVkRnVuY3Rpb25OYW1lKHByZWZpeCwgdmFyaWFibGVOYW1lKSB7XG4gICAgbGV0IHJldHVybk5hbWUgPSBCb3hVdGlscy5DYXBpdGFsaXplRmlyc3RMZXR0ZXIodmFyaWFibGVOYW1lKTtcbiAgICByZXR1cm5OYW1lID0gYCR7cHJlZml4fSR7cmV0dXJuTmFtZX1gO1xuICAgIHJldHVybiByZXR1cm5OYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIEJ1aWxkIHRoZSBzZXR0ZXIgbmFtZSBmb3IgYSB2YXJpYWJsZSBuYW1lLlxuICAgKlxuICAgKiBAcGFyYW0geyBTdHJpbmcgfSB2YXJpYWJsZU5hbWUgdmFyaWFibGUgbmFtZS5cbiAgICovXG4gIHN0YXRpYyBCdWlsZFNldHRlck5hbWUodmFyaWFibGVOYW1lKSB7XG4gICAgcmV0dXJuIEJveFV0aWxzLkJ1aWxkUHJlZml4ZWRGdW5jdGlvbk5hbWUoJ3NldCcsIHZhcmlhYmxlTmFtZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBCdWlsZCB0aGUgZ2V0ZXIgbmFtZSBmb3IgYSB2YXJpYWJsZSBuYW1lLlxuICAgKlxuICAgKiBAcGFyYW0geyBTdHJpbmcgfSB2YXJpYWJsZU5hbWUgdmFyaWFibGUgbmFtZS5cbiAgICovXG4gIHN0YXRpYyBCdWlsZEdldHRlck5hbWUodmFyaWFibGVOYW1lKSB7XG4gICAgcmV0dXJuIEJveFV0aWxzLkJ1aWxkUHJlZml4ZWRGdW5jdGlvbk5hbWUoJ2dldCcsIHZhcmlhYmxlTmFtZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBDYXBpdGFsaXNlIHRoZSBmaXJzdCBsZXR0ZXIgaW4gYSBzdHJpbmcuXG4gICAqXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IHZhbHVlIHN0cmluZyB2YWx1ZS5cbiAgICogQHJldHVybnMgeyBTdHJpbmcgfSBDYXBpdGFsaXNlZCBzdHJpbmcuXG4gICAqL1xuICBzdGF0aWMgQ2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlICYmIHZhbHVlLmxlbmd0aCkge1xuICAgICAgY29uc3QgZmlyc3RDaGFyID0gdmFsdWVbMF0udG9VcHBlckNhc2UoKTtcbiAgICAgIHJldHVybiBgJHtmaXJzdENoYXJ9JHt2YWx1ZS5zdWJzdHIoMSwgdmFsdWUubGVuZ3RoKX1gXG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkIEpTT04uXG4gICAqXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IHBhdGgganNvbiBwYXRoLlxuICAgKiBAcmV0dXJucyB7IFByb21pc2U8YW55PiB9IFByb21pc2Ugb2YgSlNPTiBvYmplY3QuXG4gICAqL1xuICBzdGF0aWMgTG9hZEpTT04ocGF0aCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgY29uc3QgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgcmVxdWVzdC5vdmVycmlkZU1pbWVUeXBlKCdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIHBhdGgsIHRydWUpO1xuICAgICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZXF1ZXN0IGFyZ3MnLCByZXF1ZXN0LnJlYWR5U3RhdGUsIHJlcXVlc3Quc3RhdHVzKVxuICAgICAgICBpZiAocmVxdWVzdC5yZWFkeVN0YXRlID09PSA0ICYmIHJlcXVlc3Quc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICByZXNvbHZlKEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZSkpXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXF1ZXN0LnNlbmQobnVsbCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWZ0ZXIgYSBjaGFuZ2UgaXMgbmVlZGVkLCByZS11c2UgdGhlIGJveCBkaXNwbGF5IGZ1bmN0aW9uIHRvIHJlLXNldCBpbm5lciBodG1sLlxuICAgKlxuICAgKiBAcGFyYW0geyp9IGJveCBcbiAgICovXG4gIHN0YXRpYyBEaXNwbGF5Qm94KGJveCkge1xuICAgIGlmIChib3ggJiYgdHlwZW9mIGJveC5kaXNwbGF5ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBCb3hVdGlscy5Mb2FkRE9NQXR0cmlidXRlcyhib3gpO1xuICAgICAgY29uc3QgbmV3TWFya3VwID0gYm94LmRpc3BsYXkoYm94KTtcbiAgICAgIGJveC5pbm5lckhUTUwgPSBuZXdNYXJrdXA7XG4gICAgICBpZiAoYm94Ll9waWQpIHtcbiAgICAgICAgLy8gVGhlbiByZWZyZXNoISBCcmF2byEg8J+RjFxuICAgICAgICBjb25zdCBwYXJlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChib3guX3BpZCk7XG4gICAgICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQoYm94LCBwYXJlbnQpO1xuICAgICAgfVxuICAgICAgaWYgKGJveC5faW5pdCAmJiB0eXBlb2YgYm94LmJveE9uUmVkaXNwbGF5ZWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgYm94LmJveE9uUmVkaXNwbGF5ZWQoKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBCdWlsZCBib3ggaW50ZXJmYWNlcyAoc2V0dGVycyBhbmQgZ2V0dGVycykgaWYgX0JveEludGVyZmFjZSBwcmVzZW50LlxuICAgKlxuICAgKiBAcGFyYW0geyBhbnkgfSBib3ggYm94LiBcbiAgICovXG4gIHN0YXRpYyBCdWlsZEJveEludGVyZmFjZXMoYm94KSB7XG4gICAgaWYgKGJveCkge1xuICAgICAgY29uc3QgYm94SW50ZXJmYWNlOiBCb3hJbnRlcmZhY2UgPSBib3guY29uc3RydWN0b3IuX0JveEludGVyZmFjZTtcbiAgICAgIGlmIChib3hJbnRlcmZhY2U/LklucHV0cykgQm94VXRpbHMuQnVpbGRCb3hHZXR0ZXJzQW5kU2V0dGVycyhib3gsIGJveEludGVyZmFjZS5JbnB1dHMpO1xuICAgICAgaWYgKGJveEludGVyZmFjZT8uVmFycykgQm94VXRpbHMuQnVpbGRCb3hHZXR0ZXJzQW5kU2V0dGVycyhib3gsIGJveEludGVyZmFjZS5WYXJzKTtcbiAgICAgIGlmIChib3hJbnRlcmZhY2U/Lk91dHB1dHMpIEJveFV0aWxzLkJ1aWxkQm94T3V0cHV0cyhib3gsIGJveEludGVyZmFjZS5PdXRwdXRzKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgQnVpbGRCb3hHZXR0ZXJzQW5kU2V0dGVycyhib3gsIGlucHV0c09iamVjdDoge1trZXk6IHN0cmluZ106IGFueX0pIHtcbiAgICBjb25zdCBpbnB1dHNXaXRoU3RvY2tQcm9wZXJ0aWVzID0ge1xuICAgICAgX3BhcmVudEJveElkOiBudWxsLFxuICAgICAgLi4uaW5wdXRzT2JqZWN0LFxuICAgIH1cbiAgICBPYmplY3Qua2V5cyhpbnB1dHNXaXRoU3RvY2tQcm9wZXJ0aWVzKS5mb3JFYWNoKGludGVyZmFjZVByb3AgPT4ge1xuICAgICAgY29uc3Qgc2V0dGVyTmFtZSA9IEJveFV0aWxzLkJ1aWxkU2V0dGVyTmFtZShpbnRlcmZhY2VQcm9wKTtcbiAgICAgIGNvbnN0IGdldHRlck5hbWUgPSBCb3hVdGlscy5CdWlsZEdldHRlck5hbWUoaW50ZXJmYWNlUHJvcCk7XG4gICAgICBib3hbc2V0dGVyTmFtZV0gPSAodmFsdWUpID0+IHtcbiAgICAgICAgYm94W2ludGVyZmFjZVByb3BdID0gdmFsdWU7XG4gICAgICAgIGJveC5kZXRlY3RCb3hDaGFuZ2VzKCk7XG4gICAgICB9XG4gICAgICBib3hbZ2V0dGVyTmFtZV0gPSAoKSA9PiBib3hbaW50ZXJmYWNlUHJvcF07XG4gICAgICBpZiAoXG4gICAgICAgIGlucHV0c1dpdGhTdG9ja1Byb3BlcnRpZXNbaW50ZXJmYWNlUHJvcF0gIT09IG51bGwgJiYgXG4gICAgICAgIHR5cGVvZiBpbnB1dHNXaXRoU3RvY2tQcm9wZXJ0aWVzW2ludGVyZmFjZVByb3BdICE9PSAndW5kZWZpbmVkJ1xuICAgICAgKSB7XG4gICAgICAgIC8vIElmIHRoZXJlIGlzIGEgdmFsdWUsIHNldCBpdCAoYXBwbHkgZGVmYXVsdHMuLi4pXG4gICAgICAgIGJveFtpbnRlcmZhY2VQcm9wXSA9IGlucHV0c1dpdGhTdG9ja1Byb3BlcnRpZXNbaW50ZXJmYWNlUHJvcF07XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgQnVpbGRCb3hPdXRwdXRzKGJveCwgb3V0cHV0c09iamVjdDoge1trZXk6IHN0cmluZ106IGFueX0pIHtcbiAgICBPYmplY3Qua2V5cyhvdXRwdXRzT2JqZWN0KS5mb3JFYWNoKGludGVyZmFjZVByb3AgPT4ge1xuICAgICAgY29uc3QgbmV3Qm94T3V0cHV0RXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoYCgke2ludGVyZmFjZVByb3B9KWAsIHsgZGV0YWlsOiBib3ggfSk7XG4gICAgICBjb25zdCBldmVudEJveE5hbWUgPSBgX2V2ZW50XyR7aW50ZXJmYWNlUHJvcH1gO1xuICAgICAgYm94W2V2ZW50Qm94TmFtZV0gPSBuZXdCb3hPdXRwdXRFdmVudDtcbiAgICAgIC8vIEFkZCB0aGUgZGlzcGF0Y2ggZnVuY3Rpb24uXG4gICAgICBib3hbQm94VXRpbHMuQnVpbGRQcmVmaXhlZEZ1bmN0aW9uTmFtZSgnZGlzcGF0Y2gnLCBpbnRlcmZhY2VQcm9wKV0gPSAoLi4uYXJncykgPT4ge1xuICAgICAgICBib3guZGlzcGF0Y2hFdmVudChib3hbZXZlbnRCb3hOYW1lXSlcbiAgICAgIH1cbiAgICAgIC8vIEFkZCB0aGUgbGlzdGVuIGZ1bmN0aW9uLlxuICAgICAgbGV0IHNldENhbGxiYWNrID0gKCkgPT4ge307XG4gICAgICBib3hbQm94VXRpbHMuQnVpbGRQcmVmaXhlZEZ1bmN0aW9uTmFtZSgnYWRkJywgYCR7aW50ZXJmYWNlUHJvcH1MaXN0ZW5lcmApXSA9IChjYWxsYmFjaykgPT4ge1xuICAgICAgICBzZXRDYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICBib3guYWRkRXZlbnRMaXN0ZW5lcihgKCR7aW50ZXJmYWNlUHJvcH0pYCwgc2V0Q2FsbGJhY2ssIGZhbHNlKTtcbiAgICAgIH1cbiAgICAgIC8vIEFkZCB0aGUgcmVtb3ZlIGxpc3RlbmVyIGZ1bmN0aW9uLlxuICAgICAgYm94W0JveFV0aWxzLkJ1aWxkUHJlZml4ZWRGdW5jdGlvbk5hbWUoJ3JlbW92ZScsIGAke2ludGVyZmFjZVByb3B9TGlzdGVuZXJgKV0gPSAoKSA9PiB7XG4gICAgICAgIGJveC5yZW1vdmVFdmVudExpc3RlbmVyKGAoJHtpbnRlcmZhY2VQcm9wfSlgLCBzZXRDYWxsYmFjayk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQnVpbGQgdGhlIHN0YW5kYXJkIHZhcmlhYmxlcyB0aGF0IGdvIG9uIGJveGVzLlxuICAgKlxuICAgKiBAcGFyYW0geyBhbnkgfSBib3ggYm94LiBcbiAgICovXG4gIHN0YXRpYyBCdWlsZEJveFN0YW5kYXJkVmFyaWFibGVzKGJveCkge1xuICAgIGNvbnN0IGNvbnRleHRQYXRoID0gYFNoYXJlZEJveENvcmUubG9hZGVkQm94ZXMuZ2V0KCcke2JveC5fbmFtZX0nKS5nZXQoJyR7Ym94Ll9ib3hJZH0nKWBcbiAgICBib3guX2NvbnRleHQgPSBjb250ZXh0UGF0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkIGF0dHJpYnV0ZXMgZnJvbSB0aGUgRE9NIGlmIHRoZXkgaGF2ZSBiZWVuIHNwZWNpZmllZCBpbiB0aGUgX0JveEludGVyZmFjZSFcbiAgICogXG4gICAqIEBwYXJhbSB7IGFueSB9IGJveCBib3guXG4gICAqL1xuICBzdGF0aWMgTG9hZERPTUF0dHJpYnV0ZXMoYm94KSB7XG4gICAgaWYgKGJveC5hdHRyaWJ1dGVzKSB7XG4gICAgICBjb25zdCBib3hJbnRlcmZhY2UgPSBib3guY29uc3RydWN0b3IuX0JveEludGVyZmFjZTtcbiAgICAgIGlmIChib3hJbnRlcmZhY2UpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBib3guYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGJveEF0dHJpYnV0ZSA9IGJveC5hdHRyaWJ1dGVzLml0ZW0oaSk7XG4gICAgICAgICAgQm94VXRpbHMuTG9hZEF0dHJpYnV0ZU9udG9Cb3goYm94LCBib3hBdHRyaWJ1dGUpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgTG9hZEF0dHJpYnV0ZU9udG9Cb3goYm94LCBib3hBdHRyaWJ1dGUpIHtcbiAgICBjb25zdCBib3hJbnRlcmZhY2UgPSBib3guY29uc3RydWN0b3IuX0JveEludGVyZmFjZTtcbiAgICBjb25zdCB7IG5hbWU6IGF0dHJpYnV0ZU5hbWUsIHZhbHVlOiBhdHRyaWJ1dGVWYWx1ZSB9ID0gYm94QXR0cmlidXRlO1xuICAgIGlmIChCb3hVdGlscy5Jc1ZhcmlhYmxlSW5wdXRQcm9wZXJ0eShhdHRyaWJ1dGVOYW1lKSAmJiBib3hJbnRlcmZhY2U/LklucHV0c1thdHRyaWJ1dGVOYW1lXSkge1xuICAgICAgY29uc3Qgc2V0dGVyTmFtZSA9IEJveFV0aWxzLkJ1aWxkU2V0dGVyTmFtZShhdHRyaWJ1dGVOYW1lKTtcbiAgICAgIGlmICh0eXBlb2YgYm94W3NldHRlck5hbWVdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGJveFthdHRyaWJ1dGVOYW1lXSA9IGJveEF0dHJpYnV0ZS52YWx1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKEJveFV0aWxzLklzT3V0cHV0UHJvcGVydHkoYXR0cmlidXRlTmFtZSkgJiYgYm94SW50ZXJmYWNlPy5PdXRwdXRzW2F0dHJpYnV0ZU5hbWVdKSB7XG4gICAgICAvLyBBZGQgdGhlIGxpc3RlbmVyLlxuICAgICAgY29uc3QgZnVuY3Rpb25OYW1lID0gQm94VXRpbHMuR2V0RnVuY3Rpb25OYW1lRnJvbUZ1bmN0aW9uQ2FsbFN0cmluZyhhdHRyaWJ1dGVWYWx1ZSk7XG4gICAgICBjb25zdCBwYXJlbnRCb3ggPSBib3guZ2V0UGFyZW50Qm94KCk7XG4gICAgICBib3guYWRkRXZlbnRMaXN0ZW5lcihhdHRyaWJ1dGVOYW1lLCAoZXYpID0+IHBhcmVudEJveFtmdW5jdGlvbk5hbWVdKGV2KSlcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGF0dHJpYnV0ZU5hbWUgPT09IFwiX3BpZFwiKSBib3gucGlkID09PSBib3hBdHRyaWJ1dGUudmFsdWU7XG4gICAgICAvLyBJcyBub3JtYWwgc3Rpcm5nIG9yIG51bWJlciBpbnB1dCBwcm9wZXJ0eS5cbiAgICAgIGNvbnN0IHNldHRlck5hbWUgPSBCb3hVdGlscy5CdWlsZFNldHRlck5hbWUoYXR0cmlidXRlTmFtZSk7XG4gICAgICBpZiAodHlwZW9mIGJveFtzZXR0ZXJOYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBib3hbYXR0cmlidXRlTmFtZV0gPSBib3hBdHRyaWJ1dGUudmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgcHJvcGVydHkgbmFtZSBpcyBhbiBpbnB1dC5cbiAgICpcbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gcHJvcGVydHlOYW1lIHByb3BlcnR5IG5hbWUuXG4gICAqL1xuICBzdGF0aWMgSXNWYXJpYWJsZUlucHV0UHJvcGVydHkocHJvcGVydHlOYW1lKSB7XG4gICAgaWYgKHByb3BlcnR5TmFtZSAmJiBwcm9wZXJ0eU5hbWUubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBwcm9wZXJ0eU5hbWUubGVuZ3RoID4gMiAmJlxuICAgICAgICBwcm9wZXJ0eU5hbWVbMF0gPT09ICdbJyAmJlxuICAgICAgICBwcm9wZXJ0eU5hbWVbcHJvcGVydHlOYW1lLmxlbmd0aCAtIDFdID09PSAnXSdcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgR2V0RnVuY3Rpb25OYW1lRnJvbUZ1bmN0aW9uQ2FsbFN0cmluZyhmdW5jdGlvbkNhbGxTdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBmdW5jdGlvbkNhbGxTdHJpbmc7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgYSBwcm9wZXJ0eSBuYW1lIGlzIGFuIG91dHB1dC5cbiAgICpcbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gcHJvcGVydHlOYW1lIHByb3BlcnR5IG5hbWUuXG4gICAqL1xuICBzdGF0aWMgSXNPdXRwdXRQcm9wZXJ0eShwcm9wZXJ0eU5hbWUpIHtcbiAgICBpZiAocHJvcGVydHlOYW1lICYmIHByb3BlcnR5TmFtZS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIHByb3BlcnR5TmFtZS5sZW5ndGggPiAyICYmXG4gICAgICAgIHByb3BlcnR5TmFtZVswXSA9PT0gJygnICYmXG4gICAgICAgIHByb3BlcnR5TmFtZVtwcm9wZXJ0eU5hbWUubGVuZ3RoIC0gMV0gPT09ICcpJ1xuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgdGhlIGZpcnN0IGFuZCBsYXN0IGNoYXIgb2YgYSBzdHJpbmcuXG4gICAqXG4gICAqIEBwYXJhbSB7IFN0aXJuZyB9IHByb3BlcnR5TmFtZSBwcm9wZXJ0eSBuYW1lLlxuICAgKi9cbiAgc3RhdGljIFRyaW1GaXJzdEFuZExhc3RDaGFyKHByb3BlcnR5TmFtZSkge1xuICAgIGxldCByZXR1cm5TdHJpbmcgPSBwcm9wZXJ0eU5hbWU7XG4gICAgaWYgKHByb3BlcnR5TmFtZSAmJiBwcm9wZXJ0eU5hbWUubGVuZ3RoID4gMikge1xuICAgICAgcmV0dXJuU3RyaW5nID0gcmV0dXJuU3RyaW5nLnNsaWNlKDEsIChwcm9wZXJ0eU5hbWUubGVuZ3RoIC0gMSkpXG4gICAgfVxuICAgIHJldHVybiByZXR1cm5TdHJpbmc7XG4gIH1cbn1cbiIsImltcG9ydCB7IEJveFV0aWxzIH0gZnJvbSAnLi9ib3gtdXRpbHMnO1xuXG5sZXQgY2xhc3NJbXA6IGFueSA9ICgpID0+IG51bGw7XG5cbi8qKlxuICogQGF1dGhvciBBbGVzc2FuZHJvIEFsYmVyZ2FcbiAqIEBkZXNjcmlwdGlvbiBCb3ggQ09SRS5cbiAqL1xuaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgY2xhc3NJbXAgPSBjbGFzcyBIeXBlckJveENvcmUge1xuXG4gICAgc3RhdGljIExvYWRlZEJveGVzID0gbmV3IE1hcCgpO1xuXG4gICAgc3RhdGljIEJveFJlZ2lzdHJ5ID0gbmV3IE1hcCgpO1xuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBib3ggcmVnaXN0cnkuIE11c3QgYmUgY2FsbGVkIGJlZm9yZSBpbml0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHsgTWFwIH0gcmVnaXN0cnkgcmVnaXN0cnkgbWFwLlxuICAgICAqL1xuICAgIHN0YXRpYyBTZXRCb3hSZWdpc3RyeShyZWdpc3RyeSkge1xuICAgICAgaWYgKHJlZ2lzdHJ5KSB7XG4gICAgICAgIHRoaXMuQm94UmVnaXN0cnkgPSByZWdpc3RyeTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQm94SnM6IEZhdGFsLCBubyBib3ggcmVnaXN0cnkgc3BlY2lmaWVkLicpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgKiBBZGQgYm94IHRvIHRoZSBsb2FkZWQgYm94ZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7IGFueSB9IGJveCBib3hcbiAgICovXG4gIHN0YXRpYyBBZGRCb3hUb0xvYWRlZEJveGVzKGJveCkge1xuICAgIGNvbnN0IGJveENvbmZpZyA9IGJveC5jb25zdHJ1Y3Rvci5fQm94Q29uZmlnO1xuICAgIGNvbnN0IGJveFN0b3JlID0gSHlwZXJCb3hDb3JlLkxvYWRlZEJveGVzLmdldChib3hDb25maWcubmFtZSk7XG4gICAgaWYgKCFib3hTdG9yZSkge1xuICAgICAgSHlwZXJCb3hDb3JlLkxvYWRlZEJveGVzLnNldChcbiAgICAgICAgYm94Q29uZmlnLm5hbWUsIFxuICAgICAgICBuZXcgTWFwKClcbiAgICAgIClcbiAgICB9XG4gICAgSHlwZXJCb3hDb3JlLkxvYWRlZEJveGVzLmdldChib3hDb25maWcubmFtZSkuc2V0KGJveC5fYm94SWQsIGJveCk7XG4gIH1cblxuICAgIC8qKlxuICAgICAqIEtpY2sgb2ZmIHRoZSBib3hlcy4uLlxuICAgICAqL1xuICAgIHN0YXRpYyBJbml0ID0gKCkgPT4ge1xuICAgICAgLy8gQWRkIHRoZSByb290IGJveC5cbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JykuaW5uZXJIVE1MID0gJzxtYWluLWJveD48L21haW4tYm94PidcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBvdXIgYm94ZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0geyBhbnkgfSBib3hOYW1lIG5hbWUgb2YgYm94LlxuICAgICAqL1xuICAgIHN0YXRpYyBCb3hJbnN0YW5jZUZhY3RvcnkgPSAoYm94Q2xhc3NOYW1lKSA9PiB7XG4gICAgICBjb25zdCBib3hDYXBpdGFsaXNlZE5hbWUgPSBCb3hVdGlscy5DYXBpdGFsaXplRmlyc3RMZXR0ZXIoYm94Q2xhc3NOYW1lKTtcbiAgICAgIGNvbnN0IGluc3RhbmNlID0gbmV3IChIeXBlckJveENvcmUuQm94UmVnaXN0cnkuZ2V0KGJveENhcGl0YWxpc2VkTmFtZSkpKClcbiAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHRoZSBib3ggY29udGFpbmVyIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0geyBhbnkgfSBib3ggYm94LlxuICAgICAqL1xuICAgIHN0YXRpYyBDcmVhdGVCb3hDb250YWluZXIgPSAoYm94KSA9PiB7XG4gICAgICBjb25zdCBib3hDb25maWcgPSBib3guY29uc3RydWN0b3IuX0JveENvbmZpZztcbiAgICAgIGNvbnN0IGJveENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgYm94Q29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCBib3guX2JveElkKTtcbiAgICAgIGJveENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgYm94Q29uZmlnLm5hbWUpO1xuICAgICAgcmV0dXJuIGJveENvbnRhaW5lcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUYWtlIGJveCBjb25maWcgYW5kIHJldHVybiB0aGUgbmV3IGJveCBpZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7IGFueSB9IGJveENvbmZpZyBib3ggY29uZmlnLlxuICAgICAqL1xuICAgIHN0YXRpYyBHZXROZXdCb3hJZChib3hDb25maWcpIHtcbiAgICAgIGxldCBib3hDb3VudCA9IDA7XG4gICAgICBpZiAoSHlwZXJCb3hDb3JlLkxvYWRlZEJveGVzLmdldChib3hDb25maWcubmFtZSkpIHtcbiAgICAgICAgYm94Q291bnQgPSBIeXBlckJveENvcmUuTG9hZGVkQm94ZXMuZ2V0KGJveENvbmZpZy5uYW1lKS5zaXplO1xuICAgICAgfVxuICAgICAgY29uc3QgYm94SWQgPSBgJHtib3hDb25maWcubmFtZX0tJHtib3hDb3VudH1gO1xuICAgICAgcmV0dXJuIGJveElkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBhIGJveCB0byB0aGUgRE9NLlxuICAgICAqXG4gICAgICogQHBhcmFtIHsgYW55IH0gYm94IHRoZSBib3ggdG8gYWRkIHRvIHRoZSBET00uXG4gICAgICogQHBhcmFtIHsgU3RyaW5nIH0gcGFyZW50Qm94SWQgcGFyZW50cyBib3ggaWQuXG4gICAgICovXG4gICAgc3RhdGljIEFkZEJveFRvRE9NID0gKGJveCwgcGFyZW50Qm94SWQpID0+IHtcbiAgICAgIGNvbnN0IGJveFBhcmVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBhcmVudEJveElkKTtcbiAgICAgIGNvbnN0IGJveENvbmZpZyA9IGJveC5jb25zdHJ1Y3Rvci5fQm94Q29uZmlnO1xuICAgICAgY29uc3QgbmV3Qm94SWQgPSBIeXBlckJveENvcmUuR2V0TmV3Qm94SWQoYm94Q29uZmlnKTtcbiAgICAgIGJveC5fYm94SWQgPSBuZXdCb3hJZDtcbiAgICAgIGJveC5fbmFtZSA9IGJveENvbmZpZy5uYW1lO1xuICAgICAgLy8gQWRkIGJveCB0byBsb2FkZWQgYm94ZXMuXG4gICAgICBCb3hVdGlscy5DaGVja0JveFJlcXVpcmVtZW50cyhib3gpO1xuICAgICAgSHlwZXJCb3hDb3JlLkFkZEJveFRvTG9hZGVkQm94ZXMoYm94KTtcbiAgICAgIEJveFV0aWxzLkJ1aWxkQm94SW50ZXJmYWNlcyhib3gpO1xuICAgICAgQm94VXRpbHMuQnVpbGRCb3hTdGFuZGFyZFZhcmlhYmxlcyhib3gpO1xuICAgICAgLy8gU2V0dXAgdGhlIGJveCBjb250YWluZXIuXG4gICAgICBjb25zdCBib3hDb250YWluZXIgPSBIeXBlckJveENvcmUuQ3JlYXRlQm94Q29udGFpbmVyKGJveClcbiAgICAgIC8vIFNldCByZXRhaW5pbmcgdmFsdWVzLlxuICAgICAgYm94Ll9jb250YWluZXIgPSBib3hDb250YWluZXI7XG4gICAgICAvLyBTZXR1cCB0aGUgaW5pdGlhbCBtYXJrdXAgYW5kIGFkZCBib3ggdG8gcGFyZW50IVxuICAgICAgQm94VXRpbHMuRGlzcGxheUJveChib3gpO1xuICAgICAgaWYgKHBhcmVudEJveElkKSB7XG4gICAgICAgIC8vIE9ubHkgYWRkIHRvIERPTSBpZiBhIHBhcmVudEJveElkIHByb3ZpZGVkLi4uXG4gICAgICAgIGlmIChib3hQYXJlbnQpIHtcbiAgICAgICAgICBib3hQYXJlbnQuYXBwZW5kQ2hpbGQoYm94Q29udGFpbmVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEJveEpTOiBDYW5ub3QgYWRkIGJveCB0byBudWxsIHBhcmVudC4gXCIke3BhcmVudEJveElkfVwiYCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIEFsbG93IHRoZSBib3ggdG8gZGV0ZWN0IGZvciBjaGFuZ2VzLlxuICAgICAgYm94LmRldGVjdEJveENoYW5nZXMgPSAoKSA9PiBCb3hVdGlscy5EaXNwbGF5Qm94KGJveClcbiAgICAgIC8vIFJ1biB0aGUgZGlzcGxheWVkIGhvb2sgaWYgcHJlc2VudC5cbiAgICAgIGlmICh0eXBlb2YgYm94LmJveE9uRGlzcGxheWVkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGJveC5ib3hPbkRpc3BsYXllZCgpO1xuICAgICAgfVxuICAgICAgYm94Ll9pbml0ID0gdHJ1ZTtcbiAgICAgIHJldHVybiBib3g7XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIEFkZCBhIGJveC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Kn0gbmFtZSBcbiAgICAgKiBAcGFyYW0geyp9IHBhcmVudEJveElkIFxuICAgICAqL1xuICAgIHN0YXRpYyBNYWtlQm94ID0gKGNsYXNzTmFtZSwgcGFyZW50Qm94SWQpID0+IHtcbiAgICAgIGNvbnN0IGJveCA9IEh5cGVyQm94Q29yZS5Cb3hJbnN0YW5jZUZhY3RvcnkoY2xhc3NOYW1lKTtcbiAgICAgIGJveC5fY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuICAgICAgYm94Ll9wYXJlbnRCb3hJZCA9IHBhcmVudEJveElkO1xuICAgICAgcmV0dXJuIEh5cGVyQm94Q29yZS5BZGRCb3hUb0RPTShib3gsIHBhcmVudEJveElkKTsgIFxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgSHlwZXJCb3hDb3JlID0gY2xhc3NJbXA7IiwiaW1wb3J0IHsgQm94VXRpbHMgfSBmcm9tICcuL2JveC11dGlscyc7XG5pbXBvcnQgeyBIeXBlckJveENvcmUgfSBmcm9tICcuL2h5cGVyYm94LWNvcmUnO1xuaW1wb3J0IHsgQm94SW50ZXJmYWNlLCBCb3hDb25maWcgfSBmcm9tICcuL3R5cGVzJztcblxuY29uc3QgSHRtbENsYXNzOiBhbnkgPSAoXG4gICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSA/IFxuICBIVE1MRWxlbWVudCA6IFxuICBjbGFzcyBGYWtlSHRtbEVsZW1lbnQge31cbik7XG5cbi8qKlxuICogQGF1dGhvciBBbGVzc2FuZHJvIEFsYmVyZ2FcbiAqIEBkZXNjcmlwdGlvbiBEZXNjcmliZXMgdGhlIGJhc2Ugc3RydWN0dXJlIG9mIGEgYm94LlxuICovXG5leHBvcnQgY2xhc3MgQm94IGV4dGVuZHMgSHRtbENsYXNzIHtcbiAgcHJvdGVjdGVkIF9ib3hJZD86IHN0cmluZztcbiAgcHJvdGVjdGVkIF9uYW1lPzogc3RyaW5nO1xuICBwcm90ZWN0ZWQgX2luaXQ/OiBib29sZWFuO1xuICBwcm90ZWN0ZWQgX2NvbnRhaW5lcj86IEhUTUxFbGVtZW50O1xuICBwcm90ZWN0ZWQgX3BhcmVudEJveElkPzogc3RyaW5nO1xuICBwcm90ZWN0ZWQgX2NvbnRleHQ/OiBhbnk7XG4gIHB1YmxpYyBkaXNwbGF5OiAoY29udGV4dDogYW55KSA9PiBzdHJpbmc7XG4gIHN0YXRpYyBfQm94Q29uZmlnPzogQm94Q29uZmlnO1xuICBzdGF0aWMgX0JveEludGVyZmFjZTogQm94SW50ZXJmYWNlO1xuXG4gIHB1YmxpYyBkZXRlY3RCb3hDaGFuZ2VzID0gKCkgPT4gQm94VXRpbHMuRGlzcGxheUJveCh0aGlzKTtcblxuICAvKipcbiAgICogSW5pdGlhbGlzZSBvdXIgc3BlY2lhbCBib3ghXG4gICAqL1xuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBjb25zdCBib3hDb25maWcgPSAodGhpcy5jb25zdHJ1Y3RvciBhcyBhbnkpLl9Cb3hDb25maWc7XG4gICAgdGhpcy5fYm94SWQgPSBIeXBlckJveENvcmUuR2V0TmV3Qm94SWQoYm94Q29uZmlnKTtcbiAgICBpZiAoIXRoaXMuaWQpIHRoaXMuaWQgPSB0aGlzLl9ib3hJZDtcbiAgICB0aGlzLl9uYW1lID0gYm94Q29uZmlnLm5hbWVcbiAgICBCb3hVdGlscy5DaGVja0JveFJlcXVpcmVtZW50cyh0aGlzLmNvbnN0cnVjdG9yKTtcbiAgICBCb3hVdGlscy5CdWlsZEJveFN0YW5kYXJkVmFyaWFibGVzKHRoaXMpO1xuICAgIEJveFV0aWxzLkJ1aWxkQm94SW50ZXJmYWNlcyh0aGlzKTtcbiAgICBCb3hVdGlscy5EaXNwbGF5Qm94KHRoaXMpXG4gICAgaWYgKHR5cGVvZiB0aGlzLmJveE9uRGlzcGxheWVkID09PSAnZnVuY3Rpb24nKSB0aGlzLmJveE9uRGlzcGxheWVkKCk7XG4gICAgSHlwZXJCb3hDb3JlLkFkZEJveFRvTG9hZGVkQm94ZXModGhpcyk7XG4gICAgdGhpcy5faW5pdCA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBwYXJlbnQgYm94IGZyb20gdGhlIHBhcmVudEJveElkIHNldC5cbiAgICovXG4gIGdldFBhcmVudEJveCgpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5fcGFyZW50Qm94SWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFsbG93cyBhbnkgYm94IHRvIHRlcm1pbmF0ZSBpdHNlbGYuXG4gICAqL1xuICB0ZXJtaW5hdGVTZWxmKCkge1xuICAgICh0aGlzIGFzIGFueSBhcyBIVE1MRWxlbWVudCkucmVtb3ZlKCk7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmJveE9uRGVzdHJveWVkID09PSAnZnVuY3Rpb24nKSB0aGlzLmJveE9uRGVzdHJveWVkKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGJveCBlbGVtZW50IGJ5IGlkLlxuICAgKlxuICAgKiBAcGFyYW0geyBOdW1iZXIgfSBpZCBib3ggaWQuIFxuICAgKi9cbiAgZ2V0Qm94RWxlbWVudEJ5SWQoaWQpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7dGhpcy5fYm94SWR9LSR7aWR9YClcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBCb3ggZGlzY29ubmVjdGVkIGNhbGxiYWNrLlxuICAgKi9cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmJveE9uRGVzdHJveWVkID09PSAnZnVuY3Rpb24nKSB0aGlzLmJveE9uRGVzdHJveWVkKCk7XG4gIH1cbn0iLCJsZXQgY2xhc3NJbXA6IGFueSA9ICgpID0+IG51bGw7XG5cbi8qKlxuICogQGF1dGhvciBBbGVzc2FuZHJvIEFsYmVyZ2FcbiAqIEBkZXNjcmlwdGlvbiBIeXBlcmJveCBCb3hOb2RlIGNsYXNzLlxuICovXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgY2xhc3NJbXAgPSBjbGFzcyBCb3hDbHVzdGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihib3hlcykge1xuICAgICAgaWYgKGJveGVzICYmIGJveGVzLmxlbmd0aCkge1xuICAgICAgICBib3hlcy5mb3JFYWNoKHRoaXMuaW5pdEJveCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaW5pdEJveCA9IChib3hDbGFzcykgPT4ge1xuICAgICAgaWYgKGJveENsYXNzLl9Cb3hDb25maWcpIHtcbiAgICAgICAgY29uc3QgeyBfQm94Q29uZmlnOiBib3hDb25maWcgfSA9IGJveENsYXNzO1xuICAgICAgICBpZiAoYm94Q29uZmlnKSB7XG4gICAgICAgICAgd2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZShib3hDb25maWcubmFtZSwgYm94Q2xhc3MpXG4gICAgICAgICAgY29uc29sZS5sb2coYEh5cGVyQm94LUpTOiBEZWZpbmVkOiBcIiR7Ym94Q29uZmlnLm5hbWV9XCJgKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEh5cGVyQm94LUpTOiBfQm94Q29uZmlnIG5vdCBwcmVzZW50IG9uOiBcIiR7Ym94Q2xhc3N9XCJgKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgQm94Q2x1c3RlciA9IGNsYXNzSW1wO1xuIiwiZXhwb3J0IGNvbnN0IGNvbnNvbGVDb2xvdXJzID0ge1xuICBSZXNldDogXCJcXHgxYlswbVwiLFxuICBCcmlnaHQ6IFwiXFx4MWJbMW1cIixcbiAgRGltOiBcIlxceDFiWzJtXCIsXG4gIFVuZGVyc2NvcmU6IFwiXFx4MWJbNG1cIixcbiAgQmxpbms6IFwiXFx4MWJbNW1cIixcbiAgUmV2ZXJzZTogXCJcXHgxYls3bVwiLFxuICBIaWRkZW46IFwiXFx4MWJbOG1cIixcblxuICBGZ0JsYWNrOiBcIlxceDFiWzMwbVwiLFxuICBGZ1JlZDogXCJcXHgxYlszMW1cIixcbiAgRmdHcmVlbjogXCJcXHgxYlszMm1cIixcbiAgRmdZZWxsb3c6IFwiXFx4MWJbMzNtXCIsXG4gIEZnQmx1ZTogXCJcXHgxYlszNG1cIixcbiAgRmdNYWdlbnRhOiBcIlxceDFiWzM1bVwiLFxuICBGZ0N5YW46IFwiXFx4MWJbMzZtXCIsXG4gIEZnV2hpdGU6IFwiXFx4MWJbMzdtXCIsXG5cbiAgQmdCbGFjazogXCJcXHgxYls0MG1cIixcbiAgQmdSZWQ6IFwiXFx4MWJbNDFtXCIsXG4gIEJnR3JlZW46IFwiXFx4MWJbNDJtXCIsXG4gIEJnWWVsbG93OiBcIlxceDFiWzQzbVwiLFxuICBCZ0JsdWU6IFwiXFx4MWJbNDRtXCIsXG4gIEJnTWFnZW50YTogXCJcXHgxYls0NW1cIixcbiAgQmdDeWFuOiBcIlxceDFiWzQ2bVwiLFxuICBCZ1doaXRlOiBcIlxceDFiWzQ3bVwiXG59IiwiaW1wb3J0IHsgY29uc29sZUNvbG91cnMgfSBmcm9tICcuL2NvbnNvbGUtY29sb3Vycyc7XG5cbmxldCBleHBvcnRVdGlscyA9IHtcbiAgbG9nR3JlZW46IChzdHIpID0+IG51bGwsXG4gIGxvZ1llbGxvdzogKHN0cikgPT4gbnVsbCxcbiAgbG9nQmx1ZTogKHN0cikgPT4gbnVsbCxcbiAgbG9nTG9hZGVyOiAoKSA9PiAoKCgpID0+IHtcbiAgICByZXR1cm4gKCkgPT4gbnVsbDtcbiAgfSkoKVxuICApXG59O1xuXG5pZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnKSB7XG4gIGV4cG9ydFV0aWxzID0ge1xuICAgIGxvZ0dyZWVuOiAoc3RyKSA9PiBjb25zb2xlLmxvZyhgJHtjb25zb2xlQ29sb3Vycy5GZ0dyZWVufSR7c3RyfSR7Y29uc29sZUNvbG91cnMuUmVzZXR9YCksXG4gICAgbG9nWWVsbG93OiAoc3RyKSA9PiBjb25zb2xlLmxvZyhgJHtjb25zb2xlQ29sb3Vycy5GZ1llbGxvd30ke3N0cn0ke2NvbnNvbGVDb2xvdXJzLlJlc2V0fWApLFxuICAgIGxvZ0JsdWU6IChzdHIpID0+IGNvbnNvbGUubG9nKGAke2NvbnNvbGVDb2xvdXJzLkZnQ3lhbn0ke3N0cn0ke2NvbnNvbGVDb2xvdXJzLlJlc2V0fWApLFxuICAgIGxvZ0xvYWRlcjogKCkgPT4gKCgoKSA9PiB7XG4gICAgICBjb25zdCBwID0gWycvJywgJy0nLCAnXFxcXCcsICd8J107XG4gICAgICBsZXQgeCA9IDA7XG4gICAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoXCJcXHJcIiArIGNvbnNvbGVDb2xvdXJzLkZnQmx1ZSArIHBbeCsrXSArIGAke2NvbnNvbGVDb2xvdXJzLlJlc2V0fSBgKTtcbiAgICAgICAgeCAmPSAocC5sZW5ndGggLSAxKTtcbiAgICAgIH0sIDI1MCk7XG4gICAgICBjb25zdCBjbGVhckxpbmUgPSAoKSA9PiBwcm9jZXNzLnN0ZG91dC53cml0ZShcIlxcclwiKTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICBjbGVhckxpbmUoKTtcbiAgICAgIH1cbiAgICB9KSgpXG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBMb2dnaW5nVXRpbHMgPSBleHBvcnRVdGlsczsiLCJpbXBvcnQgeyBMb2dnaW5nVXRpbHMgfSBmcm9tICcuL2xvZ2dpbmcvbG9nLXV0aWxzJztcblxubGV0IHN0YXJ0Qm94U2VydmVyID0gKGRpcikgPT4ge31cblxuaWYgKHR5cGVvZiByZXF1aXJlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgY29uc3QgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcbiAgY29uc3QgZmF2aWNvbiA9IHJlcXVpcmUoJ2V4cHJlc3MtZmF2aWNvbicpO1xuICBjb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuICBjb25zdCBwb3J0ID0gcHJvY2Vzcy5lbnYuUE9SVCB8fCAyMDIxO1xuICBcbiAgc3RhcnRCb3hTZXJ2ZXIgPSAoZGlyKSA9PiB7XG4gICAgY29uc3QgYXBwID0gZXhwcmVzcygpO1xuICAgIGNvbnN0IHB1YkRpciA9IGRpciArICcvcHVibGljJ1xuICAgIGNvbnN0IGRpc3REaXIgPSBkaXIgKyAnL2Rpc3QnXG4gICAgTG9nZ2luZ1V0aWxzLmxvZ0JsdWUoJ0h5cGVyQm94OiBzdGFydGluZyB1cCBhcHBsaWNhdGlvbi4uLicpXG4gICAgY29uc3QgY2xlYXJMb2FkZXIgPSBMb2dnaW5nVXRpbHMubG9nTG9hZGVyKClcbiAgICBhcHAudXNlKGZhdmljb24ocHViRGlyICsgJy9mYXZpY29uLmljbycpKTtcbiAgICBhcHAudXNlKGV4cHJlc3Muc3RhdGljKGRpc3REaXIpKTsvLyBzZW5kIHRoZSB1c2VyIHRvIGluZGV4IGh0bWwgcGFnZSBpbnNwaXRlIG9mIHRoZSB1cmxcbiAgICBhcHAuZ2V0KCcqJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgICByZXMuc2VuZEZpbGUocGF0aC5yZXNvbHZlKGRpc3REaXIsICdpbmRleC5odG1sJykpO1xuICAgIH0pO1xuICAgIGFwcC5saXN0ZW4ocG9ydCwgKCkgPT4ge1xuICAgICAgY2xlYXJMb2FkZXIoKVxuICAgICAgTG9nZ2luZ1V0aWxzLmxvZ0dyZWVuKGBIeXBlckJveDogYXBwbGljYXRpb24gcnVubmluZyBvbiBwb3J0ICR7cG9ydH0g8J+agGApO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCB7IHN0YXJ0Qm94U2VydmVyIH1cblxuIiwiLy8gSWYgd2hhdCB3YXMgc2VudCBpbiB3YXMgYSBmdW5jdGlvbiB0aGVuIGV4ZWN1dGUgaXQuXG5leHBvcnQgY29uc3Qgc2FmZUV4ZWMgPSAoZnVuYz86ICguLi5hcmdzKSA9PiBhbnksIC4uLmFyZ3MpID0+IHtcbiAgaWYgKGZ1bmMgJiYgdHlwZW9mIGZ1bmMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBmdW5jKC4uLmFyZ3MpO1xuICB9XG59IiwiaW1wb3J0IHsgQm94IH0gZnJvbSAnLi4vLi4vYm94JztcbmltcG9ydCB7IHNhZmVFeGVjIH0gZnJvbSAnLi4vLi4vdXRpbHMvc2FmZS1leGVjJztcbmltcG9ydCB7IE5hdlJvdXRlSXRlbSwgTmF2Um91dGVzIH0gZnJvbSAnLi90eXBlcy9uYXYtcm91dGUuaW50ZXJmYWNlJztcblxuLyoqXG4gKiBAYXV0aG9yIEFsZXNzYW5kcm8gQWxiZXJnYVxuICogQGRlc2NyaXB0aW9uIE5hdmlnYXRvciBib3guXG4gKi9cbmV4cG9ydCBjbGFzcyBOYXZpZ2F0b3JCb3ggZXh0ZW5kcyBCb3gge1xuXG4gIHN0YXRpYyBfQm94Q29uZmlnID0ge1xuICAgIG5hbWU6ICduYXZpZ2F0b3ItYm94J1xuICB9XG5cbiAgc3RhdGljIF9Cb3hJbnRlcmZhY2UgPSB7XG4gICAgT3V0cHV0czoge1xuICAgICAgbmF2aWdhdG9yT25Mb2FkZWQ6IG51bGxcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX3JvdXRlczogTmF2Um91dGVzO1xuICBwcm90ZWN0ZWQgX2FjdGl2ZVJvdXRlPzogc3RyaW5nO1xuXG4gIGdldCBpbm5lckJveCgpOiBCb3gge1xuICAgIGlmICghdGhpcy5jaGlsZHJlbj8ubGVuZ3RoKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlblswXSBhcyBCb3g7XG4gIH1cblxuICAvKipcbiAgICogQ29ubmVjdCB0aGUgbmF2aWdhdG9yIHRvIHRoZSBwYXJlbnQgYm94LlxuICAgKi9cbiAgYm94T25EaXNwbGF5ZWQgPSAoKSA9PiB7XG4gICAgdGhpcy5kaXNwYXRjaE5hdmlnYXRvck9uTG9hZGVkKCk7XG4gIH1cblxuICBzZXRSb3V0ZXMocm91dGVzOiBOYXZSb3V0ZXMpIHtcbiAgICB0aGlzLl9yb3V0ZXMgPSByb3V0ZXM7XG4gIH1cblxuICBjbGVhbnVwT2xkQm94KCkgeyB0aGlzLmlubmVyQm94Py50ZXJtaW5hdGVTZWxmKCk7IH1cblxuICBhZGRBcmd1bWVudHNUb0N1cnJlbnRCb3goYXJndW1lbnRzT2JqZWN0KSB7XG4gICAgaWYgKCFhcmd1bWVudHNPYmplY3QgfHwgIXRoaXMuaW5uZXJCb3gpIHJldHVybjtcbiAgICAodGhpcy5pbm5lckJveCBhcyBhbnkpLl9yb3V0ZUNvbnRleHQgPSBhcmd1bWVudHNPYmplY3Q7XG4gICAgc2FmZUV4ZWModGhpcy5pbm5lckJveD8uZGV0ZWN0Qm94Q2hhbmdlcyk7XG4gIH1cblxuICBzZXRDdXJyZW50Qm94KGJveDogdHlwZW9mIEJveCkge1xuICAgIGNvbnN0IHsgX0JveENvbmZpZzogY29uZmlnIH0gPSBib3g7XG4gICAgaWYgKCFjb25maWc/Lm5hbWUpIHRocm93IG5ldyBFcnJvcignSHlwZXJCb3gtSlM6IFRyaWVkIHRvIHNldCBhIHJvdXRlIGJveCB3aXRob3V0IGEgX0JveENvbmZpZyBuYW1lJyk7XG4gICAgdGhpcy5pbm5lckhUTUwgPSBgPCR7Y29uZmlnLm5hbWV9PjwvJHtjb25maWcubmFtZX0+YFxuICB9XG5cbiAgZ290b1JvdXRlKHJvdXRlOiBzdHJpbmcsIGFyZ3VtZW50c09iamVjdCkge1xuICAgIGNvbnN0IHJvdXRlRW50cnk6IE5hdlJvdXRlSXRlbSA9IHRoaXMuX3JvdXRlc1tyb3V0ZV1cbiAgICBpZiAoIXJvdXRlKSB0aHJvdyBuZXcgRXJyb3IoYEJveEpTOiBDb3VsZCBub3QgZmluZCByb3V0ZSBcIiR7cm91dGV9XCJgKTtcbiAgICB0aGlzLmNsZWFudXBPbGRCb3goKVxuICAgIHRoaXMuX2FjdGl2ZVJvdXRlID0gcm91dGU7XG4gICAgY29uc3QgeyBib3ggfSA9IHJvdXRlRW50cnk7XG4gICAgLy8gR28gdG8gdGhlIG5ldyByb3V0ZS5cbiAgICB0aGlzLnNldEN1cnJlbnRCb3goYm94KTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICdET01Ob2RlSW5zZXJ0ZWQnLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuICAgICAgaWYgKGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLmlkID09IHRoaXMuaWQpIHtcbiAgICAgICAgLy9kaXJlY3QgZGVzY2VuZGFudFxuICAgICAgICAvLyBTZXQgdGhlIGFyZ3MuXG4gICAgICAgIHRoaXMuYWRkQXJndW1lbnRzVG9DdXJyZW50Qm94KGFyZ3VtZW50c09iamVjdCk7XG4gICAgICAgIHNhZmVFeGVjKHRoaXMuaW5uZXJCb3gub25OYXZpYWdhdGVkVG8pOyAgICBcbiAgICAgIH07XG4gICAgfSwgZmFsc2UgKTtcbiAgICBcbiAgfVxuXG4gIHByaXZhdGUgZGlzcGF0Y2hOYXZpZ2F0b3JPbkxvYWRlZCA9ICgpID0+IHtcblxuICB9O1xufSIsImltcG9ydCB7IEJveCB9IGZyb20gJy4uLy4uL2JveCc7XG5cbi8qKlxuICogQGF1dGhvciBBbGVzc2FuZHJvIEFsYmVyZ2FcbiAqIEBkZXNjcmlwdGlvbiBEaWFsb2cgYm94IGltcGxlbWVudGF0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgRGlhbG9nQm94IGV4dGVuZHMgQm94IHtcblxuICBzdGF0aWMgX0JveENvbmZpZyA9IHtcbiAgICBuYW1lOiAnZGlhbG9nLWJveCcsXG4gICAgc3R5bGVTaGVldFBhdGg6ICcuL2JveC1jb3JlL2NvcmUtYm94ZXMvZGlhbG9nL2RpYWxvZy5ib3guY3NzJ1xuICB9XG5cbiAgc3RhdGljIF9Cb3hJbnRlcmZhY2UgPSB7XG4gICAgSW5wdXRzOiB7XG4gICAgICBfZGlhbG9nQ29udGV4dDoge31cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9kaWFsb2dDb250ZXh0PzogYW55O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICAvKipcbiAgICogSW5zZXJ0IHRoZSBkaWFsb2cgaW5uZXIgYm94LlxuICAgKlxuICAgKiBAcGFyYW0geyBTdHJpbmcgfSBib3hDbGFzc05hbWUgYm94IGNsYXNzIG5hbWVcbiAgICogQHBhcmFtIHsgYW55IH0gYXJndW1lbnRzT2JqZWN0IGFyZ3Mgb2JqZWN0LlxuICAgKiBAcGFyYW0geyBmdW5jdGlvbiB9IG9uU3VjY2VzcyBzdWNlc3MgY2FsbGJhY2suXG4gICAqIEBwYXJhbSB7IGZ1bmN0aW9uIH0gb25FcnJvciBlcnJvciBjYWxsYmFja1xuICAgKi9cbiAgaW5zZXJ0RGlhbG9nSW5uZXJCb3goYm94Q2xhc3NOYW1lLCBhcmd1bWVudHNPYmplY3QsIG9uU3VjY2Vzcywgb25FcnJvcikge1xuICAgIC8vIFdlIGNhbiBtYWtlIG91ciBkeW5hbWljIGJveCBieSBjYWxsaW5nIG1ha2UgYW5kIGNoYWluaW5nIGl0IHdpdGggc2V0IHBhcmVudCBjYWxsLlxuICAgIHRoaXMuaW5uZXJIVE1MID0gYDwke2JveENsYXNzTmFtZX0+PC8ke2JveENsYXNzTmFtZX0+YDtcbiAgICAodGhpcyBhcyBhbnkpLnNldF9kaWFsb2dDb250ZXh0KHsgLi4uYXJndW1lbnRzT2JqZWN0IH0pO1xuICAgICh0aGlzLmlubmVyQm94IGFzIGFueSkuX2RpYWxvZ0NvbnRleHQgPSB7XG4gICAgICBjbG9zZU9uU3VjY2VzczogKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgdGhpcy5pbm5lckJveC50ZXJtaW5hdGVTZWxmKCk7XG4gICAgICAgIHRoaXMudGVybWluYXRlU2VsZigpO1xuICAgICAgICBvblN1Y2Nlc3MoYXJncyk7XG4gICAgICB9LFxuICAgICAgY2xvc2VPbkVycm9yOiAoLi4uYXJncykgPT4ge1xuICAgICAgICB0aGlzLmlubmVyQm94LnRlcm1pbmF0ZVNlbGYoKTtcbiAgICAgICAgdGhpcy50ZXJtaW5hdGVTZWxmKCk7XG4gICAgICAgIG9uRXJyb3IoYXJncyk7XG4gICAgICB9LFxuICAgICAgYXJndW1lbnRzOiB7XG4gICAgICAgIC4uLmFyZ3VtZW50c09iamVjdFxuICAgICAgfVxuICAgIH1cbiAgICBpZiAodHlwZW9mICh0aGlzLmlubmVyQm94IGFzIGFueSkuYm94T25OYXZpZ2F0ZWRUbyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgKHRoaXMuaW5uZXJCb3ggYXMgYW55KS5ib3hPbk5hdmlnYXRlZFRvKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHRlciBmb3IgY2FuY2VsIGJ1dHRvbi5cbiAgICovXG4gIGdldENhbmNlbEJ1dHRvbigpIHtcbiAgICBpZiAodGhpcy5fZGlhbG9nQ29udGV4dC5jYW5jZWxCdXR0b25UZXh0KSB7XG4gICAgICByZXR1cm4gYFxuICAgICAgPGJ1dHRvbiBcbiAgICAgICAgY2xhc3M9XCJtYXJnaW4tcmlnaHQtOFwiXG4gICAgICAgIG9uY2xpY2s9XCIke3RoaXMuX2NvbnRleHR9LmlubmVyQm94Ll9kaWFsb2dDb250ZXh0LmNsb3NlT25TdWNjZXNzKGZhbHNlKVwiXG4gICAgICA+XG4gICAgICAgICR7dGhpcy5fZGlhbG9nQ29udGV4dC5jYW5jZWxCdXR0b25UZXh0fVxuICAgICAgPC9idXR0b24+XG4gICAgICBgO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICAvKipcbiAgICogR2V0dGVyIGZvciBhY2NlcHQgYnV0dG9uLlxuICAgKi9cbiAgZ2V0QWNjZXB0QnV0dG9uKCkge1xuICAgIGlmICh0aGlzLl9kaWFsb2dDb250ZXh0LmFjY2VwdEJ1dHRvblRleHQpIHtcbiAgICAgIHJldHVybiBgXG4gICAgICA8YnV0dG9uIFxuICAgICAgICBvbmNsaWNrPVwiJHt0aGlzLl9jb250ZXh0fS5pbm5lckJveC5fZGlhbG9nQ29udGV4dC5jbG9zZU9uU3VjY2Vzcyh0cnVlKVwiXG4gICAgICA+XG4gICAgICAgICR7dGhpcy5fZGlhbG9nQ29udGV4dC5hY2NlcHRCdXR0b25UZXh0fVxuICAgICAgPC9idXR0b24+XG4gICAgICBgO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICAvKipcbiAgICogR2V0dGVyIGZvciB0aXRsZS5cbiAgICovXG4gIGdldFRpdGxlKCkge1xuICAgIGlmICh0aGlzLl9kaWFsb2dDb250ZXh0LnRpdGxlKSB7XG4gICAgICByZXR1cm4gYDxoMj4ke3RoaXMuX2RpYWxvZ0NvbnRleHQudGl0bGV9PGgyPmBcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHRlciBmb3IgdGhlIGlubmVyIGJveC5cbiAgICovXG4gIGdldElubmVyQm94KCkge1xuICAgIGlmICh0aGlzLmlubmVyQm94KSB7XG4gICAgICByZXR1cm4gdGhpcy5pbm5lckJveC5kaXNwbGF5KHRoaXMuaW5uZXJCb3gpO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICAvKipcbiAgICogVW5kZXJsYXkgd2FzIGNsaWNrZWQgaGFuZGxlci5cbiAgICovXG4gIHVuZGVybGF5T25DbGlja2VkKCkge1xuICAgIGlmICh0aGlzLmlubmVyQm94ICYmIHRoaXMuX2RpYWxvZ0NvbnRleHQuY2xvc2VhYmxlKSB7XG4gICAgICAodGhpcy5pbm5lckJveCBhcyBhbnkpLl9kaWFsb2dDb250ZXh0LmNsb3NlT25TdWNjZXNzKHRydWUpXG4gICAgfVxuICB9XG5cbiAgZGlzcGxheSA9ICgpID0+IHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cImRpYWxvZy11bmRlcmxheVwiIG9uY2xpY2s9XCIke3RoaXMuX2NvbnRleHR9LnVuZGVybGF5T25DbGlja2VkKClcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRpYWxvZy1jb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRpYWxvZy1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgJHt0aGlzLmdldFRpdGxlKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgaWQ9XCIke3RoaXMuX2JveElkfS1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgPCEtLSBCb3ggaXMgaW5zZXJ0ZWQgaGVyZS4uLiAtLT5cbiAgICAgICAgICAgICAgJHt0aGlzLmdldElubmVyQm94KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGlhbG9nLWZvb3RlclwiPlxuICAgICAgICAgICAgJHt0aGlzLmdldENhbmNlbEJ1dHRvbigpfVxuICAgICAgICAgICAgJHt0aGlzLmdldEFjY2VwdEJ1dHRvbigpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn0iLCJleHBvcnQgKiBmcm9tICcuL25hdmlnYXRvci9uYXZpZ2F0b3IuYm94JztcbmV4cG9ydCAqIGZyb20gJy4vZGlhbG9nL2RpYWxvZy5ib3gnO1xuZXhwb3J0ICogZnJvbSAnLi9uYXZpZ2F0b3IvdHlwZXMvbmF2LXJvdXRlLmludGVyZmFjZSc7IiwiZXhwb3J0ICogZnJvbSAnLi9ib3gnO1xuZXhwb3J0ICogZnJvbSAnLi9oeXBlcmJveC1jb3JlJztcbmV4cG9ydCAqIGZyb20gJy4vYm94LWNsdXN0ZXIvYm94LWNsdXN0ZXInO1xuZXhwb3J0ICogZnJvbSAnLi9zdGFydC1ib3gtc2VydmVyJztcbmV4cG9ydCAqIGZyb20gJy4vY29yZS1ib3hlcyc7XG5leHBvcnQgKiBmcm9tICcuL3R5cGVzJztcbiJdLCJzb3VyY2VSb290IjoiIn0=