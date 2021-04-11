(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["hyperbox-js"] = factory();
	else
		root["hyperbox-js"] = factory();
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Box": () => (/* reexport */ Box),
  "BoxCluster": () => (/* reexport */ BoxCluster),
  "HyperBoxCore": () => (/* reexport */ HyperBoxCore),
  "HyperBoxInnerCore": () => (/* reexport */ HyperBoxInnerCore),
  "startBoxServer": () => (/* reexport */ startBoxServer)
});

;// CONCATENATED MODULE: ./src/hyperbox-inner-core.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var hyperbox_inner_core_document = function document() {
  return null;
};

var hyperbox_inner_core_window = function window() {
  return null;
};

var HyperBoxInnerCore = function HyperBoxInnerCore() {
  _classCallCheck(this, HyperBoxInnerCore);
};

_defineProperty(HyperBoxInnerCore, "Document", hyperbox_inner_core_document || function () {
  return null;
});

_defineProperty(HyperBoxInnerCore, "Window", hyperbox_inner_core_window || function () {
  return null;
});

_defineProperty(HyperBoxInnerCore, "LoadDOM", function (window, document) {
  HyperBoxInnerCore.Window = window;
  HyperBoxInnerCore.Document = document;
});
;// CONCATENATED MODULE: ./src/hyperbox-core.js
function hyperbox_core_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function hyperbox_core_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/**
 * @author Alessandro Alberga
 * @description Box CORE.
 */

var HyperBoxCore = /*#__PURE__*/function () {
  function HyperBoxCore() {
    var _this = this;

    hyperbox_core_classCallCheck(this, HyperBoxCore);

    hyperbox_core_defineProperty(this, "BoxInstanceFactory", function (boxClassName) {
      var boxCapitalisedName = BoxUtils.CapitalizeFirstLetter(boxClassName);
      var instance = new (_this.BoxRegistry.get(boxCapitalisedName))();
      return instance;
    });

    hyperbox_core_defineProperty(this, "CreateBoxContainer", function (box) {
      var boxConfig = box.constructor._BoxConfig;
      var boxContainer = HyperBoxInnerCore.Document.createElement('div');
      boxContainer.setAttribute('id', box._boxId);
      boxContainer.setAttribute('class', boxConfig.name);
      return boxContainer;
    });
  }

  _createClass(HyperBoxCore, null, [{
    key: "SetBoxRegistry",
    value:
    /**
     * Set the box registry. Must be called before init.
     *
     * @param { Map } registry registry map.
     */
    function SetBoxRegistry(registry) {
      if (registry) {
        this.BoxRegistry = registry;
      } else {
        throw new Error('BoxJs: Fatal, no box registry specified.');
      }
    }
    /**
     * Kick off the boxes...
     */

  }, {
    key: "GetNewBoxId",
    value:
    /**
     * Take box config and return the new box id.
     *
     * @param { any } boxConfig box config.
     */
    function GetNewBoxId(boxConfig) {
      var boxCount = 0;

      if (HyperBoxCore.LoadedBoxes.get(boxConfig.name)) {
        boxCount = HyperBoxCore.LoadedBoxes.get(boxConfig.name).size;
      }

      var boxId = "".concat(boxConfig.name, "-").concat(boxCount);
      return boxId;
    }
    /**
     * Add a box to the DOM.
     *
     * @param { any } box the box to add to the DOM.
     * @param { String } parentBoxId parents box id.
     */

  }]);

  return HyperBoxCore;
}();

hyperbox_core_defineProperty(HyperBoxCore, "LoadedBoxes", new Map());

hyperbox_core_defineProperty(HyperBoxCore, "BoxRegistry", new Map());

hyperbox_core_defineProperty(HyperBoxCore, "Init", function () {
  // Add the root box.
  HyperBoxInnerCore.Document.getElementById('root').innerHTML = '<main-box></main-box>';
});

