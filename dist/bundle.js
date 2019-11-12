(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["parse"] = factory();
	else
		root["parse"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const parse = __webpack_require__(/*! ./src/index */ \"./src/index.js\");\n\nmodule.exports = parse;\n\n//# sourceURL=webpack://parse/./main.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 存储解析出来的style和script\nconst {\n  parseHTML\n} = __webpack_require__(/*! ./parseHTML */ \"./src/parseHTML.js\");\n\nconst {\n  parseAttribute\n} = __webpack_require__(/*! ./parseAttribute */ \"./src/parseAttribute.js\");\n\nfunction parse(html) {\n  let styleArr = [],\n      scriptArr = [];\n  parseHTML(html, {\n    script(asset) {\n      let temp = {\n        isInline: false,\n        type: 'script',\n        matchStr: asset[0] || '',\n        attribute: {},\n        content: ''\n      };\n      let content = asset[3] && asset[3].trim() || '';\n      let attribute = asset[2] && asset[2].trim() || '';\n\n      if (content) {\n        //有值就是内联的\n        temp.isInline = true;\n        temp.content = content;\n      }\n\n      if (attribute) {\n        //script中有属性， 解析出来\n        temp.attribute = parseAttribute(attribute);\n      }\n\n      scriptArr.push(temp);\n    },\n\n    style(asset) {\n      let temp = {\n        isInline: true,\n        type: 'style',\n        matchStr: asset[0] || '',\n        content: asset[2] && asset[2].trim() || ''\n      };\n      styleArr.push(temp);\n    },\n\n    link(asset) {\n      let temp = {\n        isInline: false,\n        type: 'style',\n        matchStr: asset[0] || '',\n        attribute: {},\n        content: ''\n      };\n      let attribute = asset[2] && asset[2].trim() || '';\n\n      if (attribute) {\n        temp.attribute = parseAttribute(attribute);\n      }\n\n      styleArr.push(temp);\n    }\n\n  });\n  return {\n    style: styleArr,\n    script: scriptArr\n  };\n}\n\nmodule.exports = parse;\n\n//# sourceURL=webpack://parse/./src/index.js?");

/***/ }),

/***/ "./src/parseAttribute.js":
/*!*******************************!*\
  !*** ./src/parseAttribute.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const attributeReg = /^\\s*([^\\s\"'<>/=]+)(?:\\s*(=)\\s*(?:\"([^\"]*)\"+|'([^']*)'+|([^\\s\"'=<>`]+)))?/; // 解析属性\n\nfunction parseAttribute(attr) {\n  let t = {};\n\n  while (attr) {\n    let matchAttr = attr.match(attributeReg);\n\n    if (matchAttr) {\n      if (matchAttr[1]) {\n        t[matchAttr[1]] = matchAttr[3];\n      }\n\n      if (!matchAttr[1]) {\n        t[matchAttr[0]] = true;\n      }\n\n      attr = attr.substring(matchAttr[0].length);\n    } else {\n      break;\n    }\n  }\n\n  return t;\n}\n\nmodule.exports = {\n  parseAttribute\n};\n\n//# sourceURL=webpack://parse/./src/parseAttribute.js?");

/***/ }),

/***/ "./src/parseHTML.js":
/*!**************************!*\
  !*** ./src/parseHTML.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// 匹配script标签\nlet scriptReg = /<(script)(\\b[^<]*)>([\\s\\S]*?)<\\/script\\b[^>]*>/; // 匹配style标签\n\nlet styleReg = /<(style)\\b[^<]*>([\\s\\S]*?)<\\/style\\b[^>]*>/; // 匹配link标签\n\nlet linkReg = /<(link)(\\b[^<]*)\\\\?>([\\s\\S]*?<\\/link\\b[^>]*>)?/; // 匹配开始标签\n\nlet startAssetTag = /(<script)|(<style)|(<link)/;\n\nfunction parseHTML(html, options = {}) {\n  while (html) {\n    let match = html.match(startAssetTag);\n\n    if (match) {\n      let index = match.index;\n\n      if (index > 0) {\n        // 去除<前面值\n        html = html.substring(index);\n      }\n\n      let innerMatch;\n\n      if (html.match(scriptReg) && match[1] == '<script') {\n        innerMatch = html.match(scriptReg);\n        options.script(innerMatch);\n      }\n\n      if (html.match(styleReg) && match[2] == '<style') {\n        innerMatch = html.match(styleReg);\n        options.style(innerMatch);\n      }\n\n      if (html.match(linkReg) && match[3] == '<link') {\n        innerMatch = html.match(linkReg);\n        options.link(innerMatch);\n      }\n\n      advance(innerMatch[0].length);\n    } else {\n      break;\n    }\n  }\n\n  function advance(n) {\n    html = html.substring(n);\n  }\n}\n\nmodule.exports = {\n  parseHTML\n};\n\n//# sourceURL=webpack://parse/./src/parseHTML.js?");

/***/ })

/******/ });
});