hyperbox_core_defineProperty(HyperBoxCore, "AddBoxToDOM", function (box, parentBoxId) {
  var boxParent = HyperBoxInnerCore.Document.getElementById(parentBoxId);
  var boxConfig = box.constructor._BoxConfig;
  var newBoxId = HyperBoxCore.GetNewBoxId(boxConfig);
  box._boxId = newBoxId;
  box._name = boxConfig.name; // Add box to loaded boxes.

  BoxUtils.AddBoxToLoadedBoxes(box);
  BoxUtils.BuildBoxInterfaces(box);
  BoxUtils.BuildBoxStandardVariables(box); // Setup styles.

  if (boxConfig.styleSheetPath) {
    BoxLoader.LoadStylesheet(boxConfig.styleSheetPath);
  } // Setup the box container.


  var boxContainer = HyperBoxCore.CreateBoxContainer(box); // Set retaining values.

  box._container = boxContainer; // Setup the initial markup and add box to parent!

  BoxUtils.DisplayBox(box);

  if (parentBoxId) {
    // Only add to DOM if a parentBoxId provided...
    if (boxParent) {
      boxParent.appendChild(boxContainer);
    } else {
      throw new Error("BoxJS: Cannot add box to null parent. \"".concat(parentBoxId, "\""));
    }
  } // Allow the box to detect for changes.


  box.detectBoxChanges = function () {
    return BoxUtils.DisplayBox(box);
  }; // Run the displayed hook if present.


  if (typeof box.boxOnDisplayed === 'function') {
    box.boxOnDisplayed();
  }

  box._init = true;
  return box;
});

hyperbox_core_defineProperty(HyperBoxCore, "MakeBox", function (className, parentBoxId) {
  var box = HyperBoxCore.BoxInstanceFactory(className);
  box._className = className;
  box._parentBoxId = parentBoxId;
  return HyperBoxCore.AddBoxToDOM(box, parentBoxId);
});
;// CONCATENATED MODULE: ./src/box-utils.js
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { box_utils_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function box_utils_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function box_utils_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function box_utils_createClass(Constructor, protoProps, staticProps) { if (protoProps) box_utils_defineProperties(Constructor.prototype, protoProps); if (staticProps) box_utils_defineProperties(Constructor, staticProps); return Constructor; }

function box_utils_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/**
 * @author Alessandro Alberga
 * @description Box utils.
 */

var box_utils_BoxUtils = /*#__PURE__*/function () {
  function BoxUtils() {
    box_utils_classCallCheck(this, BoxUtils);
  }

  box_utils_createClass(BoxUtils, null, [{
    key: "BuildPrefixedFunctionName",
    value:
    /**
     * Check if a value value is null or empty.
     *
     * @param { String } str the string to preform null or empty check on. 
     */

    /**
     * Build a function name that uses a certain prefix.
     *
     * @param { String } prefix prefix string e.g. 'get'
     * @param { String } variableName variable name e.g. 'name'
     */
    function BuildPrefixedFunctionName(prefix, variableName) {
      var returnName = BoxUtils.CapitalizeFirstLetter(variableName);
      returnName = "".concat(prefix).concat(returnName);
      return returnName;
    }
    /**
     * Build the setter name for a variable name.
     *
     * @param { String } variableName variable name.
     */

  }, {
    key: "BuildSetterName",
    value: function BuildSetterName(variableName) {
      return BoxUtils.BuildPrefixedFunctionName('set', variableName);
    }
    /**
     * Build the geter name for a variable name.
     *
     * @param { String } variableName variable name.
     */

  }, {
    key: "BuildGetterName",
    value: function BuildGetterName(variableName) {
      return BoxUtils.BuildPrefixedFunctionName('get', variableName);
    }
    /**
     * Capitalise the first letter in a string.
     *
     * @param { String } value string value.
     * @returns { String } Capitalised string.
     */

  }, {
    key: "CapitalizeFirstLetter",
    value: function CapitalizeFirstLetter(value) {
      if (value && value.length) {
        var firstChar = value[0].toUpperCase();
        return "".concat(firstChar).concat(value.substr(1, value.length));
      }

      return value;
    }
    /**
     * Load JSON.
     *
     * @param { String } path json path.
     * @returns { Promise<any> } Promise of JSON object.
     */

  }, {
    key: "LoadJSON",
    value: function LoadJSON(path) {
      return new Promise(function (resolve) {
        var request = new XMLHttpRequest();
        request.overrideMimeType('application/json');
        request.open('GET', path, true);

        request.onreadystatechange = function () {
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

  }, {
    key: "DisplayBox",
    value: function DisplayBox(box) {
      if (box && typeof box.display === 'function') {
        // Allows change detection to happen bottom up if a prent was set.
        if (box._parentBox) {
          box._parentBox.detectBoxChanges();
        }

        BoxUtils.LoadDOMAttributes(box);
        var newMarkup = box.display(box);
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

  }, {
    key: "BuildBoxInterfaces",
    value: function BuildBoxInterfaces(box) {
      if (box) {
        var boxInterface = box.constructor._BoxInterface;

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

  }, {
    key: "BuildBoxInputs",
    value: function BuildBoxInputs(box, inputsObject) {
      var inputsWithStockProperties = _objectSpread({
        _parentBoxId: null
      }, inputsObject);

      Object.keys(inputsWithStockProperties).forEach(function (interfaceProp) {
        var setterName = BoxUtils.BuildSetterName(interfaceProp);
        var getterName = BoxUtils.BuildGetterName(interfaceProp);

        box[setterName] = function (value) {
          box[interfaceProp] = value;
          box.detectBoxChanges();
        };

        box[getterName] = function () {
          return box[interfaceProp];
        };

        if (inputsWithStockProperties[interfaceProp] !== null && typeof inputsWithStockProperties[interfaceProp] !== 'undefined') {
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

  }, {
    key: "BuildBoxOutputs",
    value: function BuildBoxOutputs(box, outputsObject) {
      Object.keys(outputsObject).forEach(function (interfaceProp) {
        var newBoxOutputEvent = new CustomEvent("(".concat(interfaceProp, ")"), {
          detail: box
        });
        var eventBoxName = "_event_".concat(interfaceProp);
        box[eventBoxName] = newBoxOutputEvent; // Add the dispatch function.

        box[BoxUtils.BuildPrefixedFunctionName('dispatch', interfaceProp)] = function () {
          box.dispatchEvent(box[eventBoxName]);
        }; // Add the listen function.


        box[BoxUtils.BuildPrefixedFunctionName('add', "".concat(interfaceProp, "Listener"))] = function (callback) {
          box.addEventListener("(".concat(interfaceProp, ")"), callback, false);
        }; // Add the remove listener function.


        box[BoxUtils.BuildPrefixedFunctionName('remove', "".concat(interfaceProp, "Listener"))] = function () {
          box.removeEventListener("(".concat(interfaceProp, ")"), callback);
        };
      });
    }
    /**
     * Build the standard variables that go on boxes.
     *
     * @param { any } box box. 
     */

  }, {
    key: "BuildBoxStandardVariables",
    value: function BuildBoxStandardVariables(box) {
      var contextPath = "SharedBoxCore.loadedBoxes.get('".concat(box._name, "').get('").concat(box._boxId, "')");
      box._context = contextPath;
    }
    /**
     * Load attributes from the DOM if they have been specified in the _BoxInterface!
     * 
     * @param { any } box box.
     */

  }, {
    key: "LoadDOMAttributes",
    value: function LoadDOMAttributes(box) {
      if (box.attributes) {
        var boxInterface = box.constructor._BoxInterface;

        if (boxInterface) {
          for (var i = 0; i < box.attributes.length; i++) {
            var boxAttribute = box.attributes.item(i);
            var attributeName = boxAttribute.name,
                attributeValue = boxAttribute.value;
            var trimmedName = BoxUtils.TrimFirstAndLastChar(attributeName);

            if (BoxUtils.IsVariableInputProperty(attributeName) && boxInterface.Inputs && boxInterface.Inputs[trimmedName]) {
              console.log('aa name', trimmedName); // NOTE: add extra logic here that somethow watches [] vars!

              var setterName = BoxUtils.BuildSetterName(trimmedName);

              if (typeof box[setterName] === 'function') {
                box[trimmedName] = boxAttribute.value;
              }
            } else if (BoxUtils.IsOutputProperty(attributeName) && boxInterface.Outputs && boxInterface.Outputs[trimmedName]) {
              (function () {
                // Add the listener.
                var functionName = BoxUtils.GetFunctionNameFromFunctionCallString(attributeValue);
                var parentBox = box.getParentBox();
                box.addEventListener(attributeName, function (ev) {
                  return parentBox[functionName](ev);
                });
              })();
            } else {
              // Is normal stirng or number input property.
              var _setterName = BoxUtils.BuildSetterName(attributeName);

              console.log('aa found setter!', box[_setterName]);

              if (typeof box[_setterName] === 'function') {
                box[attributeName] = boxAttribute.value;
                console.log('aa value set!', box[attributeName]);
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

  }, {
    key: "IsVariableInputProperty",
    value: function IsVariableInputProperty(propertyName) {
      if (propertyName && propertyName.length) {
        return propertyName.length > 2 && propertyName[0] === '[' && propertyName[propertyName.length - 1] === ']';
      }
    }
  }, {
    key: "GetFunctionNameFromFunctionCallString",
    value: function GetFunctionNameFromFunctionCallString(functionCallString) {}
    /**
     * Check if a property name is an output.
     *
     * @param { String } propertyName property name.
     */

  }, {
    key: "IsOutputProperty",
    value: function IsOutputProperty(propertyName) {
      if (propertyName && propertyName.length) {
        return propertyName.length > 2 && propertyName[0] === '(' && propertyName[propertyName.length - 1] === ')';
      }
    }
    /**
     * Remove the first and last char of a string.
     *
     * @param { Stirng } propertyName property name.
     */

  }, {
    key: "TrimFirstAndLastChar",
    value: function TrimFirstAndLastChar(propertyName) {
      var returnString = propertyName;

      if (propertyName && propertyName.length > 2) {
        returnString = returnString.slice(1, propertyName.length - 1);
      }

      return returnString;
    }
    /**
     * Add box to the loaded boxes.
     *
     * @param { any } box box
     */

  }, {
    key: "AddBoxToLoadedBoxes",
    value: function AddBoxToLoadedBoxes(box) {
      var boxConfig = box.constructor._BoxConfig;
      var boxStore = HyperBoxCore.LoadedBoxes.get(boxConfig.name);

      if (!boxStore) {
        HyperBoxCore.LoadedBoxes.set(boxConfig.name, new Map());
      }

      HyperBoxCore.LoadedBoxes.get(boxConfig.name).set(box._boxId, box);
    }
  }]);

  return BoxUtils;
}();

box_utils_defineProperty(box_utils_BoxUtils, "IsNullOrEmpty", function (value) {
  if (typeof value === 'string') {
    return !value.length;
  }

  if (_typeof(value) === 'object') {
    return !Object.keys(value || {}).length;
  }

  return true;
});
;// CONCATENATED MODULE: ./src/box.js
function box_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { box_typeof = function _typeof(obj) { return typeof obj; }; } else { box_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return box_typeof(obj); }

function box_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function box_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function box_createClass(Constructor, protoProps, staticProps) { if (protoProps) box_defineProperties(Constructor.prototype, protoProps); if (staticProps) box_defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (box_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





var classImp = function classImp() {
  return null;
};
/**
 * @author Alessandro Alberga
 * @description Describes the base structure of a box.
 */


if (typeof HTMLElement === 'function') {
  classImp = /*#__PURE__*/function (_HTMLElement) {
    _inherits(Box, _HTMLElement);

    var _super = _createSuper(Box);

    function Box() {
      box_classCallCheck(this, Box);

      return _super.call(this);
    }
    /**
     * Initialise our special box!
     */


    box_createClass(Box, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this = this;

        var boxConfig = this.constructor._BoxConfig;
        this._boxId = HyperBoxCore.GetNewBoxId(boxConfig);
        this.id = this._boxId;
        this._name = boxConfig.name;
        box_utils_BoxUtils.BuildBoxStandardVariables(this);
        box_utils_BoxUtils.BuildBoxInterfaces(this);
        box_utils_BoxUtils.DisplayBox(this);

        this.detectBoxChanges = function () {
          return box_utils_BoxUtils.DisplayBox(_this);
        };

        if (typeof this.boxOnDisplayed === 'function') this.boxOnDisplayed();
        box_utils_BoxUtils.AddBoxToLoadedBoxes(this);
        this._init = true;
      }
      /**
       * Get the parent box from the parentBoxId set.
       */

    }, {
      key: "getParentBox",
      value: function getParentBox() {
        return HyperBoxInnerCore.Document.getElementById(this._parentBoxId);
      }
      /**
       * Allows any box to terminate itself.
       */

    }, {
      key: "terminateSelf",
      value: function terminateSelf() {
        this._container.remove();

        if (typeof this.boxOnDestroyed === 'function') this.boxOnDestroyed();
      }
      /**
       * Get box element by id.
       *
       * @param { Number } id box id. 
       */

    }, {
      key: "getBoxElementById",
      value: function getBoxElementById(id) {
        var element = HyperBoxInnerCore.Document.getElementById("".concat(this._boxId, "-").concat(id));
        return element;
      }
      /**
       * Box disconnected callback.
       */

    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        if (typeof this.boxOnDestroyed === 'function') this.boxOnDestroyed();
      }
    }]);

    return Box;
  }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
}

var Box = classImp;
;// CONCATENATED MODULE: ./src/box-loader.js
function box_loader_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function box_loader_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/**
 * @author Alessandro Alberga
 * @description Box loader class.
 */

var box_loader_BoxLoader = function BoxLoader() {
  box_loader_classCallCheck(this, BoxLoader);
};

box_loader_defineProperty(box_loader_BoxLoader, "LoadStylesheet", function (path) {
  var link = HyperBoxInnerCore.Document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = path;
  HyperBoxInnerCore.Document.head.appendChild(link);
});
;// CONCATENATED MODULE: ./src/box-cluster/box-cluster.js
function box_cluster_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function box_cluster_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/**
 * @author Alessandro Alberga
 * @description Hyperbox BoxNode class.
 */

var BoxCluster = function BoxCluster(boxes) {
  box_cluster_classCallCheck(this, BoxCluster);

  box_cluster_defineProperty(this, "initBox", function (boxClass) {
    if (boxClass._BoxConfig) {
      var boxConfig = boxClass._BoxConfig;

      if (boxConfig) {
        if (boxConfig.styleSheetPath) box_loader_BoxLoader.LoadStylesheet(boxConfig.styleSheetPath);
        HyperBoxInnerCore.Window.customElements.define(boxConfig.name, boxClass);
        console.log("HyperBox-JS: Defined: \"".concat(boxConfig.name, "\""));
      }
    } else {
      throw new Error("HyperBox-JS: _BoxConfig not present on: \"".concat(boxClass, "\""));
    }
  });

  if (boxes && boxes.length) {
    boxes.forEach(this.initBox);
  }
};
;// CONCATENATED MODULE: ./src/logging/console-colours.js
var consoleColours = {
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
;// CONCATENATED MODULE: ./src/logging/log-utils.js

var LoggingUtils = {
  logGreen: function logGreen(str) {
    return console.log("".concat(consoleColours.FgGreen).concat(str).concat(consoleColours.Reset));
  },
  logYellow: function logYellow(str) {
    return console.log("".concat(consoleColours.FgYellow).concat(str).concat(consoleColours.Reset));
  },
  logBlue: function logBlue(str) {
    return console.log("".concat(consoleColours.FgCyan).concat(str).concat(consoleColours.Reset));
  },
  logLoader: function logLoader() {
    return function () {
      var p = ['/', '-', '\\', '|'];
      var x = 0;
      var interval = setInterval(function () {
        process.stdout.write("\r" + consoleColours.FgBlue + p[x++] + "".concat(consoleColours.Reset, " "));
        x &= p.length - 1;
      }, 250);

      var clearLine = function clearLine() {
        return process.stdout.write("\r");
      };

      return function () {
        clearInterval(interval);
        clearLine();
      };
    }();
  }
};
;// CONCATENATED MODULE: ./src/start-box-server.js


var startBoxServer = function startBoxServer(dir) {};

if (typeof require === 'function') {
  var express = require('express');

  var favicon = require('express-favicon');

  var path = require('path');

  var port = process.env.PORT || 2021;

  startBoxServer = function startBoxServer(dir) {
    var app = express();
    var pubDir = dir + '/public';
    var distDir = dir + '/dist';
    LoggingUtils.logBlue('HyperBox: starting up application...');
    var clearLoader = LoggingUtils.logLoader();
    app.use(favicon(pubDir + '/favicon.ico'));
    app.use(express["static"](distDir)); // send the user to index html page inspite of the url

    app.get('*', function (req, res) {
      res.sendFile(path.resolve(distDir, 'index.html'));
    });
    app.listen(port, function () {
      clearLoader();
      LoggingUtils.logGreen("HyperBox: application running on port ".concat(port, " \uD83D\uDE80"));
    });
  };
}


;// CONCATENATED MODULE: ./src/index.js





/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=hyperbox-js.js.map